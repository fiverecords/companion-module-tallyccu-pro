// TallyCCU Pro - Connection Monitoring
// HTTP connection monitoring and status management

const axios = require('axios')
const { InstanceStatus } = require('@companion-module/base')

module.exports = {
	async checkConnection(self) {
		if (!self.config.host) {
			self.connectionStatus = 'error'
			self.updateStatus(InstanceStatus.BadConfig, 'No IP configured')
			return false
		}

		// If TCP is connected, use it as connection indicator
		if (self.tcpConnected) {
			self.connectionStatus = 'ok'
			self.updateStatus(InstanceStatus.Ok, 'Connected via TCP')
			return true
		}

		self.log('debug', 'Checking connection to TallyCCU Pro at ' + self.config.host)

		try {
			const url = 'http://' + self.config.host + '/?listPresets'
			const response = await axios.get(url, { timeout: 3000 })

			let validResponse = false
			let presetsData = null

			if (typeof response.data === 'object') {
				validResponse = response.data && response.data.presets !== undefined
				if (validResponse) presetsData = response.data
			} else if (typeof response.data === 'string') {
				validResponse =
					response.data.includes('presets') ||
					response.data.includes('TallyCCU') ||
					(response.data.includes('{') && response.data.includes('}'))

				if (validResponse) {
					const jsonMatch = response.data.match(/\{.*\}/s)
					if (jsonMatch) {
						try {
							presetsData = JSON.parse(jsonMatch[0])
						} catch (e) {
							// No problem if parsing fails
						}
					}
				}
			}

			if (validResponse) {
				self.connectionStatus = 'ok'
				self.reconnectAttempts = 0
				self.updateStatus(InstanceStatus.Ok, 'Connected to TallyCCU Pro')
				self.log('debug', 'Connection verified successfully')

				// Load preset names if available
				if (presetsData && presetsData.presets && Array.isArray(presetsData.presets)) {
					self.log('info', 'Loading preset names from SD')
					self.updatePresetNames(presetsData.presets)
				}

				return true
			} else {
				self.connectionStatus = 'error'
				self.reconnectAttempts++
				self.updateStatus(InstanceStatus.ConnectionFailure, 'Invalid response - Not a TallyCCU Pro')
				self.log('warn', 'Response received but does not appear to be from a TallyCCU Pro')
				return false
			}
		} catch (error) {
			self.connectionStatus = 'error'
			self.reconnectAttempts++

			let errorMsg = 'Connection error'
			if (error.code === 'ECONNREFUSED') {
				errorMsg = 'Connection refused'
			} else if (error.code === 'ETIMEDOUT' || error.code === 'ECONNABORTED') {
				errorMsg = 'Connection timeout'
			} else if (error.code === 'EHOSTUNREACH') {
				errorMsg = 'Host unreachable'
			}

			self.updateStatus(
				InstanceStatus.ConnectionFailure,
				errorMsg + ' (' + self.reconnectAttempts + '/' + self.maxReconnectAttempts + ')'
			)
			self.log('error', 'Error checking connection: ' + error.message)
			return false
		}
	},

	startConnectionMonitor(self) {
		self.log('info', 'Starting connection monitoring...')

		if (self.connectionTimer) {
			clearInterval(self.connectionTimer)
		}

		// Initial check
		this.checkConnection(self).then((connected) => {
			if (connected) {
				self.log('info', 'Initial connection established successfully')
			} else {
				self.log('warn', 'Could not establish initial connection')
			}
		})

		// Periodic check
		self.connectionTimer = setInterval(async () => {
			const connected = await this.checkConnection(self)

			if (!connected && self.reconnectAttempts >= self.maxReconnectAttempts) {
				clearInterval(self.connectionTimer)
				self.log('warn', 'Multiple connection failures, increasing check interval')
				self.pingInterval = 60000
				self.connectionTimer = setInterval(() => this.checkConnection(self), self.pingInterval)
			}
		}, self.pingInterval)
	},

	stopConnectionMonitor(self) {
		if (self.connectionTimer) {
			clearInterval(self.connectionTimer)
			self.connectionTimer = null
		}
		self.log('debug', 'Connection monitoring stopped')
	},
}
