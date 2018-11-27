"use strict";

let changedItems = new Map();
let changesButtonsMade = false;

function stockChanged(id, changeType) {
    const inputField = document.getElementById(`${id}-stock`);
    const oldStock = changedItems.has(id) ? changedItems.get(id) : parseInt(originalItems.get(id).stock); // Saves the previous value (before change), checks where the last known value is located.
    let newStock;

    switch (changeType) {   // Check input
        case "--":
            newStock = checkValidNumber(oldStock - 1); // null if < 0
            break;

        case "++":
            newStock = (oldStock + 1);
            break;

        case "manual":
            newStock = checkValidNumber(parseInt(inputField.value)); // null if < 0
            break;
    }

    if (newStock != null) { // Save input when correct + display buttons
        if (newStock != parseInt(originalItems.get(id).stock)) {
            changedItems.set(id, newStock);

            if (changesButtonsMade == false) {
                changesButtonsMade = true;

                // saveChanges button
                let buttonElem = document.createElement("button");
                buttonElem.setAttribute("class", "btn btn-default");
                buttonElem.innerHTML = "Save Changes";

                buttonElem.addEventListener("click", saveChanges);

                document.getElementById("menu-div").appendChild(buttonElem);

                buttonElem = document.createElement("button");
                buttonElem.setAttribute("class", "btn btn-default");
                buttonElem.setAttribute("id", "viewChangesBtn");
                buttonElem.innerHTML = "View Changes";

                document.getElementById("menu-div").appendChild(buttonElem);
            }
        } else {
            changedItems.delete(id); // When you change an item to the original value it isn't changed, therefore it should be deleted from the changedItems.
        }

        inputField.value = newStock; // inputField value must be changed regardless of whether it's actually a change or not (compared to original).

        // Overwrite onClick eventHandler with updated items.
        let viewChangesBtn = document.getElementById("viewChangesBtn");
        viewChangesBtn.removeEventListener("click", viewChangesBtnPressed);
        viewChangesBtn.addEventListener("click", viewChangesBtnPressed);
    } else {
        inputField.value = previousStock;
    }
}

function checkValidNumber(value) {
    if (isNaN(value)) {
        alert("Value is not a valid number!");
        value = null;
    } else {
        if (value < 0) {
            alert("Negative stock amounts are not allowed!");
            value = null;
        }
    }

    return value;
}

function viewChangesBtnPressed(e) {
    let changedItemsLog = "Name:                     Original Value:  ->  New Value:\n"; // /t doesn't work in chrome :(
    let originalElem;

    changedItems.forEach((value, key) => {
        originalElem = originalItems.get(key);
        changedItemsLog += `${originalElem.name.length > 16 ? originalElem.name.substring(0, 16) + "..." : originalElem.name}                     ${originalElem.stock}  ->  ${value}\n`;
    });

    alert(changedItemsLog);
}

// init

document.addEventListener("DOMContentLoaded", init);

function init(e) {
    document.querySelectorAll(".btn-min").forEach((button) => {
        button.addEventListener("click", e => {
            stockChanged(parseInt(button.id.split("-")[0]), "--"); // return the id - -min
        });
    });

    document.querySelectorAll(".btn-plus").forEach((button) => {
        button.addEventListener("click", e => {
            stockChanged(parseInt(button.id.split("-")[0]), "++"); // return the id - -plus
        });
    });

    document.querySelectorAll(".input-stock").forEach((button) => {
        button.addEventListener("change", e => {
            stockChanged(parseInt(button.id.split("-")[0]), "manual"); // return the id - -stock
        });
    });
}