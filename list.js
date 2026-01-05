// Get expenses from localStorage
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Elements
const expenseList = document.getElementById("expenseList");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");

// Pagination settings
const ITEMS_PER_PAGE = 10;
let currentPage = 1;

// Render expenses with pagination
function renderExpenses() {
  expenseList.innerHTML = "";

  if (expenses.length === 0) {
    expenseList.innerHTML = "<p>No expenses added yet.</p>";
    pageInfo.innerText = "";
    return;
  }

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const pageItems = expenses.slice(start, end);

  pageItems.forEach((e, index) => {
    let row = document.createElement("div");
    row.className = "table-row";

    row.innerHTML = `
      <span>${e.date}</span>
      <span>${e.category}</span>
      <span>₹${e.amount}</span>
      <span>
        <button onclick="deleteExpense(${start + index})">❌</button>
      </span>
    `;

    expenseList.appendChild(row);
  });

  updatePagination();
}

// Update pagination buttons
function updatePagination() {
  const totalPages = Math.ceil(expenses.length / ITEMS_PER_PAGE);

  pageInfo.innerText = `Page ${currentPage} of ${totalPages}`;

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

// Delete expense with confirm
window.deleteExpense = function (index) {
  if (confirm("Are you sure you want to delete this expense? ❌")) {
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));

    if (currentPage > Math.ceil(expenses.length / ITEMS_PER_PAGE)) {
      currentPage--;
    }

    renderExpenses();
  }
};

// Pagination controls
prevBtn.onclick = () => {
  if (currentPage > 1) {
    currentPage--;
    renderExpenses();
  }
};

nextBtn.onclick = () => {
  const totalPages = Math.ceil(expenses.length / ITEMS_PER_PAGE);
  if (currentPage < totalPages) {
    currentPage++;
    renderExpenses();
  }
};

// Initial render
renderExpenses();
