import { User } from "./models/User";

const user = new User({ name: "adham", age: 12 });
user.set({ name: "Hossam" });

console.log(user.get("name"));
console.log(user.get("age"));
