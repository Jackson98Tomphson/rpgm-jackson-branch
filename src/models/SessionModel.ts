import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {SessionInterface} from "../interfaces/data/SessionInterface";
import {SceneInterface} from "../interfaces/data/SceneInterface";
import {RecordType} from "../enums/RecordType";
import {RelationshipInterface} from "../interfaces/RelationshipInterface";
import {SorterComparisonElement} from "../database/SorterComparisonElement";
import {RecordInterface} from "../interfaces/database/RecordInterface";
import {RelationshipType} from "../enums/RelationshipType";

export class SessionModel extends AbstractModel {
	protected currentElement: SessionInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		const scenes = await this.database.read<SceneInterface>(
			(scene: SceneInterface) =>
				scene.id.type === RecordType.Scene &&
				scene.id.campaignId === this.currentElement.campaign.campaignId &&
				scene.sessionId === this.currentElement.id.sessionId,
			).sort(this.factories.sorter.create<SceneInterface>([
				new SorterComparisonElement((scene: SceneInterface) => scene.id.adventureId),
				new SorterComparisonElement((scene: SceneInterface) => scene.id.actId),
				new SorterComparisonElement((scene: SceneInterface) => scene.id.sceneId),
			]));

		for (let sceneIndex=0; sceneIndex<scenes.length; sceneIndex++){
			await scenes[sceneIndex].relationships.forEach((relationship: RelationshipInterface, name: string) => {
				relationship.description = '';
				if (!this.currentElement.relationships.has(name)) this.currentElement.relationships.set(name, relationship);

				if (relationship.component?.id.type === RecordType.Event || relationship.component?.id.type === RecordType.Clue) this.addSubplotRelationships(relationship.component);
			});
			await scenes[sceneIndex].reverseRelationships.forEach((relationship: RelationshipInterface, name: string) => {
				relationship.description = '';
				if (!this.currentElement.reverseRelationships.has(name)) this.currentElement.relationships.set(name, relationship);
				if (relationship.component?.id.type === RecordType.Event || relationship.component?.id.type === RecordType.Clue) this.addSubplotRelationships(relationship.component);
			});
		}

		await this.addRelationships(RecordType.Subplot);
		await this.addRelationships(RecordType.Music);
		await this.addRelationships(RecordType.Character);
		await this.addRelationships(RecordType.NonPlayerCharacter);
		await this.addRelationships(RecordType.Faction);
		await this.addRelationships(RecordType.Clue);
		await this.addRelationships(RecordType.Location);
		await this.addRelationships(RecordType.Event);

		return this.response;
	}

	private addSubplotRelationships(
		record: RecordInterface,
	): void {
		record.reverseRelationships.forEach((relationship: RelationshipInterface, name: string) => {
			if (
				relationship.type === RelationshipType.DirectInFrontmatter &&
				relationship.component !== undefined &&
				relationship.component.id.type === RecordType.Subplot
			) {
				if (!this.currentElement.reverseRelationships.has(name)) this.currentElement.relationships.set(name, relationship);
			}
		});
	}
}
