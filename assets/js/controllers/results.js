function displayResults(simulationResults) {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';

    // Display summary of results
    const summary = document.createElement('div');
    summary.className = 'summary';
    summary.innerHTML = `
        <h2>Simulation Results Summary</h2>
        <p>Total Loan Amount: ${simulationResults.totalLoanAmount}</p>
        <p>Total Investment Returns: ${simulationResults.totalInvestmentReturns}</p>
        <p>Net Gain/Loss: ${simulationResults.netGainLoss}</p>
    `;
    resultsContainer.appendChild(summary);

    // Prepare data for chart
    const chartData = {
        labels: simulationResults.labels,
        datasets: [{
            label: 'Loan Repayment',
            data: simulationResults.loanRepaymentData,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }, {
            label: 'Investment Growth',
            data: simulationResults.investmentGrowthData,
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
        }]
    };

    // Create chart
    const ctx = document.getElementById('results-chart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}