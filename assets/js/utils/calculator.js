export function calculateMonthlyPayment(loanAmount, annualInterestRate, loanTerm) {
    const monthlyInterestRate = annualInterestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    return (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
}

export function calculateTotalRepayment(monthlyPayment, loanTerm) {
    return monthlyPayment * loanTerm * 12;
}

export function calculateFutureValue(investmentAmount, annualGrowthRate, investmentTerm) {
    return investmentAmount * Math.pow(1 + annualGrowthRate / 100, investmentTerm);
}

export function calculateInvestmentReturns(investmentAmount, futureValue) {
    return futureValue - investmentAmount;
}