import {MarkdownView} from "obsidian";
import {RecordType} from "../enums/RecordType";
import {CampaignSetting} from "../enums/CampaignSetting";
import {CampaignInterface} from "../interfaces/data/CampaignInterface";
import {AbstractFactory} from "../abstracts/AbstractFactory";
import {FileFactoryInterface} from "../interfaces/factories/FileFactoryInterface";

const path = require('path');

export class FileFactory extends AbstractFactory implements FileFactoryInterface{
	public async create(
		settings: CampaignSetting,
		type: RecordType,
		create: boolean,
		templateName: string,
		name: string,
		campaignId: number|undefined=undefined,
		adventureId: number|undefined=undefined,
		sessionId: number|undefined=undefined,
		sceneId: number|undefined=undefined,
		additionalInformation: any|null=null,
	): Promise<void> {
		let folder = path.sep;

		if (campaignId != null) {
			let campaign: CampaignInterface|undefined;
			const id = this.factories.id.create(RecordType.Campaign, campaignId);

			if (id !== undefined){
				try {
					campaign = this.database.readSingle<CampaignInterface>(RecordType.Campaign, id);
				} catch (e) {
					campaign = undefined;
				}
			}

			if (campaign !== undefined) {
				settings = campaign.campaignSettings;
				folder = campaign.folder;
			} else {
				settings = CampaignSetting.Agnostic;
			}
		}

		const template = this.factories.templates.create(
			settings,
			type,
			templateName,
			name,
			campaignId,
			adventureId,
			sessionId,
			sceneId,
			additionalInformation,
		);

		const fileName = await this.generateFilePath(type, folder, name);

		template.generateData()
			.then((data: string) => {
				if (create) {
					this.createNewFile(data, fileName);
				} else {
					this.editExistingFile(data, fileName);
				}
			});
	}

	private async createNewFile(
		data: string,
		fileName: string,
	): Promise<void> {
		const newFile = await app.vault.create(fileName, data);
		const currentLeaf = app.workspace.getActiveViewOfType(MarkdownView);
		const leaf = app.workspace.getLeaf((currentLeaf != null));
		await leaf.openFile(newFile);
	}

	private async editExistingFile(
		data: string,
		fileName: string,
	): Promise<void> {
		const activeView = app.workspace.getActiveViewOfType(MarkdownView);
		if (activeView != null) {
			const editor = activeView.editor;
			editor.setValue(data + '\n' + editor.getValue());

			let file = activeView.file;
			await this.app.fileManager.renameFile(file, fileName);
			file = activeView.file;

			app.workspace.getLeaf().openFile(file);
		}
	}

	public async silentCreate(
		type: RecordType,
		name: string,
		campaignId: number,
		adventureId: number|undefined=undefined,
		sessionId: number|undefined=undefined,
		sceneId: number|undefined=undefined,
		additionalInformation: any|undefined=undefined,
	): Promise<void> {
		let folder = '';
		let settings = CampaignSetting.Agnostic;

		let campaign: CampaignInterface|undefined;
		const id = this.factories.id.create(RecordType.Campaign, campaignId);

		if (id !== undefined){
			try {
				campaign = this.database.readSingle<CampaignInterface>(RecordType.Campaign, id);
			} catch (e) {
				campaign = undefined;
			}
		}

		if (campaign !== undefined) {
			settings = campaign.campaignSettings;
			folder = campaign.folder;
		}

		const template = this.factories.templates.create(
			settings,
			type,
			'internal' + RecordType[type],
			name,
			campaignId,
			adventureId,
			sessionId,
			sceneId,
			additionalInformation,
		);

		const fileName = await this.generateFilePath(type, folder, name);

		const data: string = await template.generateData();
		const newFile = await app.vault.create(fileName, data);
		const leaf = app.workspace.getLeaf(true);
		await leaf.openFile(newFile);
	}

	private async generateFilePath(
		type: RecordType,
		folder: string,
		name: string,
	): Promise<string> {
		if (folder.startsWith(path.sep)) folder = folder.substring(path.sep.length);
		if (folder.endsWith(path.sep)) folder = folder.substring(0, folder.length - path.sep.length);
		let response = name + '.md';

		if (this.settings.automaticMove){
			let fullPath: string;
			if (type !== RecordType.Campaign) {
				fullPath = folder + path.sep + RecordType[type] + 's';

				if (fullPath.startsWith(path.sep)) fullPath = fullPath.substring(path.sep.length);

				const fileOrFolder = await this.app.vault.getAbstractFileByPath(fullPath);
				if (fileOrFolder == null) {
					try {
						await this.app.vault.createFolder(fullPath);
					} catch (e) {
						//no need to catch any error here
					}
				}
			} else {
				fullPath = folder;
				if (fullPath.startsWith(path.sep)) fullPath = fullPath.substring(1);
			}

			response = fullPath + path.sep + response;
		}

		return response;
	}
}
