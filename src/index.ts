import { User } from "./models/User";
import { UserForm } from "./views/UserForm";

const root = document.querySelector("#root ");
const user = User.buildUser({ name: "gonzalo", age: 22 });
const userForm = new UserForm(root, user);

userForm.render();
