const add = document.querySelector("#add");
const save = document.querySelector("#save");
let tableData = [];
let currentRow = null; //storing current row

function populateInputs(cells) {
  document.getElementById("fname").value = cells[1].textContent;
  document.getElementById("lname").value = cells[2].textContent;
  document.getElementById("designation").value = cells[3].textContent;
  document.getElementById("area").value = cells[4].textContent;
}

function renderTable() {
  const tableBody = document
    .getElementById("table")
    .getElementsByTagName("tbody")[0];
  console.log(tableBody);
  tableBody.innerHTML = ""; // Clear existing rows
  console.log("Table Data :", tableData);

  // Insert data into cells of the new row
  tableData.forEach((data, index) => {
    // Create an empty <tr> element and add it to the 1st position of the table:
    let newRow = tableBody.insertRow();
    newRow.insertCell(
      0
    ).innerHTML = `<input type="checkbox" class="row-checkbox" onclick="uncheckAllElement()" data-index="${index}"/>`;
    newRow.insertCell(1).innerHTML = data.fName;
    newRow.insertCell(2).innerHTML = data.lName;
    newRow.insertCell(3).innerHTML = data.desig;
    newRow.insertCell(4).innerHTML = data.area;
    newRow.insertCell(5).innerHTML =
      '<button class="edit-btn">Edit</button>' +
      '<button class="delete-btn">Delete</button>';

    // Add event listener to the new edit button
    newRow.querySelector(".edit-btn").addEventListener("click", function () {
      save.style.display = "block";
      add.style.display = "none";
      currentRow = index; // Store the index of the current row
      populateInputs(newRow.cells);
    });

    //Add event listener to the delete button
    newRow.querySelector(".delete-btn").addEventListener("click", () => {
      tableData.splice(index, 1);
      renderTable(); //Re-render table data
    });
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

  tableData.push({ fName, lName, desig, area });

  renderTable(); // Render the updated table
  // After inserting we,Clear input fields
  clearInputs();
}

//update
document.getElementById("save").addEventListener("click", function () {
  console.log("click", currentRow);
  if (currentRow !== null) {
    // Update the data in the array
    tableData[currentRow] = {
      fName: document.getElementById("fname").value,
      lName: document.getElementById("lname").value,
      desig: document.getElementById("designation").value,
      area: document.getElementById("area").value,
    };
    console.log(tableData);

    renderTable();
    clearInputs();
    currentRow = null; // Reset currentRow

    save.style.display = "none";
    add.style.display = "block";
  }
});

// Delete selected rows button event listener
/**
 * Filtering Logic:
   Inside the event listener, we use the filter method on the tableData array. The goal is to create a new array that contains only the rows that are not checked:

   Here’s how this works:
  => document.querySelector(.row-checkbox[data-index="${index}"]): This selects the checkbox in the current row being evaluated. The data-index attribute helps us identify which checkbox corresponds to which row in the tableData.
  => .checked: This property returns true if the checkbox is checked and false if it is not.
  => !: The ! operator negates the value, so if the checkbox is checked (true), it returns false, and vice versa.
 */
document
  .getElementById("deleteSelectedBtn")
  .addEventListener("click", function () {
    // Filter out the unchecked rows
    tableData = tableData.filter(
      (_, index) =>
        !document.querySelector(`.row-checkbox[data-index="${index}"]`).checked
    );
    renderTable(); // Re-render the table
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
  const isChecked = checkAll.checked;
  let checks = document.getElementsByClassName("row-checkbox");

  Array.from(checks).forEach((element) => {
    element.checked = isChecked;
  });
}

//if any element is unchecked then this function will be called unchecks checkAllElement
function uncheckAllElement() {
  checkAll.checked = false;
}
//similarly, we can try for check
function checkAllElement() {
  checkAll.checked = true;
}
