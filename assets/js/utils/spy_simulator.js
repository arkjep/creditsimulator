// Utility to simulate fund performance based on SPY price data, scaled to a target annualized return

/**
 * Calculate annualized return from price series
 * @param {number[]} prices - Array of annual closing prices
 * @returns {number} Annualized return (as decimal, e.g. 0.08 for 8%)
 */
function calcAnnualizedReturn(prices) {
    const n = prices.length - 1;
    if (n < 1) return 0;
    return Math.pow(prices[prices.length - 1] / prices[0], 1 / n) - 1;
}

/**
 * Scale a price series so its annualized return matches the target
 * @param {number[]} prices - Array of annual closing prices
 * @param {number} targetReturn - Target annualized return (as decimal, e.g. 0.4 for 40%)
 * @returns {number[]} Scaled price series
 */
function scaleToTargetReturn(prices, targetReturn) {
    const actual = calcAnnualizedReturn(prices);
    if (actual === 0) return prices.slice();
    const n = prices.length - 1;
    const scale = (1 + targetReturn) / (1 + actual);
    // Scale each year's return
    let scaled = [prices[0]];
    for (let i = 1; i < prices.length; i++) {
        const r = prices[i] / prices[i - 1];
        const scaledR = Math.pow(r, scale);
        scaled.push(scaled[scaled.length - 1] * scaledR);
    }
    return scaled;
}

// Exported API
export { calcAnnualizedReturn, scaleToTargetRetur };
