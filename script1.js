const add = document.querySelector("#add");
const save = document.querySelector("#save");
let tableData = [];
let currentRow = null; //for storing index

//get the table
const table = document.getElementById("table");
// Array containing the table headers (excluding the first checkbox column)
const headers = ["First Name", "Last Name", "Designation", "Address", "Action"];

function generateTable(table) {
  let thead = table.createTHead();
  let headerRow = thead.insertRow();

  // Create the first column header with a checkbox
  const checkboxheader = document.createElement("th");
  //create label for the input
  const checkboxLabel = document.createElement("label");
  const headercheckbox = document.createElement("input");
  headercheckbox.type = "checkbox";
  headercheckbox.id = "checkAll";

  //create Text
  const headercheckboxText = document.createTextNode("Select All");

  checkboxLabel.appendChild(headercheckbox);
  checkboxLabel.appendChild(headercheckboxText);

  checkboxheader.appendChild(checkboxLabel);
  headerRow.appendChild(checkboxheader);

  // Loop through the headers array to create and append each header cell
  headers.forEach((header) => {
    const th = document.createElement("th");
    th.textContent = header;
    headerRow.appendChild(th);
  });

  // Append the <thead> to the table
  table.appendChild(thead);

  // Create <tbody>
  const tbody = table.createTBody();
  table.appendChild(tbody);
}
generateTable(table); //create table

const tableBody = document
  .getElementById("table")
  .getElementsByTagName("tbody")[0];

function populateInputs(index) {
  document.getElementById("fname").value = tableData[index].fName;
  document.getElementById("lname").value = tableData[index].lName;
  document.getElementById("designation").value = tableData[index].desig;
  document.getElementById("area").value = tableData[index].area;
}

//render data in table
function renderTable() {
  tableBody.innerHTML = ""; // Clear existing rows
  console.log("Table Data :", tableData);

  //we are doing this bcz, when we delete all data we can't have any data left to get keys
  let tableKeys;
  let keysArray;
  if (tableData.length > 0) {
    // Convert object keys into an array
    //here as our object is in array, getting keys from first object
    //passing these keys, to update our cell
    tableKeys = tableData[0];
    keysArray = Object.keys(tableKeys);
  }

  // Insert data into cells of the new row
  tableData.forEach((data, index) => {
    // Create an empty <tr> element and add it to the 1st position of the table:
    let newRow = tableBody.insertRow();
    newRow.insertCell(
      0
    ).innerHTML = `<input type="checkbox" class="row-checkbox" onChange="uncheckAllElement(this)" data-index="${index}"/>`;

    const firstNameCell = newRow.insertCell(1);
    firstNameCell.innerHTML = data.fName;
    firstNameCell.addEventListener("click", () =>
      makeEditable(firstNameCell, index, keysArray[1])
    );

    const lastNameCell = newRow.insertCell(2);
    lastNameCell.innerHTML = data.lName;
    lastNameCell.addEventListener("click", () =>
      makeEditable(lastNameCell, index, keysArray[2])
    );

    const desigCell = newRow.insertCell(3);
    desigCell.innerHTML = data.desig;
    desigCell.addEventListener("click", () =>
      makeEditable(desigCell, index, keysArray[3])
    );

    const addressCell = newRow.insertCell(4);
    addressCell.innerHTML = data.area;
    addressCell.addEventListener("click", () =>
      makeEditable(addressCell, index, keysArray[4])
    );

    newRow.insertCell(5).innerHTML =
      '<button class="edit-btn">Edit</button>' +
      '<button class="delete-btn">Delete</button>';

    // Add event listener to the new edit button
    newRow.querySelector(".edit-btn").addEventListener("click", function () {
      save.style.display = "block";
      add.style.display = "none";
      currentRow = index;
      populateInputs(currentRow);
    });

    //Add event listener to the delete button
    newRow.querySelector(".delete-btn").addEventListener("click", () => {
      tableData.splice(index, 1);
      renderTable(); //Re-render table data
    });
  });
}

function makeEditable(cell, index, key) {
  console.log(cell.innerHTML, index, key);
  const originalText = cell.innerHTML;
  const input = document.createElement("input");
  input.type = "text";
  input.value = originalText;

  //replace cell value
  cell.innerHTML = "";
  cell.appendChild(input);

  // When the input loses focus, replace it with the updated text
  input.focus(); // Set focus to the input immediately

  input.addEventListener("blur", () => {
    let cellValue = input.value; // || originalText; // Default to original text if no value
    cell.innerHTML = cellValue;

    const tableIndex = tableData[index]; //here typeOf key is string, not a direct value, so we need to follow this process to update the cell
    tableIndex[key] = cellValue;
    console.log(tableData);
  });
}

//adding into table
add.addEventListener("click", addData);
function addData() {
  //Get input elements
  const fName = document.getElementById("fname").value;
  const lName = document.getElementById("lname").value;
  const desig = document.getElementById("designation").value;
  const area = document.getElementById("area").value;

  if (!fName || !lName || !desig || !area) {
    alert("Please fill in all fields.");
    return;
  }

  tableData.push({ isChecked: false, fName, lName, desig, area });

  renderTable(); // Render the updated table
  // After inserting we,Clear input fields
  clearInputs();
}

//update
document.getElementById("save").addEventListener("click", function () {
  if (currentRow !== null) {
    // Update the data in the array
    tableData[currentRow].fName = document.getElementById("fname").value;
    tableData[currentRow].lName = document.getElementById("lname").value;
    tableData[currentRow].desig = document.getElementById("designation").value;
    tableData[currentRow].area = document.getElementById("area").value;

    console.log(tableData);

    renderTable();
    clearInputs();
    currentRow = null; // Reset currentRow

    save.style.display = "none";
    add.style.display = "block";
  }
});

/**
}
 */

function clearInputs() {
  // Clear input fields
  document.getElementById("fname").value = "";
  document.getElementById("lname").value = "";
  document.getElementById("designation").value = "";
  document.getElementById("area").value = "";
}

// Check box
const checkAll = document.getElementById("checkAll");
checkAll.addEventListener("click", toggle);
function toggle() {
  const ischecked = checkAll.checked;
  let checks = document.getElementsByClassName("row-checkbox");

  Array.from(checks).forEach((element, index) => {
    element.checked = ischecked;
    tableData[index].isChecked = element.checked;
  });
}

//if any element is unchecked then this function will be called unchecks checkAllElement
function uncheckAllElement(ele) {
  //after clicking check all everything in table will be checked,
  //if we uncheck the any one checkbox in table, checkAll shoulld be unchecked
  checkAll.checked = false;

  let index = parseInt(ele.getAttribute("data-index"));
  tableData[index].isChecked = ele.checked;
  // console.log(tableData);
}

//similarly, we can try for check
function checkAllElement() {
  checkAll.checked = true;
}

document
  .getElementById("deleteSelectedBtn")
  .addEventListener("click", function () {
    if (tableBody.rows.length === 0) {
      alert("Please add rows to the table to delete...!");
    } else {
      // Filter out the unchecked rows
      tableData = tableData.filter(
        (_, index) => tableData[index].isChecked === false
      );
      console.log(tableData);
      renderTable(); // Re-render the table

      if (tableBody.rows.length === 0) {
        checkAll.checked = false;
      }
    }
  });
