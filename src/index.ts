import { User } from "./models/User";
import { UserForm } from "./views/UserForm";

const user = User.buildUser({ name: "gonzalo", age: 22 });
const test = User.buildUser({ id: 1 });
test.fetch();
const root = document.querySelector("#root");
if (root) {
  const userForm = new UserForm(root, test);
  userForm.render();
} else throw new Error(`Root Element not found`);
