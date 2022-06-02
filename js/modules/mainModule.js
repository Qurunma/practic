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
    let spansChange;
    let spans;
    console.log(contactsAll);
    for (let i = 0; i < contactsAll.length; i++) {
      console.log(contactsAll[i].querySelector("select").value);
      contacts.push({
        icon: `./Icons/${contactsAll[i].querySelector("select").value}.svg`,
        text: contactsAll[i].querySelector("input").value,
      });
      console.log(contacts[i]);
    }

    for (let i = 0; i < idMeanings.length; i++) {
      if ((idMeanings[i].textContent = id)) {
        spansChange = idMeanings[i]
          .closest(".table-element")
          .querySelector(".change-meaning")
          .querySelectorAll("span");
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
        date: spansChange[0].textContent,
        time: spansChange[1].textContent,
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
    element.addEventListener("click", () => {
      addContact(element);
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
