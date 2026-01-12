// TallyCCU Pro - Parameter Management
// Parameter defaults, storage and HTTP communication

const axios = require('axios')
const { InstanceStatus } = require('@companion-module/base')

module.exports = {
	initParamDefaults(self) {
		self.paramDefaults = {
			aperture_normalised: 0.0,
			optical_image_stabilisation: true,
			focus: 0.0,
			set_absolute_zoom_normalised: 0.0,
			set_continuous_zoom_speed: 0.0,
			nd_filter_stop: [0, 0],
			shutter_speed: 24.0,
			gain_db: 0.0,
			manual_white_balance: [5600, 10],
			dynamic_range_mode: 2.0,
			video_sharpening_level: 0.0,
			set_auto_exposure_mode: 0.0,
			video_mode: [60, 0, 6, 0, 0],
			display_lut: [0, 0],
			mic_level: 0.7,
			headphone_level: 1.0,
			headphone_program_mix: 0.0,
			speaker_level: 1.0,
			input_type: 0.0,
			input_levels: [0.5, 0.5],
			phantom_power: false,
			overlays: [5, 100, 0, 9],
			brightness: 1.0,
			exposure_and_focus_tools: [0, 0],
			zebra_level: 0.5,
			peaking_level: 0.9,
			color_bars_display_time_seconds: 0.0,
			focus_assist: [1, 0],
			program_return_feed_enable: 0.0,
			timecode_source_0: 0.0,
			tally_brightness: 1.0,
			front_tally_brightness: 1.0,
			rear_tally_brightness: 1.0,
			source: 0.0,
			offset: 0.0,
			contrast_adjust: [0.5, 1],
			color_adjust: [0.0, 1],
			lift_adjust: [0.0, 0.0, 0.0, 0.0],
			gamma_adjust: [0.0, 0.0, 0.0, 0.0],
			gain_adjust: [1, 1, 1, 1],
			offset_adjust: [0.0, 0.0, 0.0, 0.0],
			luma_mix: 1.0,
			pan_tilt_velocity: [0.0, 0.0],
			memory_preset: [2, 1],
		}

		self.paramGroupMap = {
			aperture_normalised: 'lens',
			instantaneous_auto_aperture: 'lens',
			optical_image_stabilisation: 'lens',
			focus: 'lens',
			instantaneous_autofocus: 'lens',
			set_absolute_zoom_normalised: 'lens',
			set_continuous_zoom_speed: 'lens',
			nd_filter_stop: 'video',
			shutter_speed: 'video',
			gain_db: 'video',
			manual_white_balance: 'video',
			set_auto_wb: 'video',
			restore_auto_wb: 'video',
			dynamic_range_mode: 'video',
			video_sharpening_level: 'video',
			set_auto_exposure_mode: 'video',
			video_mode: 'video',
			display_lut: 'video',
			mic_level: 'audio',
			headphone_level: 'audio',
			headphone_program_mix: 'audio',
			speaker_level: 'audio',
			input_type: 'audio',
			input_levels: 'audio',
			phantom_power: 'audio',
			overlays: 'output',
			brightness: 'display',
			exposure_and_focus_tools: 'display',
			zebra_level: 'display',
			peaking_level: 'display',
			color_bars_display_time_seconds: 'display',
			focus_assist: 'display',
			program_return_feed_enable: 'display',
			timecode_source_0: 'display',
			tally_brightness: 'tally',
			front_tally_brightness: 'tally',
			rear_tally_brightness: 'tally',
			source: 'reference',
			offset: 'reference',
			contrast_adjust: 'color_correction',
			color_adjust: 'color_correction',
			lift_adjust: 'color_correction',
			gamma_adjust: 'color_correction',
			gain_adjust: 'color_correction',
			offset_adjust: 'color_correction',
			luma_mix: 'color_correction',
			correction_reset_default: 'color_correction',
			pan_tilt_velocity: 'ptz_control',
			memory_preset: 'ptz_control',
		}
	},

	getParamValue(self, paramKey, defaultValue, cameraId = null) {
		const camId = cameraId !== null ? cameraId : self.config.defaultCameraId
		const cameraKey = 'cam' + camId + '_' + paramKey

		if (self.paramValues[cameraKey] !== undefined) {
			return self.paramValues[cameraKey]
		}

		return defaultValue
	},

	storeParamValue(self, paramKey, value, cameraId = null) {
		const camId = cameraId !== null ? cameraId : self.config.defaultCameraId
		const cameraKey = 'cam' + camId + '_' + paramKey
		self.paramValues[cameraKey] = value
	},

	async sendParam(self, cameraId, paramKey, val) {
		const Connection = require('./connection')

		if (self.connectionStatus === 'error') {
			self.log('debug', 'Connection in error state, trying to reconnect before sending parameter')
			const connected = await Connection.checkConnection(self)
			if (!connected) {
				self.log('warn', 'Could not establish connection to send parameter')
				return
			}
		}

		if (!self.config.host) {
			self.log('error', 'TallyCCU Pro IP not configured')
			self.updateStatus(InstanceStatus.BadConfig, 'No IP configured')
			return
		}

		if (!self.cameraStates[cameraId]) {
			self.cameraStates[cameraId] = {}
		}

		self.cameraStates[cameraId][paramKey] = val
		self.log('debug', 'Tracking: Camera ' + cameraId + ', param ' + paramKey + ' = ' + val)

		this.storeParamValue(self, paramKey, val, cameraId)

		// Update variables
		self.updateVariablesFromParams(cameraId, paramKey, val)

		const url = 'http://' + self.config.host + '/?cameraId=' + cameraId + '&' + paramKey + '=' + encodeURIComponent(val)
		self.log('debug', 'Sending GET -> ' + url)

		try {
			const res = await axios.get(url, { timeout: 3000 })
			self.log('debug', 'Response: ' + res.status + ' ' + res.statusText)
			self.connectionStatus = 'ok'
			self.reconnectAttempts = 0
			self.updateStatus(InstanceStatus.Ok, 'Connected')
		} catch (err) {
			self.connectionStatus = 'error'
			self.log('error', 'Request error: ' + err.message)
			self.updateStatus(InstanceStatus.ConnectionFailure, 'Connection error')
		}
	},

	captureCurrentState(self, cameraId) {
		const state = self.cameraStates[cameraId] || {}
		state.cameraId = cameraId

		for (const key in self.paramDefaults) {
			if (self.paramDefaults.hasOwnProperty(key)) {
				const defaultValue = self.paramDefaults[key]
				if (state[key] === undefined) {
					state[key] = defaultValue
				}
			}
		}

		return state
	},

	updateParameterValues(self, cameraId, parameters) {
		self.log('debug', 'Updating internal values for camera ' + cameraId)

		if (!parameters) {
			self.log('warn', 'No parameters received to update')
			return
		}

		for (const paramKey in parameters) {
			if (!parameters.hasOwnProperty(paramKey)) continue
			const value = parameters[paramKey]

			if (paramKey === 'name') continue

			const cameraKey = 'cam' + cameraId + '_' + paramKey

			if (Array.isArray(value)) {
				self.paramValues[cameraKey] = value

				for (let index = 0; index < value.length; index++) {
					const subValue = value[index]
					const subKey = 'cam' + cameraId + '_' + paramKey + '_' + index
					self.paramValues[subKey] = subValue
				}
			} else if (typeof value === 'string' && value.indexOf(',') >= 0) {
				const valueArray = value.split(',').map((v) => {
					const numValue = parseFloat(v)
					return isNaN(numValue) ? v : numValue
				})

				self.paramValues[cameraKey] = valueArray

				for (let index = 0; index < valueArray.length; index++) {
					const subKey = 'cam' + cameraId + '_' + paramKey + '_' + index
					self.paramValues[subKey] = valueArray[index]
				}
			} else {
				self.paramValues[cameraKey] = value
			}

			if (!self.cameraStates[cameraId]) {
				self.cameraStates[cameraId] = {}
			}
			self.cameraStates[cameraId][paramKey] = value

			// Update variables
			self.updateVariablesFromParams(cameraId, paramKey, value)
		}

		self.log('info', 'Internal values updated for camera ' + cameraId)
	},
}
