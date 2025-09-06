// Loads SPY close prices from the JSON file and provides annualized return utilities

/**
 * Loads SPY close prices from the JSON file (daily data)
 * @param {Array} spyData - Array of SPY daily objects with a 'close' and 'datetime' property
 * @returns {number[]} Array of close prices, one per year (end-of-year)
 */
function extractAnnualCloses(spyData) {
    // Group by year, take last close of each year
    const byYear = {};
    spyData.forEach(row => {
        const date = new Date(row.datetime);
        const year = date.getUTCFullYear();
        if (!byYear[year] || date > byYear[year].date) {
            byYear[year] = { date, close: row.close };
        }
    });
    // Sort by year
    return Object.keys(byYear).sort().map(y => byYear[y].close);
}

export { extractAnnualCloses };
