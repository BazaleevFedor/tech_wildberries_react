interface Account {
    getAccountBalance(): number;
    replenishAccount(amount: number): void;
    withdrawAccount(amount: number): void;
}

class DebitAccount implements Account {
    private _balance: number;

    constructor(initialBalance: number) {
        this._balance = initialBalance;
    }

    getAccountBalance(): number {
        return this._balance;
    }

    replenishAccount(amount: number) {
        this._balance += amount;

        console.log(`Пополнение средств: ${amount}. Баланс: ${this._balance}`);
    }

    withdrawAccount(amount: number) {
        if (this._balance >= amount) {
            this._balance -= amount;
            console.log(`Вывод средств: ${amount}. Баланс: ${this._balance}`);

            return;
        }
        console.log(`Недостаточно средств. Баланс: ${this._balance}`);
    }
}

class CreditAccount implements Account {
    private _balance: number;
    private _creditLimit: number;
    private _credit: number;
    private _interest: number;

    constructor(initialBalance: number, creditLimit: number, interest: number) {
        this._balance = initialBalance;
        this._creditLimit = creditLimit;
        this._interest = interest / 100 + 1;

        this._credit = 0;
    }

    getAccountBalance(): number {
        return this._balance;
    }

    getAccountCredit(): number {
        return this._credit;
    }

    replenishAccount(amount: number) {
        if (this._credit > 0) {
            const amountToReduceCredit = Math.min(amount, this._credit);
            this._credit -= amountToReduceCredit;
            amount -= amountToReduceCredit;
            console.log(`Долг погашен на ${amountToReduceCredit}. Остаток долга: ${this._credit.toFixed(2)}`);
        }

        this._balance += amount;
        console.log(`Счет пополнен на ${amount}. Баланс: ${this._balance}`);
    }

    withdrawAccount(amount: number) {
        const availableFunds = this._balance + (this._creditLimit - this._credit);

        if (amount > availableFunds) {
            console.log('Недостаточно средств для снятия, превышен кредитный лимит.');
            return;
        }

        if (amount <= this._balance) {
            this._balance -= amount;
        } else {
            const remainingAmount = amount - this._balance;
            this._balance = 0;
            this._credit += remainingAmount;
        }

        console.log(`Со счета снято ${amount}. Баланс: ${this._balance}, Текущий долг: ${this._credit.toFixed(2)}`);
    }

    applyInterest(): void {
        const interestAmount = this._credit * this._interest;
        this._credit += interestAmount;
        console.log(`Начислены проценты: ${interestAmount.toFixed(2)}. Текущий долг: ${this._credit.toFixed(2)}`);
    }
}

const myDebit = new DebitAccount(0);
myDebit.replenishAccount(100);
myDebit.withdrawAccount(15);
console.log();

const myCredit = new CreditAccount(0, 50000, 44);
myCredit.replenishAccount(15);
myCredit.withdrawAccount(145);
myCredit.applyInterest();
myCredit.replenishAccount(145);
