import {AbstractSubModelView} from "./AbstractSubModelView";
import {HeaderResponseInterface} from "../../responses/interfaces/HeaderResponseInterface";
import {HeaderResponseType} from "../../responses/enums/HeaderResponseType";
import {HeaderResponseElementInterface} from "../../responses/interfaces/HeaderResponseElementInterface";
import {ComponentInterface} from "../../components/interfaces/ComponentInterface";
import {ContentInterface} from "../../responses/contents/interfaces/ContentInterface";
import flatpickr from "flatpickr";
import {GalleryCarouselView} from "../../galleries/views/GalleryCarouselView";

export abstract class AbstractHeaderView extends AbstractSubModelView {
	protected currentComponent: ComponentInterface;

	protected headerTitleEl: HTMLDivElement;
	protected headerInfoEl: HTMLDivElement;
	protected headerContainerEl: HTMLDivElement;
	protected imageContainterEl: HTMLDivElement;
	protected infoTableEl: HTMLTableSectionElement;

	private _isInternalRender = false;

	public internalRender(
		container: HTMLElement,
		data: HeaderResponseInterface,
	): void {
		this._isInternalRender = true;
		this._executeRender(container, data);
	}

	public render(
		container: HTMLElement,
		data: HeaderResponseInterface,
	): void {
		this._executeRender(container, data);
	}

	private _executeRender(
		container: HTMLElement,
		data: HeaderResponseInterface,
	): void {
		this.currentComponent = data.currentComponent;

		//Init
		const crs = container.createDiv({cls: 'rpgm-header-info'});
		this.headerTitleEl = crs.createDiv({cls: 'title'});

		//title
		data.link.fillContent(this.headerTitleEl, this.sourcePath);

		if (!this.currentComponent.isComplete){
			const completerEl = this.headerTitleEl.createDiv();
			const completeButtonEl = completerEl.createEl('button', {cls: 'actionButton', text: 'Mark this component as completed'});
			completeButtonEl.addEventListener('click', () => {
				this.manipulators.codeblock.update(
					'data.complete',
					true,
				);
			});
		}


		//container
		this.headerContainerEl = crs.createDiv({cls: 'container'});
		this.headerInfoEl = this.headerContainerEl.createDiv({cls: 'info'});
		this.infoTableEl = this.headerInfoEl.createEl('table', {cls: 'rpgm-headless-table'}).createTBody();

		if (data.images.length > 0){
			new GalleryCarouselView(this.app, data.images).render(this.headerContainerEl);
		} else {
			this.headerInfoEl.addClass('info-large');
		}

		if (!this._isInternalRender){
			data.elements.forEach((element: HeaderResponseElementInterface) => {
				const containerEl = this.createContainerEl(element);
				element.value.fillContent(containerEl, this.sourcePath);
			});
		}

		this.headerContainerEl.createDiv({cls: 'reset'});
	}

	protected createContainerEl(
		element: HeaderResponseElementInterface,
		fn: any|undefined = undefined,
		additionalParams: any[]|undefined=undefined,
	): HTMLTableCellElement|undefined {
		let tableRowEl = this.infoTableEl.insertRow();
		const titleCellEl = tableRowEl.insertCell();
		titleCellEl.addClass('title');
		titleCellEl.textContent = element.title;

		if (element.type === HeaderResponseType.Long) {
			titleCellEl.colSpan = 2;
			tableRowEl = this.infoTableEl.insertRow();
		}

		const response = tableRowEl.insertCell();
		response.addClass('content');

		if (fn !== undefined){
			let subContent: any|ContentInterface|undefined;

			if (additionalParams === undefined) {
				subContent = fn(response, element);
			} else {
				subContent = fn(response, ...additionalParams);
			}

			if (subContent !== undefined) {
				const subRowEl = this.infoTableEl.insertRow();
				subRowEl.insertCell().textContent = '';
				const subRowContentEl = subRowEl.insertCell();
				subRowContentEl.addClass('subcontent');

				if (typeof subContent === 'function'){
					if (additionalParams === undefined) {
						subContent(subRowContentEl, element);
					} else {
						subContent(subRowContentEl, ...additionalParams);
					}
				} else {
					subContent.fillContent(subRowContentEl, this.sourcePath);
				}
			}
		} else {
			if (element.additionalInformation?.editableField !== undefined) this.addEditorIcon(response, element.currentComponent, element.additionalInformation.editableField)

			if (element.type === HeaderResponseType.Long) {
				response.colSpan = 2;
			} else {
				response.addClass('contentShort');
			}
		}

		return response;
	}

	protected addDateSelector(
		contentEl: HTMLDivElement,
		data: HeaderResponseElementInterface,
	): void {
		if (data.additionalInformation === undefined)
			return;

		const options:any = {
			allowInput: true,
			dateFormat: "Y-m-d",
			altInput: true,
			onChange: (selectedDate: any, dateStr: any , instance: any) => {
				this.manipulators.codeblock.update(
					data.additionalInformation.yamlIdentifier,
					dateStr,
				);
			}
		};

		if (data.additionalInformation.date !== undefined) options.defaultDate = data.additionalInformation.date;

		const flatpickrEl = contentEl.createEl('input', {cls: 'flatpickr', type: 'text'});
		flatpickrEl.placeholder = data.additionalInformation.placeholder;
		flatpickrEl.readOnly = true;

		flatpickr(flatpickrEl, options);
	}
}
