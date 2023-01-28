import { User } from "./models/User";

const user = new User({ name: "adham", age: 12 });

user.on("click", () => {
  console.log("click 1");
});
user.on("click", () => {
  console.log("click 2");
});
user.on("change", () => {
  console.log("change");
});

user.trigger("click");
user.trigger("change");
user.trigger("update");

console.log(user);
