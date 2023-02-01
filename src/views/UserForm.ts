import { User } from "../models/User";

export class UserForm {
  constructor(public parent: Element, public model: User) {}
  eventsMap(): { [key: string]: () => void } {
    return {
      "click:.set-age": this.onSetAgeClick,
    };
  }
  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  };
  template(): string {
    return `
    <div>
    <h1>UserForm</h1>
    <p>User Name: ${this.model.get("name")}</P>
    <p>User Age: ${this.model.get("age")}</P>
    <input/>
    <button>Click me</button>
    <button class="set-age">Set random age</button>
    </div>
    `;
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
  render(): void {
    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();
    this.bindEvents(templateElement.content);
    this.parent.append(templateElement.content);
  }
}
