export interface Settings {
	pluginEnabled: boolean,
	baseFontSize: number,
	currentFontSize: number,
	resetOnReload: boolean,
	showNotice: boolean
}

export const DEFAULT_SETTINGS: Settings = {
	pluginEnabled: true,
	baseFontSize: 16,
	currentFontSize: 16,
	resetOnReload: true,
	showNotice: true
}
