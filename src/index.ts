import axios from "axios";
import { User } from "./models/User";

axios.post("http://localhost:3000/users", {
  name: "Hossam",
  age: 21,
});
