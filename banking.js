function Account(accountNumber, balance) {
    this._accountNumber = accountNumber
    this._balance = balance
}

Account.prototype.deposit = function (amount) {
    this._balance += amount
    console.log(`~~ Deposit $${amount} to ${this._typeOfAccount}! ${Account.prototype.describe.call(this)}`)
    return
}

Account.prototype.withdraw = function (amount) {
    if (this._balance < amount) {
        console.log(`~~ Insufficient balance (${this._typeOfAccount}: $${this._balance}). Cannot Withdraw $${amount} from this account.`)
        return
    }
    this._balance -= amount
    console.log(`~~ Withdraw $${amount} from ${this._typeOfAccount}! The new balance is ${this._balance}.`)
    return
}

Account.prototype.describe = function () {
    return (`This ${this._typeOfAccount}(${this._accountNumber}) has $${this._balance}!`)
}


//// Saving Account - Sub
function SavingAccount(interestRate, accountNumber, balance) {
    this._interestRate = interestRate
    this._typeOfAccount = "saving account"
    Account.call(this, accountNumber, balance)
}
SavingAccount.prototype = Object.create(Account.prototype)
SavingAccount.prototype.constructor = SavingAccount

SavingAccount.prototype.addInterest = function () {
    newAdd = this._balance * this._interestRate
    return this._balance += newAdd
}

SavingAccount.prototype.deposit = function (amount) {
    this._balance += amount
    this.addInterest()
    console.log(`~~ Deposit $${amount} to ${this._typeOfAccount}! Adding interest $${newAdd}. This new balance is $${this._balance}.`)
    return
}

SavingAccount.prototype.describe = function () {
    return (`${Account.prototype.describe.call(this)}, the interest rate is ${this._interestRate}.`)
}

//// Checking Account - Sub
function CheckingAccount(accountNumber, balance) {
    Account.call(this, accountNumber, balance)
    this._typeOfAccount = "checking account"
}
CheckingAccount.prototype = Object.create(Account.prototype)
CheckingAccount.prototype.constructor = CheckingAccount

CheckingAccount.prototype.withdrawUsingCheck = function (amount) {
    this.withdraw(amount)
}





console.log(`=== Testing Saving Account ===`)   ///// Testing Saving Account /////
const savingAccount1 = new SavingAccount(0.05, 654321, 1000)
console.log(savingAccount1.describe())
savingAccount1.deposit(500)
savingAccount1.withdraw(300)




console.log(`=== Testing Checking Account ===`) ///// Testing Checking Account /////
const checkingAccount1 = new CheckingAccount(789012, 500)
console.log(checkingAccount1.describe())
checkingAccount1.withdrawUsingCheck(100)
checkingAccount1.withdrawUsingCheck(700)




