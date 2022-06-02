export function backAddContact(contacts, values) {
  const modalContacts = document.querySelector(".edit-contact-elements");
  let isMainPhone = false;
  for (let i = 0; i < contacts.length; i++) {
    const div = document.createElement("div");
    const select = document.createElement("select");
    const options = [];
    const input = document.createElement("input");

    input.value = values[i];

    const type = contacts[i]
      .querySelector("img")
      .src.split("/")[4]
      .split(".")[0];

    console.log(type);

    div.classList.add("contact-edit-element");
    select.classList.add("contact-type");
    input.classList.add("contact-text");

    div.append(select);
    div.append(input);

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
    switch (type) {
      case "phone":
        if (!isMainPhone) {
          options[0].selected = "true";
          isMainPhone = true;
        } else {
          options[1].selected = "true";
        }
        break;
      case "mail":
        options[2].selected = "true";
        break;
      case "vk":
        options[3].selected = "true";
        break;
      case "fb":
        options[4].selected = "true";
        break;
      case "other":
        options[5].selected = "true";
        break;
    }
    modalContacts.append(div);
  }
}
