class Loan {
    constructor(amount, interestRate, term) {
        this.amount = amount;
        this.interestRate = interestRate;
        this.term = term; // in years
    }

    calculateMonthlyPayment() {
        const monthlyRate = this.interestRate / 100 / 12;
        const numberOfPayments = this.term * 12;
        const monthlyPayment = (this.amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
        return monthlyPayment;
    }

    calculateTotalRepayment() {
        const monthlyPayment = this.calculateMonthlyPayment();
        return monthlyPayment * this.term * 12;
    }
}

export default Loan;