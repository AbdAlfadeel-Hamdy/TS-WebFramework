import { User } from "./models/User";

const user = new User({ id: 1 });

user.on("change", () => console.log("Changed!"));

user.fetch();

setTimeout(() => {
  console.log(user.get("name"));
}, 1000);
