let BudgetAmount = document.getElementById("budgetInput");
let BudgetButton = document.getElementById("budgetBtn");
let budgetError = document.getElementsByClassName("error");
let Budgeter = document.getElementById("budgetError");
let ExpensesTitle = document.getElementById("expensestitle1");
let ExpensesAmountText = document.getElementById("expensesAmount1");
let ExpensesButton = document.getElementById("expensesBtn");
let ExpensesError = document.getElementsByName("errorExpenses");
let TotalAmount = document.getElementById("TotalAmount");
let ExpensesAmount = document.getElementById("ExpensecAmount");
let BalanceAmount = document.getElementById("BalanceAmount");
const Expenseslist = document.getElementById("ExpensesList");
let expenseserror = document.getElementById("expenseserror");
let tempAmount = 0;
ExpensesAmount.value = 0;


BudgetButton.addEventListener("click", () => {
    tempAmount = BudgetAmount.value;
    if(tempAmount === '' || tempAmount < 0){
        Budgeter.style.display = "block";
    }
    else{
        Budgeter.style.display = "none";
        TotalAmount.innerHTML = tempAmount;
        BalanceAmount.innerHTML = tempAmount - ExpensesAmount.innerHTML;
        BudgetAmount.value = '';
    }
});

const disabledButtons = (bool) => {
    let editButtons = document.getElementsByClassName("edit");
    Array.from(editButtons).forEach((element) => {
        element.disabled = bool;
    });
};

const modifyElements = (element, edit = false) => {
    let parentDiv = element.parentElement;
    let currentBalance = BalanceAmount.innerHTML;
    let currentExpenses = ExpensesAmount.innerHTML;
    let parentAmount = parentDiv.querySelector(".amount").innerHTML;
    if (edit){
        let parentText = parentDiv.querySelector(".product").innerHTML;
        ExpensesTitle.value = parentText;
        ExpensesAmountText.value = parentAmount;
        disabledButtons(true);
    }
    BalanceAmount.innerHTML = parseInt(currentBalance) + parseInt(parentAmount);
    ExpensesAmount.innerHTML = parseInt(currentExpenses) - parseInt(parentAmount);
    parentDiv.remove();
};

const listCreator = (expenseName, expenseValue) => {
    let sublistContent = document.createElement("div");
    sublistContent.classList.add("sublist-content", "flex-space");
    Expenseslist.appendChild(sublistContent);
    sublistContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p>`;
    let editButton = document.createElement("button");
    editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
    editButton.style.fontSize = "1.2em";
    editButton.addEventListener("click", () => {
        modifyElements(editButton, true);
    });
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
    deleteButton.style.fontSize = "1.2em";
    deleteButton.addEventListener("click", () => {
        modifyElements(deleteButton);
    });
    sublistContent.appendChild(editButton);
    sublistContent.appendChild(deleteButton);
    document.getElementById("ExpensesList").appendChild(sublistContent);
};

ExpensesButton.addEventListener("click", () => {
    if(!ExpensesTitle.value === '' || !ExpensesAmountText.value){
        expenseserror.style.display = "block";
        return false;
    }
    disabledButtons(false);
    let expenditure = parseInt(ExpensesAmountText.value);
    let sum = parseInt(ExpensesAmount.innerHTML) + expenditure;
    ExpensesAmount.innerHTML = sum;
    const totalBalance = tempAmount - sum;
    BalanceAmount.innerHTML = totalBalance;

    listCreator(ExpensesTitle.value, ExpensesAmountText.value);

    ExpensesTitle.value = "";
    ExpensesAmountText.value = "";
});