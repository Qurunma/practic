export function sender(obj) {
  fetch("http://localhost:3000/api/todos", {
    method: "POST",
    body: JSON.stringify(obj),
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}
