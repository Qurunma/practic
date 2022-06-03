import { binder } from "./modules/mainModule.js";
import { addClient } from "./modules/addClient.js";

export async function main() {
  const response = await fetch("http://localhost:3000/api/todos/");
  const data = await response.json();

  for (let i = 0; i < data.length; i++) {
    addClient(data[i]);
  }
  binder();
}
main();
