"use strict";

import { addContact } from "./addContact.js";
import { addClient } from "./addClient.js";
import { deleter } from "./deleter.js";
import { editor } from "./editor.js";

export function binder() {
  const buttonCreate = document.querySelector(".create-client");
  const buttonsAddContact = document.querySelectorAll(".create-contact");
  const buttonsCloseModal = document.querySelectorAll(".modal-close");
  const modalWindows = document.querySelectorAll(".modal");
  const modalAddClient = document.querySelector(".modal-add-send");
  const modalDeleteConfirm = document.querySelector(".modal-delete-confirm");
  const editSave = document.querySelector(".modal-edit-send");
  const editDelete = document.querySelector(".modal-edit-delete");
  let contacts = 0;
  let timeout;

  const table = document.querySelector(".sortable");
  const headers = table.querySelectorAll(".sortable-column");
  const tableBody = document.querySelector("tbody");
  const rows = tableBody.querySelectorAll("tr");

  const allRows = document.querySelectorAll(".table-element");

  forFilter(allRows);
  function forFilter(allRows) {
    const inp = document.querySelector(".header-search");

    inp.addEventListener("input", () => {
      clearInterval(timeout);
      timeout = setTimeout(() => {
        if (inp.value.trim() != "") {
          let indexElem;
          if (Number(inp.value.trim())) {
            indexElem = 0;
          } else {
            indexElem = 1;
          }
          let array = [];
          // document.querySelector(".table-body").innerHTML = "";
          allRows.forEach((elem) => {
            const elems = elem.querySelectorAll("td");

            elems.forEach((element, index) => {
              if (
                indexElem === index &&
                element.textContent
                  .toUpperCase()
                  .includes(inp.value.trim().toUpperCase())
              ) {
                array.push(elem);
                const option = document.createElement("option");
                option.textContent =
                  elem.querySelectorAll("td")[indexElem].textContent;
                document.querySelector("#for-search").append(option);
              }
            });
          });
        } else {
          document.querySelector("#for-search").innerHTML = "";
          allRows.forEach((element) => {
            console.log(element);
            document.querySelector(".").append(element);
          });
        }
      }, 700);
    }),
      allRows;
  }

  // Направление сортировки
  const directions = Array.from(headers).map(function (header) {
    return "";
  });

  // Преобразовать содержимое данной ячейки в заданном столбце
  const transform = function (index, content) {
    // Получить тип данных столбца
    const type = headers[index].getAttribute("data-type");
    switch (type) {
      case "number":
        return parseFloat(content);
      case "string":
      default:
        return content;
    }
  };

  function bindFilter() {
    const sortColumn = function (index) {
      // Получить текущее направление
      const direction = directions[index] || "desc";

      // Фактор по направлению
      const multiplier = direction === "asc" ? 1 : -1;

      const newRows = Array.from(rows);

      newRows.sort(function (rowA, rowB) {
        const cellA = rowA.querySelectorAll("td")[index].innerHTML;
        const cellB = rowB.querySelectorAll("td")[index].innerHTML;

        const a = transform(index, cellA);
        const b = transform(index, cellB);

        switch (true) {
          case a > b:
            return 1 * multiplier;
          case a < b:
            return -1 * multiplier;
          case a === b:
            return 0;
        }
      });

      // Удалить старые строки
      rows.forEach(function (row) {
        tableBody.removeChild(row);
      });

      // Поменять направление
      directions[index] = direction === "asc" ? "desc" : "asc";
      console.log(direction[index]);
      headers[index].querySelector("button").querySelector("img").src =
        direction === "asc"
          ? "./Icons/arrow_downward.svg"
          : "./Icons/arrow_upward.svg";
      if (headers[index].querySelector(".FIO-sort")) {
        headers[index].querySelector(".FIO-sort").textContent =
          direction === "asc" ? "Я-А" : "А-Я";
      }

      // Добавить новую строку
      newRows.forEach(function (newRow) {
        tableBody.appendChild(newRow);
      });
    };

    headers.forEach(function (header, index) {
      header.addEventListener("click", function () {
        sortColumn(index);
      });
    });
  }

  bindFilter();

  editSave.addEventListener("click", () => {
    const id = editDelete
      .closest(".modal-edit-inner")
      .querySelector(".modal-edit-subheader")
      .textContent.split(" ")[1];
    const modalEditSurnameValue =
      document.querySelector("#edit-second-name").value;
    const modalEditNameValue = document.querySelector("#edit-first-name").value;
    const modalEditFathernameValue =
      document.querySelector("#edit-father-name").value;
    const contactsAll = document.querySelectorAll(".contact-edit-element");

    const idMeanings = document.querySelectorAll(".id-meaning");
    const contacts = [];
    let spans;
    const dateChange = new Date();
    for (let i = 0; i < contactsAll.length; i++) {
      if (!contactsAll[i].querySelector("input").value == "") {
        contacts.push({
          icon: `./Icons/${contactsAll[i].querySelector("select").value}.svg`,
          text: contactsAll[i].querySelector("input").value,
        });
      }
    }

    for (let i = 0; i < idMeanings.length; i++) {
      if ((idMeanings[i].textContent = id)) {
        spans = idMeanings[i]
          .closest(".table-element")
          .querySelector(".date-meaning")
          .querySelectorAll("span");
        break;
      }
    }

    const date = [
      { date: spans[0].textContent, time: spans[1].textContent },
      {
        date: dateChange.toLocaleDateString(["arabext", "gregory"]),
        time: dateChange.toLocaleTimeString(["arabext", "gregory"]),
      },
    ];

    editor(
      id,
      modalEditSurnameValue,
      modalEditNameValue,
      modalEditFathernameValue,
      contacts,
      date
    );
  });

  editDelete.addEventListener("click", () => {
    const id = editDelete
      .closest(".modal-edit-inner")
      .querySelector(".modal-edit-subheader")
      .textContent.split(" ")[1];
    document.querySelector(".modal-delete").style.display = "flex";
    document.querySelector(".modal-edit").style.display = "none";

    document.querySelector(".modal-delete-subheader").textContent = `ID: ${id}`;
  });

  modalDeleteConfirm.addEventListener("click", () => {
    const id = modalDeleteConfirm
      .closest(".modal-delete-body")
      .querySelector(".modal-delete-subheader")
      .textContent.split(" ")[1];
    deleter(id);
  });

  buttonCreate.addEventListener("click", () => {
    document.querySelector(".modal-add").style.display = "flex";
  });
  buttonsAddContact.forEach((element) => {
    element.addEventListener("click", (event) => {
      addContact(element);
      contacts++;
      if (contacts == 10) {
        event.target.closest(".create-contact").style.display = "none";
      }
    });
  });
  buttonsCloseModal.forEach((element) => {
    element.addEventListener("click", (event) => {
      const modalWindow = event.target.closest(".modal");
      modalWindow.style.display = "none";
      //   body.classList.remove("no-scroll");
      document.querySelector(".edit-contact-elements").innerHTML = "";
    });
  });
  modalWindows.forEach((element) => {
    element.addEventListener("click", (event) => {
      const modalWindow = event.target.closest(".modal");
      const isModal = event.target.closest(".modal-inner");

      if (!isModal) {
        modalWindow.style.display = "none";
        document.querySelector(".edit-contact-elements").innerHTML = "";
        // body.classList.remove("no-scroll");
      }
    });
  });
  modalAddClient.addEventListener("click", () => {
    addClient({ null1: null, null2: null, null3: null, null4: null });
  });
}
