import { User } from "./models/User";
import { UserEdit } from "./views/UserEdit";

const user = User.buildUser({ name: "gonzalo", age: 22 });
const root = document.querySelector("#root");
if (root) {
  const userEdit = new UserEdit(root, user);
  userEdit.render();
  console.log(userEdit);
} else throw new Error(`Root Element not found`);
