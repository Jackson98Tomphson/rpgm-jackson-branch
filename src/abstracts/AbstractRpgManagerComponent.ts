import {App, Component} from "obsidian";
import {RpgManagerSettingsInterface} from "../settings/RpgManagerSettingsInterface";
import {DatabaseInterface} from "../interfaces/database/DatabaseInterface";
import {FactoriesInterface} from "../interfaces/FactoriesInterface";
import {TagHelper} from "../helpers/TagHelper";
import {RpgManagerHelperInterface} from "../interfaces/RpgManagerHelperInterface";
import {DataManipulatorsInterface} from "../interfaces/DataManipulatorsInterface";
import {DatabaseV2Interface} from "../_dbV2/interfaces/DatabaseV2Interface";

export abstract class AbstractRpgManagerComponent extends Component implements RpgManagerHelperInterface {
	constructor(
		public app: App,
	) {
		super();
	}

	public get settings(
	): RpgManagerSettingsInterface {
		return this.app.plugins.getPlugin('rpg-manager').settings;
	}

	public get database(
	): DatabaseInterface {
		return this.app.plugins.getPlugin('rpg-manager').database;
	}

	public get databaseV2(
	): DatabaseV2Interface {
		return this.app.plugins.getPlugin('rpg-manager').databaseV2;
	}

	public set databaseV2(
		database: DatabaseV2Interface,
	) {
		this.app.plugins.getPlugin('rpg-manager').databaseV2 = database;
	}

	public get factories(
	): FactoriesInterface {
		return this.app.plugins.getPlugin('rpg-manager').factories;
	}

	public get dataManipulators(
	): DataManipulatorsInterface {
		return this.app.plugins.getPlugin('rpg-manager').dataManipulators;
	}

	public get tagHelper(
	): TagHelper {
		return this.app.plugins.getPlugin('rpg-manager').tagHelper;
	}

	public updateSettings(
		settings: Partial<RpgManagerSettingsInterface>,
	): Promise<void> {
		return this.app.plugins.getPlugin('rpg-manager').updateSettings(settings);
	}
}
