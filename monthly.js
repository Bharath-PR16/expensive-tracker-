let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function showMonth() {
  let m = month.value;
  let total = 0;

  expenses.forEach(e => {
    if (e.date.startsWith(m)) total += e.amount;
  });

  monthTotal.innerText = "Month Total: ₹" + total;
}

function resetMonth() {
  let m = month.value;
  if (!m) return;

  if (confirm("Delete all expenses of this month?")) {
    expenses = expenses.filter(e => !e.date.startsWith(m));
    save();
  }
}



const month = document.getElementById("month");
const year = document.getElementById("year");
const monthTotal = document.getElementById("monthTotal");
const yearTotal = document.getElementById("yearTotal");

