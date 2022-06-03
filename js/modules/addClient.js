import { sender } from "./send.js";
import { backAddContact } from "./backAddContact.js";

export function addClient({ FIO, social, date, id }, error, fromFilter) {
  const socialText = [];

  const tbody = document.querySelector("tbody");
  const inpSurname = document.querySelector(".modal-add-surname");
  const inpName = document.querySelector(".modal-add-name");
  const inpFathername = document.querySelector(".modal-add-fathername");
  const errors = document.querySelectorAll(".error");
  const nowTime = new Date();
  const contacts =
    social != null
      ? { social: social, fromServer: true }
      : {
          social: document.querySelectorAll(".contact-add-element"),
          fromServer: false,
        };

  errors.forEach((element) => {
    element.textContent = "";
  });

  if (
    error ||
    (inpSurname.value.trim() != "" &&
      !inpSurname.value.includes(" ") &&
      !Number(inpSurname.value.trim()) &&
      inpName.value.trim() != "" &&
      !inpName.value.includes(" ") &&
      !Number(inpName.value.trim()) &&
      !Number(inpFathername.value.trim()) &&
      !inpFathername.value.includes(" ")) ||
    (FIO != undefined && social != undefined && date != undefined)
  ) {
    const row = document.createElement("tr");
    const columns = [];
    for (let i = 0; i < 6; i++) {
      columns.push(document.createElement("td"));
      row.append(columns[i]);
    }
    const FIOrework = FIO?.split(" ") || ["", "", ""];

    // столбец 1
    columns[0].innerHTML = id || document.querySelectorAll("tr").length;
    columns[0].classList.add("id-meaning");
    // столбец 2
    columns[1].innerHTML = `${inpSurname.value.trim() || FIOrework[0]} ${
      inpName.value.trim() || FIOrework[1]
    } ${inpFathername.value.trim() || FIOrework[2]}`;
    columns[1].classList.add("FIO-meaning");
    // столбец 3
    columns[2].innerHTML = `<span class="date">${
      date != undefined
        ? date[0].date
        : nowTime.toLocaleDateString(["arabext", "gregory"])
    }</span><span class="time">${
      date != undefined
        ? date[0].time
        : nowTime.toLocaleTimeString(["arabext", "gregory"])
    }</span>`;
    columns[2].classList.add("date-meaning");
    columns[2].classList.add("table-date");
    // столбец 4
    columns[3].innerHTML = `<span class="date">${
      date != undefined
        ? date[1].date
        : nowTime.toLocaleDateString(["arabext", "gregory"])
    }</span><span class="time">${
      date != undefined
        ? date[1].time
        : nowTime.toLocaleTimeString(["arabext", "gregory"])
    }</span>`;
    columns[3].classList.add("change-meaning");
    columns[3].classList.add("table-date");
    // столбец 5
    if (!contacts.fromServer) {
      for (let i = 0; i < contacts.social.length; i++) {
        const select = contacts.social[i].querySelector(".contact-type");
        const value = contacts.social[i].querySelector(".contact-text").value;
        if (value) {
          const button = document.createElement("button");
          const img = document.createElement("img");

          img.src = `./Icons/${select.value}.svg`;
          button.append(img);
          columns[4].append(button);
          socialText.push(value);

          button.addEventListener("mouseenter", () => {
            const pos = button.getBoundingClientRect();
            const div = document.createElement("div");
            const img = document.createElement("img");
            const span = document.createElement("span");

            img.src = "./Icons/Union.svg";
            img.style.position = "absolute";
            img.style.left = "0";
            img.style.top = "0";
            span.textContent = value;
            span.style.position = "relative";
            span.style.zIndex = 10;
            div.append(img);
            div.append(span);

            div.classList.add("contact");

            document.querySelector("body").append(div);

            div.style.width = "140px";
            div.style.height = "40px";

            div.style.left = `${pos.x - 62}px`;
            div.style.top = `${pos.y - 40}px`;
            button.addEventListener("mouseleave", () => {
              div.remove();
            });
          });
        }
      }
    } else {
      for (let i = 0; i < contacts.social.length; i++) {
        const button = document.createElement("button");
        const img = document.createElement("img");

        img.src = contacts.social[i].icon;
        button.append(img);
        columns[4].append(button);

        socialText.push(contacts.social[i].text);

        button.addEventListener("mouseenter", () => {
          const pos = button.getBoundingClientRect();
          const div = document.createElement("div");
          const img = document.createElement("img");
          const span = document.createElement("span");

          img.src = "./Icons/Union.svg";
          img.style.position = "absolute";
          img.style.left = "0";
          img.style.top = "0";
          span.textContent = contacts.social[i].text;
          span.style.position = "relative";
          span.style.zIndex = 10;
          div.append(img);
          div.append(span);

          div.classList.add("contact");

          document.querySelector("body").append(div);

          div.style.width = "140px";
          div.style.height = "40px";

          div.style.left = `${pos.x - 62}px`;
          div.style.top = `${pos.y - 40}px`;
          button.addEventListener("mouseleave", () => {
            div.remove();
          });
        });
      }
    }
    columns[4].classList.add("contacts-meaning");
    // столбец 6
    const buttonEdit = document.createElement("button");
    const imgEdit = document.createElement("img");
    const spanEdit = document.createElement("span");

    const buttonDelete = document.createElement("button");
    const imgDelete = document.createElement("img");
    const spanDelete = document.createElement("span");

    imgEdit.src = "./Icons/edit.svg";
    spanEdit.textContent = "Изменить";
    buttonEdit.append(imgEdit);
    buttonEdit.append(spanEdit);
    columns[5].append(buttonEdit);

    buttonEdit.addEventListener("click", () => {
      const modal = document.querySelector(".modal-edit");
      modal.style.display = "flex";
      const inpSurname = modal.querySelector("#edit-second-name");
      const inpName = modal.querySelector("#edit-first-name");
      const inpFathername = modal.querySelector("#edit-father-name");
      const FIO = buttonEdit
        .closest(".table-element")
        .querySelector(".FIO-meaning")
        .textContent.split(" ");
      const id = buttonEdit
        .closest(".table-element")
        .querySelector(".id-meaning").textContent;
      document.querySelector(".modal-edit-subheader").textContent = `ID: ${id}`;

      const contacts = buttonEdit
        .closest(".table-element")
        .querySelector(".contacts-meaning")
        .querySelectorAll("button");

      backAddContact(contacts, socialText);

      inpSurname.value = FIO[0];
      inpName.value = FIO[1];
      inpFathername.value = FIO[2];
    });

    imgDelete.src = "./Icons/delete.svg";
    spanDelete.textContent = "Удалить";
    buttonDelete.append(imgDelete);
    buttonDelete.append(spanDelete);

    buttonDelete.addEventListener("click", () => {
      document.querySelector(".modal-delete").style.display = "flex";
      const id = buttonDelete
        .closest(".table-element")
        .querySelector(".id-meaning").textContent;
      document.querySelector(
        ".modal-delete-subheader"
      ).textContent = `ID: ${id}`;
    });

    columns[5].append(buttonDelete);
    columns[5].classList.add("actions-meaning");

    row.classList.add("table-element");
    tbody.append(row);

    const modal = document.querySelector(".modal");
    modal.querySelector(".contact-elements").innerHTML = "";
    modal.style.display = "none";
    inpSurname.value = "";
    inpName.value = "";
    inpFathername.value = "";

    const allSocial = columns[4].querySelectorAll("button");
    const allSocialSrc = [];
    for (let i = 0; i < allSocial.length; i++) {
      allSocialSrc.push(allSocial[i].querySelector("img").src);
    }
    const datesText = [
      columns[2].querySelectorAll("span"),
      columns[3].querySelectorAll("span"),
    ];
    const dates = [];
    for (let i = 0; i < datesText.length; i++) {
      const obj = {};
      for (let j = 0; j < datesText[i].length; j++) {
        switch (j) {
          case 0:
            obj.date = datesText[i][0].textContent;
            break;
          case 1:
            obj.time = datesText[i][1].textContent;
            break;
        }
      }
      dates.push(obj);
    }

    if (!FIO) {
      sender({
        FIO: columns[1].textContent,
        social: { icon: allSocialSrc, text: socialText },
        date: dates,
      });
    }
  } else {
    if (
      inpSurname.value.trim() == "" ||
      Number(inpSurname.value.trim()) ||
      inpSurname.value.includes(" ")
    ) {
      const modalItem = inpSurname.closest(".modal-add-item");
      modalItem.querySelector(".error").textContent =
        "Введите корректную фамилию";
    }
    if (
      inpName.value.trim() == "" ||
      Number(inpName.value.trim()) ||
      inpName.value.includes(" ")
    ) {
      const modalItem = inpName.closest(".modal-add-item");
      modalItem.querySelector(".error").textContent = "Введите корректное имя";
    }
    if (
      (inpFathername.value.trim() != "" &&
        Number(inpFathername.value.trim())) ||
      inpFathername.value.includes(" ")
    ) {
      const modalItem = inpFathername.closest(".modal-add-item");
      modalItem.querySelector(".error").textContent =
        "Введите корректное отчество";
    }
  }
}
