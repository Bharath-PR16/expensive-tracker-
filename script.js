// Read existing expenses from localStorage
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Get inputs
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");

function getCurrentMonthKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

function addExpense() {
  const amount = Number(amountInput.value);
  const category = categoryInput.value;
  const date = dateInput.value;

  if (!amount || !category || !date) {
    alert("Please fill all fields");
    return;
  }

  const monthKey = getCurrentMonthKey();

  let allExpenses = JSON.parse(localStorage.getItem("expenses")) || {};

  if (!allExpenses[monthKey]) {
    allExpenses[monthKey] = [];
  }

  allExpenses[monthKey].push({ amount, category, date });

  localStorage.setItem("expenses", JSON.stringify(allExpenses));

  alert("Expense added ✅");

  amountInput.value = "";
  categoryInput.value = "";
  dateInput.value = "";
}


// Add expense function
function addExpense() {
  const amount = Number(amountInput.value);
  const category = categoryInput.value;
  const date = dateInput.value;

  if (!amount || !category || !date) {
    alert("Please fill all fields");
    return;
  }

  // Create expense object
  const expense = {
    amount,
    category,
    date
  };

  // Save
  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));

  alert("Expense added successfully ✅");

  // Clear inputs
  amountInput.value = "";
  categoryInput.value = "";
  dateInput.value = "";
}
