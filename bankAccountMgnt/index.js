
// The following program is capturing user input from the console and performing the following operations:
// - Create a new bank account
// - Deposit money into an account
// - Withdraw money from an account
// - View the balance of an account

// Import the 'readline' module to get user input from the console
const readline = require("readline");

// Create a new readline interface for receiving user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class BankAccount {
  constructor(accountNumber, accountName) {
    this.accountNumber = accountNumber;
    this.accountName = accountName;
    this.balance = 0;
  }

  deposit(amount) {
    if (amount <= 0) {
      console.log("Deposit amount must be greater than 0.");
      return;
    }
    this.balance += amount;
    console.log(`Deposit of $${amount} successful.`);
    console.log(`\n --- Current balance: Rwf ${this.balance}---\n`);
    return true;
  }

  withdraw(amount) {
    if (amount <= 0) {
      console.log("Withdrawal amount must be greater than 0.");
      return;
    }
    if (amount > this.balance) {
      console.log("Insufficient funds.");
      return;
    }
    this.balance -= amount;
    console.log(`Withdrawal of $${amount} successful.`);
    console.log(`\n --- Current balance: Rwf ${this.balance}---\n`);
    return true;
  }

  getBalance() {
    console.log(`\n --- Current balance: Rwf ${this.balance}---\n`);
  }
}

const accounts = [];

function createAccount() {
  const accountNumber = accounts.length + 1;
  console.log(`\n Creating account number: ${accountNumber}`);
  rl.question("Enter account name:", (accountName) => {
    const account = new BankAccount(accountNumber, accountName);
    accounts.push(account);
    if (accounts.includes(account)) {
      console.log("account opened successfully!\n");
      getUserInput();
    } else {
      console.log("Error accured");
      rl.close();
    }
  });
}

function deposit() {
  let account;
  rl.question("\nEnter account number: >", (accountNumber) => {
    account = accounts[accountNumber - 1];
    if (account) {
      rl.question("Enter deposit amount: >Rwf ", (amount) => {
        if (account.deposit(Number(amount))) {
          console.log("deposed successfully!\n");
          getUserInput();
        } else {
          console.log("Error accured");
          rl.close();
        }
      });
    } else {
      console.log("no account found, create one then use it's shown number");
      getUserInput();
    }
  });
}

function withdraw() {
  let account;
  rl.question("\nEnter account number: >", (accountNumber) => {
    account = accounts[accountNumber - 1];
    if (account) {
      rl.question("Enter withdraw amount: >Rwf ", (amount) => {
        if (account.withdraw(Number(amount))) {
          console.log("withdraw successfully!\n");
          getUserInput();
        } else {
          console.log("Error accured");
          rl.close();
        }
      });
    } else {
      console.log("no account found, create one then use it's shown number");
      getUserInput();
    }
  });
}

function viewBalance() {
  const accountNumber = rl.question("Enter account number:");
  const account = accounts[accountNumber - 1];
  account.getBalance();
}

// Loop to keep the program running until the user chooses to exit
const getUserInput = () => {
  console.log("\n Choose an option:");
  console.log("1. Create account");
  console.log("2. Deposit");
  console.log("3. Withdraw");
  console.log("4. View balance");
  console.log("5. Exit");

  // Get user input from the console
  rl.question("", (choice) => {
    switch (choice) {
      case "1":
        createAccount();
        break;
      case "2":
        deposit();
        break;
      case "3":
        withdraw();
        break;
      case "4":
        viewBalance();
        break;
      case "5":
        // Exit the program
        process.exit();
      default:
        console.log("Invalid choice.");
        getUserInput();
    }
  });
};

getUserInput();
