// TallyCCU Pro - Actions
// All camera control actions

const axios = require('axios')

module.exports = function (self) {
	const actions = {}

        actions['set_aperture_normalised'] = {
            name: 'Set Aperture (normalised)',
            description: 'Group: Lens | Param: Aperture (normalised) | Note: 0.0 = Smallest, 1.0 = Largest',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: 0.0,
                    min: 0.0,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                self.sendParam(cameraId, 'aperture_normalised', event.options.value);
            }
        };
        // Action to increment Aperture (normalised)
        actions['set_aperture_normalised_increment'] = {
            name: 'â¬†ï¸Â Increase Aperture (normalised)',
            description: 'Increase the value of Aperture (normalised)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 0.1,
                    min: 0.1,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('aperture_normalised', 0.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(1.0, currentValue + increment);
                
                // Send new value
                self.sendParam(cameraId, 'aperture_normalised', newValue);
                
                // Store new value specifically for this camera
                self.storeParamValue('aperture_normalised', newValue, cameraId);
            }
        };
        // Action to decrement Aperture (normalised)
        actions['set_aperture_normalised_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Aperture (normalised)',
            description: 'Decrease the value of Aperture (normalised)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 0.1,
                    min: 0.1,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('aperture_normalised', 0.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(0.0, currentValue - decrement);
                
                // Send new value
                self.sendParam(cameraId, 'aperture_normalised', newValue);
                
                // Store new value specifically for this camera
                self.storeParamValue('aperture_normalised', newValue, cameraId);
            }
        };
        // Action to reset Aperture (normalised) al default value
        actions['set_aperture_normalised_reset'] = {
            name: 'ðŸ”„ Reset Aperture (normalised)',
            description: 'Reset to default value (0.00)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                
                // Send default value
                self.sendParam(cameraId, 'aperture_normalised', 0.0);
                
                // Store default value for this specific camera
                self.storeParamValue('aperture_normalised', 0.0, cameraId);
            }
        };
        // Action for Instantaneous auto aperture (void)
        actions['set_instantaneous_auto_aperture'] = {
            name: 'Trigger Instantaneous auto aperture',
            description: 'Group: Lens | Param: Instantaneous auto aperture | Note: Trigger Instantaneous Auto Aperture',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                self.sendParam(cameraId, 'instantaneous_auto_aperture', '1');
            }
        };
        // Action for Optical image stabilisation (boolean)
        actions['set_optical_image_stabilisation'] = {
            name: 'Set Optical image stabilisation',
            description: 'Group: Lens | Param: Optical image stabilisation | Note: True = Enabled, False = Disabled',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'checkbox',
                    label: 'Value',
                    id: 'value',
                    default: true
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const value = event.options.value ? 1 : 0;
                self.sendParam(cameraId, 'optical_image_stabilisation', value);
            }
        };
        // Action for Focus (numeric)
        actions['set_focus'] = {
            name: 'Set Focus',
            description: 'Group: Lens | Param: Focus | Note: 0.0 = Near, 1.0 = Far',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: 0.0,
                    min: 0.0,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                self.sendParam(cameraId, 'focus', event.options.value);
            }
        };
        // Action to increment Focus
        actions['set_focus_increment'] = {
            name: 'â¬†ï¸Â Increase Focus',
            description: 'Increase the value of Focus',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 0.1,
                    min: 0.1,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('focus', 0.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(1.0, currentValue + increment);
                
                // Send new value
                self.sendParam(cameraId, 'focus', newValue);
                
                // Store new value specifically for this camera
                self.storeParamValue('focus', newValue, cameraId);
            }
        };
        // Action to decrement Focus
        actions['set_focus_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Focus',
            description: 'Decrease the value of Focus',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 0.1,
                    min: 0.1,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('focus', 0.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(0.0, currentValue - decrement);
                
                // Send new value
                self.sendParam(cameraId, 'focus', newValue);
                
                // Store new value specifically for this camera
                self.storeParamValue('focus', newValue, cameraId);
            }
        };
        // Action to reset Focus al default value
        actions['set_focus_reset'] = {
            name: 'ðŸ”„ Reset Focus',
            description: 'Reset to default value (0.00)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                
                // Send default value
                self.sendParam(cameraId, 'focus', 0.0);
                
                // Store default value for this specific camera
                self.storeParamValue('focus', 0.0, cameraId);
            }
        };
        // Action for Instantaneous autofocus (void)
        actions['set_instantaneous_autofocus'] = {
            name: 'Trigger Instantaneous autofocus',
            description: 'Group: Lens | Param: Instantaneous autofocus | Note: Trigger Instantaneous Autofocus',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                self.sendParam(cameraId, 'instantaneous_autofocus', '1');
            }
        };
        // Action for Set absolute zoom (normalised) (numeric)
        actions['set_set_absolute_zoom_normalised'] = {
            name: 'Set Set absolute zoom (normalised)',
            description: 'Group: Lens | Param: Set absolute zoom (normalised) | Note: Move to specified focal length: 0.0 = wide, 1.0 = tele',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: 0.0,
                    min: 0.0,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                self.sendParam(cameraId, 'set_absolute_zoom_normalised', event.options.value);
            }
        };
        // Action to increment Set absolute zoom (normalised)
        actions['set_set_absolute_zoom_normalised_increment'] = {
            name: 'â¬†ï¸Â Increase Set absolute zoom (normalised)',
            description: 'Increase the value of Set absolute zoom (normalised)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 0.1,
                    min: 0.1,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('set_absolute_zoom_normalised', 0.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(1.0, currentValue + increment);
                
                // Send new value
                self.sendParam(cameraId, 'set_absolute_zoom_normalised', newValue);
                
                // Store new value specifically for this camera
                self.storeParamValue('set_absolute_zoom_normalised', newValue, cameraId);
            }
        };
        // Action to decrement Set absolute zoom (normalised)
        actions['set_set_absolute_zoom_normalised_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Set absolute zoom (normalised)',
            description: 'Decrease the value of Set absolute zoom (normalised)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 0.1,
                    min: 0.1,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('set_absolute_zoom_normalised', 0.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(0.0, currentValue - decrement);
                
                // Send new value
                self.sendParam(cameraId, 'set_absolute_zoom_normalised', newValue);
                
                // Store new value specifically for this camera
                self.storeParamValue('set_absolute_zoom_normalised', newValue, cameraId);
            }
        };
        // Action to reset Set absolute zoom (normalised) al default value
        actions['set_set_absolute_zoom_normalised_reset'] = {
            name: 'ðŸ”„ Reset Set absolute zoom (normalised)',
            description: 'Reset to default value (0.00)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                
                // Send default value
                self.sendParam(cameraId, 'set_absolute_zoom_normalised', 0.0);
                
                // Store default value for this specific camera
                self.storeParamValue('set_absolute_zoom_normalised', 0.0, cameraId);
            }
        };
        // Action for Zoom continuo - Inicio
        actions['zoom_start'] = {
            name: 'Zoom - Iniciar',
            description: 'Start zoom in a direction',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'dropdown',
                    label: 'Direction',
                    id: 'direction',
                    default: 'in',
                    choices: [
                        { id: 'in', label: 'Zoom In (Tele)' },
                        { id: 'out', label: 'Zoom Out (Wide)' }
                    ]
                },
                {
                    type: 'number',
                    label: 'Speed (0-1)',
                    id: 'speed',
                    default: 0.5,
                    min: 0,
                    max: 1,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const direction = event.options.direction;
                const speed = parseFloat(event.options.speed);
                const value = direction === 'in' ? speed : -speed;
                self.sendParam(cameraId, 'set_continuous_zoom_speed', value);
            }
        };
        
        // Action for Zoom continuo - Detener
        actions['zoom_stop'] = {
            name: 'Zoom - Detener',
            description: 'Stop any zoom movement',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                self.sendParam(cameraId, 'set_continuous_zoom_speed', 0);
            }
        };
        // Action for ND Filter Stop (multiple subindexes)
        actions['set_nd_filter_stop'] = {
            name: 'Set ND Filter Stop',
            description: 'Set values for ND Filter Stop',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Filter power as f-stop',
                    id: 'value0',
                    default: 0.0,
                    min: 0.0,
                    max: 15.0,
                    step: 0.1
                },
                {
                    type: 'number',
                    label: '0 = Stop, 1 = Density, 2 = Transmitance',
                    id: 'value1',
                    default: 0.0,
                    min: 0.0,
                    max: 2.0,
                    step: 0.1
                },
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const values = [];
                values[0] = event.options.value0;
                values[1] = event.options.value1;
                const valuesString = values.join(",");
                self.sendParam(cameraId, 'nd_filter_stop', valuesString);
                
                // Store individual values for each subindex
                
                self.storeParamValue('nd_filter_stop_0', event.options.value0, cameraId);
                self.storeParamValue('nd_filter_stop_1', event.options.value1, cameraId);
            }
        };
        // Action to set only ND Filter Stop: Filter power as f-stop
        actions['set_nd_filter_stop_0'] = {
            name: 'Set ND Filter Stop: Filter power as f-stop',
            description: 'Set value for ND Filter Stop: Filter power as f-stop (0, 2, 4, 6)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'dropdown',
                    label: 'ND Stop',
                    id: 'value',
                    default: 0,
                    choices: [
                        { id: 0, label: 'Clear (0)' },
                        { id: 2, label: 'ND 0.6 (2 stops)' },
                        { id: 4, label: 'ND 1.2 (4 stops)' },
                        { id: 6, label: 'ND 1.8 (6 stops)' }
                    ]
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const newValue = parseInt(event.options.value);
                
                // Get current values or use SPECIFIC defaults
                const values = [];
                values[0] = newValue;
                values[1] = self.getParamValue('nd_filter_stop_1', 0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('nd_filter_stop_0', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'nd_filter_stop', valuesString);
            }
        };
        // Action to increment ND Filter Stop: Filter power as f-stop (steps of 2)
        actions['set_nd_filter_stop_0_increment'] = {
            name: '⬆️ Increase ND Filter Stop: Filter power as f-stop',
            description: 'Increase ND filter by 2 stops (0 → 2 → 4 → 6)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('nd_filter_stop_0', 0, cameraId);
                
                // Increment by 2, max 6
                let newValue = Math.min(6, currentValue + 2);
                
                // Get current values for other subindexes
                const values = [];
                values[0] = newValue;
                values[1] = self.getParamValue('nd_filter_stop_1', 0, cameraId);
                
                self.log('info', `ND Filter: ${currentValue} → ${newValue} stops`);
                
                // Store new value specifically for this camera
                self.storeParamValue('nd_filter_stop_0', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'nd_filter_stop', valuesString);
            }
        };
        // Action to decrement ND Filter Stop: Filter power as f-stop (steps of 2)
        actions['set_nd_filter_stop_0_decrement'] = {
            name: '⬇️ Decrease ND Filter Stop: Filter power as f-stop',
            description: 'Decrease ND filter by 2 stops (6 → 4 → 2 → 0)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('nd_filter_stop_0', 0, cameraId);
                
                // Decrement by 2, min 0
                let newValue = Math.max(0, currentValue - 2);
                
                // Get current values for other subindexes
                const values = [];
                values[0] = newValue;
                values[1] = self.getParamValue('nd_filter_stop_1', 0, cameraId);
                
                self.log('info', `ND Filter: ${currentValue} → ${newValue} stops`);
                
                // Store new value specifically for this camera
                self.storeParamValue('nd_filter_stop_0', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'nd_filter_stop', valuesString);
            }
        };
        // Action to reset ND Filter Stop: Filter power as f-stop (Clear)
        actions['set_nd_filter_stop_0_reset'] = {
            name: '🔄 Reset ND Filter Stop: Filter power as f-stop',
            description: 'Reset to Clear (0 stops)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const resetValue = 0;
                
                // Get current values for other subindexes
                const values = [];
                values[0] = resetValue;
                values[1] = self.getParamValue('nd_filter_stop_1', 0, cameraId);
                
                // Store default value specifically for this camera
                self.storeParamValue('nd_filter_stop_0', resetValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'nd_filter_stop', valuesString);
            }
        };
        // Action to set only ND Filter Stop: 0 = Stop, 1 = Density, 2 = Transmitance
        actions['set_nd_filter_stop_1'] = {
            name: 'Set ND Filter Stop: 0 = Stop, 1 = Density, 2 = Transmitance',
            description: 'Set value for ND Filter Stop: 0 = Stop, 1 = Density, 2 = Transmitance',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: 0.0,
                    min: 0.0,
                    max: 2.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const newValue = event.options.value;
                
                // Get current values or use SPECIFIC defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('nd_filter_stop_0', 0.0, cameraId);
                // For the subindex being modified, use the new value
                values[1] = newValue;
                
                // Store new value specifically for this camera
                self.storeParamValue('nd_filter_stop_1', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'nd_filter_stop', valuesString);
            }
        };
        // Action to increment ND Filter Stop: 0 = Stop, 1 = Density, 2 = Transmitance
        actions['set_nd_filter_stop_1_increment'] = {
            name: 'â¬†ï¸Â Increase ND Filter Stop: 0 = Stop, 1 = Density, 2 = Transmitance',
            description: 'Increase the value of ND Filter Stop: 0 = Stop, 1 = Density, 2 = Transmitance',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 0.1,
                    min: 0.1,
                    max: 2.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('nd_filter_stop_1', 0.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(2.0, currentValue + increment);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('nd_filter_stop_0', 0.0, cameraId);
                // For the subindex being modified, use the new value incrementado
                values[1] = newValue;
                
                // Store new value specifically for this camera
                self.storeParamValue('nd_filter_stop_1', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'nd_filter_stop', valuesString);
            }
        };
        // Action to decrement ND Filter Stop: 0 = Stop, 1 = Density, 2 = Transmitance
        actions['set_nd_filter_stop_1_decrement'] = {
            name: 'â¬‡ï¸Â Decrease ND Filter Stop: 0 = Stop, 1 = Density, 2 = Transmitance',
            description: 'Decrease the value of ND Filter Stop: 0 = Stop, 1 = Density, 2 = Transmitance',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 0.1,
                    min: 0.1,
                    max: 2.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('nd_filter_stop_1', 0.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(0.0, currentValue - decrement);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('nd_filter_stop_0', 0.0, cameraId);
                // For the subindex being modified, use the new value decrementado
                values[1] = newValue;
                
                // Store new value specifically for this camera
                self.storeParamValue('nd_filter_stop_1', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'nd_filter_stop', valuesString);
            }
        };
        // Action to reset ND Filter Stop: 0 = Stop, 1 = Density, 2 = Transmitance al default value
        actions['set_nd_filter_stop_1_reset'] = {
            name: 'ðŸ”„ Reset ND Filter Stop: 0 = Stop, 1 = Density, 2 = Transmitance',
            description: 'Reset to default value (0.00)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const resetValue = 0.0;
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('nd_filter_stop_0', 0.0, cameraId);
                // For the subindex being reset, use its default value
                values[1] = resetValue;
                
                // Store default value specifically for this camera
                self.storeParamValue('nd_filter_stop_1', resetValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'nd_filter_stop', valuesString);
            }
        };
        // Action for Shutter speed (numeric)
        actions['set_shutter_speed'] = {
            name: 'Set Shutter speed',
            description: 'Group: Video | Param: Shutter speed | Note: Shutter speed value as a fraction of 1, so 50 for 1/50th of a second',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: 24.0,
                    min: 24.0,
                    max: 2000.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                self.sendParam(cameraId, 'shutter_speed', event.options.value);
            }
        };
        // Helper function to get current frame rate for a camera
        function getFrameRateForCamera(cameraId) {
            const videoModeKey = `cam${cameraId}_video_mode_0`;
            let fps = self.paramValues[videoModeKey];
            if (!fps || fps <= 0) {
                fps = 60; // Default fallback
            }
            return parseInt(fps);
        }
        // Action to increment Shutter speed (by frame rate multiples)
        actions['set_shutter_speed_increment'] = {
            name: '⬆️ Increase Shutter speed',
            description: 'Increase shutter to next frame rate multiple (1x → 2x → 4x → 8x fps)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const fps = getFrameRateForCamera(cameraId);
                
                // Get current shutter value
                let currentValue = self.getParamValue('shutter_speed', fps, cameraId);
                
                // Calculate current multiplier and go to next
                let currentMultiplier = Math.round(currentValue / fps);
                if (currentMultiplier < 1) currentMultiplier = 1;
                
                // Next multiplier: 1 → 2 → 4 → 8 → 16 → 32
                let nextMultiplier;
                if (currentMultiplier < 2) nextMultiplier = 2;
                else if (currentMultiplier < 4) nextMultiplier = 4;
                else if (currentMultiplier < 8) nextMultiplier = 8;
                else if (currentMultiplier < 16) nextMultiplier = 16;
                else if (currentMultiplier < 32) nextMultiplier = 32;
                else nextMultiplier = currentMultiplier; // Max reached
                
                let newValue = Math.min(2000, fps * nextMultiplier);
                
                self.log('info', `Shutter: ${currentValue} → ${newValue} (${nextMultiplier}x ${fps}fps)`);
                
                self.sendParam(cameraId, 'shutter_speed', newValue);
                self.storeParamValue('shutter_speed', newValue, cameraId);
            }
        };
        // Action to decrement Shutter speed (by frame rate multiples)
        actions['set_shutter_speed_decrement'] = {
            name: '⬇️ Decrease Shutter speed',
            description: 'Decrease shutter to previous frame rate multiple (32x → 16x → 8x → 4x → 2x → 1x fps)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const fps = getFrameRateForCamera(cameraId);
                
                // Get current shutter value
                let currentValue = self.getParamValue('shutter_speed', fps, cameraId);
                
                // Calculate current multiplier and go to previous
                let currentMultiplier = Math.round(currentValue / fps);
                
                // Previous multiplier: 32 → 16 → 8 → 4 → 2 → 1
                let prevMultiplier;
                if (currentMultiplier > 16) prevMultiplier = 16;
                else if (currentMultiplier > 8) prevMultiplier = 8;
                else if (currentMultiplier > 4) prevMultiplier = 4;
                else if (currentMultiplier > 2) prevMultiplier = 2;
                else prevMultiplier = 1; // Min is 1x fps
                
                let newValue = fps * prevMultiplier;
                
                self.log('info', `Shutter: ${currentValue} → ${newValue} (${prevMultiplier}x ${fps}fps)`);
                
                self.sendParam(cameraId, 'shutter_speed', newValue);
                self.storeParamValue('shutter_speed', newValue, cameraId);
            }
        };
        // Action to reset Shutter speed to frame rate (1x fps = 180° shutter)
        actions['set_shutter_speed_reset'] = {
            name: '🔄 Reset Shutter speed',
            description: 'Reset to frame rate (1/fps = 180° shutter angle)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const fps = getFrameRateForCamera(cameraId);
                
                self.log('info', `Shutter reset to 1/${fps} (frame rate) for camera ${cameraId}`);
                
                self.sendParam(cameraId, 'shutter_speed', fps);
                self.storeParamValue('shutter_speed', fps, cameraId);
            }
        };
        // Action for Gain(db) (numeric)
        actions['set_gain_db'] = {
            name: 'Set Gain(db)',
            description: 'Group: Video | Param: Gain(db) | Note: Gain in decibel (dB)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: 0.0,
                    min: -12.0,
                    max: 36.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                self.sendParam(cameraId, 'gain_db', event.options.value);
            }
        };
        // Action to increment Gain(db)
        actions['set_gain_db_increment'] = {
            name: 'â¬†ï¸Â Increase Gain(db)',
            description: 'Increase the value of Gain(db)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 1,
                    min: 1,
                    max: 48.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('gain_db', 0.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(36.0, currentValue + increment);
                
                // Send new value
                self.sendParam(cameraId, 'gain_db', newValue);
                
                // Store new value specifically for this camera
                self.storeParamValue('gain_db', newValue, cameraId);
            }
        };
        // Action to decrement Gain(db)
        actions['set_gain_db_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Gain(db)',
            description: 'Decrease the value of Gain(db)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 1,
                    min: 1,
                    max: 48.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('gain_db', 0.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(-12.0, currentValue - decrement);
                
                // Send new value
                self.sendParam(cameraId, 'gain_db', newValue);
                
                // Store new value specifically for this camera
                self.storeParamValue('gain_db', newValue, cameraId);
            }
        };
        // Action to reset Gain(db) al default value
        actions['set_gain_db_reset'] = {
            name: 'ðŸ”„ Reset Gain(db)',
            description: 'Reset to default value (0)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                
                // Send default value
                self.sendParam(cameraId, 'gain_db', 0.0);
                
                // Store default value for this specific camera
                self.storeParamValue('gain_db', 0.0, cameraId);
            }
        };
        // Action for Manual White Balance (multiple subindexes)
        actions['set_manual_white_balance'] = {
            name: 'Set Manual White Balance',
            description: 'Set values for Manual White Balance',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Color temp (2500-10000 K)',
                    id: 'value0',
                    default: 5600.0,
                    min: 2500.0,
                    max: 10000.0,
                    step: 1
                },
                {
                    type: 'number',
                    label: 'Tint (-50 to 50)',
                    id: 'value1',
                    default: 10.0,
                    min: -50.0,
                    max: 50.0,
                    step: 1
                },
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const values = [];
                values[0] = event.options.value0;
                values[1] = event.options.value1;
                const valuesString = values.join(",");
                self.sendParam(cameraId, 'manual_white_balance', valuesString);
                
                // Store individual values for each subindex
                
                self.storeParamValue('manual_white_balance_0', event.options.value0, cameraId);
                self.storeParamValue('manual_white_balance_1', event.options.value1, cameraId);
            }
        };
        // Action to set onlyr temp (2500-10000 K)
        actions['set_manual_white_balance_0'] = {
            name: 'Set Manual White Balance: Color temp (2500-10000 K)',
            description: 'Set value for Manual White Balance: Color temp (2500-10000 K)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: 5600.0,
                    min: 2500.0,
                    max: 10000.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const newValue = event.options.value;
                
                // Get current values or use SPECIFIC defaults
                const values = [];
                // For the subindex being modified, use the new value
                values[0] = newValue;
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('manual_white_balance_1', 10.0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('manual_white_balance_0', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'manual_white_balance', valuesString);
            }
        };
        // Action to increment Manual White Balance: Color temp (2500-10000 K)
        actions['set_manual_white_balance_0_increment'] = {
            name: 'â¬†ï¸Â Increase Manual White Balance: Color temp (2500-10000 K)',
            description: 'Increase the value of Manual White Balance: Color temp (2500-10000 K)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 1,
                    min: 1,
                    max: 7500.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('manual_white_balance_0', 5600.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(10000.0, currentValue + increment);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For the subindex being modified, use the new value incrementado
                values[0] = newValue;
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('manual_white_balance_1', 10.0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('manual_white_balance_0', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'manual_white_balance', valuesString);
            }
        };
        // Action to decrement Manual White Balance: Color temp (2500-10000 K)
        actions['set_manual_white_balance_0_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Manual White Balance: Color temp (2500-10000 K)',
            description: 'Decrease the value of Manual White Balance: Color temp (2500-10000 K)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 1,
                    min: 1,
                    max: 7500.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('manual_white_balance_0', 5600.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(2500.0, currentValue - decrement);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For the subindex being modified, use the new value decrementado
                values[0] = newValue;
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('manual_white_balance_1', 10.0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('manual_white_balance_0', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'manual_white_balance', valuesString);
            }
        };
        // Action to reset Manual White Balance: Color temp (2500-10000 K) al default value
        actions['set_manual_white_balance_0_reset'] = {
            name: 'ðŸ”„ Reset Manual White Balance: Color temp (2500-10000 K)',
            description: 'Reset to default value (5600)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const resetValue = 5600.0;
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For the subindex being reset, use its default value
                values[0] = resetValue;
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('manual_white_balance_1', 10.0, cameraId);
                
                // Store default value specifically for this camera
                self.storeParamValue('manual_white_balance_0', resetValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'manual_white_balance', valuesString);
            }
        };
        // Action to set only Manual White Balance: Tint (-50 to 50)
        actions['set_manual_white_balance_1'] = {
            name: 'Set Manual White Balance: Tint (-50 to 50)',
            description: 'Set value for Manual White Balance: Tint (-50 to 50)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: 10.0,
                    min: -50.0,
                    max: 50.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const newValue = event.options.value;
                
                // Get current values or use SPECIFIC defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('manual_white_balance_0', 5600.0, cameraId);
                // For the subindex being modified, use the new value
                values[1] = newValue;
                
                // Store new value specifically for this camera
                self.storeParamValue('manual_white_balance_1', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'manual_white_balance', valuesString);
            }
        };
        // Action to increment Manual White Balance: Tint (-50 to 50)
        actions['set_manual_white_balance_1_increment'] = {
            name: 'â¬†ï¸Â Increase Manual White Balance: Tint (-50 to 50)',
            description: 'Increase the value of Manual White Balance: Tint (-50 to 50)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 1,
                    min: 1,
                    max: 100.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('manual_white_balance_1', 10.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(50.0, currentValue + increment);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('manual_white_balance_0', 5600.0, cameraId);
                // For the subindex being modified, use the new value incrementado
                values[1] = newValue;
                
                // Store new value specifically for this camera
                self.storeParamValue('manual_white_balance_1', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'manual_white_balance', valuesString);
            }
        };
        // Action to decrement Manual White Balance: Tint (-50 to 50)
        actions['set_manual_white_balance_1_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Manual White Balance: Tint (-50 to 50)',
            description: 'Decrease the value of Manual White Balance: Tint (-50 to 50)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 1,
                    min: 1,
                    max: 100.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('manual_white_balance_1', 10.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(-50.0, currentValue - decrement);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('manual_white_balance_0', 5600.0, cameraId);
                // For the subindex being modified, use the new value decrementado
                values[1] = newValue;
                
                // Store new value specifically for this camera
                self.storeParamValue('manual_white_balance_1', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'manual_white_balance', valuesString);
            }
        };
        // Action to reset Manual White Balance: Tint (-50 to 50) al default value
        actions['set_manual_white_balance_1_reset'] = {
            name: 'ðŸ”„ Reset Manual White Balance: Tint (-50 to 50)',
            description: 'Reset to default value (10)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const resetValue = 10.0;
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('manual_white_balance_0', 5600.0, cameraId);
                // For the subindex being reset, use its default value
                values[1] = resetValue;
                
                // Store default value specifically for this camera
                self.storeParamValue('manual_white_balance_1', resetValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'manual_white_balance', valuesString);
            }
        };
        // Action for Set auto WB (void)
        actions['set_set_auto_wb'] = {
            name: 'Trigger Set auto WB',
            description: 'Group: Video | Param: Set auto WB | Note: Calculate and set auto white balance',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                self.sendParam(cameraId, 'set_auto_wb', '1');
            }
        };
        // Action for Restore auto WB (void)
        actions['set_restore_auto_wb'] = {
            name: 'Trigger Restore auto WB',
            description: 'Group: Video | Param: Restore auto WB | Note: Use latest auto white balance setting',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                self.sendParam(cameraId, 'restore_auto_wb', '1');
            }
        };
        // Action for Dynamic Range Mode (numeric)
        actions['set_dynamic_range_mode'] = {
            name: 'Set Dynamic Range Mode',
            description: 'Group: Video | Param: Dynamic Range Mode | Note: 0 = Film, 1 = Video, 2 = Extended Video',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: 2.0,
                    min: 0.0,
                    max: 2.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                self.sendParam(cameraId, 'dynamic_range_mode', event.options.value);
            }
        };
        // Action to increment Dynamic Range Mode
        actions['set_dynamic_range_mode_increment'] = {
            name: 'â¬†ï¸Â Increase Dynamic Range Mode',
            description: 'Increase the value of Dynamic Range Mode',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 1,
                    min: 1,
                    max: 2.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('dynamic_range_mode', 2.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(2.0, currentValue + increment);
                
                // Send new value
                self.sendParam(cameraId, 'dynamic_range_mode', newValue);
                
                // Store new value specifically for this camera
                self.storeParamValue('dynamic_range_mode', newValue, cameraId);
            }
        };
        // Action to decrement Dynamic Range Mode
        actions['set_dynamic_range_mode_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Dynamic Range Mode',
            description: 'Decrease the value of Dynamic Range Mode',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 1,
                    min: 1,
                    max: 2.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('dynamic_range_mode', 2.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(0.0, currentValue - decrement);
                
                // Send new value
                self.sendParam(cameraId, 'dynamic_range_mode', newValue);
                
                // Store new value specifically for this camera
                self.storeParamValue('dynamic_range_mode', newValue, cameraId);
            }
        };
        // Action to reset Dynamic Range Mode al default value
        actions['set_dynamic_range_mode_reset'] = {
            name: 'ðŸ”„ Reset Dynamic Range Mode',
            description: 'Reset to default value (2)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                
                // Send default value
                self.sendParam(cameraId, 'dynamic_range_mode', 2.0);
                
                // Store default value for this specific camera
                self.storeParamValue('dynamic_range_mode', 2.0, cameraId);
            }
        };
        // Action for Video sharpening level (numeric)
        actions['set_video_sharpening_level'] = {
            name: 'Set Video sharpening level',
            description: 'Group: Video | Param: Video sharpening level | Note: 0 = Off, 1 = Low, 2 = Medium, 3 = High',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: 0.0,
                    min: 0.0,
                    max: 3.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                self.sendParam(cameraId, 'video_sharpening_level', event.options.value);
            }
        };
        // Action to increment Video sharpening level
        actions['set_video_sharpening_level_increment'] = {
            name: 'â¬†ï¸Â Increase Video sharpening level',
            description: 'Increase the value of Video sharpening level',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 1,
                    min: 1,
                    max: 3.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('video_sharpening_level', 0.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(3.0, currentValue + increment);
                
                // Send new value
                self.sendParam(cameraId, 'video_sharpening_level', newValue);
                
                // Store new value specifically for this camera
                self.storeParamValue('video_sharpening_level', newValue, cameraId);
            }
        };
        // Action to decrement Video sharpening level
        actions['set_video_sharpening_level_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Video sharpening level',
            description: 'Decrease the value of Video sharpening level',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 1,
                    min: 1,
                    max: 3.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('video_sharpening_level', 0.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(0.0, currentValue - decrement);
                
                // Send new value
                self.sendParam(cameraId, 'video_sharpening_level', newValue);
                
                // Store new value specifically for this camera
                self.storeParamValue('video_sharpening_level', newValue, cameraId);
            }
        };
        // Action to reset Video sharpening level al default value
        actions['set_video_sharpening_level_reset'] = {
            name: 'ðŸ”„ Reset Video sharpening level',
            description: 'Reset to default value (0)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                
                // Send default value
                self.sendParam(cameraId, 'video_sharpening_level', 0.0);
                
                // Store default value for this specific camera
                self.storeParamValue('video_sharpening_level', 0.0, cameraId);
            }
        };
        // Action for Set auto exposure mode (numeric)
        actions['set_set_auto_exposure_mode'] = {
            name: 'Set Set auto exposure mode',
            description: 'Group: Video | Param: Set auto exposure mode | Note: 0 = Manual Trigger, 1 = Iris, 2 = Shutter, 3 = Iris + Shutter, 4 = Shutter + Iris',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: 0.0,
                    min: 0.0,
                    max: 4.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                self.sendParam(cameraId, 'set_auto_exposure_mode', event.options.value);
            }
        };
        // Action to increment Set auto exposure mode
        actions['set_set_auto_exposure_mode_increment'] = {
            name: 'â¬†ï¸Â Increase Set auto exposure mode',
            description: 'Increase the value of Set auto exposure mode',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 1,
                    min: 1,
                    max: 4.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('set_auto_exposure_mode', 0.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(4.0, currentValue + increment);
                
                // Send new value
                self.sendParam(cameraId, 'set_auto_exposure_mode', newValue);
                
                // Store new value specifically for this camera
                self.storeParamValue('set_auto_exposure_mode', newValue, cameraId);
            }
        };
        // Action to decrement Set auto exposure mode
        actions['set_set_auto_exposure_mode_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Set auto exposure mode',
            description: 'Decrease the value of Set auto exposure mode',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 1,
                    min: 1,
                    max: 4.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('set_auto_exposure_mode', 0.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(0.0, currentValue - decrement);
                
                // Send new value
                self.sendParam(cameraId, 'set_auto_exposure_mode', newValue);
                
                // Store new value specifically for this camera
                self.storeParamValue('set_auto_exposure_mode', newValue, cameraId);
            }
        };
        // Action to reset Set auto exposure mode al default value
        actions['set_set_auto_exposure_mode_reset'] = {
            name: 'ðŸ”„ Reset Set auto exposure mode',
            description: 'Reset to default value (0)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                
                // Send default value
                self.sendParam(cameraId, 'set_auto_exposure_mode', 0.0);
                
                // Store default value for this specific camera
                self.storeParamValue('set_auto_exposure_mode', 0.0, cameraId);
            }
        };
        // Action for Video multiple subindexes)
        actions['set_video_mode'] = {
            name: 'Set Video mode',
            description: 'Set values for Video mode',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Frame rate (24, 25, 30, 50, 60)',
                    id: 'value0',
                    default: 60.0,
                    min: 24.0,
                    max: 60.0,
                    step: 1
                },
                {
                    type: 'number',
                    label: 'M-rate (0 = regular, 1 = M-rate)',
                    id: 'value1',
                    default: 0.0,
                    min: 0.0,
                    max: 1.0,
                    step: 1
                },
                {
                    type: 'number',
                    label: 'Dimensions (0 = NTSC, 1 = PAL, 2 = 720, 3 = 1080, 4 = 2kDCI, 5 = 2k16:9, 6 = UHD, 7 = 3k Anamorphic, 8 = 4k DCI, 9 = 4k 16:9, 10 = 4.6k 2.4:1, 11 = 4.6k)',
                    id: 'value2',
                    default: 6.0,
                    min: 0.0,
                    max: 11.0,
                    step: 1
                },
                {
                    type: 'number',
                    label: 'Interlaced (0 = progressive, 1 = interlaced)',
                    id: 'value3',
                    default: 0.0,
                    min: 0.0,
                    max: 1.0,
                    step: 1
                },
                {
                    type: 'number',
                    label: 'Color space (0 = YUV)',
                    id: 'value4',
                    default: 0.0,
                    min: 0.0,
                    max: 1.0,
                    step: 1
                },
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const values = [];
                values[0] = event.options.value0;
                values[1] = event.options.value1;
                values[2] = event.options.value2;
                values[3] = event.options.value3;
                values[4] = event.options.value4;
                const valuesString = values.join(",");
                self.sendParam(cameraId, 'video_mode', valuesString);
                
                // Store individual values for each subindex
                
                self.storeParamValue('video_mode_0', event.options.value0, cameraId);
                self.storeParamValue('video_mode_1', event.options.value1, cameraId);
                self.storeParamValue('video_mode_2', event.options.value2, cameraId);
                self.storeParamValue('video_mode_3', event.options.value3, cameraId);
                self.storeParamValue('video_mode_4', event.options.value4, cameraId);
            }
        };
        // Action to set only Video mode: Frame rate (24, 25, 30, 50, 60)
        actions['set_video_mode_0'] = {
            name: 'Set Video mode: Frame rate (24, 25, 30, 50, 60)',
            description: 'Set value for Video mode: Frame rate (24, 25, 30, 50, 60)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: 60.0,
                    min: 24.0,
                    max: 60.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const newValue = event.options.value;
                
                // Get current values or use SPECIFIC defaults
                const values = [];
                // For the subindex being modified, use the new value
                values[0] = newValue;
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('video_mode_1', 0.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('video_mode_2', 6.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('video_mode_3', 0.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[4] = self.getParamValue('video_mode_4', 0.0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('video_mode_0', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'video_mode', valuesString);
            }
        };
        // Action to increment Video mode: Frame rate (24, 25, 30, 50, 60)
        actions['set_video_mode_0_increment'] = {
            name: 'â¬†ï¸Â Increase Video mode: Frame rate (24, 25, 30, 50, 60)',
            description: 'Increase the value of Video mode: Frame rate (24, 25, 30, 50, 60)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 1,
                    min: 1,
                    max: 36.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('video_mode_0', 60.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(60.0, currentValue + increment);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For the subindex being modified, use the new value incrementado
                values[0] = newValue;
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('video_mode_1', 0.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('video_mode_2', 6.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('video_mode_3', 0.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[4] = self.getParamValue('video_mode_4', 0.0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('video_mode_0', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'video_mode', valuesString);
            }
        };
        // Action to decrement Video mode: Frame rate (24, 25, 30, 50, 60)
        actions['set_video_mode_0_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Video mode: Frame rate (24, 25, 30, 50, 60)',
            description: 'Decrease the value of Video mode: Frame rate (24, 25, 30, 50, 60)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 1,
                    min: 1,
                    max: 36.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('video_mode_0', 60.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(24.0, currentValue - decrement);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For the subindex being modified, use the new value decrementado
                values[0] = newValue;
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('video_mode_1', 0.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('video_mode_2', 6.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('video_mode_3', 0.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[4] = self.getParamValue('video_mode_4', 0.0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('video_mode_0', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'video_mode', valuesString);
            }
        };
        // Action to reset Video mode: Frame rate (24, 25, 30, 50, 60) al default value
        actions['set_video_mode_0_reset'] = {
            name: 'ðŸ”„ Reset Video mode: Frame rate (24, 25, 30, 50, 60)',
            description: 'Reset to default value (60)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const resetValue = 60.0;
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For the subindex being reset, use its default value
                values[0] = resetValue;
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('video_mode_1', 0.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('video_mode_2', 6.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('video_mode_3', 0.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[4] = self.getParamValue('video_mode_4', 0.0, cameraId);
                
                // Store default value specifically for this camera
                self.storeParamValue('video_mode_0', resetValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'video_mode', valuesString);
            }
        };
        // Action to set only Video mode: M-rate (0 = regular, 1 = M-rate)
        actions['set_video_mode_1'] = {
            name: 'Set Video mode: M-rate (0 = regular, 1 = M-rate)',
            description: 'Set value for Video mode: M-rate (0 = regular, 1 = M-rate)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: 0.0,
                    min: 0.0,
                    max: 1.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const newValue = event.options.value;
                
                // Get current values or use SPECIFIC defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('video_mode_0', 60.0, cameraId);
                // For the subindex being modified, use the new value
                values[1] = newValue;
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('video_mode_2', 6.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('video_mode_3', 0.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[4] = self.getParamValue('video_mode_4', 0.0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('video_mode_1', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'video_mode', valuesString);
            }
        };
        // Action to increment Video mode: M-rate (0 = regular, 1 = M-rate)
        actions['set_video_mode_1_increment'] = {
            name: 'â¬†ï¸Â Increase Video mode: M-rate (0 = regular, 1 = M-rate)',
            description: 'Increase the value of Video mode: M-rate (0 = regular, 1 = M-rate)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 1,
                    min: 1,
                    max: 1.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('video_mode_1', 0.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(1.0, currentValue + increment);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('video_mode_0', 60.0, cameraId);
                // For the subindex being modified, use the new value incrementado
                values[1] = newValue;
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('video_mode_2', 6.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('video_mode_3', 0.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[4] = self.getParamValue('video_mode_4', 0.0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('video_mode_1', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'video_mode', valuesString);
            }
        };
        // Action to decrement Video mode: M-rate (0 = regular, 1 = M-rate)
        actions['set_video_mode_1_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Video mode: M-rate (0 = regular, 1 = M-rate)',
            description: 'Decrease the value of Video mode: M-rate (0 = regular, 1 = M-rate)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 1,
                    min: 1,
                    max: 1.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('video_mode_1', 0.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(0.0, currentValue - decrement);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('video_mode_0', 60.0, cameraId);
                // For the subindex being modified, use the new value decrementado
                values[1] = newValue;
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('video_mode_2', 6.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('video_mode_3', 0.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[4] = self.getParamValue('video_mode_4', 0.0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('video_mode_1', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'video_mode', valuesString);
            }
        };
        // Action to reset Video mode: M-rate (0 = regular, 1 = M-rate) al default value
        actions['set_video_mode_1_reset'] = {
            name: 'ðŸ”„ Reset Video mode: M-rate (0 = regular, 1 = M-rate)',
            description: 'Reset to default value (0)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const resetValue = 0.0;
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('video_mode_0', 60.0, cameraId);
                // For the subindex being reset, use its default value
                values[1] = resetValue;
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('video_mode_2', 6.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('video_mode_3', 0.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[4] = self.getParamValue('video_mode_4', 0.0, cameraId);
                
                // Store default value specifically for this camera
                self.storeParamValue('video_mode_1', resetValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'video_mode', valuesString);
            }
        };
        // Action to set only Video mode: Dimensions (0 = NTSC, 1 = PAL, 2 = 720, 3 = 1080, 4 = 2kDCI, 5 = 2k16:9, 6 = UHD, 7 = 3k Anamorphic, 8 = 4k DCI, 9 = 4k 16:9, 10 = 4.6k 2.4:1, 11 = 4.6k)
        actions['set_video_mode_2'] = {
            name: 'Set Video mode: Dimensions (0 = NTSC, 1 = PAL, 2 = 720, 3 = 1080, 4 = 2kDCI, 5 = 2k16:9, 6 = UHD, 7 = 3k Anamorphic, 8 = 4k DCI, 9 = 4k 16:9, 10 = 4.6k 2.4:1, 11 = 4.6k)',
            description: 'Set value for Video mode: Dimensions (0 = NTSC, 1 = PAL, 2 = 720, 3 = 1080, 4 = 2kDCI, 5 = 2k16:9, 6 = UHD, 7 = 3k Anamorphic, 8 = 4k DCI, 9 = 4k 16:9, 10 = 4.6k 2.4:1, 11 = 4.6k)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: 6.0,
                    min: 0.0,
                    max: 11.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const newValue = event.options.value;
                
                // Get current values or use SPECIFIC defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('video_mode_0', 60.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('video_mode_1', 0.0, cameraId);
                // For the subindex being modified, use the new value
                values[2] = newValue;
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('video_mode_3', 0.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[4] = self.getParamValue('video_mode_4', 0.0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('video_mode_2', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'video_mode', valuesString);
            }
        };
        // Action to increment Video mode: Dimensions (0 = NTSC, 1 = PAL, 2 = 720, 3 = 1080, 4 = 2kDCI, 5 = 2k16:9, 6 = UHD, 7 = 3k Anamorphic, 8 = 4k DCI, 9 = 4k 16:9, 10 = 4.6k 2.4:1, 11 = 4.6k)
        actions['set_video_mode_2_increment'] = {
            name: 'â¬†ï¸Â Increase Video mode: Dimensions (0 = NTSC, 1 = PAL, 2 = 720, 3 = 1080, 4 = 2kDCI, 5 = 2k16:9, 6 = UHD, 7 = 3k Anamorphic, 8 = 4k DCI, 9 = 4k 16:9, 10 = 4.6k 2.4:1, 11 = 4.6k)',
            description: 'Increase the value of Video mode: Dimensions (0 = NTSC, 1 = PAL, 2 = 720, 3 = 1080, 4 = 2kDCI, 5 = 2k16:9, 6 = UHD, 7 = 3k Anamorphic, 8 = 4k DCI, 9 = 4k 16:9, 10 = 4.6k 2.4:1, 11 = 4.6k)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 1,
                    min: 1,
                    max: 11.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('video_mode_2', 6.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(11.0, currentValue + increment);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('video_mode_0', 60.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('video_mode_1', 0.0, cameraId);
                // For the subindex being modified, use the new value incrementado
                values[2] = newValue;
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('video_mode_3', 0.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[4] = self.getParamValue('video_mode_4', 0.0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('video_mode_2', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'video_mode', valuesString);
            }
        };
        // Action to decrement Video mode: Dimensions (0 = NTSC, 1 = PAL, 2 = 720, 3 = 1080, 4 = 2kDCI, 5 = 2k16:9, 6 = UHD, 7 = 3k Anamorphic, 8 = 4k DCI, 9 = 4k 16:9, 10 = 4.6k 2.4:1, 11 = 4.6k)
        actions['set_video_mode_2_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Video mode: Dimensions (0 = NTSC, 1 = PAL, 2 = 720, 3 = 1080, 4 = 2kDCI, 5 = 2k16:9, 6 = UHD, 7 = 3k Anamorphic, 8 = 4k DCI, 9 = 4k 16:9, 10 = 4.6k 2.4:1, 11 = 4.6k)',
            description: 'Decrease the value of Video mode: Dimensions (0 = NTSC, 1 = PAL, 2 = 720, 3 = 1080, 4 = 2kDCI, 5 = 2k16:9, 6 = UHD, 7 = 3k Anamorphic, 8 = 4k DCI, 9 = 4k 16:9, 10 = 4.6k 2.4:1, 11 = 4.6k)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 1,
                    min: 1,
                    max: 11.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('video_mode_2', 6.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(0.0, currentValue - decrement);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('video_mode_0', 60.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('video_mode_1', 0.0, cameraId);
                // For the subindex being modified, use the new value decrementado
                values[2] = newValue;
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('video_mode_3', 0.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[4] = self.getParamValue('video_mode_4', 0.0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('video_mode_2', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'video_mode', valuesString);
            }
        };
        // Action to reset Video mode: Dimensions (0 = NTSC, 1 = PAL, 2 = 720, 3 = 1080, 4 = 2kDCI, 5 = 2k16:9, 6 = UHD, 7 = 3k Anamorphic, 8 = 4k DCI, 9 = 4k 16:9, 10 = 4.6k 2.4:1, 11 = 4.6k) al default value
        actions['set_video_mode_2_reset'] = {
            name: 'ðŸ”„ Reset Video mode: Dimensions (0 = NTSC, 1 = PAL, 2 = 720, 3 = 1080, 4 = 2kDCI, 5 = 2k16:9, 6 = UHD, 7 = 3k Anamorphic, 8 = 4k DCI, 9 = 4k 16:9, 10 = 4.6k 2.4:1, 11 = 4.6k)',
            description: 'Reset to default value (6)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const resetValue = 6.0;
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('video_mode_0', 60.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('video_mode_1', 0.0, cameraId);
                // For the subindex being reset, use its default value
                values[2] = resetValue;
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('video_mode_3', 0.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[4] = self.getParamValue('video_mode_4', 0.0, cameraId);
                
                // Store default value specifically for this camera
                self.storeParamValue('video_mode_2', resetValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'video_mode', valuesString);
            }
        };
        // Action to set only Video mode: Interlaced (0 = progressive, 1 = interlaced)
        actions['set_video_mode_3'] = {
            name: 'Set Video mode: Interlaced (0 = progressive, 1 = interlaced)',
            description: 'Set value for Video mode: Interlaced (0 = progressive, 1 = interlaced)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: 0.0,
                    min: 0.0,
                    max: 1.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const newValue = event.options.value;
                
                // Get current values or use SPECIFIC defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('video_mode_0', 60.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('video_mode_1', 0.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('video_mode_2', 6.0, cameraId);
                // For the subindex being modified, use the new value
                values[3] = newValue;
                // For other subindexes, get current value or use their specific default
                values[4] = self.getParamValue('video_mode_4', 0.0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('video_mode_3', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'video_mode', valuesString);
            }
        };
        // Action to increment Video mode: Interlaced (0 = progressive, 1 = interlaced)
        actions['set_video_mode_3_increment'] = {
            name: 'â¬†ï¸Â Increase Video mode: Interlaced (0 = progressive, 1 = interlaced)',
            description: 'Increase the value of Video mode: Interlaced (0 = progressive, 1 = interlaced)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 1,
                    min: 1,
                    max: 1.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('video_mode_3', 0.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(1.0, currentValue + increment);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('video_mode_0', 60.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('video_mode_1', 0.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('video_mode_2', 6.0, cameraId);
                // For the subindex being modified, use the new value incrementado
                values[3] = newValue;
                // For other subindexes, get current value or use their specific default
                values[4] = self.getParamValue('video_mode_4', 0.0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('video_mode_3', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'video_mode', valuesString);
            }
        };
        // Action to decrement Video mode: Interlaced (0 = progressive, 1 = interlaced)
        actions['set_video_mode_3_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Video mode: Interlaced (0 = progressive, 1 = interlaced)',
            description: 'Decrease the value of Video mode: Interlaced (0 = progressive, 1 = interlaced)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 1,
                    min: 1,
                    max: 1.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('video_mode_3', 0.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(0.0, currentValue - decrement);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('video_mode_0', 60.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('video_mode_1', 0.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('video_mode_2', 6.0, cameraId);
                // For the subindex being modified, use the new value decrementado
                values[3] = newValue;
                // For other subindexes, get current value or use their specific default
                values[4] = self.getParamValue('video_mode_4', 0.0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('video_mode_3', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'video_mode', valuesString);
            }
        };
        // Action to reset Video mode: Interlaced (0 = progressive, 1 = interlaced) al default value
        actions['set_video_mode_3_reset'] = {
            name: 'ðŸ”„ Reset Video mode: Interlaced (0 = progressive, 1 = interlaced)',
            description: 'Reset to default value (0)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const resetValue = 0.0;
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('video_mode_0', 60.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('video_mode_1', 0.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('video_mode_2', 6.0, cameraId);
                // For the subindex being reset, use its default value
                values[3] = resetValue;
                // For other subindexes, get current value or use their specific default
                values[4] = self.getParamValue('video_mode_4', 0.0, cameraId);
                
                // Store default value specifically for this camera
                self.storeParamValue('video_mode_3', resetValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'video_mode', valuesString);
            }
        };
        // Action to set onlyr space (0 = YUV)
        actions['set_video_mode_4'] = {
            name: 'Set Video mode: Color space (0 = YUV)',
            description: 'Set value for Video mode: Color space (0 = YUV)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: 0.0,
                    min: 0.0,
                    max: 1.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const newValue = event.options.value;
                
                // Get current values or use SPECIFIC defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('video_mode_0', 60.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('video_mode_1', 0.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('video_mode_2', 6.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('video_mode_3', 0.0, cameraId);
                // For the subindex being modified, use the new value
                values[4] = newValue;
                
                // Store new value specifically for this camera
                self.storeParamValue('video_mode_4', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'video_mode', valuesString);
            }
        };
        // Action to increment Video mode: Color space (0 = YUV)
        actions['set_video_mode_4_increment'] = {
            name: 'â¬†ï¸Â Increase Video mode: Color space (0 = YUV)',
            description: 'Increase the value of Video mode: Color space (0 = YUV)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 1,
                    min: 1,
                    max: 1.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('video_mode_4', 0.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(1.0, currentValue + increment);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('video_mode_0', 60.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('video_mode_1', 0.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('video_mode_2', 6.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('video_mode_3', 0.0, cameraId);
                // For the subindex being modified, use the new value incrementado
                values[4] = newValue;
                
                // Store new value specifically for this camera
                self.storeParamValue('video_mode_4', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'video_mode', valuesString);
            }
        };
        // Action to decrement Video mode: Color space (0 = YUV)
        actions['set_video_mode_4_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Video mode: Color space (0 = YUV)',
            description: 'Decrease the value of Video mode: Color space (0 = YUV)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 1,
                    min: 1,
                    max: 1.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('video_mode_4', 0.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(0.0, currentValue - decrement);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('video_mode_0', 60.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('video_mode_1', 0.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('video_mode_2', 6.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('video_mode_3', 0.0, cameraId);
                // For the subindex being modified, use the new value decrementado
                values[4] = newValue;
                
                // Store new value specifically for this camera
                self.storeParamValue('video_mode_4', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'video_mode', valuesString);
            }
        };
        // Action to reset Video mode: Color space (0 = YUV) al default value
        actions['set_video_mode_4_reset'] = {
            name: 'ðŸ”„ Reset Video mode: Color space (0 = YUV)',
            description: 'Reset to default value (0)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const resetValue = 0.0;
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('video_mode_0', 60.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('video_mode_1', 0.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('video_mode_2', 6.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('video_mode_3', 0.0, cameraId);
                // For the subindex being reset, use its default value
                values[4] = resetValue;
                
                // Store default value specifically for this camera
                self.storeParamValue('video_mode_4', resetValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'video_mode', valuesString);
            }
        };
        // Action for Display LUT (multiple subindexes)
        actions['set_display_lut'] = {
            name: 'Set Display LUT',
            description: 'Set values for Display LUT',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Selected LUT (0 = None, 1 = Custom, 2 = Film to Video, 3 = Film to Extended Video)',
                    id: 'value0',
                    default: 0.0,
                    min: 0.0,
                    max: 3.0,
                    step: 1
                },
                {
                    type: 'number',
                    label: 'LUT Enabled (0 = Not enabled, 1 = Enabled)',
                    id: 'value1',
                    default: 0.0,
                    min: 0.0,
                    max: 1.0,
                    step: 1
                },
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const values = [];
                values[0] = event.options.value0;
                values[1] = event.options.value1;
                const valuesString = values.join(",");
                self.sendParam(cameraId, 'display_lut', valuesString);
                
                // Store individual values for each subindex
                
                self.storeParamValue('display_lut_0', event.options.value0, cameraId);
                self.storeParamValue('display_lut_1', event.options.value1, cameraId);
            }
        };
        // Action to set only Display LUT: Selected LUT (0 = None, 1 = Custom, 2 = Film to Video, 3 = Film to Extended Video)
        actions['set_display_lut_0'] = {
            name: 'Set Display LUT: Selected LUT (0 = None, 1 = Custom, 2 = Film to Video, 3 = Film to Extended Video)',
            description: 'Set value for Display LUT: Selected LUT (0 = None, 1 = Custom, 2 = Film to Video, 3 = Film to Extended Video)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: 0.0,
                    min: 0.0,
                    max: 3.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const newValue = event.options.value;
                
                // Get current values or use SPECIFIC defaults
                const values = [];
                // For the subindex being modified, use the new value
                values[0] = newValue;
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('display_lut_1', 0.0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('display_lut_0', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'display_lut', valuesString);
            }
        };
        // Action to increment Display LUT: Selected LUT (0 = None, 1 = Custom, 2 = Film to Video, 3 = Film to Extended Video)
        actions['set_display_lut_0_increment'] = {
            name: 'â¬†ï¸Â Increase Display LUT: Selected LUT (0 = None, 1 = Custom, 2 = Film to Video, 3 = Film to Extended Video)',
            description: 'Increase the value of Display LUT: Selected LUT (0 = None, 1 = Custom, 2 = Film to Video, 3 = Film to Extended Video)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 1,
                    min: 1,
                    max: 3.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('display_lut_0', 0.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(3.0, currentValue + increment);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For the subindex being modified, use the new value incrementado
                values[0] = newValue;
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('display_lut_1', 0.0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('display_lut_0', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'display_lut', valuesString);
            }
        };
        // Action to decrement Display LUT: Selected LUT (0 = None, 1 = Custom, 2 = Film to Video, 3 = Film to Extended Video)
        actions['set_display_lut_0_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Display LUT: Selected LUT (0 = None, 1 = Custom, 2 = Film to Video, 3 = Film to Extended Video)',
            description: 'Decrease the value of Display LUT: Selected LUT (0 = None, 1 = Custom, 2 = Film to Video, 3 = Film to Extended Video)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 1,
                    min: 1,
                    max: 3.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('display_lut_0', 0.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(0.0, currentValue - decrement);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For the subindex being modified, use the new value decrementado
                values[0] = newValue;
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('display_lut_1', 0.0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('display_lut_0', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'display_lut', valuesString);
            }
        };
        // Action to reset Display LUT: Selected LUT (0 = None, 1 = Custom, 2 = Film to Video, 3 = Film to Extended Video) al default value
        actions['set_display_lut_0_reset'] = {
            name: 'ðŸ”„ Reset Display LUT: Selected LUT (0 = None, 1 = Custom, 2 = Film to Video, 3 = Film to Extended Video)',
            description: 'Reset to default value (0)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const resetValue = 0.0;
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For the subindex being reset, use its default value
                values[0] = resetValue;
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('display_lut_1', 0.0, cameraId);
                
                // Store default value specifically for this camera
                self.storeParamValue('display_lut_0', resetValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'display_lut', valuesString);
            }
        };
        // Action to set only Display LUT: LUT Enabled (0 = Not enabled, 1 = Enabled)
        actions['set_display_lut_1'] = {
            name: 'Set Display LUT: LUT Enabled (0 = Not enabled, 1 = Enabled)',
            description: 'Set value for Display LUT: LUT Enabled (0 = Not enabled, 1 = Enabled)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: 0.0,
                    min: 0.0,
                    max: 1.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const newValue = event.options.value;
                
                // Get current values or use SPECIFIC defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('display_lut_0', 0.0, cameraId);
                // For the subindex being modified, use the new value
                values[1] = newValue;
                
                // Store new value specifically for this camera
                self.storeParamValue('display_lut_1', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'display_lut', valuesString);
            }
        };
        // Action to increment Display LUT: LUT Enabled (0 = Not enabled, 1 = Enabled)
        actions['set_display_lut_1_increment'] = {
            name: 'â¬†ï¸Â Increase Display LUT: LUT Enabled (0 = Not enabled, 1 = Enabled)',
            description: 'Increase the value of Display LUT: LUT Enabled (0 = Not enabled, 1 = Enabled)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 1,
                    min: 1,
                    max: 1.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('display_lut_1', 0.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(1.0, currentValue + increment);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('display_lut_0', 0.0, cameraId);
                // For the subindex being modified, use the new value incrementado
                values[1] = newValue;
                
                // Store new value specifically for this camera
                self.storeParamValue('display_lut_1', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'display_lut', valuesString);
            }
        };
        // Action to decrement Display LUT: LUT Enabled (0 = Not enabled, 1 = Enabled)
        actions['set_display_lut_1_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Display LUT: LUT Enabled (0 = Not enabled, 1 = Enabled)',
            description: 'Decrease the value of Display LUT: LUT Enabled (0 = Not enabled, 1 = Enabled)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 1,
                    min: 1,
                    max: 1.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('display_lut_1', 0.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(0.0, currentValue - decrement);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('display_lut_0', 0.0, cameraId);
                // For the subindex being modified, use the new value decrementado
                values[1] = newValue;
                
                // Store new value specifically for this camera
                self.storeParamValue('display_lut_1', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'display_lut', valuesString);
            }
        };
        // Action to reset Display LUT: LUT Enabled (0 = Not enabled, 1 = Enabled) al default value
        actions['set_display_lut_1_reset'] = {
            name: 'ðŸ”„ Reset Display LUT: LUT Enabled (0 = Not enabled, 1 = Enabled)',
            description: 'Reset to default value (0)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const resetValue = 0.0;
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('display_lut_0', 0.0, cameraId);
                // For the subindex being reset, use its default value
                values[1] = resetValue;
                
                // Store default value specifically for this camera
                self.storeParamValue('display_lut_1', resetValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'display_lut', valuesString);
            }
        };
        // Action for Mic level (numeric)
        actions['set_mic_level'] = {
            name: 'Set Mic level',
            description: 'Group: Audio | Param: Mic level | Note: 0.0 = Minimum, 1.0 = Maximum',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: 0.7,
                    min: 0.0,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                self.sendParam(cameraId, 'mic_level', event.options.value);
            }
        };
        // Action to increment Mic level
        actions['set_mic_level_increment'] = {
            name: 'â¬†ï¸Â Increase Mic level',
            description: 'Increase the value of Mic level',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 0.1,
                    min: 0.1,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('mic_level', 0.7, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(1.0, currentValue + increment);
                
                // Send new value
                self.sendParam(cameraId, 'mic_level', newValue);
                
                // Store new value specifically for this camera
                self.storeParamValue('mic_level', newValue, cameraId);
            }
        };
        // Action to decrement Mic level
        actions['set_mic_level_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Mic level',
            description: 'Decrease the value of Mic level',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 0.1,
                    min: 0.1,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('mic_level', 0.7, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(0.0, currentValue - decrement);
                
                // Send new value
                self.sendParam(cameraId, 'mic_level', newValue);
                
                // Store new value specifically for this camera
                self.storeParamValue('mic_level', newValue, cameraId);
            }
        };
        // Action to reset Mic level al default value
        actions['set_mic_level_reset'] = {
            name: 'ðŸ”„ Reset Mic level',
            description: 'Reset to default value (0.70)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                
                // Send default value
                self.sendParam(cameraId, 'mic_level', 0.7);
                
                // Store default value for this specific camera
                self.storeParamValue('mic_level', 0.7, cameraId);
            }
        };
        // Action for Headphone level (numeric)
        actions['set_headphone_level'] = {
            name: 'Set Headphone level',
            description: 'Group: Audio | Param: Headphone level | Note: 0.0 = Minimum, 1.0 = Maximum',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: 1.0,
                    min: 0.0,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                self.sendParam(cameraId, 'headphone_level', event.options.value);
            }
        };
        // Action to increment Headphone level
        actions['set_headphone_level_increment'] = {
            name: 'â¬†ï¸Â Increase Headphone level',
            description: 'Increase the value of Headphone level',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 0.1,
                    min: 0.1,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('headphone_level', 1.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(1.0, currentValue + increment);
                
                // Send new value
                self.sendParam(cameraId, 'headphone_level', newValue);
                
                // Store new value specifically for this camera
                self.storeParamValue('headphone_level', newValue, cameraId);
            }
        };
        // Action to decrement Headphone level
        actions['set_headphone_level_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Headphone level',
            description: 'Decrease the value of Headphone level',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 0.1,
                    min: 0.1,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('headphone_level', 1.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(0.0, currentValue - decrement);
                
                // Send new value
                self.sendParam(cameraId, 'headphone_level', newValue);
                
                // Store new value specifically for this camera
                self.storeParamValue('headphone_level', newValue, cameraId);
            }
        };
        // Action to reset Headphone level al default value
        actions['set_headphone_level_reset'] = {
            name: 'ðŸ”„ Reset Headphone level',
            description: 'Reset to default value (1.00)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                
                // Send default value
                self.sendParam(cameraId, 'headphone_level', 1.0);
                
                // Store default value for this specific camera
                self.storeParamValue('headphone_level', 1.0, cameraId);
            }
        };
        // Action for Headphone program mix (numeric)
        actions['set_headphone_program_mix'] = {
            name: 'Set Headphone program mix',
            description: 'Group: Audio | Param: Headphone program mix | Note: 0.0 = Minimum, 1.0 = Maximum',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: 0.0,
                    min: 0.0,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                self.sendParam(cameraId, 'headphone_program_mix', event.options.value);
            }
        };
        // Action to increment Headphone program mix
        actions['set_headphone_program_mix_increment'] = {
            name: 'â¬†ï¸Â Increase Headphone program mix',
            description: 'Increase the value of Headphone program mix',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 0.1,
                    min: 0.1,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('headphone_program_mix', 0.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(1.0, currentValue + increment);
                
                // Send new value
                self.sendParam(cameraId, 'headphone_program_mix', newValue);
                
                // Store new value specifically for this camera
                self.storeParamValue('headphone_program_mix', newValue, cameraId);
            }
        };
        // Action to decrement Headphone program mix
        actions['set_headphone_program_mix_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Headphone program mix',
            description: 'Decrease the value of Headphone program mix',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 0.1,
                    min: 0.1,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('headphone_program_mix', 0.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(0.0, currentValue - decrement);
                
                // Send new value
                self.sendParam(cameraId, 'headphone_program_mix', newValue);
                
                // Store new value specifically for this camera
                self.storeParamValue('headphone_program_mix', newValue, cameraId);
            }
        };
        // Action to reset Headphone program mix al default value
        actions['set_headphone_program_mix_reset'] = {
            name: 'ðŸ”„ Reset Headphone program mix',
            description: 'Reset to default value (0.00)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                
                // Send default value
                self.sendParam(cameraId, 'headphone_program_mix', 0.0);
                
                // Store default value for this specific camera
                self.storeParamValue('headphone_program_mix', 0.0, cameraId);
            }
        };
        // Action for Speaker level (numeric)
        actions['set_speaker_level'] = {
            name: 'Set Speaker level',
            description: 'Group: Audio | Param: Speaker level | Note: 0.0 = Minimum, 1.0 = Maximum',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: 1.0,
                    min: 0.0,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                self.sendParam(cameraId, 'speaker_level', event.options.value);
            }
        };
        // Action to increment Speaker level
        actions['set_speaker_level_increment'] = {
            name: 'â¬†ï¸Â Increase Speaker level',
            description: 'Increase the value of Speaker level',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 0.1,
                    min: 0.1,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('speaker_level', 1.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(1.0, currentValue + increment);
                
                // Send new value
                self.sendParam(cameraId, 'speaker_level', newValue);
                
                // Store new value specifically for this camera
                self.storeParamValue('speaker_level', newValue, cameraId);
            }
        };
        // Action to decrement Speaker level
        actions['set_speaker_level_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Speaker level',
            description: 'Decrease the value of Speaker level',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 0.1,
                    min: 0.1,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('speaker_level', 1.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(0.0, currentValue - decrement);
                
                // Send new value
                self.sendParam(cameraId, 'speaker_level', newValue);
                
                // Store new value specifically for this camera
                self.storeParamValue('speaker_level', newValue, cameraId);
            }
        };
        // Action to reset Speaker level al default value
        actions['set_speaker_level_reset'] = {
            name: 'ðŸ”„ Reset Speaker level',
            description: 'Reset to default value (1.00)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                
                // Send default value
                self.sendParam(cameraId, 'speaker_level', 1.0);
                
                // Store default value for this specific camera
                self.storeParamValue('speaker_level', 1.0, cameraId);
            }
        };
        // Action for Input type (numeric)
        actions['set_input_type'] = {
            name: 'Set Input type',
            description: 'Group: Audio | Param: Input type | Note: 0 = Internal Mic, 1 = Line Level Input, 2 = Low Mic Level Input, 3 = High Mic Level Input',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: 0.0,
                    min: 0.0,
                    max: 3.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                self.sendParam(cameraId, 'input_type', event.options.value);
            }
        };
        // Action to increment Input type
        actions['set_input_type_increment'] = {
            name: 'â¬†ï¸Â Increase Input type',
            description: 'Increase the value of Input type',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 1,
                    min: 1,
                    max: 3.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('input_type', 0.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(3.0, currentValue + increment);
                
                // Send new value
                self.sendParam(cameraId, 'input_type', newValue);
                
                // Store new value specifically for this camera
                self.storeParamValue('input_type', newValue, cameraId);
            }
        };
        // Action to decrement Input type
        actions['set_input_type_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Input type',
            description: 'Decrease the value of Input type',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 1,
                    min: 1,
                    max: 3.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('input_type', 0.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(0.0, currentValue - decrement);
                
                // Send new value
                self.sendParam(cameraId, 'input_type', newValue);
                
                // Store new value specifically for this camera
                self.storeParamValue('input_type', newValue, cameraId);
            }
        };
        // Action to reset Input type al default value
        actions['set_input_type_reset'] = {
            name: 'ðŸ”„ Reset Input type',
            description: 'Reset to default value (0)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                
                // Send default value
                self.sendParam(cameraId, 'input_type', 0.0);
                
                // Store default value for this specific camera
                self.storeParamValue('input_type', 0.0, cameraId);
            }
        };
        // Action for Input levels (multiple subindexes)
        actions['set_input_levels'] = {
            name: 'Set Input levels',
            description: 'Set values for Input levels',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Ch1 = 0.0 Minimum, 1.0 Maximum',
                    id: 'value0',
                    default: 0.5,
                    min: 0.0,
                    max: 1.0,
                    step: 0.1
                },
                {
                    type: 'number',
                    label: 'Ch2 = 0.0 Minimum, 1.0 Maximum',
                    id: 'value1',
                    default: 0.5,
                    min: 0.0,
                    max: 1.0,
                    step: 0.1
                },
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const values = [];
                values[0] = event.options.value0;
                values[1] = event.options.value1;
                const valuesString = values.join(",");
                self.sendParam(cameraId, 'input_levels', valuesString);
                
                // Store individual values for each subindex
                
                self.storeParamValue('input_levels_0', event.options.value0, cameraId);
                self.storeParamValue('input_levels_1', event.options.value1, cameraId);
            }
        };
        // Action to set only Input levels: Ch1 = 0.0 Minimum, 1.0 Maximum
        actions['set_input_levels_0'] = {
            name: 'Set Input levels: Ch1 = 0.0 Minimum, 1.0 Maximum',
            description: 'Set value for Input levels: Ch1 = 0.0 Minimum, 1.0 Maximum',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: 0.5,
                    min: 0.0,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const newValue = event.options.value;
                
                // Get current values or use SPECIFIC defaults
                const values = [];
                // For the subindex being modified, use the new value
                values[0] = newValue;
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('input_levels_1', 0.5, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('input_levels_0', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'input_levels', valuesString);
            }
        };
        // Action to increment Input levels: Ch1 = 0.0 Minimum, 1.0 Maximum
        actions['set_input_levels_0_increment'] = {
            name: 'â¬†ï¸Â Increase Input levels: Ch1 = 0.0 Minimum, 1.0 Maximum',
            description: 'Increase the value of Input levels: Ch1 = 0.0 Minimum, 1.0 Maximum',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 0.1,
                    min: 0.1,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('input_levels_0', 0.5, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(1.0, currentValue + increment);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For the subindex being modified, use the new value incrementado
                values[0] = newValue;
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('input_levels_1', 0.5, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('input_levels_0', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'input_levels', valuesString);
            }
        };
        // Action to decrement Input levels: Ch1 = 0.0 Minimum, 1.0 Maximum
        actions['set_input_levels_0_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Input levels: Ch1 = 0.0 Minimum, 1.0 Maximum',
            description: 'Decrease the value of Input levels: Ch1 = 0.0 Minimum, 1.0 Maximum',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 0.1,
                    min: 0.1,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('input_levels_0', 0.5, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(0.0, currentValue - decrement);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For the subindex being modified, use the new value decrementado
                values[0] = newValue;
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('input_levels_1', 0.5, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('input_levels_0', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'input_levels', valuesString);
            }
        };
        // Action to reset Input levels: Ch1 = 0.0 Minimum, 1.0 Maximum al default value
        actions['set_input_levels_0_reset'] = {
            name: 'ðŸ”„ Reset Input levels: Ch1 = 0.0 Minimum, 1.0 Maximum',
            description: 'Reset to default value (0.50)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const resetValue = 0.5;
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For the subindex being reset, use its default value
                values[0] = resetValue;
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('input_levels_1', 0.5, cameraId);
                
                // Store default value specifically for this camera
                self.storeParamValue('input_levels_0', resetValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'input_levels', valuesString);
            }
        };
        // Action to set only Input levels: Ch2 = 0.0 Minimum, 1.0 Maximum
        actions['set_input_levels_1'] = {
            name: 'Set Input levels: Ch2 = 0.0 Minimum, 1.0 Maximum',
            description: 'Set value for Input levels: Ch2 = 0.0 Minimum, 1.0 Maximum',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: 0.5,
                    min: 0.0,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const newValue = event.options.value;
                
                // Get current values or use SPECIFIC defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('input_levels_0', 0.5, cameraId);
                // For the subindex being modified, use the new value
                values[1] = newValue;
                
                // Store new value specifically for this camera
                self.storeParamValue('input_levels_1', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'input_levels', valuesString);
            }
        };
        // Action to increment Input levels: Ch2 = 0.0 Minimum, 1.0 Maximum
        actions['set_input_levels_1_increment'] = {
            name: 'â¬†ï¸Â Increase Input levels: Ch2 = 0.0 Minimum, 1.0 Maximum',
            description: 'Increase the value of Input levels: Ch2 = 0.0 Minimum, 1.0 Maximum',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 0.1,
                    min: 0.1,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('input_levels_1', 0.5, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(1.0, currentValue + increment);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('input_levels_0', 0.5, cameraId);
                // For the subindex being modified, use the new value incrementado
                values[1] = newValue;
                
                // Store new value specifically for this camera
                self.storeParamValue('input_levels_1', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'input_levels', valuesString);
            }
        };
        // Action to decrement Input levels: Ch2 = 0.0 Minimum, 1.0 Maximum
        actions['set_input_levels_1_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Input levels: Ch2 = 0.0 Minimum, 1.0 Maximum',
            description: 'Decrease the value of Input levels: Ch2 = 0.0 Minimum, 1.0 Maximum',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 0.1,
                    min: 0.1,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('input_levels_1', 0.5, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(0.0, currentValue - decrement);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('input_levels_0', 0.5, cameraId);
                // For the subindex being modified, use the new value decrementado
                values[1] = newValue;
                
                // Store new value specifically for this camera
                self.storeParamValue('input_levels_1', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'input_levels', valuesString);
            }
        };
        // Action to reset Input levels: Ch2 = 0.0 Minimum, 1.0 Maximum al default value
        actions['set_input_levels_1_reset'] = {
            name: 'ðŸ”„ Reset Input levels: Ch2 = 0.0 Minimum, 1.0 Maximum',
            description: 'Reset to default value (0.50)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const resetValue = 0.5;
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('input_levels_0', 0.5, cameraId);
                // For the subindex being reset, use its default value
                values[1] = resetValue;
                
                // Store default value specifically for this camera
                self.storeParamValue('input_levels_1', resetValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'input_levels', valuesString);
            }
        };
        // Action for Phantom power (boolean)
        actions['set_phantom_power'] = {
            name: 'Set Phantom power',
            description: 'Group: Audio | Param: Phantom power | Note: True = Powered, False = Not powered',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'checkbox',
                    label: 'Value',
                    id: 'value',
                    default: false
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const value = event.options.value ? 1 : 0;
                self.sendParam(cameraId, 'phantom_power', value);
            }
        };
        // Action for Overlays (multiple subindexes)
        actions['set_overlays'] = {
            name: 'Set Overlays',
            description: 'Set values for Overlays',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Frame guides style (0 = Off, 1 = 2.4:1, 2 = 2.39:1, 3 = 2.35:1, 4 = 1.85:1, 5 = 16:9, 6 = 14:9, 7 = 4:3, 8 = 2:1, 9 = 4:5, 10 = 1:1)',
                    id: 'value0',
                    default: 5.0,
                    min: 0.0,
                    max: 10.0,
                    step: 1
                },
                {
                    type: 'number',
                    label: 'Frame Guide Opacity (0 = Transparent, 100 = Opaque)',
                    id: 'value1',
                    default: 100.0,
                    min: 0.0,
                    max: 100.0,
                    step: 1
                },
                {
                    type: 'number',
                    label: 'Safe Area Percentage (0 means off)',
                    id: 'value2',
                    default: 0.0,
                    min: 0.0,
                    max: 100.0,
                    step: 1
                },
                {
                    type: 'number',
                    label: 'Grid style bit flags (1 = Thirds, 2 = Cross Hairs, 4 = Center Dot, 8 = Horizon)',
                    id: 'value3',
                    default: 9.0,
                    min: 0.0,
                    max: 15.0,
                    step: 1
                },
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const values = [];
                values[0] = event.options.value0;
                values[1] = event.options.value1;
                values[2] = event.options.value2;
                values[3] = event.options.value3;
                const valuesString = values.join(",");
                self.sendParam(cameraId, 'overlays', valuesString);
                
                // Store individual values for each subindex
                
                self.storeParamValue('overlays_0', event.options.value0, cameraId);
                self.storeParamValue('overlays_1', event.options.value1, cameraId);
                self.storeParamValue('overlays_2', event.options.value2, cameraId);
                self.storeParamValue('overlays_3', event.options.value3, cameraId);
            }
        };
        // Action to set only Overlays: Frame guides style (0 = Off, 1 = 2.4:1, 2 = 2.39:1, 3 = 2.35:1, 4 = 1.85:1, 5 = 16:9, 6 = 14:9, 7 = 4:3, 8 = 2:1, 9 = 4:5, 10 = 1:1)
        actions['set_overlays_0'] = {
            name: 'Set Overlays: Frame guides style (0 = Off, 1 = 2.4:1, 2 = 2.39:1, 3 = 2.35:1, 4 = 1.85:1, 5 = 16:9, 6 = 14:9, 7 = 4:3, 8 = 2:1, 9 = 4:5, 10 = 1:1)',
            description: 'Set value for Overlays: Frame guides style (0 = Off, 1 = 2.4:1, 2 = 2.39:1, 3 = 2.35:1, 4 = 1.85:1, 5 = 16:9, 6 = 14:9, 7 = 4:3, 8 = 2:1, 9 = 4:5, 10 = 1:1)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: 5.0,
                    min: 0.0,
                    max: 10.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const newValue = event.options.value;
                
                // Get current values or use SPECIFIC defaults
                const values = [];
                // For the subindex being modified, use the new value
                values[0] = newValue;
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('overlays_1', 100.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('overlays_2', 0.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('overlays_3', 9.0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('overlays_0', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'overlays', valuesString);
            }
        };
        // Action to increment Overlays: Frame guides style (0 = Off, 1 = 2.4:1, 2 = 2.39:1, 3 = 2.35:1, 4 = 1.85:1, 5 = 16:9, 6 = 14:9, 7 = 4:3, 8 = 2:1, 9 = 4:5, 10 = 1:1)
        actions['set_overlays_0_increment'] = {
            name: 'â¬†ï¸Â Increase Overlays: Frame guides style (0 = Off, 1 = 2.4:1, 2 = 2.39:1, 3 = 2.35:1, 4 = 1.85:1, 5 = 16:9, 6 = 14:9, 7 = 4:3, 8 = 2:1, 9 = 4:5, 10 = 1:1)',
            description: 'Increase the value of Overlays: Frame guides style (0 = Off, 1 = 2.4:1, 2 = 2.39:1, 3 = 2.35:1, 4 = 1.85:1, 5 = 16:9, 6 = 14:9, 7 = 4:3, 8 = 2:1, 9 = 4:5, 10 = 1:1)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 1,
                    min: 1,
                    max: 10.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('overlays_0', 5.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(10.0, currentValue + increment);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For the subindex being modified, use the new value incrementado
                values[0] = newValue;
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('overlays_1', 100.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('overlays_2', 0.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('overlays_3', 9.0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('overlays_0', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'overlays', valuesString);
            }
        };
        // Action to decrement Overlays: Frame guides style (0 = Off, 1 = 2.4:1, 2 = 2.39:1, 3 = 2.35:1, 4 = 1.85:1, 5 = 16:9, 6 = 14:9, 7 = 4:3, 8 = 2:1, 9 = 4:5, 10 = 1:1)
        actions['set_overlays_0_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Overlays: Frame guides style (0 = Off, 1 = 2.4:1, 2 = 2.39:1, 3 = 2.35:1, 4 = 1.85:1, 5 = 16:9, 6 = 14:9, 7 = 4:3, 8 = 2:1, 9 = 4:5, 10 = 1:1)',
            description: 'Decrease the value of Overlays: Frame guides style (0 = Off, 1 = 2.4:1, 2 = 2.39:1, 3 = 2.35:1, 4 = 1.85:1, 5 = 16:9, 6 = 14:9, 7 = 4:3, 8 = 2:1, 9 = 4:5, 10 = 1:1)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 1,
                    min: 1,
                    max: 10.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('overlays_0', 5.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(0.0, currentValue - decrement);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For the subindex being modified, use the new value decrementado
                values[0] = newValue;
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('overlays_1', 100.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('overlays_2', 0.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('overlays_3', 9.0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('overlays_0', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'overlays', valuesString);
            }
        };
        // Action to reset Overlays: Frame guides style (0 = Off, 1 = 2.4:1, 2 = 2.39:1, 3 = 2.35:1, 4 = 1.85:1, 5 = 16:9, 6 = 14:9, 7 = 4:3, 8 = 2:1, 9 = 4:5, 10 = 1:1) al default value
        actions['set_overlays_0_reset'] = {
            name: 'ðŸ”„ Reset Overlays: Frame guides style (0 = Off, 1 = 2.4:1, 2 = 2.39:1, 3 = 2.35:1, 4 = 1.85:1, 5 = 16:9, 6 = 14:9, 7 = 4:3, 8 = 2:1, 9 = 4:5, 10 = 1:1)',
            description: 'Reset to default value (5)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const resetValue = 5.0;
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For the subindex being reset, use its default value
                values[0] = resetValue;
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('overlays_1', 100.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('overlays_2', 0.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('overlays_3', 9.0, cameraId);
                
                // Store default value specifically for this camera
                self.storeParamValue('overlays_0', resetValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'overlays', valuesString);
            }
        };
        // Action to set only Overlays: Frame Guide Opacity (0 = Transparent, 100 = Opaque)
        actions['set_overlays_1'] = {
            name: 'Set Overlays: Frame Guide Opacity (0 = Transparent, 100 = Opaque)',
            description: 'Set value for Overlays: Frame Guide Opacity (0 = Transparent, 100 = Opaque)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: 100.0,
                    min: 0.0,
                    max: 100.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const newValue = event.options.value;
                
                // Get current values or use SPECIFIC defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('overlays_0', 5.0, cameraId);
                // For the subindex being modified, use the new value
                values[1] = newValue;
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('overlays_2', 0.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('overlays_3', 9.0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('overlays_1', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'overlays', valuesString);
            }
        };
        // Action to increment Overlays: Frame Guide Opacity (0 = Transparent, 100 = Opaque)
        actions['set_overlays_1_increment'] = {
            name: 'â¬†ï¸Â Increase Overlays: Frame Guide Opacity (0 = Transparent, 100 = Opaque)',
            description: 'Increase the value of Overlays: Frame Guide Opacity (0 = Transparent, 100 = Opaque)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 1,
                    min: 1,
                    max: 100.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('overlays_1', 100.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(100.0, currentValue + increment);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('overlays_0', 5.0, cameraId);
                // For the subindex being modified, use the new value incrementado
                values[1] = newValue;
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('overlays_2', 0.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('overlays_3', 9.0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('overlays_1', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'overlays', valuesString);
            }
        };
        // Action to decrement Overlays: Frame Guide Opacity (0 = Transparent, 100 = Opaque)
        actions['set_overlays_1_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Overlays: Frame Guide Opacity (0 = Transparent, 100 = Opaque)',
            description: 'Decrease the value of Overlays: Frame Guide Opacity (0 = Transparent, 100 = Opaque)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 1,
                    min: 1,
                    max: 100.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('overlays_1', 100.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(0.0, currentValue - decrement);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('overlays_0', 5.0, cameraId);
                // For the subindex being modified, use the new value decrementado
                values[1] = newValue;
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('overlays_2', 0.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('overlays_3', 9.0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('overlays_1', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'overlays', valuesString);
            }
        };
        // Action to reset Overlays: Frame Guide Opacity (0 = Transparent, 100 = Opaque) al default value
        actions['set_overlays_1_reset'] = {
            name: 'ðŸ”„ Reset Overlays: Frame Guide Opacity (0 = Transparent, 100 = Opaque)',
            description: 'Reset to default value (100)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const resetValue = 100.0;
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('overlays_0', 5.0, cameraId);
                // For the subindex being reset, use its default value
                values[1] = resetValue;
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('overlays_2', 0.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('overlays_3', 9.0, cameraId);
                
                // Store default value specifically for this camera
                self.storeParamValue('overlays_1', resetValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'overlays', valuesString);
            }
        };
        // Action to set only Overlays: Safe Area Percentage (0 means off)
        actions['set_overlays_2'] = {
            name: 'Set Overlays: Safe Area Percentage (0 means off)',
            description: 'Set value for Overlays: Safe Area Percentage (0 means off)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: 0.0,
                    min: 0.0,
                    max: 100.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const newValue = event.options.value;
                
                // Get current values or use SPECIFIC defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('overlays_0', 5.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('overlays_1', 100.0, cameraId);
                // For the subindex being modified, use the new value
                values[2] = newValue;
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('overlays_3', 9.0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('overlays_2', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'overlays', valuesString);
            }
        };
        // Action to increment Overlays: Safe Area Percentage (0 means off)
        actions['set_overlays_2_increment'] = {
            name: 'â¬†ï¸Â Increase Overlays: Safe Area Percentage (0 means off)',
            description: 'Increase the value of Overlays: Safe Area Percentage (0 means off)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 1,
                    min: 1,
                    max: 100.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('overlays_2', 0.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(100.0, currentValue + increment);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('overlays_0', 5.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('overlays_1', 100.0, cameraId);
                // For the subindex being modified, use the new value incrementado
                values[2] = newValue;
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('overlays_3', 9.0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('overlays_2', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'overlays', valuesString);
            }
        };
        // Action to decrement Overlays: Safe Area Percentage (0 means off)
        actions['set_overlays_2_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Overlays: Safe Area Percentage (0 means off)',
            description: 'Decrease the value of Overlays: Safe Area Percentage (0 means off)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 1,
                    min: 1,
                    max: 100.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('overlays_2', 0.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(0.0, currentValue - decrement);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('overlays_0', 5.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('overlays_1', 100.0, cameraId);
                // For the subindex being modified, use the new value decrementado
                values[2] = newValue;
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('overlays_3', 9.0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('overlays_2', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'overlays', valuesString);
            }
        };
        // Action to reset Overlays: Safe Area Percentage (0 means off) al default value
        actions['set_overlays_2_reset'] = {
            name: 'ðŸ”„ Reset Overlays: Safe Area Percentage (0 means off)',
            description: 'Reset to default value (0)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const resetValue = 0.0;
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('overlays_0', 5.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('overlays_1', 100.0, cameraId);
                // For the subindex being reset, use its default value
                values[2] = resetValue;
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('overlays_3', 9.0, cameraId);
                
                // Store default value specifically for this camera
                self.storeParamValue('overlays_2', resetValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'overlays', valuesString);
            }
        };
        // Action to set only Overlays: Grid style bit flags (1 = Thirds, 2 = Cross Hairs, 4 = Center Dot, 8 = Horizon)
        actions['set_overlays_3'] = {
            name: 'Set Overlays: Grid style bit flags (1 = Thirds, 2 = Cross Hairs, 4 = Center Dot, 8 = Horizon)',
            description: 'Set value for Overlays: Grid style bit flags (1 = Thirds, 2 = Cross Hairs, 4 = Center Dot, 8 = Horizon)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: 9.0,
                    min: 0.0,
                    max: 15.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const newValue = event.options.value;
                
                // Get current values or use SPECIFIC defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('overlays_0', 5.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('overlays_1', 100.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('overlays_2', 0.0, cameraId);
                // For the subindex being modified, use the new value
                values[3] = newValue;
                
                // Store new value specifically for this camera
                self.storeParamValue('overlays_3', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'overlays', valuesString);
            }
        };
        // Action to increment Overlays: Grid style bit flags (1 = Thirds, 2 = Cross Hairs, 4 = Center Dot, 8 = Horizon)
        actions['set_overlays_3_increment'] = {
            name: 'â¬†ï¸Â Increase Overlays: Grid style bit flags (1 = Thirds, 2 = Cross Hairs, 4 = Center Dot, 8 = Horizon)',
            description: 'Increase the value of Overlays: Grid style bit flags (1 = Thirds, 2 = Cross Hairs, 4 = Center Dot, 8 = Horizon)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 1,
                    min: 1,
                    max: 15.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('overlays_3', 9.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(15.0, currentValue + increment);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('overlays_0', 5.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('overlays_1', 100.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('overlays_2', 0.0, cameraId);
                // For the subindex being modified, use the new value incrementado
                values[3] = newValue;
                
                // Store new value specifically for this camera
                self.storeParamValue('overlays_3', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'overlays', valuesString);
            }
        };
        // Action to decrement Overlays: Grid style bit flags (1 = Thirds, 2 = Cross Hairs, 4 = Center Dot, 8 = Horizon)
        actions['set_overlays_3_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Overlays: Grid style bit flags (1 = Thirds, 2 = Cross Hairs, 4 = Center Dot, 8 = Horizon)',
            description: 'Decrease the value of Overlays: Grid style bit flags (1 = Thirds, 2 = Cross Hairs, 4 = Center Dot, 8 = Horizon)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 1,
                    min: 1,
                    max: 15.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('overlays_3', 9.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(0.0, currentValue - decrement);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('overlays_0', 5.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('overlays_1', 100.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('overlays_2', 0.0, cameraId);
                // For the subindex being modified, use the new value decrementado
                values[3] = newValue;
                
                // Store new value specifically for this camera
                self.storeParamValue('overlays_3', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'overlays', valuesString);
            }
        };
        // Action to reset Overlays: Grid style bit flags (1 = Thirds, 2 = Cross Hairs, 4 = Center Dot, 8 = Horizon) al default value
        actions['set_overlays_3_reset'] = {
            name: 'ðŸ”„ Reset Overlays: Grid style bit flags (1 = Thirds, 2 = Cross Hairs, 4 = Center Dot, 8 = Horizon)',
            description: 'Reset to default value (9)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const resetValue = 9.0;
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('overlays_0', 5.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('overlays_1', 100.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('overlays_2', 0.0, cameraId);
                // For the subindex being reset, use its default value
                values[3] = resetValue;
                
                // Store default value specifically for this camera
                self.storeParamValue('overlays_3', resetValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'overlays', valuesString);
            }
        };
        // Action for Brightness (numeric)
        actions['set_brightness'] = {
            name: 'Set Brightness',
            description: 'Group: Display | Param: Brightness | Note: 0.0 = Minimum, 1.0 = Maximum',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: 1.0,
                    min: 0.0,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                self.sendParam(cameraId, 'brightness', event.options.value);
            }
        };
        // Action to increment Brightness
        actions['set_brightness_increment'] = {
            name: 'â¬†ï¸Â Increase Brightness',
            description: 'Increase the value of Brightness',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 0.1,
                    min: 0.1,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('brightness', 1.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(1.0, currentValue + increment);
                
                // Send new value
                self.sendParam(cameraId, 'brightness', newValue);
                
                // Store new value specifically for this camera
                self.storeParamValue('brightness', newValue, cameraId);
            }
        };
        // Action to decrement Brightness
        actions['set_brightness_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Brightness',
            description: 'Decrease the value of Brightness',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 0.1,
                    min: 0.1,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('brightness', 1.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(0.0, currentValue - decrement);
                
                // Send new value
                self.sendParam(cameraId, 'brightness', newValue);
                
                // Store new value specifically for this camera
                self.storeParamValue('brightness', newValue, cameraId);
            }
        };
        // Action to reset Brightness al default value
        actions['set_brightness_reset'] = {
            name: 'ðŸ”„ Reset Brightness',
            description: 'Reset to default value (1.00)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                
                // Send default value
                self.sendParam(cameraId, 'brightness', 1.0);
                
                // Store default value for this specific camera
                self.storeParamValue('brightness', 1.0, cameraId);
            }
        };
        // Action for Exposure and focus tools (multiple subindexes)
        actions['set_exposure_and_focus_tools'] = {
            name: 'Set Exposure and focus tools',
            description: 'Set values for Exposure and focus tools',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'textinput',
                    label: 'Bit flags: 1 = Zebra, 2 = Focus Assist, 4 = False Color',
                    id: 'value0',
                    default: ''
                },
                {
                    type: 'textinput',
                    label: 'Target displays bit flags: 1 = LCD, 2 = HDMI, 4 = EVF, 8 = Main SDI, 16 = Front SDI',
                    id: 'value1',
                    default: ''
                },
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const values = [];
                values[0] = event.options.value0;
                values[1] = event.options.value1;
                const valuesString = values.join(",");
                self.sendParam(cameraId, 'exposure_and_focus_tools', valuesString);
                
                // Store individual values for each subindex
                
                self.storeParamValue('exposure_and_focus_tools_0', event.options.value0, cameraId);
                self.storeParamValue('exposure_and_focus_tools_1', event.options.value1, cameraId);
            }
        };
        // Action for Zebra level (numeric)
        actions['set_zebra_level'] = {
            name: 'Set Zebra level',
            description: 'Group: Display | Param: Zebra level | Note: 0.0 = Minimum, 1.0 = Maximum',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: 0.5,
                    min: 0.0,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                self.sendParam(cameraId, 'zebra_level', event.options.value);
            }
        };
        // Action to increment Zebra level
        actions['set_zebra_level_increment'] = {
            name: 'â¬†ï¸Â Increase Zebra level',
            description: 'Increase the value of Zebra level',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 0.1,
                    min: 0.1,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('zebra_level', 0.5, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(1.0, currentValue + increment);
                
                // Send new value
                self.sendParam(cameraId, 'zebra_level', newValue);
                
                // Store new value specifically for this camera
                self.storeParamValue('zebra_level', newValue, cameraId);
            }
        };
        // Action to decrement Zebra level
        actions['set_zebra_level_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Zebra level',
            description: 'Decrease the value of Zebra level',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 0.1,
                    min: 0.1,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('zebra_level', 0.5, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(0.0, currentValue - decrement);
                
                // Send new value
                self.sendParam(cameraId, 'zebra_level', newValue);
                
                // Store new value specifically for this camera
                self.storeParamValue('zebra_level', newValue, cameraId);
            }
        };
        // Action to reset Zebra level al default value
        actions['set_zebra_level_reset'] = {
            name: 'ðŸ”„ Reset Zebra level',
            description: 'Reset to default value (0.50)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                
                // Send default value
                self.sendParam(cameraId, 'zebra_level', 0.5);
                
                // Store default value for this specific camera
                self.storeParamValue('zebra_level', 0.5, cameraId);
            }
        };
        // Action for Peaking level (numeric)
        actions['set_peaking_level'] = {
            name: 'Set Peaking level',
            description: 'Group: Display | Param: Peaking level | Note: 0.0 = Minimum, 1.0 = Maximum',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: 0.9,
                    min: 0.0,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                self.sendParam(cameraId, 'peaking_level', event.options.value);
            }
        };
        // Action to increment Peaking level
        actions['set_peaking_level_increment'] = {
            name: 'â¬†ï¸Â Increase Peaking level',
            description: 'Increase the value of Peaking level',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 0.1,
                    min: 0.1,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('peaking_level', 0.9, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(1.0, currentValue + increment);
                
                // Send new value
                self.sendParam(cameraId, 'peaking_level', newValue);
                
                // Store new value specifically for this camera
                self.storeParamValue('peaking_level', newValue, cameraId);
            }
        };
        // Action to decrement Peaking level
        actions['set_peaking_level_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Peaking level',
            description: 'Decrease the value of Peaking level',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 0.1,
                    min: 0.1,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('peaking_level', 0.9, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(0.0, currentValue - decrement);
                
                // Send new value
                self.sendParam(cameraId, 'peaking_level', newValue);
                
                // Store new value specifically for this camera
                self.storeParamValue('peaking_level', newValue, cameraId);
            }
        };
        // Action to reset Peaking level al default value
        actions['set_peaking_level_reset'] = {
            name: 'ðŸ”„ Reset Peaking level',
            description: 'Reset to default value (0.90)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                
                // Send default value
                self.sendParam(cameraId, 'peaking_level', 0.9);
                
                // Store default value for this specific camera
                self.storeParamValue('peaking_level', 0.9, cameraId);
            }
        };
        // Action for Color bars display time (seconds) (numeric)
        actions['set_color_bars_display_time_seconds'] = {
            name: 'Set Color bars display time (seconds)',
            description: 'Group: Display | Param: Color bars display time (seconds) | Note: 0 = Disable Bars, 1-30 = Enable Bars With Timeout (s)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: 0.0,
                    min: 0.0,
                    max: 30.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                self.sendParam(cameraId, 'color_bars_display_time_seconds', event.options.value);
            }
        };
        // Action to increment Color bars display time (seconds)
        actions['set_color_bars_display_time_seconds_increment'] = {
            name: 'â¬†ï¸Â Increase Color bars display time (seconds)',
            description: 'Increase the value of Color bars display time (seconds)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 1,
                    min: 1,
                    max: 30.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('color_bars_display_time_seconds', 0.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(30.0, currentValue + increment);
                
                // Send new value
                self.sendParam(cameraId, 'color_bars_display_time_seconds', newValue);
                
                // Store new value specifically for this camera
                self.storeParamValue('color_bars_display_time_seconds', newValue, cameraId);
            }
        };
        // Action to decrement Color bars display time (seconds)
        actions['set_color_bars_display_time_seconds_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Color bars display time (seconds)',
            description: 'Decrease the value of Color bars display time (seconds)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 1,
                    min: 1,
                    max: 30.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('color_bars_display_time_seconds', 0.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(0.0, currentValue - decrement);
                
                // Send new value
                self.sendParam(cameraId, 'color_bars_display_time_seconds', newValue);
                
                // Store new value specifically for this camera
                self.storeParamValue('color_bars_display_time_seconds', newValue, cameraId);
            }
        };
        // Action to reset Color bars display time (seconds) al default value
        actions['set_color_bars_display_time_seconds_reset'] = {
            name: 'ðŸ”„ Reset Color bars display time (seconds)',
            description: 'Reset to default value (0)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                
                // Send default value
                self.sendParam(cameraId, 'color_bars_display_time_seconds', 0.0);
                
                // Store default value for this specific camera
                self.storeParamValue('color_bars_display_time_seconds', 0.0, cameraId);
            }
        };
        // Action for Focus Assist (multiple subindexes)
        actions['set_focus_assist'] = {
            name: 'Set Focus Assist',
            description: 'Set values for Focus Assist',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Focus Assist Method (0 = Peak, 1 = Colored lines)',
                    id: 'value0',
                    default: 1.0,
                    min: 0.0,
                    max: 1.0,
                    step: 1
                },
                {
                    type: 'number',
                    label: 'Focus Line Color (0 = Red, 1 = Green, 2 = Blue, 3 = White, 4 = Black)',
                    id: 'value1',
                    default: 0.0,
                    min: 0.0,
                    max: 4.0,
                    step: 1
                },
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const values = [];
                values[0] = event.options.value0;
                values[1] = event.options.value1;
                const valuesString = values.join(",");
                self.sendParam(cameraId, 'focus_assist', valuesString);
                
                // Store individual values for each subindex
                
                self.storeParamValue('focus_assist_0', event.options.value0, cameraId);
                self.storeParamValue('focus_assist_1', event.options.value1, cameraId);
            }
        };
        // Action to set onlyred lines)
        actions['set_focus_assist_0'] = {
            name: 'Set Focus Assist: Focus Assist Method (0 = Peak, 1 = Colored lines)',
            description: 'Set value for Focus Assist: Focus Assist Method (0 = Peak, 1 = Colored lines)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: 1.0,
                    min: 0.0,
                    max: 1.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const newValue = event.options.value;
                
                // Get current values or use SPECIFIC defaults
                const values = [];
                // For the subindex being modified, use the new value
                values[0] = newValue;
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('focus_assist_1', 0.0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('focus_assist_0', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'focus_assist', valuesString);
            }
        };
        // Action to increment Focus Assist: Focus Assist Method (0 = Peak, 1 = Colored lines)
        actions['set_focus_assist_0_increment'] = {
            name: 'â¬†ï¸Â Increase Focus Assist: Focus Assist Method (0 = Peak, 1 = Colored lines)',
            description: 'Increase the value of Focus Assist: Focus Assist Method (0 = Peak, 1 = Colored lines)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 1,
                    min: 1,
                    max: 1.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('focus_assist_0', 1.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(1.0, currentValue + increment);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For the subindex being modified, use the new value incrementado
                values[0] = newValue;
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('focus_assist_1', 0.0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('focus_assist_0', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'focus_assist', valuesString);
            }
        };
        // Action to decrement Focus Assist: Focus Assist Method (0 = Peak, 1 = Colored lines)
        actions['set_focus_assist_0_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Focus Assist: Focus Assist Method (0 = Peak, 1 = Colored lines)',
            description: 'Decrease the value of Focus Assist: Focus Assist Method (0 = Peak, 1 = Colored lines)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 1,
                    min: 1,
                    max: 1.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('focus_assist_0', 1.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(0.0, currentValue - decrement);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For the subindex being modified, use the new value decrementado
                values[0] = newValue;
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('focus_assist_1', 0.0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('focus_assist_0', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'focus_assist', valuesString);
            }
        };
        // Action to reset Focus Assist: Focus Assist Method (0 = Peak, 1 = Colored lines) al default value
        actions['set_focus_assist_0_reset'] = {
            name: 'ðŸ”„ Reset Focus Assist: Focus Assist Method (0 = Peak, 1 = Colored lines)',
            description: 'Reset to default value (1)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const resetValue = 1.0;
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For the subindex being reset, use its default value
                values[0] = resetValue;
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('focus_assist_1', 0.0, cameraId);
                
                // Store default value specifically for this camera
                self.storeParamValue('focus_assist_0', resetValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'focus_assist', valuesString);
            }
        };
        // Action to set onlyr (0 = Red, 1 = Green, 2 = Blue, 3 = White, 4 = Black)
        actions['set_focus_assist_1'] = {
            name: 'Set Focus Assist: Focus Line Color (0 = Red, 1 = Green, 2 = Blue, 3 = White, 4 = Black)',
            description: 'Set value for Focus Assist: Focus Line Color (0 = Red, 1 = Green, 2 = Blue, 3 = White, 4 = Black)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: 0.0,
                    min: 0.0,
                    max: 4.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const newValue = event.options.value;
                
                // Get current values or use SPECIFIC defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('focus_assist_0', 1.0, cameraId);
                // For the subindex being modified, use the new value
                values[1] = newValue;
                
                // Store new value specifically for this camera
                self.storeParamValue('focus_assist_1', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'focus_assist', valuesString);
            }
        };
        // Action to increment Focus Assist: Focus Line Color (0 = Red, 1 = Green, 2 = Blue, 3 = White, 4 = Black)
        actions['set_focus_assist_1_increment'] = {
            name: 'â¬†ï¸Â Increase Focus Assist: Focus Line Color (0 = Red, 1 = Green, 2 = Blue, 3 = White, 4 = Black)',
            description: 'Increase the value of Focus Assist: Focus Line Color (0 = Red, 1 = Green, 2 = Blue, 3 = White, 4 = Black)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 1,
                    min: 1,
                    max: 4.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('focus_assist_1', 0.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(4.0, currentValue + increment);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('focus_assist_0', 1.0, cameraId);
                // For the subindex being modified, use the new value incrementado
                values[1] = newValue;
                
                // Store new value specifically for this camera
                self.storeParamValue('focus_assist_1', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'focus_assist', valuesString);
            }
        };
        // Action to decrement Focus Assist: Focus Line Color (0 = Red, 1 = Green, 2 = Blue, 3 = White, 4 = Black)
        actions['set_focus_assist_1_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Focus Assist: Focus Line Color (0 = Red, 1 = Green, 2 = Blue, 3 = White, 4 = Black)',
            description: 'Decrease the value of Focus Assist: Focus Line Color (0 = Red, 1 = Green, 2 = Blue, 3 = White, 4 = Black)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 1,
                    min: 1,
                    max: 4.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('focus_assist_1', 0.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(0.0, currentValue - decrement);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('focus_assist_0', 1.0, cameraId);
                // For the subindex being modified, use the new value decrementado
                values[1] = newValue;
                
                // Store new value specifically for this camera
                self.storeParamValue('focus_assist_1', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'focus_assist', valuesString);
            }
        };
        // Action to reset Focus Assist: Focus Line Color (0 = Red, 1 = Green, 2 = Blue, 3 = White, 4 = Black) al default value
        actions['set_focus_assist_1_reset'] = {
            name: 'ðŸ”„ Reset Focus Assist: Focus Line Color (0 = Red, 1 = Green, 2 = Blue, 3 = White, 4 = Black)',
            description: 'Reset to default value (0)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const resetValue = 0.0;
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('focus_assist_0', 1.0, cameraId);
                // For the subindex being reset, use its default value
                values[1] = resetValue;
                
                // Store default value specifically for this camera
                self.storeParamValue('focus_assist_1', resetValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'focus_assist', valuesString);
            }
        };
        // Action for Program return feed enable (numeric)
        actions['set_program_return_feed_enable'] = {
            name: 'Set Program return feed enable',
            description: 'Group: Display | Param: Program return feed enable | Note: 0 = Disable, 1-30 = Enable with timeout (seconds)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: 0.0,
                    min: 0.0,
                    max: 30.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                self.sendParam(cameraId, 'program_return_feed_enable', event.options.value);
            }
        };
        // Action to increment Program return feed enable
        actions['set_program_return_feed_enable_increment'] = {
            name: 'â¬†ï¸Â Increase Program return feed enable',
            description: 'Increase the value of Program return feed enable',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 1,
                    min: 1,
                    max: 30.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('program_return_feed_enable', 0.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(30.0, currentValue + increment);
                
                // Send new value
                self.sendParam(cameraId, 'program_return_feed_enable', newValue);
                
                // Store new value specifically for this camera
                self.storeParamValue('program_return_feed_enable', newValue, cameraId);
            }
        };
        // Action to decrement Program return feed enable
        actions['set_program_return_feed_enable_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Program return feed enable',
            description: 'Decrease the value of Program return feed enable',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 1,
                    min: 1,
                    max: 30.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('program_return_feed_enable', 0.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(0.0, currentValue - decrement);
                
                // Send new value
                self.sendParam(cameraId, 'program_return_feed_enable', newValue);
                
                // Store new value specifically for this camera
                self.storeParamValue('program_return_feed_enable', newValue, cameraId);
            }
        };
        // Action to reset Program return feed enable al default value
        actions['set_program_return_feed_enable_reset'] = {
            name: 'ðŸ”„ Reset Program return feed enable',
            description: 'Reset to default value (0)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                
                // Send default value
                self.sendParam(cameraId, 'program_return_feed_enable', 0.0);
                
                // Store default value for this specific camera
                self.storeParamValue('program_return_feed_enable', 0.0, cameraId);
            }
        };
        // Action for Timecode Source [0] (numeric)
        actions['set_timecode_source_0'] = {
            name: 'Set Timecode Source [0]',
            description: 'Group: Display | Param: Timecode Source | Note: Source (0 = Clip, 1 = Timecode)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: 0.0,
                    min: 0.0,
                    max: 1.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                self.sendParam(cameraId, 'timecode_source_0', event.options.value);
            }
        };
        // Action to increment Timecode Source [0]
        actions['set_timecode_source_0_increment'] = {
            name: 'â¬†ï¸Â Increase Timecode Source [0]',
            description: 'Increase the value of Timecode Source [0]',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 1,
                    min: 1,
                    max: 1.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('timecode_source_0', 0.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(1.0, currentValue + increment);
                
                // Send new value
                self.sendParam(cameraId, 'timecode_source_0', newValue);
                
                // Store new value specifically for this camera
                self.storeParamValue('timecode_source_0', newValue, cameraId);
            }
        };
        // Action to decrement Timecode Source [0]
        actions['set_timecode_source_0_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Timecode Source [0]',
            description: 'Decrease the value of Timecode Source [0]',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 1,
                    min: 1,
                    max: 1.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('timecode_source_0', 0.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(0.0, currentValue - decrement);
                
                // Send new value
                self.sendParam(cameraId, 'timecode_source_0', newValue);
                
                // Store new value specifically for this camera
                self.storeParamValue('timecode_source_0', newValue, cameraId);
            }
        };
        // Action to reset Timecode Source [0] al default value
        actions['set_timecode_source_0_reset'] = {
            name: 'ðŸ”„ Reset Timecode Source [0]',
            description: 'Reset to default value (0)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                
                // Send default value
                self.sendParam(cameraId, 'timecode_source_0', 0.0);
                
                // Store default value for this specific camera
                self.storeParamValue('timecode_source_0', 0.0, cameraId);
            }
        };
        // Action for Tally brightness (numeric)
        actions['set_tally_brightness'] = {
            name: 'Set Tally brightness',
            description: 'Group: Tally | Param: Tally brightness | Note: Sets the tally front and rear brightness. 0.0 = minimum, 1.0 = maximum',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: 1.0,
                    min: 0.0,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                self.sendParam(cameraId, 'tally_brightness', event.options.value);
            }
        };
        // Action to increment Tally brightness
        actions['set_tally_brightness_increment'] = {
            name: 'â¬†ï¸Â Increase Tally brightness',
            description: 'Increase the value of Tally brightness',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 0.1,
                    min: 0.1,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('tally_brightness', 1.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(1.0, currentValue + increment);
                
                // Send new value
                self.sendParam(cameraId, 'tally_brightness', newValue);
                
                // Store new value specifically for this camera
                self.storeParamValue('tally_brightness', newValue, cameraId);
            }
        };
        // Action to decrement Tally brightness
        actions['set_tally_brightness_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Tally brightness',
            description: 'Decrease the value of Tally brightness',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 0.1,
                    min: 0.1,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('tally_brightness', 1.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(0.0, currentValue - decrement);
                
                // Send new value
                self.sendParam(cameraId, 'tally_brightness', newValue);
                
                // Store new value specifically for this camera
                self.storeParamValue('tally_brightness', newValue, cameraId);
            }
        };
        // Action to reset Tally brightness al default value
        actions['set_tally_brightness_reset'] = {
            name: 'ðŸ”„ Reset Tally brightness',
            description: 'Reset to default value (1.00)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                
                // Send default value
                self.sendParam(cameraId, 'tally_brightness', 1.0);
                
                // Store default value for this specific camera
                self.storeParamValue('tally_brightness', 1.0, cameraId);
            }
        };
        // Action for Front tally brightness (numeric)
        actions['set_front_tally_brightness'] = {
            name: 'Set Front tally brightness',
            description: 'Group: Tally | Param: Front tally brightness | Note: Sets the tally front brightness. 0.0 = minimum, 1.0 = maximum',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: 1.0,
                    min: 0.0,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                self.sendParam(cameraId, 'front_tally_brightness', event.options.value);
            }
        };
        // Action to increment Front tally brightness
        actions['set_front_tally_brightness_increment'] = {
            name: 'â¬†ï¸Â Increase Front tally brightness',
            description: 'Increase the value of Front tally brightness',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 0.1,
                    min: 0.1,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('front_tally_brightness', 1.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(1.0, currentValue + increment);
                
                // Send new value
                self.sendParam(cameraId, 'front_tally_brightness', newValue);
                
                // Store new value specifically for this camera
                self.storeParamValue('front_tally_brightness', newValue, cameraId);
            }
        };
        // Action to decrement Front tally brightness
        actions['set_front_tally_brightness_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Front tally brightness',
            description: 'Decrease the value of Front tally brightness',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 0.1,
                    min: 0.1,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('front_tally_brightness', 1.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(0.0, currentValue - decrement);
                
                // Send new value
                self.sendParam(cameraId, 'front_tally_brightness', newValue);
                
                // Store new value specifically for this camera
                self.storeParamValue('front_tally_brightness', newValue, cameraId);
            }
        };
        // Action to reset Front tally brightness al default value
        actions['set_front_tally_brightness_reset'] = {
            name: 'ðŸ”„ Reset Front tally brightness',
            description: 'Reset to default value (1.00)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                
                // Send default value
                self.sendParam(cameraId, 'front_tally_brightness', 1.0);
                
                // Store default value for this specific camera
                self.storeParamValue('front_tally_brightness', 1.0, cameraId);
            }
        };
        // Action for Rear tally brightness (numeric)
        actions['set_rear_tally_brightness'] = {
            name: 'Set Rear tally brightness',
            description: 'Group: Tally | Param: Rear tally brightness | Note: Sets the tally rear brightness. 0.0 = minimum, 1.0 = maximum (cannot be turned off)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: 1.0,
                    min: 0.0,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                self.sendParam(cameraId, 'rear_tally_brightness', event.options.value);
            }
        };
        // Action to increment Rear tally brightness
        actions['set_rear_tally_brightness_increment'] = {
            name: 'â¬†ï¸Â Increase Rear tally brightness',
            description: 'Increase the value of Rear tally brightness',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 0.1,
                    min: 0.1,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('rear_tally_brightness', 1.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(1.0, currentValue + increment);
                
                // Send new value
                self.sendParam(cameraId, 'rear_tally_brightness', newValue);
                
                // Store new value specifically for this camera
                self.storeParamValue('rear_tally_brightness', newValue, cameraId);
            }
        };
        // Action to decrement Rear tally brightness
        actions['set_rear_tally_brightness_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Rear tally brightness',
            description: 'Decrease the value of Rear tally brightness',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 0.1,
                    min: 0.1,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('rear_tally_brightness', 1.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(0.0, currentValue - decrement);
                
                // Send new value
                self.sendParam(cameraId, 'rear_tally_brightness', newValue);
                
                // Store new value specifically for this camera
                self.storeParamValue('rear_tally_brightness', newValue, cameraId);
            }
        };
        // Action to reset Rear tally brightness al default value
        actions['set_rear_tally_brightness_reset'] = {
            name: 'ðŸ”„ Reset Rear tally brightness',
            description: 'Reset to default value (1.00)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                
                // Send default value
                self.sendParam(cameraId, 'rear_tally_brightness', 1.0);
                
                // Store default value for this specific camera
                self.storeParamValue('rear_tally_brightness', 1.0, cameraId);
            }
        };
        // Action for Source (numeric)
        actions['set_source'] = {
            name: 'Set Source',
            description: 'Group: Reference | Param: Source | Note: 0 = Internal, 1 = Program, 2 = External',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: 0.0,
                    min: 0.0,
                    max: 2.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                self.sendParam(cameraId, 'source', event.options.value);
            }
        };
        // Action to increment Source
        actions['set_source_increment'] = {
            name: 'â¬†ï¸Â Increase Source',
            description: 'Increase the value of Source',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 1,
                    min: 1,
                    max: 2.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('source', 0.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(2.0, currentValue + increment);
                
                // Send new value
                self.sendParam(cameraId, 'source', newValue);
                
                // Store new value specifically for this camera
                self.storeParamValue('source', newValue, cameraId);
            }
        };
        // Action to decrement Source
        actions['set_source_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Source',
            description: 'Decrease the value of Source',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 1,
                    min: 1,
                    max: 2.0,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('source', 0.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(0.0, currentValue - decrement);
                
                // Send new value
                self.sendParam(cameraId, 'source', newValue);
                
                // Store new value specifically for this camera
                self.storeParamValue('source', newValue, cameraId);
            }
        };
        // Action to reset Source al default value
        actions['set_source_reset'] = {
            name: 'ðŸ”„ Reset Source',
            description: 'Reset to default value (0)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                
                // Send default value
                self.sendParam(cameraId, 'source', 0.0);
                
                // Store default value for this specific camera
                self.storeParamValue('source', 0.0, cameraId);
            }
        };
        // Action for Offset (numeric)
        actions['set_offset'] = {
            name: 'Set Offset',
            description: 'Group: Reference | Param: Offset | Note: +/- offset in pixels',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: 0,
                    min: 0,
                    max: 1,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                self.sendParam(cameraId, 'offset', event.options.value);
            }
        };
        // Action to increment Offset
        actions['set_offset_increment'] = {
            name: 'â¬†ï¸Â Increase Offset',
            description: 'Increase the value of Offset',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 1,
                    min: 1,
                    max: 1,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('offset', 0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(1, currentValue + increment);
                
                // Send new value
                self.sendParam(cameraId, 'offset', newValue);
                
                // Store new value specifically for this camera
                self.storeParamValue('offset', newValue, cameraId);
            }
        };
        // Action to decrement Offset
        actions['set_offset_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Offset',
            description: 'Decrease the value of Offset',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 1,
                    min: 1,
                    max: 1,
                    step: 1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('offset', 0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(0, currentValue - decrement);
                
                // Send new value
                self.sendParam(cameraId, 'offset', newValue);
                
                // Store new value specifically for this camera
                self.storeParamValue('offset', newValue, cameraId);
            }
        };
        // Action to reset Offset al default value
        actions['set_offset_reset'] = {
            name: 'ðŸ”„ Reset Offset',
            description: 'Reset to default value (0)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                
                // Send default value
                self.sendParam(cameraId, 'offset', 0);
                
                // Store default value for this specific camera
                self.storeParamValue('offset', 0, cameraId);
            }
        };
        // Action for Contrast Adjust (multiple subindexes)
        actions['set_contrast_adjust'] = {
            name: 'Set Contrast Adjust',
            description: 'Set values for Contrast Adjust',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Pivot',
                    id: 'value0',
                    default: 0.5,
                    min: 0.0,
                    max: 1.0,
                    step: 0.1
                },
                {
                    type: 'number',
                    label: 'Adjust',
                    id: 'value1',
                    default: 1.0,
                    min: 0.0,
                    max: 2.0,
                    step: 0.1
                },
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const values = [];
                values[0] = event.options.value0;
                values[1] = event.options.value1;
                const valuesString = values.join(",");
                self.sendParam(cameraId, 'contrast_adjust', valuesString);
                
                // Store individual values for each subindex
                
                self.storeParamValue('contrast_adjust_0', event.options.value0, cameraId);
                self.storeParamValue('contrast_adjust_1', event.options.value1, cameraId);
            }
        };
        // Action to set only Contrast Adjust: Pivot
        actions['set_contrast_adjust_0'] = {
            name: 'Set Contrast Adjust: Pivot',
            description: 'Set value for Contrast Adjust: Pivot',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: 0.5,
                    min: 0.0,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const newValue = event.options.value;
                
                // Get current values or use SPECIFIC defaults
                const values = [];
                // For the subindex being modified, use the new value
                values[0] = newValue;
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('contrast_adjust_1', 1.0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('contrast_adjust_0', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'contrast_adjust', valuesString);
            }
        };
        // Action to increment Contrast Adjust: Pivot
        actions['set_contrast_adjust_0_increment'] = {
            name: 'â¬†ï¸Â Increase Contrast Adjust: Pivot',
            description: 'Increase the value of Contrast Adjust: Pivot',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 0.1,
                    min: 0.1,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('contrast_adjust_0', 0.5, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(1.0, currentValue + increment);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For the subindex being modified, use the new value incrementado
                values[0] = newValue;
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('contrast_adjust_1', 1.0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('contrast_adjust_0', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'contrast_adjust', valuesString);
            }
        };
        // Action to decrement Contrast Adjust: Pivot
        actions['set_contrast_adjust_0_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Contrast Adjust: Pivot',
            description: 'Decrease the value of Contrast Adjust: Pivot',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 0.1,
                    min: 0.1,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('contrast_adjust_0', 0.5, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(0.0, currentValue - decrement);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For the subindex being modified, use the new value decrementado
                values[0] = newValue;
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('contrast_adjust_1', 1.0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('contrast_adjust_0', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'contrast_adjust', valuesString);
            }
        };
        // Action to reset Contrast Adjust: Pivot al default value
        actions['set_contrast_adjust_0_reset'] = {
            name: 'ðŸ”„ Reset Contrast Adjust: Pivot',
            description: 'Reset to default value (0.50)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const resetValue = 0.5;
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For the subindex being reset, use its default value
                values[0] = resetValue;
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('contrast_adjust_1', 1.0, cameraId);
                
                // Store default value specifically for this camera
                self.storeParamValue('contrast_adjust_0', resetValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'contrast_adjust', valuesString);
            }
        };
        // Action to set only Contrast Adjust: Adjust
        actions['set_contrast_adjust_1'] = {
            name: 'Set Contrast Adjust: Adjust',
            description: 'Set value for Contrast Adjust: Adjust',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: 1.0,
                    min: 0.0,
                    max: 2.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const newValue = event.options.value;
                
                // Get current values or use SPECIFIC defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('contrast_adjust_0', 0.5, cameraId);
                // For the subindex being modified, use the new value
                values[1] = newValue;
                
                // Store new value specifically for this camera
                self.storeParamValue('contrast_adjust_1', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'contrast_adjust', valuesString);
            }
        };
        // Action to increment Contrast Adjust: Adjust
        actions['set_contrast_adjust_1_increment'] = {
            name: 'â¬†ï¸Â Increase Contrast Adjust: Adjust',
            description: 'Increase the value of Contrast Adjust: Adjust',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 0.1,
                    min: 0.1,
                    max: 2.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('contrast_adjust_1', 1.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(2.0, currentValue + increment);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('contrast_adjust_0', 0.5, cameraId);
                // For the subindex being modified, use the new value incrementado
                values[1] = newValue;
                
                // Store new value specifically for this camera
                self.storeParamValue('contrast_adjust_1', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'contrast_adjust', valuesString);
            }
        };
        // Action to decrement Contrast Adjust: Adjust
        actions['set_contrast_adjust_1_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Contrast Adjust: Adjust',
            description: 'Decrease the value of Contrast Adjust: Adjust',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 0.1,
                    min: 0.1,
                    max: 2.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('contrast_adjust_1', 1.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(0.0, currentValue - decrement);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('contrast_adjust_0', 0.5, cameraId);
                // For the subindex being modified, use the new value decrementado
                values[1] = newValue;
                
                // Store new value specifically for this camera
                self.storeParamValue('contrast_adjust_1', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'contrast_adjust', valuesString);
            }
        };
        // Action to reset Contrast Adjust: Adjust al default value
        actions['set_contrast_adjust_1_reset'] = {
            name: 'ðŸ”„ Reset Contrast Adjust: Adjust',
            description: 'Reset to default value (1.00)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const resetValue = 1.0;
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('contrast_adjust_0', 0.5, cameraId);
                // For the subindex being reset, use its default value
                values[1] = resetValue;
                
                // Store default value specifically for this camera
                self.storeParamValue('contrast_adjust_1', resetValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'contrast_adjust', valuesString);
            }
        };
        // Action for Color Adjust (multiple subindexes)
        actions['set_color_adjust'] = {
            name: 'Set Color Adjust',
            description: 'Set values for Color Adjust',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Hue',
                    id: 'value0',
                    default: -1.0,
                    min: -1.0,
                    max: 1.0,
                    step: 0.1
                },
                {
                    type: 'number',
                    label: 'Saturation',
                    id: 'value1',
                    default: 1.0,
                    min: 0.0,
                    max: 2.0,
                    step: 0.1
                },
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const values = [];
                values[0] = event.options.value0;
                values[1] = event.options.value1;
                const valuesString = values.join(",");
                self.sendParam(cameraId, 'color_adjust', valuesString);
                
                // Store individual values for each subindex
                
                self.storeParamValue('color_adjust_0', event.options.value0, cameraId);
                self.storeParamValue('color_adjust_1', event.options.value1, cameraId);
            }
        };
        // Action to set onlyr Adjust: Hue
        actions['set_color_adjust_0'] = {
            name: 'Set Color Adjust: Hue',
            description: 'Set value for Color Adjust: Hue',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: -1.0,
                    min: -1.0,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const newValue = event.options.value;
                
                // Get current values or use SPECIFIC defaults
                const values = [];
                // For the subindex being modified, use the new value
                values[0] = newValue;
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('color_adjust_1', 1.0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('color_adjust_0', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'color_adjust', valuesString);
            }
        };
        // Action to increment Color Adjust: Hue
        actions['set_color_adjust_0_increment'] = {
            name: 'â¬†ï¸Â Increase Color Adjust: Hue',
            description: 'Increase the value of Color Adjust: Hue',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 0.1,
                    min: 0.1,
                    max: 2.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('color_adjust_0', -1.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(1.0, currentValue + increment);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For the subindex being modified, use the new value incrementado
                values[0] = newValue;
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('color_adjust_1', 1.0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('color_adjust_0', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'color_adjust', valuesString);
            }
        };
        // Action to decrement Color Adjust: Hue
        actions['set_color_adjust_0_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Color Adjust: Hue',
            description: 'Decrease the value of Color Adjust: Hue',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 0.1,
                    min: 0.1,
                    max: 2.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('color_adjust_0', -1.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(-1.0, currentValue - decrement);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For the subindex being modified, use the new value decrementado
                values[0] = newValue;
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('color_adjust_1', 1.0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('color_adjust_0', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'color_adjust', valuesString);
            }
        };
        // Action to reset Color Adjust: Hue al default value
        actions['set_color_adjust_0_reset'] = {
            name: 'ðŸ”„ Reset Color Adjust: Hue',
            description: 'Reset to default value (-1.00)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const resetValue = -1.0;
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For the subindex being reset, use its default value
                values[0] = resetValue;
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('color_adjust_1', 1.0, cameraId);
                
                // Store default value specifically for this camera
                self.storeParamValue('color_adjust_0', resetValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'color_adjust', valuesString);
            }
        };
        // Action to set onlyr Adjust: Saturation
        actions['set_color_adjust_1'] = {
            name: 'Set Color Adjust: Saturation',
            description: 'Set value for Color Adjust: Saturation',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: 1.0,
                    min: 0.0,
                    max: 2.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const newValue = event.options.value;
                
                // Get current values or use SPECIFIC defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('color_adjust_0', 0, cameraId);
                // For the subindex being modified, use the new value
                values[1] = newValue;
                
                // Store new value specifically for this camera
                self.storeParamValue('color_adjust_1', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'color_adjust', valuesString);
            }
        };
        // Action to increment Color Adjust: Saturation
        actions['set_color_adjust_1_increment'] = {
            name: 'â¬†ï¸Â Increase Color Adjust: Saturation',
            description: 'Increase the value of Color Adjust: Saturation',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 0.1,
                    min: 0.1,
                    max: 2.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('color_adjust_1', 1.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(2.0, currentValue + increment);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('color_adjust_0', 0, cameraId);
                // For the subindex being modified, use the new value incrementado
                values[1] = newValue;
                
                // Store new value specifically for this camera
                self.storeParamValue('color_adjust_1', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'color_adjust', valuesString);
            }
        };
        // Action to decrement Color Adjust: Saturation
        actions['set_color_adjust_1_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Color Adjust: Saturation',
            description: 'Decrease the value of Color Adjust: Saturation',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 0.1,
                    min: 0.1,
                    max: 2.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('color_adjust_1', 1.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(0.0, currentValue - decrement);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('color_adjust_0', 0, cameraId);
                // For the subindex being modified, use the new value decrementado
                values[1] = newValue;
                
                // Store new value specifically for this camera
                self.storeParamValue('color_adjust_1', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'color_adjust', valuesString);
            }
        };
        // Action to reset Color Adjust: Saturation al default value
        actions['set_color_adjust_1_reset'] = {
            name: 'ðŸ”„ Reset Color Adjust: Saturation',
            description: 'Reset to default value (1.00)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const resetValue = 1.0;
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('color_adjust_0', 0, cameraId);
                // For the subindex being reset, use its default value
                values[1] = resetValue;
                
                // Store default value specifically for this camera
                self.storeParamValue('color_adjust_1', resetValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'color_adjust', valuesString);
            }
        };
        // Action for Lift Adjust (multiple subindexes)
        actions['set_lift_adjust'] = {
            name: 'Set Lift Adjust',
            description: 'Set values for Lift Adjust',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Red',
                    id: 'value0',
                    default: -2.0,
                    min: -2.0,
                    max: 2.0,
                    step: 0.1
                },
                {
                    type: 'number',
                    label: 'Green',
                    id: 'value1',
                    default: -2.0,
                    min: -2.0,
                    max: 2.0,
                    step: 0.1
                },
                {
                    type: 'number',
                    label: 'Blue',
                    id: 'value2',
                    default: -2.0,
                    min: -2.0,
                    max: 2.0,
                    step: 0.1
                },
                {
                    type: 'number',
                    label: 'Luma',
                    id: 'value3',
                    default: -2.0,
                    min: -2.0,
                    max: 2.0,
                    step: 0.1
                },
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const values = [];
                values[0] = event.options.value0;
                values[1] = event.options.value1;
                values[2] = event.options.value2;
                values[3] = event.options.value3;
                const valuesString = values.join(",");
                self.sendParam(cameraId, 'lift_adjust', valuesString);
                
                // Store individual values for each subindex
                
                self.storeParamValue('lift_adjust_0', event.options.value0, cameraId);
                self.storeParamValue('lift_adjust_1', event.options.value1, cameraId);
                self.storeParamValue('lift_adjust_2', event.options.value2, cameraId);
                self.storeParamValue('lift_adjust_3', event.options.value3, cameraId);
            }
        };
        // Action to set only Lift Adjust: Red
        actions['set_lift_adjust_0'] = {
            name: 'Set Lift Adjust: Red',
            description: 'Set value for Lift Adjust: Red',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: -2.0,
                    min: -2.0,
                    max: 2.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const newValue = event.options.value;
                
                // Get current values or use SPECIFIC defaults
                const values = [];
                // For the subindex being modified, use the new value
                values[0] = newValue;
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('lift_adjust_1', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('lift_adjust_2', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('lift_adjust_3', 0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('lift_adjust_0', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'lift_adjust', valuesString);
            }
        };
        // Action to increment Lift Adjust: Red
        actions['set_lift_adjust_0_increment'] = {
            name: 'â¬†ï¸Â Increase Lift Adjust: Red',
            description: 'Increase the value of Lift Adjust: Red',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 0.1,
                    min: 0.1,
                    max: 4.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('lift_adjust_0', -2.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(2.0, currentValue + increment);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For the subindex being modified, use the new value incrementado
                values[0] = newValue;
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('lift_adjust_1', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('lift_adjust_2', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('lift_adjust_3', 0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('lift_adjust_0', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'lift_adjust', valuesString);
            }
        };
        // Action to decrement Lift Adjust: Red
        actions['set_lift_adjust_0_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Lift Adjust: Red',
            description: 'Decrease the value of Lift Adjust: Red',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 0.1,
                    min: 0.1,
                    max: 4.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('lift_adjust_0', -2.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(-2.0, currentValue - decrement);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For the subindex being modified, use the new value decrementado
                values[0] = newValue;
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('lift_adjust_1', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('lift_adjust_2', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('lift_adjust_3', 0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('lift_adjust_0', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'lift_adjust', valuesString);
            }
        };
        // Action to reset Lift Adjust: Red al default value
        actions['set_lift_adjust_0_reset'] = {
            name: 'ðŸ”„ Reset Lift Adjust: Red',
            description: 'Reset to default value (-2.00)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const resetValue = -2.0;
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For the subindex being reset, use its default value
                values[0] = resetValue;
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('lift_adjust_1', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('lift_adjust_2', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('lift_adjust_3', 0, cameraId);
                
                // Store default value specifically for this camera
                self.storeParamValue('lift_adjust_0', resetValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'lift_adjust', valuesString);
            }
        };
        // Action to set only Lift Adjust: Green
        actions['set_lift_adjust_1'] = {
            name: 'Set Lift Adjust: Green',
            description: 'Set value for Lift Adjust: Green',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: -2.0,
                    min: -2.0,
                    max: 2.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const newValue = event.options.value;
                
                // Get current values or use SPECIFIC defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('lift_adjust_0', 0, cameraId);
                // For the subindex being modified, use the new value
                values[1] = newValue;
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('lift_adjust_2', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('lift_adjust_3', 0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('lift_adjust_1', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'lift_adjust', valuesString);
            }
        };
        // Action to increment Lift Adjust: Green
        actions['set_lift_adjust_1_increment'] = {
            name: 'â¬†ï¸Â Increase Lift Adjust: Green',
            description: 'Increase the value of Lift Adjust: Green',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 0.1,
                    min: 0.1,
                    max: 4.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('lift_adjust_1', -2.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(2.0, currentValue + increment);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('lift_adjust_0', 0, cameraId);
                // For the subindex being modified, use the new value incrementado
                values[1] = newValue;
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('lift_adjust_2', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('lift_adjust_3', 0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('lift_adjust_1', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'lift_adjust', valuesString);
            }
        };
        // Action to decrement Lift Adjust: Green
        actions['set_lift_adjust_1_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Lift Adjust: Green',
            description: 'Decrease the value of Lift Adjust: Green',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 0.1,
                    min: 0.1,
                    max: 4.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('lift_adjust_1', -2.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(-2.0, currentValue - decrement);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('lift_adjust_0', 0, cameraId);
                // For the subindex being modified, use the new value decrementado
                values[1] = newValue;
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('lift_adjust_2', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('lift_adjust_3', 0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('lift_adjust_1', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'lift_adjust', valuesString);
            }
        };
        // Action to reset Lift Adjust: Green al default value
        actions['set_lift_adjust_1_reset'] = {
            name: 'ðŸ”„ Reset Lift Adjust: Green',
            description: 'Reset to default value (-2.00)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const resetValue = -2.0;
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('lift_adjust_0', 0, cameraId);
                // For the subindex being reset, use its default value
                values[1] = resetValue;
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('lift_adjust_2', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('lift_adjust_3', 0, cameraId);
                
                // Store default value specifically for this camera
                self.storeParamValue('lift_adjust_1', resetValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'lift_adjust', valuesString);
            }
        };
        // Action to set only Lift Adjust: Blue
        actions['set_lift_adjust_2'] = {
            name: 'Set Lift Adjust: Blue',
            description: 'Set value for Lift Adjust: Blue',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: -2.0,
                    min: -2.0,
                    max: 2.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const newValue = event.options.value;
                
                // Get current values or use SPECIFIC defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('lift_adjust_0', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('lift_adjust_1', 0, cameraId);
                // For the subindex being modified, use the new value
                values[2] = newValue;
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('lift_adjust_3', 0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('lift_adjust_2', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'lift_adjust', valuesString);
            }
        };
        // Action to increment Lift Adjust: Blue
        actions['set_lift_adjust_2_increment'] = {
            name: 'â¬†ï¸Â Increase Lift Adjust: Blue',
            description: 'Increase the value of Lift Adjust: Blue',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 0.1,
                    min: 0.1,
                    max: 4.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('lift_adjust_2', -2.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(2.0, currentValue + increment);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('lift_adjust_0', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('lift_adjust_1', 0, cameraId);
                // For the subindex being modified, use the new value incrementado
                values[2] = newValue;
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('lift_adjust_3', 0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('lift_adjust_2', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'lift_adjust', valuesString);
            }
        };
        // Action to decrement Lift Adjust: Blue
        actions['set_lift_adjust_2_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Lift Adjust: Blue',
            description: 'Decrease the value of Lift Adjust: Blue',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 0.1,
                    min: 0.1,
                    max: 4.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('lift_adjust_2', -2.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(-2.0, currentValue - decrement);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('lift_adjust_0', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('lift_adjust_1', 0, cameraId);
                // For the subindex being modified, use the new value decrementado
                values[2] = newValue;
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('lift_adjust_3', 0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('lift_adjust_2', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'lift_adjust', valuesString);
            }
        };
        // Action to reset Lift Adjust: Blue al default value
        actions['set_lift_adjust_2_reset'] = {
            name: 'ðŸ”„ Reset Lift Adjust: Blue',
            description: 'Reset to default value (-2.00)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const resetValue = -2.0;
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('lift_adjust_0', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('lift_adjust_1', 0, cameraId);
                // For the subindex being reset, use its default value
                values[2] = resetValue;
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('lift_adjust_3', 0, cameraId);
                
                // Store default value specifically for this camera
                self.storeParamValue('lift_adjust_2', resetValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'lift_adjust', valuesString);
            }
        };
        // Action to set only Lift Adjust: Luma
        actions['set_lift_adjust_3'] = {
            name: 'Set Lift Adjust: Luma',
            description: 'Set value for Lift Adjust: Luma',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: -2.0,
                    min: -2.0,
                    max: 2.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const newValue = event.options.value;
                
                // Get current values or use SPECIFIC defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('lift_adjust_0', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('lift_adjust_1', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('lift_adjust_2', 0, cameraId);
                // For the subindex being modified, use the new value
                values[3] = newValue;
                
                // Store new value specifically for this camera
                self.storeParamValue('lift_adjust_3', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'lift_adjust', valuesString);
            }
        };
        // Action to increment Lift Adjust: Luma
        actions['set_lift_adjust_3_increment'] = {
            name: 'â¬†ï¸Â Increase Lift Adjust: Luma',
            description: 'Increase the value of Lift Adjust: Luma',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 0.1,
                    min: 0.1,
                    max: 4.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('lift_adjust_3', -2.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(2.0, currentValue + increment);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('lift_adjust_0', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('lift_adjust_1', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('lift_adjust_2', 0, cameraId);
                // For the subindex being modified, use the new value incrementado
                values[3] = newValue;
                
                // Store new value specifically for this camera
                self.storeParamValue('lift_adjust_3', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'lift_adjust', valuesString);
            }
        };
        // Action to decrement Lift Adjust: Luma
        actions['set_lift_adjust_3_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Lift Adjust: Luma',
            description: 'Decrease the value of Lift Adjust: Luma',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 0.1,
                    min: 0.1,
                    max: 4.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('lift_adjust_3', -2.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(-2.0, currentValue - decrement);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('lift_adjust_0', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('lift_adjust_1', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('lift_adjust_2', 0, cameraId);
                // For the subindex being modified, use the new value decrementado
                values[3] = newValue;
                
                // Store new value specifically for this camera
                self.storeParamValue('lift_adjust_3', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'lift_adjust', valuesString);
            }
        };
        // Action to reset Lift Adjust: Luma al default value
        actions['set_lift_adjust_3_reset'] = {
            name: 'ðŸ”„ Reset Lift Adjust: Luma',
            description: 'Reset to default value (-2.00)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const resetValue = -2.0;
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('lift_adjust_0', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('lift_adjust_1', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('lift_adjust_2', 0, cameraId);
                // For the subindex being reset, use its default value
                values[3] = resetValue;
                
                // Store default value specifically for this camera
                self.storeParamValue('lift_adjust_3', resetValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'lift_adjust', valuesString);
            }
        };
        // Action for Gamultiple subindexes)
        actions['set_gamma_adjust'] = {
            name: 'Set Gamma Adjust',
            description: 'Set values for Gamma Adjust',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Red',
                    id: 'value0',
                    default: -4.0,
                    min: -4.0,
                    max: 4.0,
                    step: 0.1
                },
                {
                    type: 'number',
                    label: 'Green',
                    id: 'value1',
                    default: -4.0,
                    min: -4.0,
                    max: 4.0,
                    step: 0.1
                },
                {
                    type: 'number',
                    label: 'Blue',
                    id: 'value2',
                    default: -4.0,
                    min: -4.0,
                    max: 4.0,
                    step: 0.1
                },
                {
                    type: 'number',
                    label: 'Luma',
                    id: 'value3',
                    default: -4.0,
                    min: -4.0,
                    max: 4.0,
                    step: 0.1
                },
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const values = [];
                values[0] = event.options.value0;
                values[1] = event.options.value1;
                values[2] = event.options.value2;
                values[3] = event.options.value3;
                const valuesString = values.join(",");
                self.sendParam(cameraId, 'gamma_adjust', valuesString);
                
                // Store individual values for each subindex
                
                self.storeParamValue('gamma_adjust_0', event.options.value0, cameraId);
                self.storeParamValue('gamma_adjust_1', event.options.value1, cameraId);
                self.storeParamValue('gamma_adjust_2', event.options.value2, cameraId);
                self.storeParamValue('gamma_adjust_3', event.options.value3, cameraId);
            }
        };
        // Action to set only Gamma Adjust: Red
        actions['set_gamma_adjust_0'] = {
            name: 'Set Gamma Adjust: Red',
            description: 'Set value for Gamma Adjust: Red',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: -4.0,
                    min: -4.0,
                    max: 4.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const newValue = event.options.value;
                
                // Get current values or use SPECIFIC defaults
                const values = [];
                // For the subindex being modified, use the new value
                values[0] = newValue;
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('gamma_adjust_1', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('gamma_adjust_2', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('gamma_adjust_3', 0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('gamma_adjust_0', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'gamma_adjust', valuesString);
            }
        };
        // Action to increment Gamma Adjust: Red
        actions['set_gamma_adjust_0_increment'] = {
            name: 'â¬†ï¸Â Increase Gamma Adjust: Red',
            description: 'Increase the value of Gamma Adjust: Red',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 0.1,
                    min: 0.1,
                    max: 8.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('gamma_adjust_0', -4.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(4.0, currentValue + increment);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For the subindex being modified, use the new value incrementado
                values[0] = newValue;
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('gamma_adjust_1', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('gamma_adjust_2', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('gamma_adjust_3', 0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('gamma_adjust_0', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'gamma_adjust', valuesString);
            }
        };
        // Action to decrement Gamma Adjust: Red
        actions['set_gamma_adjust_0_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Gamma Adjust: Red',
            description: 'Decrease the value of Gamma Adjust: Red',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 0.1,
                    min: 0.1,
                    max: 8.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('gamma_adjust_0', -4.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(-4.0, currentValue - decrement);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For the subindex being modified, use the new value decrementado
                values[0] = newValue;
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('gamma_adjust_1', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('gamma_adjust_2', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('gamma_adjust_3', 0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('gamma_adjust_0', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'gamma_adjust', valuesString);
            }
        };
        // Action to reset Gamma Adjust: Red al default value
        actions['set_gamma_adjust_0_reset'] = {
            name: 'ðŸ”„ Reset Gamma Adjust: Red',
            description: 'Reset to default value (-4.00)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const resetValue = -4.0;
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For the subindex being reset, use its default value
                values[0] = resetValue;
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('gamma_adjust_1', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('gamma_adjust_2', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('gamma_adjust_3', 0, cameraId);
                
                // Store default value specifically for this camera
                self.storeParamValue('gamma_adjust_0', resetValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'gamma_adjust', valuesString);
            }
        };
        // Action to set only Gamma Adjust: Green
        actions['set_gamma_adjust_1'] = {
            name: 'Set Gamma Adjust: Green',
            description: 'Set value for Gamma Adjust: Green',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: -4.0,
                    min: -4.0,
                    max: 4.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const newValue = event.options.value;
                
                // Get current values or use SPECIFIC defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('gamma_adjust_0', 0, cameraId);
                // For the subindex being modified, use the new value
                values[1] = newValue;
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('gamma_adjust_2', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('gamma_adjust_3', 0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('gamma_adjust_1', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'gamma_adjust', valuesString);
            }
        };
        // Action to increment Gamma Adjust: Green
        actions['set_gamma_adjust_1_increment'] = {
            name: 'â¬†ï¸Â Increase Gamma Adjust: Green',
            description: 'Increase the value of Gamma Adjust: Green',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 0.1,
                    min: 0.1,
                    max: 8.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('gamma_adjust_1', -4.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(4.0, currentValue + increment);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('gamma_adjust_0', 0, cameraId);
                // For the subindex being modified, use the new value incrementado
                values[1] = newValue;
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('gamma_adjust_2', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('gamma_adjust_3', 0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('gamma_adjust_1', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'gamma_adjust', valuesString);
            }
        };
        // Action to decrement Gamma Adjust: Green
        actions['set_gamma_adjust_1_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Gamma Adjust: Green',
            description: 'Decrease the value of Gamma Adjust: Green',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 0.1,
                    min: 0.1,
                    max: 8.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('gamma_adjust_1', -4.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(-4.0, currentValue - decrement);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('gamma_adjust_0', 0, cameraId);
                // For the subindex being modified, use the new value decrementado
                values[1] = newValue;
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('gamma_adjust_2', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('gamma_adjust_3', 0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('gamma_adjust_1', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'gamma_adjust', valuesString);
            }
        };
        // Action to reset Gamma Adjust: Green al default value
        actions['set_gamma_adjust_1_reset'] = {
            name: 'ðŸ”„ Reset Gamma Adjust: Green',
            description: 'Reset to default value (-4.00)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const resetValue = -4.0;
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('gamma_adjust_0', 0, cameraId);
                // For the subindex being reset, use its default value
                values[1] = resetValue;
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('gamma_adjust_2', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('gamma_adjust_3', 0, cameraId);
                
                // Store default value specifically for this camera
                self.storeParamValue('gamma_adjust_1', resetValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'gamma_adjust', valuesString);
            }
        };
        // Action to set only Gamma Adjust: Blue
        actions['set_gamma_adjust_2'] = {
            name: 'Set Gamma Adjust: Blue',
            description: 'Set value for Gamma Adjust: Blue',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: -4.0,
                    min: -4.0,
                    max: 4.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const newValue = event.options.value;
                
                // Get current values or use SPECIFIC defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('gamma_adjust_0', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('gamma_adjust_1', 0, cameraId);
                // For the subindex being modified, use the new value
                values[2] = newValue;
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('gamma_adjust_3', 0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('gamma_adjust_2', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'gamma_adjust', valuesString);
            }
        };
        // Action to increment Gamma Adjust: Blue
        actions['set_gamma_adjust_2_increment'] = {
            name: 'â¬†ï¸Â Increase Gamma Adjust: Blue',
            description: 'Increase the value of Gamma Adjust: Blue',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 0.1,
                    min: 0.1,
                    max: 8.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('gamma_adjust_2', -4.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(4.0, currentValue + increment);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('gamma_adjust_0', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('gamma_adjust_1', 0, cameraId);
                // For the subindex being modified, use the new value incrementado
                values[2] = newValue;
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('gamma_adjust_3', 0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('gamma_adjust_2', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'gamma_adjust', valuesString);
            }
        };
        // Action to decrement Gamma Adjust: Blue
        actions['set_gamma_adjust_2_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Gamma Adjust: Blue',
            description: 'Decrease the value of Gamma Adjust: Blue',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 0.1,
                    min: 0.1,
                    max: 8.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('gamma_adjust_2', -4.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(-4.0, currentValue - decrement);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('gamma_adjust_0', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('gamma_adjust_1', 0, cameraId);
                // For the subindex being modified, use the new value decrementado
                values[2] = newValue;
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('gamma_adjust_3', 0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('gamma_adjust_2', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'gamma_adjust', valuesString);
            }
        };
        // Action to reset Gamma Adjust: Blue al default value
        actions['set_gamma_adjust_2_reset'] = {
            name: 'ðŸ”„ Reset Gamma Adjust: Blue',
            description: 'Reset to default value (-4.00)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const resetValue = -4.0;
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('gamma_adjust_0', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('gamma_adjust_1', 0, cameraId);
                // For the subindex being reset, use its default value
                values[2] = resetValue;
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('gamma_adjust_3', 0, cameraId);
                
                // Store default value specifically for this camera
                self.storeParamValue('gamma_adjust_2', resetValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'gamma_adjust', valuesString);
            }
        };
        // Action to set only Gamma Adjust: Luma
        actions['set_gamma_adjust_3'] = {
            name: 'Set Gamma Adjust: Luma',
            description: 'Set value for Gamma Adjust: Luma',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: -4.0,
                    min: -4.0,
                    max: 4.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const newValue = event.options.value;
                
                // Get current values or use SPECIFIC defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('gamma_adjust_0', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('gamma_adjust_1', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('gamma_adjust_2', 0, cameraId);
                // For the subindex being modified, use the new value
                values[3] = newValue;
                
                // Store new value specifically for this camera
                self.storeParamValue('gamma_adjust_3', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'gamma_adjust', valuesString);
            }
        };
        // Action to increment Gamma Adjust: Luma
        actions['set_gamma_adjust_3_increment'] = {
            name: 'â¬†ï¸Â Increase Gamma Adjust: Luma',
            description: 'Increase the value of Gamma Adjust: Luma',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 0.1,
                    min: 0.1,
                    max: 8.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('gamma_adjust_3', -4.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(4.0, currentValue + increment);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('gamma_adjust_0', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('gamma_adjust_1', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('gamma_adjust_2', 0, cameraId);
                // For the subindex being modified, use the new value incrementado
                values[3] = newValue;
                
                // Store new value specifically for this camera
                self.storeParamValue('gamma_adjust_3', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'gamma_adjust', valuesString);
            }
        };
        // Action to decrement Gamma Adjust: Luma
        actions['set_gamma_adjust_3_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Gamma Adjust: Luma',
            description: 'Decrease the value of Gamma Adjust: Luma',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 0.1,
                    min: 0.1,
                    max: 8.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('gamma_adjust_3', -4.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(-4.0, currentValue - decrement);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('gamma_adjust_0', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('gamma_adjust_1', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('gamma_adjust_2', 0, cameraId);
                // For the subindex being modified, use the new value decrementado
                values[3] = newValue;
                
                // Store new value specifically for this camera
                self.storeParamValue('gamma_adjust_3', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'gamma_adjust', valuesString);
            }
        };
        // Action to reset Gamma Adjust: Luma al default value
        actions['set_gamma_adjust_3_reset'] = {
            name: 'ðŸ”„ Reset Gamma Adjust: Luma',
            description: 'Reset to default value (-4.00)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const resetValue = -4.0;
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('gamma_adjust_0', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('gamma_adjust_1', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('gamma_adjust_2', 0, cameraId);
                // For the subindex being reset, use its default value
                values[3] = resetValue;
                
                // Store default value specifically for this camera
                self.storeParamValue('gamma_adjust_3', resetValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'gamma_adjust', valuesString);
            }
        };
        // Action for Gain Adjust (multiple subindexes)
        actions['set_gain_adjust'] = {
            name: 'Set Gain Adjust',
            description: 'Set values for Gain Adjust',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Red',
                    id: 'value0',
                    default: 1.0,
                    min: 0.0,
                    max: 16.0,
                    step: 0.1
                },
                {
                    type: 'number',
                    label: 'Green',
                    id: 'value1',
                    default: 1.0,
                    min: 0.0,
                    max: 16.0,
                    step: 0.1
                },
                {
                    type: 'number',
                    label: 'Blue',
                    id: 'value2',
                    default: 1.0,
                    min: 0.0,
                    max: 16.0,
                    step: 0.1
                },
                {
                    type: 'number',
                    label: 'Luma',
                    id: 'value3',
                    default: 1.0,
                    min: 0.0,
                    max: 16.0,
                    step: 0.1
                },
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const values = [];
                values[0] = event.options.value0;
                values[1] = event.options.value1;
                values[2] = event.options.value2;
                values[3] = event.options.value3;
                const valuesString = values.join(",");
                self.sendParam(cameraId, 'gain_adjust', valuesString);
                
                // Store individual values for each subindex
                
                self.storeParamValue('gain_adjust_0', event.options.value0, cameraId);
                self.storeParamValue('gain_adjust_1', event.options.value1, cameraId);
                self.storeParamValue('gain_adjust_2', event.options.value2, cameraId);
                self.storeParamValue('gain_adjust_3', event.options.value3, cameraId);
            }
        };
        // Action to set only Gain Adjust: Red
        actions['set_gain_adjust_0'] = {
            name: 'Set Gain Adjust: Red',
            description: 'Set value for Gain Adjust: Red',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: 1.0,
                    min: 0.0,
                    max: 16.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const newValue = event.options.value;
                
                // Get current values or use SPECIFIC defaults
                const values = [];
                // For the subindex being modified, use the new value
                values[0] = newValue;
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('gain_adjust_1', 1.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('gain_adjust_2', 1.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('gain_adjust_3', 1.0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('gain_adjust_0', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'gain_adjust', valuesString);
            }
        };
        // Action to increment Gain Adjust: Red
        actions['set_gain_adjust_0_increment'] = {
            name: 'â¬†ï¸Â Increase Gain Adjust: Red',
            description: 'Increase the value of Gain Adjust: Red',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 0.1,
                    min: 0.1,
                    max: 16.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('gain_adjust_0', 1.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(16.0, currentValue + increment);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For the subindex being modified, use the new value incrementado
                values[0] = newValue;
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('gain_adjust_1', 1.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('gain_adjust_2', 1.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('gain_adjust_3', 1.0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('gain_adjust_0', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'gain_adjust', valuesString);
            }
        };
        // Action to decrement Gain Adjust: Red
        actions['set_gain_adjust_0_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Gain Adjust: Red',
            description: 'Decrease the value of Gain Adjust: Red',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 0.1,
                    min: 0.1,
                    max: 16.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('gain_adjust_0', 1.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(0.0, currentValue - decrement);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For the subindex being modified, use the new value decrementado
                values[0] = newValue;
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('gain_adjust_1', 1.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('gain_adjust_2', 1.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('gain_adjust_3', 1.0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('gain_adjust_0', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'gain_adjust', valuesString);
            }
        };
        // Action to reset Gain Adjust: Red al default value
        actions['set_gain_adjust_0_reset'] = {
            name: 'ðŸ”„ Reset Gain Adjust: Red',
            description: 'Reset to default value (1.00)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const resetValue = 1.0;
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For the subindex being reset, use its default value
                values[0] = resetValue;
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('gain_adjust_1', 1.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('gain_adjust_2', 1.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('gain_adjust_3', 1.0, cameraId);
                
                // Store default value specifically for this camera
                self.storeParamValue('gain_adjust_0', resetValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'gain_adjust', valuesString);
            }
        };
        // Action to set only Gain Adjust: Green
        actions['set_gain_adjust_1'] = {
            name: 'Set Gain Adjust: Green',
            description: 'Set value for Gain Adjust: Green',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: 1.0,
                    min: 0.0,
                    max: 16.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const newValue = event.options.value;
                
                // Get current values or use SPECIFIC defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('gain_adjust_0', 1.0, cameraId);
                // For the subindex being modified, use the new value
                values[1] = newValue;
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('gain_adjust_2', 1.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('gain_adjust_3', 1.0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('gain_adjust_1', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'gain_adjust', valuesString);
            }
        };
        // Action to increment Gain Adjust: Green
        actions['set_gain_adjust_1_increment'] = {
            name: 'â¬†ï¸Â Increase Gain Adjust: Green',
            description: 'Increase the value of Gain Adjust: Green',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 0.1,
                    min: 0.1,
                    max: 16.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('gain_adjust_1', 1.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(16.0, currentValue + increment);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('gain_adjust_0', 1.0, cameraId);
                // For the subindex being modified, use the new value incrementado
                values[1] = newValue;
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('gain_adjust_2', 1.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('gain_adjust_3', 1.0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('gain_adjust_1', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'gain_adjust', valuesString);
            }
        };
        // Action to decrement Gain Adjust: Green
        actions['set_gain_adjust_1_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Gain Adjust: Green',
            description: 'Decrease the value of Gain Adjust: Green',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 0.1,
                    min: 0.1,
                    max: 16.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('gain_adjust_1', 1.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(0.0, currentValue - decrement);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('gain_adjust_0', 1.0, cameraId);
                // For the subindex being modified, use the new value decrementado
                values[1] = newValue;
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('gain_adjust_2', 1.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('gain_adjust_3', 1.0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('gain_adjust_1', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'gain_adjust', valuesString);
            }
        };
        // Action to reset Gain Adjust: Green al default value
        actions['set_gain_adjust_1_reset'] = {
            name: 'ðŸ”„ Reset Gain Adjust: Green',
            description: 'Reset to default value (1.00)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const resetValue = 1.0;
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('gain_adjust_0', 1.0, cameraId);
                // For the subindex being reset, use its default value
                values[1] = resetValue;
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('gain_adjust_2', 1.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('gain_adjust_3', 1.0, cameraId);
                
                // Store default value specifically for this camera
                self.storeParamValue('gain_adjust_1', resetValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'gain_adjust', valuesString);
            }
        };
        // Action to set only Gain Adjust: Blue
        actions['set_gain_adjust_2'] = {
            name: 'Set Gain Adjust: Blue',
            description: 'Set value for Gain Adjust: Blue',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: 1.0,
                    min: 0.0,
                    max: 16.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const newValue = event.options.value;
                
                // Get current values or use SPECIFIC defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('gain_adjust_0', 1.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('gain_adjust_1', 1.0, cameraId);
                // For the subindex being modified, use the new value
                values[2] = newValue;
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('gain_adjust_3', 1.0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('gain_adjust_2', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'gain_adjust', valuesString);
            }
        };
        // Action to increment Gain Adjust: Blue
        actions['set_gain_adjust_2_increment'] = {
            name: 'â¬†ï¸Â Increase Gain Adjust: Blue',
            description: 'Increase the value of Gain Adjust: Blue',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 0.1,
                    min: 0.1,
                    max: 16.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('gain_adjust_2', 1.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(16.0, currentValue + increment);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('gain_adjust_0', 1.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('gain_adjust_1', 1.0, cameraId);
                // For the subindex being modified, use the new value incrementado
                values[2] = newValue;
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('gain_adjust_3', 1.0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('gain_adjust_2', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'gain_adjust', valuesString);
            }
        };
        // Action to decrement Gain Adjust: Blue
        actions['set_gain_adjust_2_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Gain Adjust: Blue',
            description: 'Decrease the value of Gain Adjust: Blue',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 0.1,
                    min: 0.1,
                    max: 16.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('gain_adjust_2', 1.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(0.0, currentValue - decrement);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('gain_adjust_0', 1.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('gain_adjust_1', 1.0, cameraId);
                // For the subindex being modified, use the new value decrementado
                values[2] = newValue;
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('gain_adjust_3', 1.0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('gain_adjust_2', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'gain_adjust', valuesString);
            }
        };
        // Action to reset Gain Adjust: Blue al default value
        actions['set_gain_adjust_2_reset'] = {
            name: 'ðŸ”„ Reset Gain Adjust: Blue',
            description: 'Reset to default value (1.00)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const resetValue = 1.0;
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('gain_adjust_0', 1.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('gain_adjust_1', 1.0, cameraId);
                // For the subindex being reset, use its default value
                values[2] = resetValue;
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('gain_adjust_3', 1.0, cameraId);
                
                // Store default value specifically for this camera
                self.storeParamValue('gain_adjust_2', resetValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'gain_adjust', valuesString);
            }
        };
        // Action to set only Gain Adjust: Luma
        actions['set_gain_adjust_3'] = {
            name: 'Set Gain Adjust: Luma',
            description: 'Set value for Gain Adjust: Luma',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: 1.0,
                    min: 0.0,
                    max: 16.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const newValue = event.options.value;
                
                // Get current values or use SPECIFIC defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('gain_adjust_0', 1.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('gain_adjust_1', 1.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('gain_adjust_2', 1.0, cameraId);
                // For the subindex being modified, use the new value
                values[3] = newValue;
                
                // Store new value specifically for this camera
                self.storeParamValue('gain_adjust_3', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'gain_adjust', valuesString);
            }
        };
        // Action to increment Gain Adjust: Luma
        actions['set_gain_adjust_3_increment'] = {
            name: 'â¬†ï¸Â Increase Gain Adjust: Luma',
            description: 'Increase the value of Gain Adjust: Luma',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 0.1,
                    min: 0.1,
                    max: 16.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('gain_adjust_3', 1.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(16.0, currentValue + increment);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('gain_adjust_0', 1.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('gain_adjust_1', 1.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('gain_adjust_2', 1.0, cameraId);
                // For the subindex being modified, use the new value incrementado
                values[3] = newValue;
                
                // Store new value specifically for this camera
                self.storeParamValue('gain_adjust_3', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'gain_adjust', valuesString);
            }
        };
        // Action to decrement Gain Adjust: Luma
        actions['set_gain_adjust_3_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Gain Adjust: Luma',
            description: 'Decrease the value of Gain Adjust: Luma',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 0.1,
                    min: 0.1,
                    max: 16.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('gain_adjust_3', 1.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(0.0, currentValue - decrement);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('gain_adjust_0', 1.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('gain_adjust_1', 1.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('gain_adjust_2', 1.0, cameraId);
                // For the subindex being modified, use the new value decrementado
                values[3] = newValue;
                
                // Store new value specifically for this camera
                self.storeParamValue('gain_adjust_3', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'gain_adjust', valuesString);
            }
        };
        // Action to reset Gain Adjust: Luma al default value
        actions['set_gain_adjust_3_reset'] = {
            name: 'ðŸ”„ Reset Gain Adjust: Luma',
            description: 'Reset to default value (1.00)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const resetValue = 1.0;
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('gain_adjust_0', 1.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('gain_adjust_1', 1.0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('gain_adjust_2', 1.0, cameraId);
                // For the subindex being reset, use its default value
                values[3] = resetValue;
                
                // Store default value specifically for this camera
                self.storeParamValue('gain_adjust_3', resetValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'gain_adjust', valuesString);
            }
        };
        // Action for Offset Adjust (multiple subindexes)
        actions['set_offset_adjust'] = {
            name: 'Set Offset Adjust',
            description: 'Set values for Offset Adjust',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Red',
                    id: 'value0',
                    default: -8.0,
                    min: -8.0,
                    max: 8.0,
                    step: 0.1
                },
                {
                    type: 'number',
                    label: 'Green',
                    id: 'value1',
                    default: -8.0,
                    min: -8.0,
                    max: 8.0,
                    step: 0.1
                },
                {
                    type: 'number',
                    label: 'Blue',
                    id: 'value2',
                    default: -8.0,
                    min: -8.0,
                    max: 8.0,
                    step: 0.1
                },
                {
                    type: 'number',
                    label: 'Luma',
                    id: 'value3',
                    default: -8.0,
                    min: -8.0,
                    max: 8.0,
                    step: 0.1
                },
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const values = [];
                values[0] = event.options.value0;
                values[1] = event.options.value1;
                values[2] = event.options.value2;
                values[3] = event.options.value3;
                const valuesString = values.join(",");
                self.sendParam(cameraId, 'offset_adjust', valuesString);
                
                // Store individual values for each subindex
                
                self.storeParamValue('offset_adjust_0', event.options.value0, cameraId);
                self.storeParamValue('offset_adjust_1', event.options.value1, cameraId);
                self.storeParamValue('offset_adjust_2', event.options.value2, cameraId);
                self.storeParamValue('offset_adjust_3', event.options.value3, cameraId);
            }
        };
        // Action to set only Offset Adjust: Red
        actions['set_offset_adjust_0'] = {
            name: 'Set Offset Adjust: Red',
            description: 'Set value for Offset Adjust: Red',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: -8.0,
                    min: -8.0,
                    max: 8.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const newValue = event.options.value;
                
                // Get current values or use SPECIFIC defaults
                const values = [];
                // For the subindex being modified, use the new value
                values[0] = newValue;
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('offset_adjust_1', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('offset_adjust_2', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('offset_adjust_3', 0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('offset_adjust_0', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'offset_adjust', valuesString);
            }
        };
        // Action to increment Offset Adjust: Red
        actions['set_offset_adjust_0_increment'] = {
            name: 'â¬†ï¸Â Increase Offset Adjust: Red',
            description: 'Increase the value of Offset Adjust: Red',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 0.1,
                    min: 0.1,
                    max: 16.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('offset_adjust_0', -8.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(8.0, currentValue + increment);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For the subindex being modified, use the new value incrementado
                values[0] = newValue;
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('offset_adjust_1', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('offset_adjust_2', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('offset_adjust_3', 0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('offset_adjust_0', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'offset_adjust', valuesString);
            }
        };
        // Action to decrement Offset Adjust: Red
        actions['set_offset_adjust_0_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Offset Adjust: Red',
            description: 'Decrease the value of Offset Adjust: Red',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 0.1,
                    min: 0.1,
                    max: 16.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('offset_adjust_0', -8.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(-8.0, currentValue - decrement);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For the subindex being modified, use the new value decrementado
                values[0] = newValue;
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('offset_adjust_1', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('offset_adjust_2', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('offset_adjust_3', 0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('offset_adjust_0', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'offset_adjust', valuesString);
            }
        };
        // Action to reset Offset Adjust: Red al default value
        actions['set_offset_adjust_0_reset'] = {
            name: 'ðŸ”„ Reset Offset Adjust: Red',
            description: 'Reset to default value (-8.00)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const resetValue = -8.0;
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For the subindex being reset, use its default value
                values[0] = resetValue;
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('offset_adjust_1', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('offset_adjust_2', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('offset_adjust_3', 0, cameraId);
                
                // Store default value specifically for this camera
                self.storeParamValue('offset_adjust_0', resetValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'offset_adjust', valuesString);
            }
        };
        // Action to set only Offset Adjust: Green
        actions['set_offset_adjust_1'] = {
            name: 'Set Offset Adjust: Green',
            description: 'Set value for Offset Adjust: Green',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: -8.0,
                    min: -8.0,
                    max: 8.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const newValue = event.options.value;
                
                // Get current values or use SPECIFIC defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('offset_adjust_0', 0, cameraId);
                // For the subindex being modified, use the new value
                values[1] = newValue;
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('offset_adjust_2', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('offset_adjust_3', 0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('offset_adjust_1', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'offset_adjust', valuesString);
            }
        };
        // Action to increment Offset Adjust: Green
        actions['set_offset_adjust_1_increment'] = {
            name: 'â¬†ï¸Â Increase Offset Adjust: Green',
            description: 'Increase the value of Offset Adjust: Green',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 0.1,
                    min: 0.1,
                    max: 16.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('offset_adjust_1', -8.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(8.0, currentValue + increment);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('offset_adjust_0', 0, cameraId);
                // For the subindex being modified, use the new value incrementado
                values[1] = newValue;
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('offset_adjust_2', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('offset_adjust_3', 0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('offset_adjust_1', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'offset_adjust', valuesString);
            }
        };
        // Action to decrement Offset Adjust: Green
        actions['set_offset_adjust_1_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Offset Adjust: Green',
            description: 'Decrease the value of Offset Adjust: Green',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 0.1,
                    min: 0.1,
                    max: 16.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('offset_adjust_1', -8.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(-8.0, currentValue - decrement);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('offset_adjust_0', 0, cameraId);
                // For the subindex being modified, use the new value decrementado
                values[1] = newValue;
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('offset_adjust_2', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('offset_adjust_3', 0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('offset_adjust_1', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'offset_adjust', valuesString);
            }
        };
        // Action to reset Offset Adjust: Green al default value
        actions['set_offset_adjust_1_reset'] = {
            name: 'ðŸ”„ Reset Offset Adjust: Green',
            description: 'Reset to default value (-8.00)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const resetValue = -8.0;
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('offset_adjust_0', 0, cameraId);
                // For the subindex being reset, use its default value
                values[1] = resetValue;
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('offset_adjust_2', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('offset_adjust_3', 0, cameraId);
                
                // Store default value specifically for this camera
                self.storeParamValue('offset_adjust_1', resetValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'offset_adjust', valuesString);
            }
        };
        // Action to set only Offset Adjust: Blue
        actions['set_offset_adjust_2'] = {
            name: 'Set Offset Adjust: Blue',
            description: 'Set value for Offset Adjust: Blue',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: -8.0,
                    min: -8.0,
                    max: 8.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const newValue = event.options.value;
                
                // Get current values or use SPECIFIC defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('offset_adjust_0', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('offset_adjust_1', 0, cameraId);
                // For the subindex being modified, use the new value
                values[2] = newValue;
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('offset_adjust_3', 0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('offset_adjust_2', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'offset_adjust', valuesString);
            }
        };
        // Action to increment Offset Adjust: Blue
        actions['set_offset_adjust_2_increment'] = {
            name: 'â¬†ï¸Â Increase Offset Adjust: Blue',
            description: 'Increase the value of Offset Adjust: Blue',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 0.1,
                    min: 0.1,
                    max: 16.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('offset_adjust_2', -8.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(8.0, currentValue + increment);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('offset_adjust_0', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('offset_adjust_1', 0, cameraId);
                // For the subindex being modified, use the new value incrementado
                values[2] = newValue;
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('offset_adjust_3', 0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('offset_adjust_2', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'offset_adjust', valuesString);
            }
        };
        // Action to decrement Offset Adjust: Blue
        actions['set_offset_adjust_2_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Offset Adjust: Blue',
            description: 'Decrease the value of Offset Adjust: Blue',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 0.1,
                    min: 0.1,
                    max: 16.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('offset_adjust_2', -8.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(-8.0, currentValue - decrement);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('offset_adjust_0', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('offset_adjust_1', 0, cameraId);
                // For the subindex being modified, use the new value decrementado
                values[2] = newValue;
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('offset_adjust_3', 0, cameraId);
                
                // Store new value specifically for this camera
                self.storeParamValue('offset_adjust_2', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'offset_adjust', valuesString);
            }
        };
        // Action to reset Offset Adjust: Blue al default value
        actions['set_offset_adjust_2_reset'] = {
            name: 'ðŸ”„ Reset Offset Adjust: Blue',
            description: 'Reset to default value (-8.00)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const resetValue = -8.0;
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('offset_adjust_0', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('offset_adjust_1', 0, cameraId);
                // For the subindex being reset, use its default value
                values[2] = resetValue;
                // For other subindexes, get current value or use their specific default
                values[3] = self.getParamValue('offset_adjust_3', 0, cameraId);
                
                // Store default value specifically for this camera
                self.storeParamValue('offset_adjust_2', resetValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'offset_adjust', valuesString);
            }
        };
        // Action to set only Offset Adjust: Luma
        actions['set_offset_adjust_3'] = {
            name: 'Set Offset Adjust: Luma',
            description: 'Set value for Offset Adjust: Luma',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: -8.0,
                    min: -8.0,
                    max: 8.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const newValue = event.options.value;
                
                // Get current values or use SPECIFIC defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('offset_adjust_0', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('offset_adjust_1', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('offset_adjust_2', 0, cameraId);
                // For the subindex being modified, use the new value
                values[3] = newValue;
                
                // Store new value specifically for this camera
                self.storeParamValue('offset_adjust_3', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'offset_adjust', valuesString);
            }
        };
        // Action to increment Offset Adjust: Luma
        actions['set_offset_adjust_3_increment'] = {
            name: 'â¬†ï¸Â Increase Offset Adjust: Luma',
            description: 'Increase the value of Offset Adjust: Luma',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 0.1,
                    min: 0.1,
                    max: 16.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('offset_adjust_3', -8.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(8.0, currentValue + increment);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('offset_adjust_0', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('offset_adjust_1', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('offset_adjust_2', 0, cameraId);
                // For the subindex being modified, use the new value incrementado
                values[3] = newValue;
                
                // Store new value specifically for this camera
                self.storeParamValue('offset_adjust_3', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'offset_adjust', valuesString);
            }
        };
        // Action to decrement Offset Adjust: Luma
        actions['set_offset_adjust_3_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Offset Adjust: Luma',
            description: 'Decrease the value of Offset Adjust: Luma',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 0.1,
                    min: 0.1,
                    max: 16.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('offset_adjust_3', -8.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(-8.0, currentValue - decrement);
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('offset_adjust_0', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('offset_adjust_1', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('offset_adjust_2', 0, cameraId);
                // For the subindex being modified, use the new value decrementado
                values[3] = newValue;
                
                // Store new value specifically for this camera
                self.storeParamValue('offset_adjust_3', newValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'offset_adjust', valuesString);
            }
        };
        // Action to reset Offset Adjust: Luma al default value
        actions['set_offset_adjust_3_reset'] = {
            name: 'ðŸ”„ Reset Offset Adjust: Luma',
            description: 'Reset to default value (-8.00)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const resetValue = -8.0;
                
                // Get current values for other subindexes with their specific defaults
                const values = [];
                // For other subindexes, get current value or use their specific default
                values[0] = self.getParamValue('offset_adjust_0', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[1] = self.getParamValue('offset_adjust_1', 0, cameraId);
                // For other subindexes, get current value or use their specific default
                values[2] = self.getParamValue('offset_adjust_2', 0, cameraId);
                // For the subindex being reset, use its default value
                values[3] = resetValue;
                
                // Store default value specifically for this camera
                self.storeParamValue('offset_adjust_3', resetValue, cameraId);
                
                // Send all values
                const valuesString = values.join(',');
                self.sendParam(cameraId, 'offset_adjust', valuesString);
            }
        };
        // Action for Luma mix (numeric)
        actions['set_luma_mix'] = {
            name: 'Set Luma mix',
            description: 'Group: Color Correction | Param: Luma mix | Note: -',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Value',
                    id: 'value',
                    default: 1.0,
                    min: 0.0,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                self.sendParam(cameraId, 'luma_mix', event.options.value);
            }
        };
        // Action to increment Luma mix
        actions['set_luma_mix_increment'] = {
            name: 'â¬†ï¸Â Increase Luma mix',
            description: 'Increase the value of Luma mix',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Increment',
                    id: 'increment',
                    default: 0.1,
                    min: 0.1,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const increment = event.options.increment;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('luma_mix', 1.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.min(1.0, currentValue + increment);
                
                // Send new value
                self.sendParam(cameraId, 'luma_mix', newValue);
                
                // Store new value specifically for this camera
                self.storeParamValue('luma_mix', newValue, cameraId);
            }
        };
        // Action to decrement Luma mix
        actions['set_luma_mix_decrement'] = {
            name: 'â¬‡ï¸Â Decrease Luma mix',
            description: 'Decrease the value of Luma mix',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Decrement',
                    id: 'decrement',
                    default: 0.1,
                    min: 0.1,
                    max: 1.0,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const decrement = event.options.decrement;
                
                // Get current value or use default for this camera
                let currentValue = self.getParamValue('luma_mix', 1.0, cameraId);
                
                // Calcular nuevo valor
                let newValue = Math.max(0.0, currentValue - decrement);
                
                // Send new value
                self.sendParam(cameraId, 'luma_mix', newValue);
                
                // Store new value specifically for this camera
                self.storeParamValue('luma_mix', newValue, cameraId);
            }
        };
        // Action to reset Luma mix al default value
        actions['set_luma_mix_reset'] = {
            name: 'ðŸ”„ Reset Luma mix',
            description: 'Reset to default value (1.00)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                
                // Send default value
                self.sendParam(cameraId, 'luma_mix', 1.0);
                
                // Store default value for this specific camera
                self.storeParamValue('luma_mix', 1.0, cameraId);
            }
        };
        // Action for Correction Reset Default (void)
        actions['set_correction_reset_default'] = {
            name: 'Trigger Correction Reset Default',
            description: 'Group: Color Correction | Param: Correction Reset Default | Note: Reset to defaults',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                self.sendParam(cameraId, 'correction_reset_default', '1');
            }
        };
        // Special action for Pan/Tilt Velocity
        actions['set_pan_tilt'] = {
            name: 'Pan/Tilt - Mover',
            description: 'Controls pan/tilt movement of the camera',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'dropdown',
                    label: 'Direction',
                    id: 'direction',
                    default: 'stop',
                    choices: [
                        { id: 'stop', label: 'Detener' },
                        { id: 'left', label: 'Left' },
                        { id: 'right', label: 'Right' },
                        { id: 'up', label: 'Up' },
                        { id: 'down', label: 'Down' },
                        { id: 'up_left', label: 'Up-Left' },
                        { id: 'up_right', label: 'Up-Right' },
                        { id: 'down_left', label: 'Down-Left' },
                        { id: 'down_right', label: 'Down-Right' }
                    ]
                },
                {
                    type: 'number',
                    label: 'Speed (0-1)',
                    id: 'speed',
                    default: 0.5,
                    min: 0,
                    max: 1,
                    step: 0.1
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const direction = event.options.direction;
                const speed = event.options.speed;
                
                // Calculate pan/tilt values based on direction
                let panValue = 0;
                let tiltValue = 0;
                
                switch (direction) {
                    case 'left': panValue = -speed; break;
                    case 'right': panValue = speed; break;
                    case 'up': tiltValue = speed; break;
                    case 'down': tiltValue = -speed; break;
                    case 'up_left': panValue = -speed; tiltValue = speed; break;
                    case 'up_right': panValue = speed; tiltValue = speed; break;
                    case 'down_left': panValue = -speed; tiltValue = -speed; break;
                    case 'down_right': panValue = speed; tiltValue = -speed; break;
                    case 'stop':
                    default:
                        // Do not change values, they are 0
                }
                
                self.sendParam(cameraId, 'pan_tilt_velocity', `${panValue},${tiltValue}`);
            }
        };
        
        // Action for detener Pan/Tilt
        actions['stop_pan_tilt'] = {
            name: 'Pan/Tilt - Detener',
            description: 'Stop any pan/tilt movement',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                self.sendParam(cameraId, 'pan_tilt_velocity', '0,0');
            }
        };
        // Special action for Memory Preset - Store location
        actions['store_memory_preset'] = {
            name: 'Memory Preset - Store',
            description: 'Store current position in a memory slot',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Slot (1-5)',
                    id: 'slot',
                    default: 1,
                    min: 1,
                    max: 5
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const slot = event.options.slot - 1; // Adjust to 0-based index
                self.sendParam(cameraId, 'memory_preset', `1,${slot}`);
            }
        };
        
        // Special action for Memory Preset - Recall location
        actions['recall_memory_preset'] = {
            name: 'Memory Preset - Recall',
            description: 'Recall a stored position',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Slot (1-5)',
                    id: 'slot',
                    default: 1,
                    min: 1,
                    max: 5
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const slot = event.options.slot - 1; // Adjust to 0-based index
                self.sendParam(cameraId, 'memory_preset', `2,${slot}`);
            }
        };
        // ====================================================================
        // ACCIONES DE PRESETS
        // ====================================================================
        
        actions['load_preset'] = {
            name: 'Load Preset',
            description: 'Load a preset from TallyCCU Pro SD card',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Preset ID (0-4)',
                    id: 'presetId',
                    default: 0,
                    min: 0,
                    max: 4
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const presetId = event.options.presetId;
                
                const url = 'http://' + self.config.host + '/?loadPreset=' + cameraId + ',' + presetId;
                self.log('info', 'Loading preset ' + presetId + ' for camera ' + cameraId);
                
                try {
                    const response = await axios.get(url, { timeout: 10000 });
                    
                    let success = false;
                    let data = null;
                    
                    // El Arduino puede responder "OK" (texto plano) o JSON con success
                    if (typeof response.data === 'string') {
                        if (response.data.trim() === 'OK' || response.data.includes('OK')) {
                            success = true;
                        } else {
                            // Intentar parsear como JSON
                            const jsonMatch = response.data.match(/\{.*\}/s);
                            if (jsonMatch) {
                                data = JSON.parse(jsonMatch[0]);
                                success = data.success === true;
                            }
                        }
                    } else if (typeof response.data === 'object') {
                        data = response.data;
                        success = data.success === true;
                    }
                    
                    if (success) {
                        self.log('info', 'Preset cargado correctamente');
                        
                        // Actualizar variables de preset activo
                        const presetName = (self.presetNames[cameraId] && self.presetNames[cameraId][presetId]) 
                            ? self.presetNames[cameraId][presetId] 
                            : `Preset ${presetId}`;
                        
                        const variables = {};
                        variables[`cam${cameraId}_active_preset_name`] = presetName;
                        variables[`cam${cameraId}_active_preset_id`] = presetId.toString();
                        
                        if (cameraId == self.config.defaultCameraId) {
                            variables['current_preset_name'] = presetName;
                            variables['current_preset_id'] = presetId.toString();
                        }
                        
                        self.setVariableValues(variables);
                        
                        // Update internal values if response has parameters
                        if (data && data.parameters) {
                            self.updateParameterValues(cameraId, data.parameters);
                        }
                    } else {
                        self.log('warn', 'Preset did not load correctly');
                    }
                } catch (error) {
                    self.log('error', 'Error cargando preset: ' + error.message);
                }
            }
        };
        
        actions['list_presets'] = {
            name: 'Listar Presets',
            description: 'List all presets saved on SD card',
            options: [],
            callback: async () => {
                const url = 'http://' + self.config.host + '/?listPresets';
                self.log('info', 'Listando presets...');
                
                try {
                    const response = await axios.get(url, { timeout: 5000 });
                    
                    let data;
                    if (typeof response.data === 'object') {
                        data = response.data;
                    } else if (typeof response.data === 'string') {
                        const jsonMatch = response.data.match(/\{.*\}/s);
                        if (jsonMatch) {
                            data = JSON.parse(jsonMatch[0]);
                        }
                    }
                    
                    if (data && data.presets && Array.isArray(data.presets)) {
                        self.log('info', 'Presets encontrados: ' + data.presets.length);
                        
                        data.presets.forEach(p => {
                            if (p.cameraId !== undefined && p.presetId !== undefined) {
                                self.log('info', `Camara ${p.cameraId}, Preset ${p.presetId}: "${p.name || 'No name'}"`);
                            }
                        });
                        
                        self.updatePresetNames(data.presets);
                    } else {
                        self.log('warn', 'No presets found');
                    }
                } catch (error) {
                    self.log('error', 'Error listando presets: ' + error.message);
                }
            }
        };
        
        actions['retry_connection'] = {
            name: 'Retry Connection',
            description: 'Force a new connection attempt with TallyCCU Pro',
            options: [],
            callback: async () => {
                self.log('info', 'Retrying connection manually...');
                self.reconnectAttempts = 0;
                
                const connected = await self.checkConnection();
                
                if (connected) {
                    self.log('info', 'Connection restored successfully');
                } else {
                    self.log('warn', 'Could not establish connection');
                }
            }
        };
        
        actions['change_camera'] = {
            name: 'Change Active Camera',
            description: 'Change the camera that will receive the following commands',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: 1,
                    min: 1,
                    max: 8
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                self.sendParam(cameraId, 'cameraId', cameraId);
            }
        };

        // ====================================================================
        // SAVE PRESET - POST METHOD (OPTIMIZED)
        // Un solo request POST con todos los datos - mucho mas rapido y fiable
        // ====================================================================
        
        actions['save_current_as_preset'] = {
            name: 'Save Current Configuration as Preset',
            description: 'Saves current camera configuration as preset (via POST)',
            options: [
                {
                    type: 'number',
                    label: 'Camera ID',
                    id: 'cameraId',
                    default: self.config.defaultCameraId || 1,
                    min: 1,
                    max: 8
                },
                {
                    type: 'number',
                    label: 'Numero de Preset (0-4)',
                    id: 'presetId',
                    default: 0,
                    min: 0,
                    max: 4
                },
                {
                    type: 'textinput',
                    label: 'Nombre del Preset',
                    id: 'presetName',
                    default: 'Mi Preset'
                },
                {
                    type: 'checkbox',
                    label: 'Incluir: Audio',
                    id: 'includeGroupAudio',
                    default: false
                },                {
                    type: 'checkbox',
                    label: 'Incluir: Color Correction',
                    id: 'includeGroupColorCorrection',
                    default: true
                },                {
                    type: 'checkbox',
                    label: 'Incluir: Display',
                    id: 'includeGroupDisplay',
                    default: false
                },                {
                    type: 'checkbox',
                    label: 'Incluir: Lens',
                    id: 'includeGroupLens',
                    default: true
                },                {
                    type: 'checkbox',
                    label: 'Incluir: Output',
                    id: 'includeGroupOutput',
                    default: false
                },                {
                    type: 'checkbox',
                    label: 'Incluir: PTZ Control',
                    id: 'includeGroupPtzControl',
                    default: false
                },                {
                    type: 'checkbox',
                    label: 'Incluir: Reference',
                    id: 'includeGroupReference',
                    default: false
                },                {
                    type: 'checkbox',
                    label: 'Incluir: Tally',
                    id: 'includeGroupTally',
                    default: false
                },                {
                    type: 'checkbox',
                    label: 'Incluir: Video',
                    id: 'includeGroupVideo',
                    default: true
                }
            ],
            callback: async (event) => {
                const cameraId = event.options.cameraId;
                const presetId = event.options.presetId;
                const presetName = event.options.presetName;
                
                const fullState = self.captureCurrentState(cameraId);
                
                // Determinar que grupos incluir
                const includedGroups = [];
                if (event.options.includeGroupAudio) includedGroups.push('audio');
                if (event.options.includeGroupColorCorrection) includedGroups.push('color_correction');
                if (event.options.includeGroupDisplay) includedGroups.push('display');
                if (event.options.includeGroupLens) includedGroups.push('lens');
                if (event.options.includeGroupOutput) includedGroups.push('output');
                if (event.options.includeGroupPtzControl) includedGroups.push('ptz_control');
                if (event.options.includeGroupReference) includedGroups.push('reference');
                if (event.options.includeGroupTally) includedGroups.push('tally');
                if (event.options.includeGroupVideo) includedGroups.push('video');
                
                self.log('info', `Saving preset ${presetId} for camera ${cameraId} with groups: ${includedGroups.join(', ')}`);
                
                // Filtrar parametros por grupos seleccionados
                const filteredData = {};
                
                for (const [key, value] of Object.entries(fullState)) {
                    if (key === 'cameraId') continue;
                    
                    const paramGroup = self.paramGroupMap[key];
                    
                    if (paramGroup && includedGroups.includes(paramGroup)) {
                        filteredData[key] = value;
                    }
                }
                
                const paramKeys = Object.keys(filteredData);
                const totalParams = paramKeys.length;
                
                if (totalParams === 0) {
                    self.log('warn', 'No hay parametros para guardar con los grupos seleccionados');
                    return;
                }
                
                self.log('info', `Preparando ${totalParams} parametros para enviar...`);
                
                try {
                    // Construir string de datos: key1:val1;key2:val2;...
                    let dataString = '';
                    for (const key of paramKeys) {
                        const value = filteredData[key];
                        const valueStr = Array.isArray(value) ? value.join(',') : String(value);
                        dataString += `${key}:${valueStr};`;
                    }
                    
                    // Construir body del POST
                    const bodyData = `cameraId=${cameraId}&presetId=${presetId}&name=${encodeURIComponent(presetName)}&data=${encodeURIComponent(dataString)}`;
                    
                    self.log('debug', `Body length: ${bodyData.length} bytes`);
                    
                    // Enviar POST unico con todos los datos
                    const url = 'http://' + self.config.host + '/savePreset';
                    
                    const response = await axios.post(url, bodyData, {
                        timeout: 15000,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    });
                    
                    // Procesar respuesta
                    let result;
                    if (typeof response.data === 'object') {
                        result = response.data;
                    } else if (typeof response.data === 'string') {
                        const jsonMatch = response.data.match(/\{.*\}/s);
                        if (jsonMatch) {
                            result = JSON.parse(jsonMatch[0]);
                        }
                    }
                    
                    if (result && result.success) {
                        self.log('info', `Preset guardado con exito: ${result.params || totalParams} parametros`);
                        
                        // Actualizar nombres de presets en memoria
                        if (!self.presetNames[cameraId]) self.presetNames[cameraId] = {};
                        self.presetNames[cameraId][presetId] = presetName;
                        
                        // Actualizar variables de Companion
                        const variables = {};
                        variables[`cam${cameraId}_preset${presetId}_name`] = presetName;
                        if (cameraId == self.config.defaultCameraId) {
                            variables[`preset${presetId}_name`] = presetName;
                        }
                        self.setVariableValues(variables);
                        
                    } else {
                        const errorMsg = result?.error || 'Respuesta no valida del servidor';
                        self.log('error', `Error guardando preset: ${errorMsg}`);
                    }
                    
                } catch (error) {
                    self.log('error', `Error guardando preset: ${error.message}`);
                }
            }
        };

        // ====================================================================
        // ACCIONES DE VMIX
        // ====================================================================
        
        actions['set_vmix_connect'] = {
            name: 'vMix Connect - Toggle State',
            description: 'Enable or disable automatic vMix connection',
            options: [
                {
                    type: 'dropdown',
                    label: 'Estado',
                    id: 'enabled',
                    default: 'true',
                    choices: [
                        { id: 'true', label: 'Enable' },
                        { id: 'false', label: 'Disable' }
                    ]
                }
            ],
            callback: async (event) => {
                const enabled = event.options.enabled === 'true' ? 1 : 0;
                const url = `http://${self.config.host}/?vmixConnect=${enabled}`;
                
                try {
                    await axios.get(url, { timeout: 3000 });
                    self.log('info', `Conexion vMix ${enabled ? 'activada' : 'desactivada'}`);
                } catch (err) {
                    self.log('error', `Error cambiando estado vMix Connect: ${err.message}`);
                }
            }
        };


	self.setActionDefinitions(actions)
}
