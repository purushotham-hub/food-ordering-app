let transactions = [];

function addTransaction() {

    const description = document.getElementById("description").value;
    const amount = Number(document.getElementById("amount").value);
    const type = document.getElementById("type").value;

    if (description === "" || amount <= 0) {
        alert("Please enter valid details!");
        return;
    }

    const transaction = {
        id: Date.now(),
        description: description,
        amount: amount,
        type: type
    };

    transactions.push(transaction);

    displayTransactions();
    updateSummary();

    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";
}

function displayTransactions() {

    const list = document.getElementById("transactionList");

    list.innerHTML = "";

    transactions.forEach(function(transaction) {

        const li = document.createElement("li");

        li.classList.add(transaction.type);

        const sign = transaction.type === "income" ? "+" : "-";

        li.innerHTML = `
            <span>
                ${transaction.description}
                <strong>${sign} ₹${transaction.amount}</strong>
            </span>

            <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">
                Delete
            </button>
        `;

        list.appendChild(li);
    });
}

function updateSummary() {

    let income = 0;
    let expense = 0;

    transactions.forEach(function(transaction) {

        if (transaction.type === "income") {
            income += transaction.amount;
        } else {
            expense += transaction.amount;
        }
    });

    const balance = income - expense;

    document.getElementById("income").textContent = "₹" + income;
    document.getElementById("expense").textContent = "₹" + expense;
    document.getElementById("balance").textContent = "₹" + balance;
}

function deleteTransaction(id) {

    transactions = transactions.filter(function(transaction) {
        return transaction.id !== id;
    });

    displayTransactions();
    updateSummary();
}