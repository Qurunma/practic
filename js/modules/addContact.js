export function addContact(element) {
  const modal = element.closest(".modal");
  const div = document.createElement("div");
  const select = document.createElement("select");
  const options = [];
  const input = document.createElement("input");
  const buttonDelete = document.createElement("button");
  const imgDelete = document.createElement("img");

  if (modal.classList.contains("modal-add")) {
    div.classList.add("contact-add-element");
  } else {
    div.classList.add("contact-edit-element");
  }
  select.classList.add("contact-type");
  input.classList.add("contact-text");
  buttonDelete.append(imgDelete);
  buttonDelete.classList.add("btn-delete");

  buttonDelete.addEventListener("click", () => {
    div
      .closest(".modal-contacts")
      .querySelector(".create-contact").style.display = "flex";
    div.remove();
  });

  imgDelete.src = "./Icons/cross.svg";

  div.append(select);
  div.append(input);
  div.append(buttonDelete);

  for (let i = 0; i < 6; i++) {
    options.push(document.createElement("option"));
    switch (i) {
      case 0:
        options[i].value = "phone";
        options[i].textContent = "Телефон";
        break;
      case 1:
        options[i].value = "phone";
        options[i].textContent = "Доп. телефон";
        break;
      case 2:
        options[i].value = "mail";
        options[i].textContent = "Email";
        break;
      case 3:
        options[i].value = "vk";
        options[i].textContent = "Vk";
        break;
      case 4:
        options[i].value = "fb";
        options[i].textContent = "Facebook";
        break;
      case 5:
        options[i].value = "other";
        options[i].textContent = "Другое";
        break;
    }

    // options[i].addEventListener("change", () => {
    //   if (select.value == "mail") {
    //     input.type = "email";
    //   } else {
    //     input.type = "text";
    //   }
    // });

    select.append(options[i]);
  }
  options[
    document.querySelectorAll(".contact-type").length > 5
      ? 5
      : document.querySelectorAll(".contact-type").length
  ].setAttribute("selected", "true");

  modal.querySelector(".contact-elements").append(div);
}
