class Simulation {
    constructor() {
        this.scenarios = [];
        this.results = [];
    }

    addScenario(loan, investment) {
        this.scenarios.push({ loan, investment });
    }

    runScenarios() {
        this.results = this.scenarios.map(scenario => {
            const loanResult = this.calculateLoanOutcome(scenario.loan);
            const investmentResult = this.calculateInvestmentOutcome(scenario.investment);
            return { loanResult, investmentResult };
        });
    }

    calculateLoanOutcome(loan) {
        const monthlyPayment = loan.calculateMonthlyPayment();
        const totalRepayment = monthlyPayment * loan.term * 12;
        return { monthlyPayment, totalRepayment };
    }

    calculateInvestmentOutcome(investment) {
        const futureValue = investment.calculateFutureValue();
        return { futureValue };
    }

    getResults() {
        return this.results;
    }

    clearScenarios() {
        this.scenarios = [];
        this.results = [];
    }
}

export default Simulation;