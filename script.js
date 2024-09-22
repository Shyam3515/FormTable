const add = document.querySelector("#add");
const save = document.querySelector("#save");
let tableData = [];
let currentRow = null; //for storing index

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

  // Insert data into cells of the new row
  tableData.forEach((data, index) => {
    // Create an empty <tr> element and add it to the 1st position of the table:
    let newRow = tableBody.insertRow();
    newRow.insertCell(
      0
    ).innerHTML = `<input type="checkbox" class="row-checkbox" onChange="uncheckAllElement(this)" data-index="${index}"/>`;
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
    // Filter out the unchecked rows
    tableData = tableData.filter(
      (_, index) => tableData[index].isChecked === false
    );
    console.log(tableData);

    renderTable(); // Re-render the table

    if (tableBody.rows.length === 0) {
      checkAll.checked = false;
    }
  });
