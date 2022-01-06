import { render } from "@testing-library/react";
import Comments from "../Comments/Comments.js";
import { tableConfig } from "./tableConfig.js";
class Table {
  constructor(config, data) {
    this.config = config;
    this.page = 1;
    this.firstRow = 0;
    this.selectedRow = undefined;
    this.tableEl = undefined;
    this.paginationEl = undefined;
    this.buttonNext = undefined;
    this.buttonPrev = undefined;
    this.hasNext = false;
    if (typeof data === "function") {
      let result = data(0, this.config.rows + 1);
      if (!(result instanceof Promise)) {
        result = Promise.resolve(result);
      }
      this.lastPage = 1;
      this.maxRows = undefined;
      result.then((val) => {
        this.hasNext = val.length > this.config.rows;
      });
    } else {
      this.data = data;
      this.lastPage = Math.ceil(this.data.length / this.config.rows);
      this.maxRows = this.data.length - 1;
    }
  }

  createPagination() {
    let btnNext = document.createElement("button");
    let btnPrev = document.createElement("button");
    btnPrev.innerText = "<";
    btnNext.innerText = ">";
    btnPrev.setAttribute("id", "prev-page-btn");
    btnPrev.disabled = true;
    btnPrev.setAttribute("class", "disabled");
    this.buttonPrev = btnPrev;
    if (!this.lastPage === this.page && !this.hasNext) {
      btnNext.disabled = true;
      btnNext.setAttribute("class", "disabled");
    }
    btnPrev.setAttribute("id", "next-page-btn");
    this.buttonNext = btnNext;
    let nPage = this.dataFn ? this.nextRows : this.nextPage;
    let pPage = this.dataFn ? this.prevRows : this.prevPage;
    let self = this;
    btnNext.addEventListener("click", () => nPage(self));
    btnPrev.addEventListener("click", () => pPage(self));

    let pageDisplay = document.createElement("span");
    pageDisplay.innerText = `Страница ${this.page}`;
    this.paginationEl = pageDisplay;

    let pagination = document.createElement("div");
    pagination.appendChild(pageDisplay);
    pagination.appendChild(btnPrev);
    pagination.appendChild(btnNext);

    let container = this.tableEl.parentNode;
    container.appendChild(pagination);
    pagination.setAttribute("id", "pagination");
  }

  redrawPager() {
    let btnPrev = this.buttonPrev;
    let btnNext = this.buttonNext;

    if (this.page === 1) {
      btnPrev.disabled = true;
      btnPrev.setAttribute("class", "disabled");
      btnNext.disabled = false;
      btnNext.classList.remove("disabled");
    } else if (this.page === this.lastPage && !this.hasNext) {
      btnNext.disabled = true;
      btnNext.setAttribute("class", "disabled");
      btnPrev.disabled = false;
      btnPrev.classList.remove("disabled");
    } else if (this.page > 1 && (this.page < this.lastPage || this.hasNext)) {
      btnNext.disabled = false;
      btnPrev.disabled = false;
      btnNext.classList.remove("disabled");
      btnPrev.classList.remove("disabled");
    }
    this.paginationEl.innerHTML = `Страница ${this.page}`;
  }

  nextPage(table) {
    table.unselectRow();
    table.page++;
    table.firstRow += table.config.rows;
    let rows = table.data.slice(
      table.firstRow,
      table.firstRow + table.config.rows
    );
    table.fillTable(rows);
    table.redrawPager();
  }

  prevPage(table) {
    table.unselectRow();
    table.page--;
    let tableRows = table.config.rows;
    let rowsToSubtract = table.firstRow - tableRows;
    table.firstRow = rowsToSubtract > 0 ? rowsToSubtract : 0;
    let rows = table.data.slice(table.firstRow, table.firstRow + tableRows);
    table.fillTable(rows);
    table.redrawPager();
  }

  nextRows(table) {
    table.unselectRow();
    table.page++;
    table.firstRow += table.config.rows;
    let data = table.dataFn(table.firstRow, table.config.rows);
    if (!(data instanceof Promise)) {
      data = Promise.resolve(data);
    }
    data.then((val) => {
      table.hasNext = val.length > table.config.rows - 1;
      table.fillTable(val);
    });
    table.redrawPager();
  }

  prevRows(table) {
    table.unselectRow();
    table.page--;
    table.firstRow -= table.config.rows;
    table.firstRow = table.firstRow > 0 ? table.firstRow : 0;
    let data = table.dataFn(table.firstRow, table.config.rows + 1);
    if (!(data instanceof Promise)) {
      data = Promise.resolve(data);
    }
    data.then((val) => table.fillTable(val));
    table.redrawPager();
  }
  unselectRow() {
    if (this.selectedRow !== undefined) {
      this.selectedRow.classList.remove(this.config.selectedRowClass);
      this.selectedRow = undefined;
    }
  }

  onselect(table) {
    let className = this.config.selectedRowClass;
    table.addEventListener("click", function (e) {
      let select = e.target.parentNode;
      let isSelected = document.querySelector("tr.selected-row");

      if (isSelected) {
        isSelected.classList.remove(className);
      }
      if (select) {
        select.classList.add(className);
      }
    });

    window.addEventListener("keydown", function (e) {
      let isSelected = document.querySelector("tr.selected-row");
      if (e.key === "ArrowUp") {
        isSelected.classList.remove(className);
        isSelected.previousSibling.classList.add(className);
      }

      if (e.key === "ArrowDown") {
        isSelected.classList.remove(className);
        isSelected.nextSibling.classList.add(className);
      }
    });
  }

  createTableHeaders() {
    let row = document.createElement("tr");
    for (const col of this.config.columns) {
      let th = document.createElement("th");
      let thValue = col.name;
      th.textContent = thValue;

      if (col.headerClass) {
        th.setAttribute("class", col.headerClass);
      }
      row.appendChild(th);
    }
    return row;
  }

  fillTable(rows) {
    let rowsForRemove = document.querySelectorAll("tr ~ tr");

    for (let i = 0; i < rows.length; i++) {
      let row = this.tableData(this.config.columns, rows[i]);
      row.setAttribute("id", i);
      let changeRow = rowsForRemove.item(i);
      changeRow.replaceWith(row);
    }
  }

  tableData(columns, data) {
    let row = document.createElement("tr");
    for (const c of columns) {
      let td = document.createElement("td");
      let tdValue = data !== undefined ? data[c.property] : "";

      if (c.additionalProperty) {
        tdValue = data[c.property][c.additionalProperty];
      }
      if (c.cellClass) {
        td.classList.add("class", c.cellClass);
      }

      if (c.img) {
        let imgEl = document.createElement("img");
        imgEl.src = tdValue;
        imgEl.alt = tdValue;
        imgEl.setAttribute("id", "avatar");
        td.appendChild(imgEl);
      } else if (c.property === "title") {
        let anchor = document.createElement("a");
        anchor.setAttribute("href", data.comments_url);
        anchor.textContent = tdValue;
        anchor.addEventListener("click", function (e) {
          e.preventDefault();
          commentsData(data, data.comments_url);
        });
        td.append(anchor);
      } else {
        td.textContent = tdValue;
      }

      row.appendChild(td);
    }
    return row;
  }

  createTable() {
    let container = document.getElementById("table-container");
    let table = document.createElement("table");
    table.setAttribute("id", "table");

    this.tableEl = table;
    if (this.config.showHeader) {
      let th = this.createTableHeaders();
      table.appendChild(th);
    }

    for (let i = 0; i < this.config.rows && i < this.data.length; i++) {
      let row = this.tableData(this.config.columns, this.data[i]);
      table.appendChild(row);
      row.setAttribute("id", i);

      if (this.config.onselect) {
        let f = this.config.onselect;
        row.addEventListener("click", (e) => {
          f(e.target.innerText);
        });
      }
    }
    container.appendChild(table);
    if (this.config.canSelect) {
      this.onselect(table);
    }
    this.createPagination();
  }
}

const commentsData = async (issue, data) => {
  let com = await fetch(data);
  let comFetched = await com.json();

  if (comFetched) {
    render(<Comments issue={issue} comments={comFetched} />);
  }
};

export const fetchData = async (user, repo) => {
  const data = await fetch(
    `https://api.github.com/repos/${user}/${repo}/issues?page=1&per_page=100`
  );
  const dataJson = await data.json();
  if (dataJson.message) {
    render(<h1 id="msg">Issue Not Found</h1>);
  } else {
    var table = new Table(tableConfig, dataJson);
    table.createTable();
  }
};
