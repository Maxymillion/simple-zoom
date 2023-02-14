import {MarkdownView, Notice, Plugin} from 'obsidian';
import {DEFAULT_SETTINGS, Settings} from "./utils/types";
import {SettingsTab} from "./components/Settings";

export default class FontsizeControls extends Plugin {
	settings: Settings;

	async onload() {
		await this.loadSettings();

		this.addSettingTab(new SettingsTab(this.app, this));

		this.addCommand({
			id: 'increase-font-size',
			name: 'Increase font-size',
			checkCallback: (checking: boolean) => {
				const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (markdownView) {
					if (!checking) {
						this.settings.currentFontSize += 4;
						this.saveSettings();
					}
					return true;
				}
			}
		});

		this.addCommand({
			id: 'decrease-font-size',
			name: 'Decrease font-size',
			checkCallback: (checking: boolean) => {
				const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (markdownView) {
					if (!checking) {
						if (this.settings.currentFontSize > 8 && this.settings.currentFontSize - 4 > 8) {
							this.settings.currentFontSize -= 4;
							this.saveSettings();
						}
					}
					return true;
				}
			}
		});

		this.addCommand({
			id: 'reset-font-size',
			name: 'Reset font-size',
			checkCallback: (checking: boolean) => {
				const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (markdownView) {
					if (!checking) {
						this.settings.currentFontSize = this.settings.baseFontSize;
						this.saveSettings();
					}
					return true;
				}
			}
		});

		if (this.settings.resetOnReload) {
			this.settings.currentFontSize = this.settings.baseFontSize;
		}

		this.app.workspace.containerEl.style.setProperty("--font-text-size", this.settings.currentFontSize + "px");

	}

	unload() {
		this.app.workspace.containerEl.style.removeProperty("--font-text-size");
		super.unload();
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings(hideNotice: boolean = false) {
		await this.saveData(this.settings);
		this.app.workspace.containerEl.style.setProperty("--font-text-size", this.settings.currentFontSize + "px");

		if (!hideNotice && this.settings.showNotice) {
			new Notice(`Font-size: ${this.settings.currentFontSize}px (${100 + ((this.settings.currentFontSize - this.settings.baseFontSize) / this.settings.baseFontSize) * 100}%)`);
		}
	}
}



