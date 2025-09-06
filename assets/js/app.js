// This file serves as the entry point for the JavaScript application, initializing the simulator and setting up event listeners.

import { setupSimulator } from './controllers/simulator.js';
import { displayResults } from './controllers/results.js';

document.addEventListener('DOMContentLoaded', () => {
    setupSimulator();
});

// Additional event listeners and initialization code can be added here as needed.