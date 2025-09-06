// This file serves as the entry point for the JavaScript application, initializing the simulator and setting up event listeners.

import { setupSimulator } from './controllers/simulator.js';
import { displayResults } from './controllers/results.js';


import Loan from './models/loan.js';

document.addEventListener('DOMContentLoaded', () => {
    setupSimulator();

    // --- SCENARIO MANAGEMENT ---
    const SCENARIO_KEY = 'dashboard_scenarios';
    const scenarioSelect = document.getElementById('scenario-select');
    const addScenarioBtn = document.getElementById('add-scenario');
    const editScenarioBtn = document.getElementById('edit-scenario');
    const deleteScenarioBtn = document.getElementById('delete-scenario');
    const scenarioModal = document.getElementById('scenario-modal');
    const scenarioModalName = document.getElementById('modal-scenario-name');
    const scenarioModalSave = document.getElementById('modal-save-scenario');
    const scenarioModalCancel = document.getElementById('modal-cancel-scenario');
    const editScenarioModal = document.getElementById('scenario-edit-modal');
    const editScenarioName = document.getElementById('edit-scenario-name');
    const editScenarioLoan = document.getElementById('edit-scenario-loan');
    const editScenarioInterest = document.getElementById('edit-scenario-interest');
    const editScenarioTerm = document.getElementById('edit-scenario-term');
    const editScenarioGrowth = document.getElementById('edit-scenario-growth');
    const editScenarioModalSave = document.getElementById('edit-modal-save-scenario');
    const editScenarioModalCancel = document.getElementById('edit-modal-cancel-scenario');
    let editingScenario = null;

    function getScenarios() {
        const raw = localStorage.getItem(SCENARIO_KEY);
        if (!raw) return [];
        try { return JSON.parse(raw); } catch { return []; }
    }
    function saveScenarios(scenarios) {
        localStorage.setItem(SCENARIO_KEY, JSON.stringify(scenarios));
    }
    function refreshScenarioDropdown(selectedName) {
        const scenarios = getScenarios();
        scenarioSelect.innerHTML = scenarios.map(s => `<option value="${s.name}">${s.name}</option>`).join('');
        if (selectedName && scenarios.some(s=>s.name===selectedName)) {
            scenarioSelect.value = selectedName;
        }
    }
    // Initial load
    refreshScenarioDropdown();

    // Add scenario
    addScenarioBtn.addEventListener('click', function() {
        scenarioModal.style.display = 'flex';
        scenarioModalName.value = '';
        setTimeout(()=>scenarioModalName.focus(), 100);
    });
    scenarioModalCancel.addEventListener('click', function() {
        scenarioModal.style.display = 'none';
    });
    scenarioModalSave.addEventListener('click', function() {
        const name = scenarioModalName.value.trim();
        if (!name) return;
        let scenarios = getScenarios();
        if (scenarios.some(s => s.name === name)) {
            alert('A scenario with this name already exists.');
            return;
        }
        // Default values for new scenario
        scenarios.push({name, loan: 10000, interest: 5, term: 5, growth: 5});
        saveScenarios(scenarios);
        refreshScenarioDropdown(name);
        scenarioSelect.value = name;
        scenarioModal.style.display = 'none';
    });
    scenarioModalName.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') scenarioModalSave.click();
    });

    // Edit scenario
    editScenarioBtn.addEventListener('click', function() {
        const scenarios = getScenarios();
        const selected = scenarioSelect.value;
        const scenario = scenarios.find(s => s.name === selected);
        if (scenario) {
            editingScenario = scenario.name;
            editScenarioName.value = scenario.name;
            editScenarioLoan.value = scenario.loan;
            editScenarioInterest.value = scenario.interest;
            editScenarioTerm.value = scenario.term;
            editScenarioGrowth.value = scenario.growth;
            editScenarioModal.style.display = 'flex';
            setTimeout(()=>editScenarioName.focus(), 100);
        }
    });
    editScenarioModalCancel.addEventListener('click', function() {
        editScenarioModal.style.display = 'none';
        editingScenario = null;
    });
    editScenarioModalSave.addEventListener('click', function() {
        const name = editScenarioName.value.trim();
        const loan = parseFloat(editScenarioLoan.value);
        const interest = parseFloat(editScenarioInterest.value);
        const term = parseInt(editScenarioTerm.value);
        const growth = parseFloat(editScenarioGrowth.value);
        if (!name || isNaN(loan) || isNaN(interest) || isNaN(term) || isNaN(growth)) return;
        let scenarios = getScenarios();
        // Prevent duplicate name (unless it's the same scenario)
        if (scenarios.some(s => s.name === name && s.name !== editingScenario)) {
            alert('A scenario with this name already exists.');
            return;
        }
        scenarios = scenarios.map(s => s.name === editingScenario ? {...s, name, loan, interest, term, growth} : s);
        saveScenarios(scenarios);
        refreshScenarioDropdown(name);
        scenarioSelect.value = name;
        editScenarioModal.style.display = 'none';
        editingScenario = null;
    });
    [editScenarioName, editScenarioLoan, editScenarioInterest, editScenarioTerm, editScenarioGrowth].forEach(input => {
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') editScenarioModalSave.click();
        });
    });
    // Delete scenario
    deleteScenarioBtn.addEventListener('click', function() {
        let scenarios = getScenarios();
        const selected = scenarioSelect.value;
        if (!selected) return;
        if (!confirm('Delete scenario "' + selected + '"?')) return;
        scenarios = scenarios.filter(s => s.name !== selected);
        saveScenarios(scenarios);
        refreshScenarioDropdown();
        scenarioSelect.value = scenarios.length ? scenarios[0].name : '';
    });

    // Run simulation with selected scenario
    document.getElementById('run-simulation').addEventListener('click', function(e) {
        e.preventDefault();
        const scenarios = getScenarios();
        const selected = scenarioSelect.value;
        const scenario = scenarios.find(s => s.name === selected);
        if (!scenario) {
            alert('Please select a scenario.');
            return;
        }
        const loan = new Loan(scenario.loan, scenario.interest, scenario.term);
        const investment = new Investment(scenario.loan, scenario.growth/100, scenario.term);
        const simulation = new Simulation();
        simulation.addScenario(loan, investment);
        simulation.runScenarios();
        const results = simulation.getResults()[0];
        // Display results in dashboard
        const resultsDiv = document.getElementById('dashboard-simulation-results');
        resultsDiv.innerHTML = `
            <h2>Simulation Results</h2>
            <p><strong>Monthly Payment:</strong> $${results.loanResult.monthlyPayment.toFixed(2)}</p>
            <p><strong>Total Repayment:</strong> $${results.loanResult.totalRepayment.toFixed(2)}</p>
            <p><strong>Investment Future Value:</strong> $${results.investmentResult.futureValue.toFixed(2)}</p>
            <p><strong>Net Gain/Loss:</strong> $${(results.investmentResult.futureValue - (results.loanResult.totalRepayment - scenario.loan)).toFixed(2)}</p>
        `;
        // Chart
        const ctx = document.getElementById('dashboard-results-chart').getContext('2d');
        if (window.dashboardChart) window.dashboardChart.destroy();
        window.dashboardChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array.from({length: scenario.term+1}, (_, i) => `Year ${i}`),
                datasets: [
                    {
                        label: 'Loan Balance',
                        data: Array.from({length: scenario.term+1}, (_, i) => scenario.loan - (loan.calculateMonthlyPayment() * 12 * i)),
                        borderColor: 'rgba(75,192,192,1)',
                        fill: false
                    },
                    {
                        label: 'Investment Value',
                        data: Array.from({length: scenario.term+1}, (_, i) => scenario.loan * Math.pow(1 + scenario.growth/100, i)),
                        borderColor: 'rgba(153,102,255,1)',
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: { legend: { position: 'top' } },
                scales: { y: { beginAtZero: true } }
            }
        });
    });
});

// Additional event listeners and initialization code can be added here as needed.