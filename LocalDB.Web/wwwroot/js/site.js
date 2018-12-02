"use strict";

let changeBtn, saveBtn;
let changesButtonsVisible = false;
let changedItems = new Array[];

function stockChanged(id, changeType) {
    const inputField = document.getElementById(`${id}-stock`);
    
    const itemObj = allItems.get(id);
    const oldStock = itemObj.hasOwnProperty("changedStock") ? itemObj.changedStock : parseInt(itemObj.stock); // Saves the previous value

    switch (changeType) {   // Check input
        case "--":
            itemObj.changedStock = checkValidNumber(oldStock - 1); // null if < 0
            break;

        case "++":
            itemObj.changedStock = (oldStock + 1);
            break;

        case "manual":
            itemObj.changedStock = checkValidNumber(parseInt(inputField.value)); // null if < 0
            break;
    }

    if (itemObj.changedStock != null) { // checks if input is correct + display buttons when invisible
        if (itemObj.changedStock != parseInt(itemObj.stock)) { // checks if it is a change compared to the original value
            allItems.set(id, itemObj);
            if (changesButtonsVisible == false) {
                changesButtonsVisible = true;
                setChangesButtonsVisible();
                changeBtn.addEventListener("click", viewChangesBtnPressed);
            }
        } else {
            allItems.set(itemObj.id, {
                name: itemObj.name,
                description: itemObj.description,

            });
            console.log([...allItems.values()].filter(item => item.hasOwnProperty("changedStock")).length);
            if ([...allItems.values()].filter(item => item.hasOwnProperty("changedStock")).length === 0) {
                setChangesButtonsInvisible();
                changesButtonsVisible = false;
            }
        }

        inputField.value = itemObj.changedStock; // inputField value must be changed regardless of whether it's actually a change or not (compared to original).
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
    let changedItemsLog = "Name:\tOriginal Value:\t->\tNew Value:\n"; // /t doesn't work in chrome :(
    console.log(allItems.values());
    [...allItems.values()].filter(item => item.hasOwnProperty("changedStock")).forEach(changedItem => {
        changedItemsLog += `${changedItem.name.length > 16 ? changedItem.name.substring(0, 16) + "..." : changedItem.name}\t${changedItem.stock}\t->\t${changedItem.changedStock}\n`;
    });

    
    BootstrapDialog.alert(changedItemsLog);
}

function setChangesButtonsVisible() {
    saveBtn.setAttribute("class", "btn btn-default");
    changeBtn.setAttribute("class", "btn btn-default");
}

function setChangesButtonsInvisible() {
    //saveBtn.style.visibility = "hidden";
    saveBtn.setAttribute("class", "btn btn-default hideButtons");
    changeBtn.setAttribute("class", "btn btn-default hideButtons");
}

// init
document.addEventListener("DOMContentLoaded", init);

function init(e) {
    saveBtn = document.getElementById("saveChangesBtn");
    changeBtn = document.getElementById("viewChangesBtn");

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