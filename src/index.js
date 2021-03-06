let activePlayer = "1";
let n = 5;
document
  .getElementById(activePlayer)
  .setAttribute("style", "background-color: green;");
const board = document.getElementById("board");
const res = document.getElementById("result");

function reSet() {
  board.innerHTML = "";
  generateTable(n);
}
function checkRowColm(p) {
  const score = activePlayer === "1" ? "x" : activePlayer === "2" ? "o" : "";
  let isempty;
  for (let i = 0; i < n; i++) {
    let win = true;
    for (let j = 0; j < n; j++) {
      let id = p === "row" ? `${i}${j}` : (p = "colm" ? `${j}${i}` : "");
      const cell = document.getElementById(id);
      const text = cell.innerHTML;
      if (!text) isempty = true;
      if (text !== score || text === null) win = false;
    }
    if (win) return win;
  }
  if (!isempty) {
    alert("draw");
    reSet();
    return;
  }
  return false;
}

function checkDigonal() {
  const score = activePlayer === "1" ? "x" : activePlayer === "2" ? "o" : "";
  let win = true;
  for (let i = 0; i < n; i++) {
    let id = `${i}${i}`;
    const cell = document.getElementById(id);
    const text = cell.innerHTML;

    if (text !== score) win = false;
  }
  if (win) return win;
  win = true;
  for (let i = 0; i < n; i++) {
    let id = `${i}${n - 1 - i}`;
    const cell = document.getElementById(id);
    const text = cell.innerHTML;
    if (text !== score) win = false;
  }
  return win;
}

function updateScore() {
  if (checkRowColm("colm")) return true;
  if (checkRowColm("row")) return true;
  if (checkDigonal()) return true;
  return false;
}
const clickhandle = (id) => {
  if (activePlayer) {
    document
      .getElementById(activePlayer)
      .setAttribute("style", "background-color: EFEFEF;");
    let cell = document.getElementById(id);
    if (!cell.innerHTML) {
      let text;
      if (activePlayer === "1") text = "x";
      else if (activePlayer === "2") text = "o";
      cell.innerHTML = text;
      let result = updateScore(activePlayer);
      if (result) {
        res.innerHTML = `Player ${activePlayer} won!!`;
        alert(`Player ${activePlayer} won!!`);
        reSet();
      }
      activePlayer = activePlayer === "1" ? "2" : "1";
    }
    document
      .getElementById(activePlayer)
      .setAttribute("style", "background-color: green;");
  }
};

function generateTable(n) {
  // create element: table & tbody
  let table = document.createElement("table");
  let tableBody = document.createElement("tbody");
  for (let i = 0; i < n; i++) {
    // create element table row: tr
    let tableRow = document.createElement("tr");
    for (let j = 0; j < n; j++) {
      // create table cell: 'td'
      let cell = document.createElement("td");
      let id = `${i}${j}`;
      cell.setAttribute("id", id);
      cell.setAttribute("width", "30");
      cell.setAttribute("height", "30");
      cell.addEventListener("click", () => clickhandle(id));
      tableRow.appendChild(cell);
    }
    // add row inside table body
    tableBody.appendChild(tableRow);
  }
  // append table body into table
  table.appendChild(tableBody);
  // append table into board
  board.appendChild(table);
  table.setAttribute("border", "2px");
}

generateTable(5);
