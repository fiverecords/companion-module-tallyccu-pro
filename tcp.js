// TallyCCU Pro - TCP Client
// Real-time synchronization via TCP push notifications

const net = require('net')

module.exports = {
	startTcpConnection(self) {
		if (!self.config.host) return

		// Cancel any pending reconnection FIRST
		if (self.tcpReconnectTimer) {
			clearTimeout(self.tcpReconnectTimer)
			self.tcpReconnectTimer = null
		}

		// Close existing connection if any
		if (self.tcpSocket) {
			self.log('debug', 'Closing existing TCP connection')
			self.tcpSocket.removeAllListeners()
			self.tcpSocket.destroy()
			self.tcpSocket = null
			self.tcpConnected = false
		}

		self.log('info', `Connecting TCP to ${self.config.host}:${self.ccuBroadcastPort}...`)

		self.tcpSocket = new net.Socket()
		self.tcpBuffer = ''
		self.tcpSocket.setTimeout(5000)

		self.tcpSocket.on('connect', () => {
			self.log('info', 'TCP connected to CCU server')
			self.tcpConnected = true
			self.tcpSocket.setTimeout(0)
			self.tcpSocket.write('SUBSCRIBE CCU\r\n')
			this.startTcpPing(self)
		})

		self.tcpSocket.on('data', (data) => {
			self.tcpBuffer += data.toString()
			this.processTcpBuffer(self)
		})

		self.tcpSocket.on('close', () => {
			self.log('info', 'TCP disconnected')
			self.tcpConnected = false
			this.stopTcpPing(self)
			if (self.tcpSocket === null || !self.tcpSocket.connecting) {
				this.scheduleTcpReconnect(self)
			}
		})

		self.tcpSocket.on('error', (err) => {
			self.log('debug', `TCP error: ${err.message}`)
			self.tcpConnected = false
		})

		self.tcpSocket.on('timeout', () => {
			self.log('warn', 'TCP timeout')
			self.tcpSocket.destroy()
		})

		self.tcpSocket.connect(self.ccuBroadcastPort, self.config.host)
	},

	stopTcpConnection(self) {
		this.stopTcpPing(self)
		if (self.tcpReconnectTimer) {
			clearTimeout(self.tcpReconnectTimer)
			self.tcpReconnectTimer = null
		}
		if (self.tcpSocket) {
			self.tcpSocket.removeAllListeners()
			self.tcpSocket.destroy()
			self.tcpSocket = null
		}
		self.tcpConnected = false
	},

	scheduleTcpReconnect(self) {
		if (self.tcpReconnectTimer) clearTimeout(self.tcpReconnectTimer)
		self.tcpReconnectTimer = setTimeout(() => {
			if (self.config.host && !self.tcpConnected) {
				self.log('debug', 'Reconnecting TCP...')
				this.startTcpConnection(self)
			}
		}, self.tcpReconnectInterval)
	},

	startTcpPing(self) {
		this.stopTcpPing(self)
		self.tcpPingTimer = setInterval(() => {
			if (self.tcpSocket && self.tcpConnected) {
				self.tcpSocket.write('PING\r\n')
			}
		}, self.tcpPingInterval)
	},

	stopTcpPing(self) {
		if (self.tcpPingTimer) {
			clearInterval(self.tcpPingTimer)
			self.tcpPingTimer = null
		}
	},

	processTcpBuffer(self) {
		const lines = self.tcpBuffer.split(/\r?\n/)
		self.tcpBuffer = lines.pop() || ''
		for (const line of lines) {
			if (line.trim()) this.processTcpMessage(self, line.trim())
		}
	},

	processTcpMessage(self, message) {
		self.log('debug', `TCP rx: ${message}`)

		// REQUESTSYNC - Send all cached state back to Arduino
		if (message === 'REQUESTSYNC') {
			self.log('info', 'Received REQUESTSYNC, sending cached state')
			this.sendCachedState(self)
			return
		}

		if (message.startsWith('CCU ')) {
			const parts = message.substring(4).split(' ')
			if (parts.length >= 3) {
				const cameraId = parseInt(parts[0])
				const paramKey = parts[1]
				const value = parts.slice(2).join(' ')
				this.handleCcuChange(self, cameraId, paramKey, value)
			}
			return
		}

		// PRESETSAVED must come BEFORE PRESET
		if (message.startsWith('PRESETSAVED ')) {
			const parts = message.substring(12).split(' ')
			if (parts.length >= 2) {
				const cameraId = parseInt(parts[0])
				const presetId = parseInt(parts[1])
				const presetName = parts.slice(2).join(' ') || `Preset ${presetId}`
				this.handlePresetSaved(self, cameraId, presetId, presetName)
			}
			return
		}

		if (message.startsWith('PRESET ')) {
			const parts = message.substring(7).split(' ')
			if (parts.length >= 2) {
				const cameraId = parseInt(parts[0])
				const presetId = parseInt(parts[1])
				const presetName = parts.slice(2).join(' ') || `Preset ${presetId}`
				this.handlePresetChange(self, cameraId, presetId, presetName)
			}
			return
		}

		if (message === 'SUBSCRIBED OK') {
			self.log('info', 'Subscribed to CCU changes via TCP')
		}
	},

	handleCcuChange(self, cameraId, paramKey, value) {
		self.log('debug', `CCU push: Cam${cameraId} ${paramKey}=${value}`)

		let parsedValue = value
		if (value.includes(',')) {
			parsedValue = value.split(',').map((v) => {
				const num = parseFloat(v.trim())
				return isNaN(num) ? v.trim() : num
			})
		} else {
			const num = parseFloat(value)
			parsedValue = isNaN(num) ? value : num
		}

		const cameraKey = 'cam' + cameraId + '_' + paramKey
		self.paramValues[cameraKey] = parsedValue

		if (!self.cameraStates[cameraId]) self.cameraStates[cameraId] = {}
		self.cameraStates[cameraId][paramKey] = parsedValue

		self.updateVariablesFromParams(cameraId, paramKey, parsedValue)
	},

	handlePresetChange(self, cameraId, presetId, presetName) {
		self.log('info', `Preset push: Cam${cameraId} P${presetId} "${presetName}"`)

		const variables = {}
		variables[`cam${cameraId}_active_preset_name`] = presetName
		variables[`cam${cameraId}_active_preset_id`] = presetId.toString()

		if (cameraId === self.config.defaultCameraId) {
			variables['current_preset_name'] = presetName
			variables['current_preset_id'] = presetId.toString()
		}

		self.setVariableValues(variables)
	},

	handlePresetSaved(self, cameraId, presetId, presetName) {
		self.log('info', `Preset saved: Cam${cameraId} P${presetId} "${presetName}"`)

		if (!self.presetNames) self.presetNames = {}
		if (!self.presetNames[cameraId]) self.presetNames[cameraId] = {}
		self.presetNames[cameraId][presetId] = presetName

		const variables = {}
		variables[`cam${cameraId}_preset${presetId}_name`] = presetName

		if (cameraId === self.config.defaultCameraId) {
			variables[`preset${presetId}_name`] = presetName
		}

		self.setVariableValues(variables)
		self.log('debug', `Variable updated: cam${cameraId}_preset${presetId}_name = "${presetName}"`)
	},

	// Send all cached camera state back to Arduino for SSE sync
	sendCachedState(self) {
		if (!self.tcpSocket || !self.tcpConnected) {
			self.log('warn', 'Cannot send cached state - TCP not connected')
			return
		}

		let paramCount = 0
		for (let cameraId = 1; cameraId <= 8; cameraId++) {
			const state = self.cameraStates[cameraId]
			if (!state) continue

			for (const paramKey in state) {
				const value = state[paramKey]
				let valueStr
				if (Array.isArray(value)) {
					valueStr = value.join(',')
				} else {
					valueStr = String(value)
				}
				
				// Send as CCU message back to Arduino
				const msg = `CCUSYNC ${cameraId} ${paramKey} ${valueStr}\r\n`
				self.tcpSocket.write(msg)
				paramCount++
			}
		}
		
		self.log('info', `Sent ${paramCount} cached parameters to Arduino`)
	},
}
