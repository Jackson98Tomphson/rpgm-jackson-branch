import {App} from "obsidian";
import {SubModelFactory} from "../models/factories/SubModelFactory";
import {ContentFactory} from "../responses/factories/ContentFactory";
import {FileFactory} from "../templates/factories/FileFactory";
import {ModalFactory} from "../modals/factories/ModalFactory";
import {ModelFactory} from "../models/factories/ModelFactory";
import {PronounFactory} from "../components/factories/PronounFactory";
import {TemplateFactory} from "../templates/factories/TemplateFactory";
import {ViewFactory} from "../views/factories/ViewFactory";
import {FetcherFactory} from "../fetchers/factories/FetcherFactory";
import {SubModelFactoryInterface} from "../models/factories/interfaces/SubModelFactoryInterface";
import {ContentFactoryInterface} from "../responses/factories/interfaces/ContentFactoryInterface";
import {FileFactoryInterface} from "../templates/factories/interfaces/FileFactoryInterface";
import {ModalFactoryInterface} from "../modals/factories/interfaces/ModalFactoryInterface";
import {ModelFactoryInterface} from "../models/factories/interfaces/ModelFactoryInterface";
import {PronounFactoryInterface} from "../components/factories/interfaces/PronounFactoryInterface";
import {TemplateFactoryInterface} from "../templates/factories/interfaces/TemplateFactoryInterface";
import {ViewFactoryInterface} from "../views/factories/interfaces/ViewFactoryInterface";
import {FetcherFactoryInterface} from "../fetchers/factories/interfaces/FetcherFactoryInterface";
import {FactoriesInterface} from "./interfaces/FactoriesInterface";
import {IdFactoryInterface} from "../id/factories/interfaces/IdFactoryInterface";
import {IdFactory} from "../id/factories/IdFactory";
import {BreadcrumbFactoryInterface} from "../views/factories/interfaces/BreadcrumbFactoryInterface";
import {BreadcrumbFactory} from "../views/factories/BreadcrumbFactory";
import {SorterFactoryInterface} from "../databases/factories/interfaces/SorterFactoryInterface";
import {SorterFactory} from "../databases/factories/SorterFactory";
import {RunningTimeManagerInterface} from "../timers/interfaces/RunningTimeManagerInterface";
import {RunningTimeManager} from "../timers/RunningTimeManager";
import {DatabaseFactoryInterface} from "../databases/factories/interfaces/DatabaseFactoryInterface";
import {DatabaseFactory} from "../databases/factories/DatabaseFactory";
import {ComponentFactoryInterface} from "../components/factories/interfaces/ComponentFactoryInterface";
import {ComponentFactory} from "../components/factories/ComponentFactory";
import {ComponentTypeFactoryInterface} from "../components/factories/interfaces/ComponentTypeFactoryInterface";
import {ComponentTypeFactory} from "../components/factories/ComponentTypeFactory";
import {RelationshipTypeFactoryInterface} from "../relationships/factories/interfaces/RelationshipTypeFactoryInterface";
import {RelationshipTypeFactory} from "../relationships/factories/RelationshipTypeFactory";
import {SceneTypeFactoryInterface} from "../components/factories/interfaces/SceneTypeFactoryInterface";
import {SceneTypeFactory} from "../components/factories/SceneTypeFactory";
import {StoryCircleStageFactoryInterface} from "../plots/factories/interfaces/StoryCircleStageFactoryInterface";
import {StoryCircleStageFactory} from "../plots/factories/StoryCircleStageFactory";
import {AbtStageFactoryInterface} from "../plots/factories/interfaces/AbtStageFactoryInterface";
import {AbtStageFactory} from "../plots/factories/AbtStageFactory";
import {RelationshipFactoryInterface} from "../relationships/factories/interfaces/RelationshipFactoryInterface";
import {RelationshipFactory} from "../relationships/factories/RelationshipFactory";
import {FileManipulatorFactoryInterface} from "../manipulators/factories/interfaces/FileManipulatorFactoryInterface";
import {FileManipulatorFactory} from "../manipulators/factories/FileManipulatorFactory";
import {LogFactoryInterface} from "../loggers/interfaces/LogFactoryInterface";
import {LogFactory} from "../loggers/factories/LogFactory";
import {LogWriterType} from "../loggers/enums/LogWriterType";
import {AnalyserFactoryInterface} from "../analyser/factories/interfaces/AnalyserFactoryInterface";
import {AnalyserFactory} from "../analyser/factories/AnalyserFactory";
import {ImageFactoryInterface} from "../galleries/interfaces/ImageFactoryInterface";
import {ImageFactory} from "../galleries/factories/ImageFactory";
import {GalleryViewFactoryInterface} from "../galleries/interfaces/GalleryViewFactoryInterface";
import {GalleryViewFactory} from "../galleries/factories/GalleryViewFactory";
import {EditableContentFactoryInterface} from "../services/contentEditor/interfaces/EditableContentFactoryInterface";
import {EditableContentFactory} from "../services/contentEditor/factories/EditableContentFactory";
import {
	EditableContentTypeFactoryInterface
} from "../services/contentEditor/interfaces/EditableContentTypeFactoryInterface";
import {EditableContentTypeFactory} from "../services/contentEditor/factories/EditableContentTypeFactory";
import {
	EditableContentValueFactoryInterface
} from "../services/contentEditor/interfaces/EditableContentValueFactoryInterface";
import {EditableContentValueFactory} from "../services/contentEditor/factories/EditableContentValueFactory";

export class Factories implements FactoriesInterface{
	public subModels: SubModelFactoryInterface;
	public contents: ContentFactoryInterface;
	public component: ComponentFactoryInterface;
	public files: FileFactoryInterface;
	public modals: ModalFactoryInterface;
	public models: ModelFactoryInterface;
	public pronouns: PronounFactoryInterface;
	public templates: TemplateFactoryInterface;
	public views: ViewFactoryInterface;
	public fetchers: FetcherFactoryInterface;
	public database: DatabaseFactoryInterface;
	public id: IdFactoryInterface;
	public breadcrumb: BreadcrumbFactoryInterface;
	public sorter: SorterFactoryInterface;
	public runningTimeManager: RunningTimeManagerInterface;
	public componentType: ComponentTypeFactoryInterface;
	public relationshipType: RelationshipTypeFactoryInterface;
	public sceneType: SceneTypeFactoryInterface;
	public storyCircleStage: StoryCircleStageFactoryInterface;
	public abtStage: AbtStageFactoryInterface;
	public relationship: RelationshipFactoryInterface;
	public logger: LogFactoryInterface;
	public fileManipulator: FileManipulatorFactoryInterface;
	public analyser: AnalyserFactoryInterface;
	public image: ImageFactoryInterface;
	public imageView: GalleryViewFactoryInterface;
	public editableContent: EditableContentFactoryInterface;
	public editableContentField: EditableContentTypeFactoryInterface;
	public editableContentValue: EditableContentValueFactoryInterface;

	constructor(
		private _app: App,
	) {
		this.subModels = new SubModelFactory(this._app);
		this.contents = new ContentFactory(this._app);
		this.component = new ComponentFactory(this._app);
		this.files = new FileFactory(this._app);
		this.modals = new ModalFactory(this._app);
		this.models = new ModelFactory(this._app);
		this.pronouns = new PronounFactory(this._app);
		this.templates = new TemplateFactory(this._app);
		this.views = new ViewFactory(this._app);
		this.fetchers = new FetcherFactory(this._app);
		this.database = new DatabaseFactory(this._app);
		this.id = new IdFactory(this._app);
		this.breadcrumb = new BreadcrumbFactory(this._app);
		this.sorter = new SorterFactory(this._app);
		this.componentType = new ComponentTypeFactory(this._app);
		this.relationshipType = new RelationshipTypeFactory(this._app);
		this.sceneType = new SceneTypeFactory(this._app);
		this.storyCircleStage = new StoryCircleStageFactory(this._app);
		this.abtStage = new AbtStageFactory(this._app);
		this.relationship = new RelationshipFactory(this._app);
		this.logger = new LogFactory(this._app, LogWriterType.Console);
		this.fileManipulator = new FileManipulatorFactory(this._app);
		this.analyser = new AnalyserFactory(this._app);
		this.image = new ImageFactory(this._app);
		this.imageView = new GalleryViewFactory(this._app);
		this.editableContent = new EditableContentFactory(this._app);
		this.editableContentField = new EditableContentTypeFactory(this._app);
		this.editableContentValue = new EditableContentValueFactory(this._app);

		this.runningTimeManager = new RunningTimeManager(this._app);
	}
}
