const addUserWrap = document.querySelector("#addUserWrap");
const showAllWrap = document.querySelector("#showAllWrap");
const showSingleWrap = document.querySelector("#showSingleWrap");
const transactionWrap = document.querySelector("#transactionWrap");

// local storage operations
const readUsersFromStorage = (storageName, option = "array") => {
  let users;
  try {
    users = localStorage.getItem(storageName);
    if (option != "string") users = JSON.parse(users) || [];
    if (!Array.isArray(users) && option == "array")
      throw new Error("Invalid type of data");
  } catch (e) {
    users = [];
  }
  return users;
};

const writeUsersToStorage = (storageName, users) => {
  localStorage.setItem(storageName, JSON.stringify(users));
};

const showSingleUser = (allUsers, i, href) => {
  writeUsersToStorage("singleUser", allUsers[i]);
  writeUsersToStorage("singleIndex", i);
  window.location.href = href;
};

//manage layouts
const drawUsers = (allUsers) => {
  allUsers.forEach((user, i) => {
    const parent = createMyOwnElement("h3", showAllWrap, null, null);
    createMyOwnElement("h3", parent, null, user.accNumber);
    createMyOwnElement("h3", parent, null, user.name);
    createMyOwnElement("h3", parent, null, user.balance);
    createMyOwnElement(
      "h3",
      parent,
      null,
      user.transactions.length == 0
        ? "No Transactions yet"
        : `Last Transaction - Amount: ${user.transactions[0].transAmount} and Type: ${user.transactions[0].transType}`
    );
    console.log(user.transactions);
    const editBtn = createMyOwnElement(
      "button",
      parent,
      "btn btn-warning mx-2",
      "Transaction"
    );
    const showBtn = createMyOwnElement(
      "button",
      parent,
      "btn btn-success m-2",
      "show"
    );
    editBtn.addEventListener("click", () =>
      showSingleUser(allUsers, i, "transaction.html")
    );
    showBtn.addEventListener("click", () =>
      showSingleUser(allUsers, i, "showSingle.html")
    );
  });
};

const createMyOwnElement = (el, parent, classes, txt = null) => {
  const myEle = document.createElement(el);
  parent.appendChild(myEle);
  myEle.classList = classes;
  if (txt) myEle.textContent = txt;
  return myEle;
};

// manage main pages
if (addUserWrap) {
  addUserWrap.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = {
      accNumber: Date.now(),
      name: addUserWrap.elements.userName.value,
      balance: addUserWrap.elements.balance.value,
      transactions: [],
    };
    const allUsers = readUsersFromStorage("users");
    allUsers.push(user);
    writeUsersToStorage("users", allUsers);
    addUserWrap.reset();
    window.location.href = "showAll.html";
  });
}

if (showAllWrap) {
  const allUsers = readUsersFromStorage("users");
  drawUsers(allUsers);
}

if (showSingleWrap) {
  const singleUser = readUsersFromStorage("singleUser", "object");
  const i = readUsersFromStorage("singleIndex", "string");
  const parent = createMyOwnElement("h3", showSingleWrap, null, null);
  createMyOwnElement("h3", parent, null, i);
  createMyOwnElement("h3", parent, null, singleUser.accNumber);
  createMyOwnElement("h3", parent, null, singleUser.name);
  createMyOwnElement("h3", parent, null, singleUser.balance);
  createMyOwnElement(
    "h3",
    parent,
    null,
    singleUser.transactions.length == 0
      ? "No Transactions yet"
      : `Amount: ${singleUser.transactions.transAmount} and Type: ${singleUser.transactions.transType}`
  );
}
if (transactionWrap) {
  const allUsers = readUsersFromStorage("users");
  const i = readUsersFromStorage("singleIndex", "string");
  const singleUser = readUsersFromStorage("singleUser", "object");
  const parent = createMyOwnElement("h3", transactionWrap, null, null);
  createMyOwnElement("h3", parent, null, singleUser.accNumber);
  transactionWrap.addEventListener("submit", (e) => {
    e.preventDefault();
    const transAmount = transactionWrap.elements.amount.value;
    const transType = transactionWrap.elements.trans.value;
    // console.log(targetAmount, transType);
    if (transType == "withdraw") {
      singleUser.transactions.push({
        transAmount,
        transType,
      });
      singleUser.balance -= transAmount;
      writeUsersToStorage("singleUser", singleUser);
      window.location.href = "showAll.html";
    } else if (transType == "add") {
      singleUser.transactions.push({
        transAmount,
        transType,
      });
      singleUser.balance += +transAmount;
      console.log(singleUser.balance, typeof singleUser.balance);
      writeUsersToStorage("singleUser", singleUser);
      window.location.href = "showAll.html";
    }
    allUsers[i] = singleUser;
    writeUsersToStorage("users", allUsers);
  });
}
