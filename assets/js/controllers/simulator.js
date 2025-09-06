// This file contains the setupSimulator function that initializes the simulation interface, handles user inputs, and triggers the simulation process.

export function setupSimulator() {
    const loanForm = document.getElementById('loan-form');
    const investmentForm = document.getElementById('investment-form');
    const simulateButton = document.getElementById('simulate-button');
    const resultsContainer = document.getElementById('results-container');

    simulateButton.addEventListener('click', (event) => {
        event.preventDefault();
        const loanData = getLoanData();
        const investmentData = getInvestmentData();
        
        if (loanData && investmentData) {
            const simulation = new Simulation(loanData, investmentData);
            const results = simulation.run();
            displayResults(results);
        }
    });

    function getLoanData() {
        const amount = parseFloat(loanForm.amount.value);
        const interestRate = parseFloat(loanForm.interestRate.value);
        const term = parseInt(loanForm.term.value);
        
        if (isNaN(amount) || isNaN(interestRate) || isNaN(term)) {
            alert('Please enter valid loan details.');
            return null;
        }
        
        return { amount, interestRate, term };
    }

    function getInvestmentData() {
        const initialAmount = parseFloat(investmentForm.initialAmount.value);
        const growthRate = parseFloat(investmentForm.growthRate.value);
        const term = parseInt(investmentForm.term.value);
        
        if (isNaN(initialAmount) || isNaN(growthRate) || isNaN(term)) {
            alert('Please enter valid investment details.');
            return null;
        }
        
        return { initialAmount, growthRate, term };
    }
}