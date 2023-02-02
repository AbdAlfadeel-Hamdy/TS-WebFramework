import { User, UserProps } from "../models/User";
import { View } from "./View";

export class UserForm extends View<User, UserProps> {
  eventsMap(): { [key: string]: () => void } {
    return {
      "click:.set-age": this.onSetAgeClick,
      "click:.set-name": this.onSetNameClick,
      "click:.save-user": this.onSaveUserClick,
    };
  }
  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  };
  onSaveUserClick = (): void => {
    this.model.save();
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
    <input placeholder="${this.model.get("name")}"/>
    <button class="set-name">Change Name</button>
    <button class="set-age">Set random age</button><br/>
    <button class="save-user">Save User</button>
    </div>
    `;
  }
}
