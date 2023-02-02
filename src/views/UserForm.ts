import { User, UserProps } from "../models/User";
import { View } from "./View";

export class UserForm extends View<User, UserProps> {
  eventsMap(): { [key: string]: () => void } {
    return {
      "click:.set-age": this.onSetAgeClick,
      "click:.set-name": this.onSetNameClick,
    };
  }
  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  };
  onSetNameClick = (): void => {
    const input = document.querySelector("input");
    if (input) {
      const name = input.value;
      this.model.set({ name });
    }
  };
  template(): string {
    return `
    <div>
    <h1>UserForm</h1>
    <p>User Name: ${this.model.get("name")}</P>
    <p>User Age: ${this.model.get("age")}</P>
    <input/>
    <button class="set-name">Change Name</button>
    <button class="set-age">Set random age</button>
    </div>
    `;
  }
}
