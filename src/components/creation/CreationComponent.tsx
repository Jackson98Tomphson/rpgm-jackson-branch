import { Modal, TFile } from "obsidian";
import * as React from "react";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import { WizardContext } from "src/contexts/WizardContext";
import { ElementType } from "src/data/enums/ElementType";
import { SystemType } from "src/data/enums/SystemType";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { FileCreationService } from "src/services/FileCreationService";
import { useApi } from "../../hooks/useApi";
import NonPlayerCharacterWizardComponent from "../wizards/npcs/NonPlayerCharacterWizardComponent";
import CreationBaseComponent from "./CreationBaseComponent";

export default function CreationComponent({
	type,
	currentNote,
	controller,
}: {
	type?: ElementType;
	currentNote?: TFile;
	controller: Modal;
}): React.ReactElement {
	const api: RpgManagerInterface = useApi();

	const [inWizard, setInWizard] = React.useState<boolean>(false);
	const [selectedType, setSelectedType] = React.useState<ElementType | undefined>(type);
	const [name, setName] = React.useState<string | undefined>(undefined);
	const [system, setSystem] = React.useState<SystemType | undefined>(undefined);
	const [campaignPath, setCampaignPath] = React.useState<string | undefined>(undefined);
	const [parentPath, setParentPath] = React.useState<string | undefined>(undefined);
	const [positionInParent, setPositionInParent] = React.useState<number | undefined>(undefined);

	async function setId(
		launchWizard: boolean,
		passedType: ElementType,
		passedName: string,
		passedSystem: SystemType,
		passedCampaignPath: string,
		passedParentPath?: string,
		passedPositionInParent?: number
	): Promise<void> {
		if (launchWizard) {
			setSelectedType(passedType);
			setName(passedName);
			setSystem(passedSystem);
			setCampaignPath(passedCampaignPath);
			if (passedParentPath) setParentPath(passedParentPath);
			if (passedPositionInParent) setPositionInParent(passedPositionInParent);
			setInWizard(true);
		} else {
			create(
				undefined,
				passedType,
				passedName,
				passedSystem,
				passedCampaignPath,
				passedParentPath,
				passedPositionInParent
			);
		}
	}

	async function setData(attributes: any): Promise<void> {
		create(attributes);
	}

	async function create(
		attributes?: any,
		passedType?: ElementType,
		passedName?: string,
		passedSystem?: SystemType,
		passedCampaignPath?: string,
		passedParentPath?: string,
		passedPositionInParent?: number
	): Promise<void> {
		const fileCreator = new FileCreationService(
			app,
			api,
			passedType ?? selectedType,
			passedName ?? name,
			passedSystem ?? system,
			passedCampaignPath ?? campaignPath,
			passedParentPath ?? parentPath,
			passedPositionInParent ?? positionInParent,
			attributes
		);

		if (currentNote !== undefined) {
			fileCreator.createInCurrentFile().then((newFile: TFile) => {
				controller.close();
			});
		} else {
			fileCreator.create(true).then((newFile: TFile) => {
				controller.close();
			});
		}
	}

	let wizardTypeComponent: React.ReactElement | undefined = undefined;
	switch (selectedType) {
		case ElementType.NonPlayerCharacter:
			wizardTypeComponent = React.createElement(NonPlayerCharacterWizardComponent, {
				element: undefined,
				name: name,
				campaign: api.get(campaignPath) as ElementInterface,
				close: undefined,
				returnData: setData,
			});

			break;
	}

	const wizardComponent: React.ReactElement | undefined =
		wizardTypeComponent !== undefined
			? React.createElement(WizardContext.Provider, { value: {} }, wizardTypeComponent)
			: undefined;

	if (inWizard && wizardComponent !== undefined) {
		return wizardComponent;
	}

	return (
		<CreationBaseComponent
			initialType={selectedType}
			currentNote={currentNote}
			setId={setId}
			hasWizard={wizardComponent !== undefined}
		/>
	);
}
