import {CampaignTemplateFactory} from "../../../factories/templates/CampaignTemplateFactory";

export class RawCampaignTemplate extends CampaignTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
	}

	public generateInitialCodeBlock(
	): string|undefined {
		return undefined;
	}

	public generateLastCodeBlock(
	): string|undefined {
		return undefined;
	}
}
