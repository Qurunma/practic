export function deleter(id) {
  fetch(`http://localhost:3000/api/todos/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}
