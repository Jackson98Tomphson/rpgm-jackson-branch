import {SubModelFactoryInterface} from "../../models/factories/interfaces/SubModelFactoryInterface";
import {ContentFactoryInterface} from "../../responses/factories/interfaces/ContentFactoryInterface";
import {FileFactoryInterface} from "../../templates/factories/interfaces/FileFactoryInterface";
import {ModalFactoryInterface} from "../../modals/factories/interfaces/ModalFactoryInterface";
import {ModelFactoryInterface} from "../../models/factories/interfaces/ModelFactoryInterface";
import {PronounFactoryInterface} from "../../components/factories/interfaces/PronounFactoryInterface";
import {TemplateFactoryInterface} from "../../templates/factories/interfaces/TemplateFactoryInterface";
import {ViewFactoryInterface} from "../../views/factories/interfaces/ViewFactoryInterface";
import {FetcherFactoryInterface} from "../../fetchers/factories/interfaces/FetcherFactoryInterface";
import {IdFactoryInterface} from "../../id/factories/interfaces/IdFactoryInterface";
import {BreadcrumbFactoryInterface} from "../../views/factories/interfaces/BreadcrumbFactoryInterface";
import {SorterFactoryInterface} from "../../databases/factories/interfaces/SorterFactoryInterface";
import {RunningTimeManagerInterface} from "../../timers/interfaces/RunningTimeManagerInterface";
import {DatabaseFactoryInterface} from "../../databases/factories/interfaces/DatabaseFactoryInterface";
import {ComponentFactoryInterface} from "../../components/factories/interfaces/ComponentFactoryInterface";
import {ComponentTypeFactoryInterface} from "../../components/factories/interfaces/ComponentTypeFactoryInterface";
import {RelationshipTypeFactoryInterface} from "../../relationships/factories/interfaces/RelationshipTypeFactoryInterface";
import {SceneTypeFactoryInterface} from "../../components/factories/interfaces/SceneTypeFactoryInterface";
import {StoryCircleStageFactoryInterface} from "../../plots/factories/interfaces/StoryCircleStageFactoryInterface";
import {AbtStageFactoryInterface} from "../../plots/factories/interfaces/AbtStageFactoryInterface";
import {RelationshipFactoryInterface} from "../../relationships/factories/interfaces/RelationshipFactoryInterface";
import {FileManipulatorFactoryInterface} from "../../manipulators/factories/interfaces/FileManipulatorFactoryInterface";
import {LogFactoryInterface} from "../../loggers/interfaces/LogFactoryInterface";
import {AnalyserFactoryInterface} from "../../analyser/factories/interfaces/AnalyserFactoryInterface";
import {ImageFactoryInterface} from "../../galleries/interfaces/ImageFactoryInterface";
import {GalleryViewFactoryInterface} from "../../galleries/interfaces/GalleryViewFactoryInterface";
import {EditableContentFactoryInterface} from "../../services/contentEditor/interfaces/EditableContentFactoryInterface";
import {
	EditableContentTypeFactoryInterface
} from "../../services/contentEditor/interfaces/EditableContentTypeFactoryInterface";
import {
	EditableContentValueFactoryInterface
} from "../../services/contentEditor/interfaces/EditableContentValueFactoryInterface";

export interface FactoriesInterface {
	subModels: SubModelFactoryInterface;
	contents: ContentFactoryInterface;
	component: ComponentFactoryInterface;
	files: FileFactoryInterface;
	modals: ModalFactoryInterface;
	models: ModelFactoryInterface;
	pronouns: PronounFactoryInterface;
	templates: TemplateFactoryInterface;
	views: ViewFactoryInterface;
	fetchers: FetcherFactoryInterface;
	database: DatabaseFactoryInterface;
	id: IdFactoryInterface;
	breadcrumb: BreadcrumbFactoryInterface;
	sorter: SorterFactoryInterface;
	componentType: ComponentTypeFactoryInterface;
	relationshipType: RelationshipTypeFactoryInterface;
	sceneType: SceneTypeFactoryInterface;
	storyCircleStage: StoryCircleStageFactoryInterface;
	abtStage: AbtStageFactoryInterface;
	relationship: RelationshipFactoryInterface;
	logger: LogFactoryInterface;
	fileManipulator: FileManipulatorFactoryInterface;
	analyser: AnalyserFactoryInterface;
	image: ImageFactoryInterface;
	imageView: GalleryViewFactoryInterface;
	editableContent: EditableContentFactoryInterface;
	editableContentField: EditableContentTypeFactoryInterface;
	editableContentValue: EditableContentValueFactoryInterface;

	runningTimeManager: RunningTimeManagerInterface;
}
