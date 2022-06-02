export function editor(
  id,
  modalEditSurname,
  modalEditName,
  modalEditFathername,
  contacts,
  date
) {
  fetch(`http://localhost:3000/api/todos/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      FIO: `${modalEditSurname} ${modalEditName} ${modalEditFathername}`,
      social: contacts,
      date: date,
    }),
  });
}
