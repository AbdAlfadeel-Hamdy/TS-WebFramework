import { HasId } from "../models/ApiSync";
import { Model } from "../models/Model";

export abstract class View<T extends Model<K>, K extends HasId> {
  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  regions: { [key: string]: Element } = {};

  abstract template(): string;

  regionsMap(): { [key: string]: string } {
    return {};
  }
  eventsMap(): { [key: string]: () => void } {
    return {};
  }
  bindModel(): void {
    this.model.on("change", this.render.bind(this));
  }
  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    for (const eventKey in eventsMap) {
      const [event, selector] = eventKey.split(":");
      fragment.querySelectorAll(selector).forEach((element: Element): void => {
        element.addEventListener(event, eventsMap[eventKey]);
      });
    }
  }
  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();
    for (const key in regionsMap) {
      const selector = regionsMap[key];
      const element = fragment.querySelector(selector);
      if (element) {
        this.regions[key] = element;
      }
    }
  }
  onRender(): void {}
  render(): void {
    this.parent.innerHTML = "";
    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();
    this.bindEvents(templateElement.content);
    this.mapRegions(templateElement.content);
    this.onRender();
    this.parent.append(templateElement.content);
  }
}
