import {App, PluginSettingTab, Setting} from "obsidian";
import UniquePageNames from "../../main";
import {pluginConfig} from "../../plugin.config";
import FontsizeControls from "../../main";

export class SettingsTab extends PluginSettingTab {
	plugin: FontsizeControls;

	constructor(app: App, plugin: UniquePageNames) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();
		containerEl.createEl('h1', {text: pluginConfig.name});
		let desc = containerEl.createEl('small', {text: pluginConfig.description + " "});
		containerEl.createEl('br');
		containerEl.createEl('br');

		new Setting(containerEl)
			.setName('Set base font-size')
			.setDesc('This will set the base (and current) font-size on which the increase and decrease operations will be executed.')
			.addText(tc => tc
				.setValue(String(this.plugin.settings.baseFontSize))
				.onChange(async (value) => {
					const regex = /^[0-9]*$/gm;
					let newSize = Number(regex.exec(value));

					if(newSize > 8){
						this.plugin.settings.baseFontSize = newSize;
						this.plugin.settings.currentFontSize = newSize;
						await this.plugin.saveSettings(true);
					}else if(newSize < 1){
						tc.setValue(String(this.plugin.settings.baseFontSize));
					}
				})
			)

		new Setting(containerEl)
			.setName('Reset font-size on restart/reload')
			.setDesc('This will cause the plugin to reset the font-size to the base font-size on restart.')
			.addToggle(tc => tc
				.setValue(this.plugin.settings.resetOnReload)
				.onChange(async (value) => {
					this.plugin.settings.resetOnReload = value;
					await this.plugin.saveSettings(true);
				})
			)

		new Setting(containerEl)
			.setName('Show fontsize notice')
			.setDesc('Show a notice when increasing or decreasing your font-size.')
			.addToggle(tc => tc
				.setValue(this.plugin.settings.showNotice)
				.onChange(async (value) => {
					this.plugin.settings.showNotice = value;
					await this.plugin.saveSettings(true);
				})
			)

	}
}
