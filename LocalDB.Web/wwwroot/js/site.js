"use strict";

let changeBtn, saveBtn;
let changesButtonsVisible = false;

function stockChanged(id, changeType) {
    const inputField = document.getElementById(`${id}-stock`);
    let index;
    let itemObj;

    for (index in allItems) { //item = the indexes from an array
        if (allItems[index].itemId == id)
            itemObj = allItems[index];
    }
    
    const oldStock = itemObj.hasOwnProperty("changedStock") ? itemObj.changedStock : itemObj.stock; // Saves the previous value

    switch (changeType) {   // Check input
        case "--":
            itemObj.changedStock = checkValidNumber(oldStock - 1); // null if < 0
            break;

        case "++":
            itemObj.changedStock = checkValidNumber(oldStock + 1);
            break;

        case "manual":
            itemObj.changedStock = checkValidNumber(parseInt(inputField.value)); // null if < 0
            break;
    }

    if (itemObj.changedStock != null) { // checks if input is correct + display buttons when invisible
        if (itemObj.changedStock != itemObj.stock) { // checks if it is a change compared to the original value
            for (index in allItems) {
                if (allItems[index].itemId == id) {
                    allItems[index].changedStock = itemObj.changedStock;

                    if (changesButtonsVisible == false) {
                        changesButtonsVisible = true;
                        setChangesButtonsVisible();
                   }
                }
            }
        } else {
            for (index in allItems) {
                if (allItems[index].itemId == id) {
                    debugger;
                    delete allItems[index].changedStock;
                }
            }
                if (allItems.filter(item => item.hasOwnProperty("changedStock")).length === 0) {
                    setChangesButtonsInvisible();
                    changesButtonsVisible = false;
                }
        }
        inputField.value = isNaN(itemObj.changedStock) ? itemObj.stock : itemObj.changedStock; // inputField value must be changed regardless of whether it's actually a change or not (compared to original).
    } else {
        inputField.value = oldStock;
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
//---------------------------------to do -----------------------------------------------------------
function viewChangesBtnPressed(e) {
    let changedItemsLog = "Name:\tOriginal Value:\t->\tNew Value:\n"; // /t doesn't work in chrome :(
    console.log(allItems.values());
    [...allItems.values()].filter(item => item.hasOwnProperty("changedStock")).forEach(changedItem => {
        changedItemsLog += `${changedItem.name.length > 16 ? changedItem.name.substring(0, 16) + "..." : changedItem.name}\t${changedItem.stock}\t->\t${changedItem.changedStock}\n`;
    });

    
    BootstrapDialog.alert(changedItemsLog);
}

function saveChangesBtnPressed(e) {
    let changedItems = allItems.filter(item => {
        item.hasOwnProperty("changedStock");
    });

    $.post('@Url.Action("UpdateStock")', { changedItems: changedItems },
        () => {
            $('#result').html('"UpdateStock()" successfully called.');
        });
    window.location.reload();
}

function setChangesButtonsVisible() {
    saveBtn.style.visibility = "visible";
    changeBtn.style.visibility = "visible";
}

function setChangesButtonsInvisible() {
    saveBtn.style.visibility = "hidden";
    changeBtn.style.visibility = "hidden";
}

// init
document.addEventListener("DOMContentLoaded", init);

function init(e) {
    saveBtn = document.getElementById("saveChangesBtn");
    changeBtn = document.getElementById("viewChangesBtn");
    setChangesButtonsInvisible();
    changeBtn.addEventListener("click", viewChangesBtnPressed);
    saveBtn.addEventListener("click", saveChangesBtnPressed);

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