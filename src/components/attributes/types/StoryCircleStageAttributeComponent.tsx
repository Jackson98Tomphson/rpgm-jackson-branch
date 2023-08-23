import * as React from "react";
import { useTranslation } from "react-i18next";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import { StoryCircleStage } from "src/data/enums/StoryCircleStage";
import { AttributeInterface } from "src/data/interfaces/AttributeInterface";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { useApi } from "src/hooks/useApi";
import { RpgManagerCodeblockService } from "src/services/RpgManagerCodeblockService";
import AttributeTitleComponent from "../AttributeTitleComponent";

export default function StoryCircleStageAttributeComponent({
	element,
	attribute,
	isEditable,
}: {
	element: ElementInterface;
	attribute: AttributeInterface;
	isEditable: boolean;
}): React.ReactElement {
	if (!attribute.isSet) return null;

	const { t } = useTranslation();
	const api: RpgManagerInterface = useApi();

	const value = attribute.value as string;

	const codeblockService = new RpgManagerCodeblockService(app, api, element.file);

	function removeAttribute(): void {
		codeblockService.updateCodeblockData(attribute.id, undefined);
	}

	const saveAttribute = (newValue: string) => {
		codeblockService.updateCodeblockData(attribute.id, newValue);
	};

	let content;

	if (isEditable) {
		content = (
			<div className="grid grid-cols-1 lg:grid-cols-2 group">
				<div>
					<select
						defaultValue={attribute.value}
						onChange={(e) => saveAttribute(e.target.value)}
						className="!pl-2 !pr-4"
					>
						<option value=""></option>
						{Object.entries(StoryCircleStage)
							.filter(([key]) => isNaN(Number(key)))
							.map(([key, index]) => (
								<option key={key} value={index}>
									{key}
								</option>
							))}
					</select>
				</div>
				<div className="flex justify-end !ml-3">
					<button className="rpgm-danger opacity-0 group-hover:opacity-100" onClick={removeAttribute}>
						{t("buttons.delete")}
					</button>
				</div>
			</div>
		);
	} else {
		content = (
			<div>
				{Object.keys(StoryCircleStage).find((key) => StoryCircleStage[key as keyof typeof StoryCircleStage] === value)}
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 lg:grid-cols-4">
			<AttributeTitleComponent attribute={attribute} />
			<div className="col-span-3 pl-0 lg:pl-3">{content}</div>
		</div>
	);
}
