export class UserForm {
  constructor(public parent: Element) {}
  eventsMap(): { [key: string]: () => void } {
    return {
      "click:button": this.onClickButton,
    };
  }
  onClickButton(): void {
    console.log("Button clicked");
  }
  template(): string {
    return `
    <div>
    <h1>UserForm</h1>
    <input/>
    <button>Click Me</button>
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
