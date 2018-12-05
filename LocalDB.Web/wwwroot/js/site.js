"use strict";

let changeBtn, saveBtn;
let changesButtonsVisible;

function stockChanged(id, changeType) {
    const inputField = document.getElementById(`${id}-stock`);
    let itemIndex;

    for (itemIndex in allItems) {
        if (allItems[itemIndex].itemId == id) {
            break; // if the requested item is found: break the loop so the itemIndex is at the right value.
        }
    }

    const oldStock = allItems[itemIndex].hasOwnProperty("changedStock") ? allItems[itemIndex].changedStock : allItems[itemIndex].stock; // Saves the previous value

    switch (changeType) {   // Check input
        case "--":
            allItems[itemIndex].changedStock = checkValidNumber(oldStock - 1); // null if < 0
            break;

        case "++":
            allItems[itemIndex].changedStock = checkValidNumber(oldStock + 1);
            break;

        case "manual":
            allItems[itemIndex].changedStock = checkValidNumber(parseInt(inputField.value)); // null if < 0
            break;
    }

    if (allItems[itemIndex].changedStock != null) { // checks if input is correct (> 0)
        if (allItems[itemIndex].changedStock != allItems[itemIndex].stock) { // checks if it is a change compared to the original value
            if (changesButtonsVisible == false) {
                changesButtonsVisible = true;
                setChangesButtonsVisible();
            }

            inputField.value = allItems[itemIndex].changedStock;
        } else { // "change" is the same as the original value so it isn't a change.
            inputField.value = allItems[itemIndex].stock;
            delete allItems[itemIndex].changedStock;
            hideChangeButtonsWhenNeeded();
        }

    } else { // Incorrect input
        inputField.value = oldStock;
        delete allItems[itemIndex].changedStock;
        hideChangeButtonsWhenNeeded();
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

function hideChangeButtonsWhenNeeded() { // Checks if there are still changes, if there are none: hide changeButtons
    let hasChanges = false;

    for (let item of allItems) {
        if (item.hasOwnProperty("changedStock")) {
            hasChanges = true;
            break; // If one item is changed, the other results don't matter anymore
        }
    }

    if (!hasChanges) { // When there are no changes the changesButtons should be hidden
        setChangesButtonsInvisible();
        changesButtonsVisible = false;
    }
}
function viewChangesBtnPressed(e) {
    let changedItemsLog = "";
    allItems.forEach(item => {
        if (item.hasOwnProperty("changedStock")) {
            changedItemsLog += `<strong>${item.name}:</strong>\n${item.stock} ${String.fromCharCode(8594)} ${item.changedStock}\n`;
        }
    });

    let bootDialog = new BootstrapDialog.show({
        type: BootstrapDialog.TYPE_WARNING,
        title: "Local Changes",
        message: changedItemsLog,
        buttons: [{
            label: "Discard Changes",
            action: () =>
            {
                discardChangesBtnPressed();
                bootDialog.close();
            }
        },
            {
                label: "Save Changes",
                action: () => {
                    saveChangesBtnPressed();
                    bootDialog.close();
                },
            }
        ]
    });
}
function discardChangesBtnPressed() {
    let teller = 1;
    allItems.forEach(item => {
            if (item.hasOwnProperty("changedStock"))
            document.getElementById(`${teller}-stock`).value = item.stock;
        teller++;
        delete item.changedStock;
    });
    setChangesButtonsInvisible();
    const warningDiv = document.createElement("div");
    warningDiv.setAttribute("id", "warningDiv");
    warningDiv.setAttribute("class", "alert alert-warning");
    warningDiv.innerHTML = "Changes have been discarded!";
    document.body.insertBefore(warningDiv, document.body.firstChild)
    setTimeout(() => { //makes the alert go away after 5s.
        $("#warningDiv").remove();
    }, 5000);
}

function saveChangesBtnPressed(e) {
    let jsChangedItems = new Array;
    allItems.forEach( item => {
        if(item.hasOwnProperty("changedStock")) { // If it is a changed item
            jsChangedItems.push({
                itemId: item.itemId, // Only fill the list with the required properties
                changedStock: item.changedStock
            });
        }
    });

    $.post('/Item/UpdateStock', { changedItems: jsChangedItems }, function (data) {
        const alertDiv = document.createElement("div");
        alertDiv.setAttribute("role", "alert");
        alertDiv.setAttribute("id", "alertDiv");

        switch (data) {
            case "Success":
                alertDiv.setAttribute("class", "alert alert-success");
                alertDiv.innerHTML = "Changes successfully pushed!";
                break;

            case "Error":
                alertDiv.setAttribute("class", "alert alert-danger");
                alertDiv.innerHTML = "Error while pushing changes!";
                break;

            default:
                alertDiv.setAttribute("class", "alert alert-danger");
                alertDiv.innerHTML = "Something went wrong!";
        }
        
        document.body.insertBefore(alertDiv, document.body.firstChild) // Show the dialog above the changesButtons
        setChangesButtonsInvisible(); // When changes are pushed, the buttons should dissappear

        setTimeout(() => { //makes the alert go away after 5s.
            $("#alertDiv").remove();
        }, 5000);

        allItems.forEach(item => { // Changes should be set as original values now
            if (item.hasOwnProperty("changedStock")) {
                item.stock = item.changedStock;
                delete item.changedStock;
            }
        });

    });
}

function setChangesButtonsVisible() {
    saveBtn.style.visibility = "visible";
    changeBtn.style.visibility = "visible";
    changesButtonsVisible = true;
}

function setChangesButtonsInvisible() {
    saveBtn.style.visibility = "hidden";
    changeBtn.style.visibility = "hidden";
    changesButtonsVisible = false;
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