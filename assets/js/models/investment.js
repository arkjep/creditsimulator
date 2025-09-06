class Investment {
    constructor(initialAmount, growthRate, term) {
        this.initialAmount = initialAmount;
        this.growthRate = growthRate;
        this.term = term;
    }

    calculateFutureValue() {
        return this.initialAmount * Math.pow((1 + this.growthRate), this.term);
    }

    calculateReturns() {
        const futureValue = this.calculateFutureValue();
        return futureValue - this.initialAmount;
    }

    static simulateInvestmentStrategies(initialAmount, growthRate, term) {
        const strategies = {
            conservative: new Investment(initialAmount, growthRate * 0.5, term),
            moderate: new Investment(initialAmount, growthRate, term),
            aggressive: new Investment(initialAmount, growthRate * 1.5, term)
        };

        return Object.keys(strategies).map(strategy => ({
            strategy,
            futureValue: strategies[strategy].calculateFutureValue(),
            returns: strategies[strategy].calculateReturns()
        }));
    }
}

export default Investment;