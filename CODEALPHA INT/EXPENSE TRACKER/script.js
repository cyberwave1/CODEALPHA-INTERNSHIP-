let totalBroilers = 0;
let estimatedProfit = 0;
let dailyProfit = 0;
const transactions = [];

function openModal(modalId) {
    document.getElementById(modalId).style.display = "flex";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

function buyBroilers() {
    const buyQuantity = parseInt(document.getElementById("buyQuantity").value) || 0;
    const expenseAmount = buyQuantity * 4; // Assuming each broiler costs $4
    estimatedProfit -= expenseAmount;
    totalBroilers += buyQuantity;
    updateDashboard();
    addTransaction('Buy', buyQuantity, expenseAmount);
    closeModal('buyModal');
}

function sellBroilers() {
    const sellQuantity = parseInt(document.getElementById("sellQuantity").value) || 0;
    const saleAmount = sellQuantity * 6;
    estimatedProfit += saleAmount;
    dailyProfit += saleAmount;
    totalBroilers -= sellQuantity;
    updateDashboard();
    addTransaction('Sell', sellQuantity, saleAmount);
    closeModal('sellModal');
}

function recordExpense() {
    const expenseDescription = document.getElementById("expenseDescription").value.trim();
    const expenseAmount = parseFloat(document.getElementById("expenseAmount").value) || 0;

    if (expenseDescription === '' || expenseAmount <= 0) {
        alert('Please enter valid expense details.');
        return;
    }

    estimatedProfit -= expenseAmount;
    updateDashboard();
    addTransaction('Expense', 0, expenseAmount, expenseDescription);
}

function updateDashboard() {
    
    document.getElementById("totalBroilers").textContent = totalBroilers;
    document.getElementById("estimatedProfit").textContent = estimatedProfit;
    document.getElementById("dailyProfit").textContent = dailyProfit;
    updateTransactionHistory();
}

function addTransaction(type, quantity, amount, description = '') {
    const transaction = {
        date: new Date().toLocaleDateString(),
        type,
        quantity,
        amount,
        description,
    };
    transactions.push(transaction);
    updateTransactionHistory();
}

function updateTransactionHistory() {
    const transactionBody = document.getElementById("transactionBody");
    transactionBody.innerHTML = '';

    transactions.forEach((transaction) => {
        const row = transactionBody.insertRow();
        const dateCell = row.insertCell(0);
        const typeCell = row.insertCell(1);
        const quantityCell = row.insertCell(2);
        const amountCell = row.insertCell(3);
        const descriptionCell = row.insertCell(4);

        dateCell.textContent = transaction.date;
        typeCell.textContent = transaction.type;
        quantityCell.textContent = transaction.quantity;
        amountCell.textContent = transaction.amount;
        descriptionCell.textContent = transaction.description;
    });
}

function goToPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach((page) => {
        page.classList.remove('active-page');
    });

    document.getElementById(pageId).classList.add('active-page');
}