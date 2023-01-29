import { User } from "./models/User";

const user = new User({});

user.events.on("click", () => console.log("Hi"));
user.events.trigger("click");
