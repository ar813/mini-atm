#!/usr/bin/env node
import inquirer from "inquirer";

let myBalance = 100000;
let myPin = 1234;
let accountName = ""; // Initialize account name variable
let lastTransactions = []; // Array to store last transactions

let pinAnswer = await inquirer.prompt([
  {
    name: "pin",
    message: "Enter Your Pin",
    type: "number",
  },
]);

if (pinAnswer.pin === myPin) {
  console.log("Correct pin code!!!");

  let accountNameAnswer = await inquirer.prompt([
    {
      name: "accountName",
      message: "Enter Your Profile Name",
      type: "input",
    },
  ]);

  accountName = accountNameAnswer.accountName; // Store the entered account name
  while (true) {
    let operationAnswer = await inquirer.prompt([
      {
        name: "operation",
        message: `${accountName}! what do you want to do?`,
        type: "list",
        choices: [
          "withdraw",
          "check balance",
          "fast cash",
          "deposit",
          "pin change",
          "fund transfer",
          "check profile name",
          "change profile name", // Added feature: Change Profile Name
          "view last transactions", // Added feature: View Last Transactions
          "exit",
        ],
      },
    ]);

    if (operationAnswer.operation === "withdraw") {
      let amountAnswer = await inquirer.prompt([
        {
          name: "amount",
          message: "How much do you want to withdraw?",
          type: "number",
        },
      ]);

      if (amountAnswer.amount <= myBalance) {
        myBalance -= amountAnswer.amount;
        console.log(`Your remaining balance is ${myBalance}`);
        lastTransactions.push(`Withdrawal of ${amountAnswer.amount}`);
      } else {
        console.log("Insufficient balance");
      }
    } else if (operationAnswer.operation === "check balance") {
      console.log(`Your balance is ${myBalance}`);
    } else if (operationAnswer.operation === "fast cash") {
      let fastCashAnswer = await inquirer.prompt([
        {
          name: "fastCash",
          type: "list",
          choices: ["1000", "2000", "5000", "8000", "10000"],
          message: "Select a fast cash",
        },
      ]);

      myBalance -= fastCashAnswer.fastCash;
      console.log(`Your remaining amount is ${myBalance}`);
      lastTransactions.push(
        `withdrawal of ${fastCashAnswer.fastCash} through Fast Cash`
      );
    } else if (operationAnswer.operation === "deposit") {
      let depositAnswer = await inquirer.prompt([
        {
          name: "deposit",
          message: "How much do you want to deposit?",
          type: "number",
        },
      ]);

      myBalance += depositAnswer.deposit;
      console.log(`Your updated balance is ${myBalance}`);
      lastTransactions.push(`Deposit of ${depositAnswer.deposit}`);
    } else if (operationAnswer.operation === "pin change") {
      let oldPinAnswer = await inquirer.prompt([
        {
          name: "oldPin",
          message: "Enter Your old Pin",
          type: "number",
        },
      ]);

      if (oldPinAnswer.oldPin === myPin) {
        console.log("Correct pin code!!!");
        console.log("Now you can change your pin:");
        let newPinAnswer = await inquirer.prompt([
          {
            name: "newPin",
            message: "Enter Your new Pin",
            type: "number",
          },
        ]);

        let confirmPinAnswer = await inquirer.prompt([
          {
            name: "confirmPin",
            message: "Confirm Your new Pin",
            type: "number",
          },
        ]);

        if (newPinAnswer.newPin === confirmPinAnswer.confirmPin) {
          myPin = newPinAnswer.newPin; // Update the PIN
          console.log("Your PIN has been changed successfully.");
        } else {
          console.log("PINs do not match. Please try again.");
        }
      } else {
        console.log("Incorrect pin");
      }
    } else if (operationAnswer.operation === "fund transfer") {
      let transferAnswer = await inquirer.prompt([
        {
          name: "transfer",
          message: "Enter the amount you want to transfer:",
          type: "number",
        },
        {
          name: "recipient",
          message: "Enter the recipient's account number:",
          type: "number",
        },
      ]);

      if (transferAnswer.transfer <= myBalance) {
        myBalance -= transferAnswer.transfer;
        console.log(
          `Transfer successful! Your remaining balance is ${myBalance}`
        );
        lastTransactions.push(`Transfer of ${transferAnswer.transfer}`);
      } else {
        console.log("Insufficient balance for the transfer");
      }
    } else if (operationAnswer.operation === "exit") {
      console.log("Thank you for using our ATM. Goodbye!");
      if (lastTransactions.length > 0) {
        console.log("Last transactions:");
        console.log(lastTransactions.slice(-5).join("\n"));
      } else {
        console.log("No transactions yet");
      }
      break;
    } else if (operationAnswer.operation === "check profile name") {
      console.log(`Your profile name is ${accountName}`);
    } else if (operationAnswer.operation === "change profile name") {
      // Implementation for Change Profile Name feature
      let newProfileNameAnswer = await inquirer.prompt([
        {
          name: "newProfileName",
          message: "Enter Your new Profile Name",
          type: "input",
        },
      ]);
      accountName = newProfileNameAnswer.newProfileName;
      console.log(`Your profile name has been updated to ${accountName}`);
    } else if (operationAnswer.operation === "view last transactions") {
      // Implementation for View Last Transactions feature
      console.log("Showing last 5 transactions:");
      if (lastTransactions.length > 0) {
        console.log(lastTransactions.slice(-5).join("\n"));
      } else {
        console.log("No transactions yet.");
      }
    }
  }
} else {
  console.log("Incorrect pin");
}
