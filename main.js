// TallyCCU Pro - Companion Module V3.0
// Blackmagic Design camera control via TallyCCU Pro
// https://github.com/fiverecords/TallyCCUPro

const { InstanceBase, Regex, runEntrypoint, InstanceStatus } = require('@companion-module/base')
const UpgradeScripts = require('./upgrades')
const UpdateActions = require('./actions')
const Variables = require('./variables')
const Connection = require('./connection')
const Tcp = require('./tcp')
const Params = require('./params')

class TallyCcuProInstance extends InstanceBase {
	constructor(internal) {
		super(internal)

		// Default config
		this.config = {
			host: '192.168.0.100',
			defaultCameraId: 1,
		}

		// Parameter value storage
		this.paramValues = {}
		this.paramDefaults = {}
		this.paramGroupMap = {}

		// Camera state storage
		this.cameraStates = {}
		for (let i = 1; i <= 8; i++) {
			this.cameraStates[i] = {}
		}

		// Connection monitoring
		this.connectionStatus = 'unknown'
		this.connectionTimer = null
		this.pingInterval = 120000
		this.reconnectAttempts = 0
		this.maxReconnectAttempts = 3

		// Companion variables
		this.variableDefinitions = []

		// Preset names storage
		this.presetNames = {}

		// TCP client for push synchronization
		this.tcpSocket = null
		this.tcpConnected = false
		this.tcpReconnectTimer = null
		this.tcpReconnectInterval = 5000
		this.tcpPingInterval = 30000
		this.tcpPingTimer = null
		this.tcpBuffer = ''
		this.ccuBroadcastPort = 8098
	}

	// ========================================================================
	// MODULE CONFIGURATION
	// ========================================================================

	getConfigFields() {
		return [
			{
				type: 'static-text',
				id: 'info',
				width: 12,
				label: 'Information',
				value: 'Configure TallyCCU Pro IP to connect to Blackmagic cameras',
			},
			{
				type: 'textinput',
				id: 'host',
				label: 'TallyCCU Pro IP Address',
				width: 8,
				regex: Regex.IP,
				required: true,
				default: '192.168.0.100',
			},
			{
				type: 'number',
				id: 'defaultCameraId',
				label: 'Default Camera ID',
				width: 4,
				min: 1,
				max: 8,
				default: 1,
				required: true,
			},
			{
				type: 'static-text',
				id: 'info2',
				width: 12,
				label: 'Note',
				value: 'Module variables update automatically when parameters are modified or presets are loaded.',
			},
		]
	}

	// ========================================================================
	// INITIALIZATION AND LIFECYCLE
	// ========================================================================

	async init(config) {
		this.log('info', 'Initializing TallyCCU Pro module v3.0')

		if (config) {
			this.config = config
			this.log('info', 'Configured with IP: ' + (config.host || 'Not configured'))
		}

		// Initialize default parameters
		Params.initParamDefaults(this)

		// Initialize variable definitions
		Variables.initVariableDefinitions(this)

		// Configure available actions
		UpdateActions(this)

		// Check initial connection
		if (this.config.host) {
			this.updateStatus(InstanceStatus.Connecting, 'Connecting...')
			Connection.startConnectionMonitor(this)
			Tcp.startTcpConnection(this)
		} else {
			this.updateStatus(InstanceStatus.BadConfig, 'IP not configured')
		}
	}

	async configUpdated(config) {
		this.log('info', 'Configuration updated')

		const oldHost = this.config.host
		this.config = config

		// Update actions
		UpdateActions(this)

		// If IP changed, restart monitoring
		if (this.config.host !== oldHost) {
			this.log('info', 'IP address changed, restarting connection monitoring')

			Connection.stopConnectionMonitor(this)
			Tcp.stopTcpConnection(this)

			if (this.config.host) {
				this.updateStatus(InstanceStatus.Connecting, 'Connecting to new IP...')
				Connection.startConnectionMonitor(this)
				Tcp.startTcpConnection(this)
			} else {
				this.updateStatus(InstanceStatus.BadConfig, 'IP not configured')
			}
		}
	}

	async destroy() {
		this.log('info', 'Destroying TallyCCU Pro module')
		Connection.stopConnectionMonitor(this)
		Tcp.stopTcpConnection(this)
	}

	// ========================================================================
	// WRAPPER METHODS (called from actions and other modules)
	// ========================================================================

	async sendParam(cameraId, paramKey, value) {
		await Params.sendParam(this, cameraId, paramKey, value)
	}

	getParamValue(paramKey, defaultValue, cameraId = null) {
		return Params.getParamValue(this, paramKey, defaultValue, cameraId)
	}

	storeParamValue(paramKey, value, cameraId = null) {
		Params.storeParamValue(this, paramKey, value, cameraId)
	}

	async checkConnection() {
		return await Connection.checkConnection(this)
	}

	updateVariablesFromParams(cameraId, paramKey, value) {
		Variables.updateVariablesFromParams(this, cameraId, paramKey, value)
	}

	updatePresetNames(presets) {
		Variables.updatePresetNames(this, presets)
	}

	captureCurrentState(cameraId) {
		return Params.captureCurrentState(this, cameraId)
	}

	updateParameterValues(cameraId, parameters) {
		Params.updateParameterValues(this, cameraId, parameters)
	}
}

// Module entry point
runEntrypoint(TallyCcuProInstance, UpgradeScripts)
