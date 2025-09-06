function formatCurrency(value) {
    return '$' + value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function formatPercentage(value) {
    return (value * 100).toFixed(2) + '%';
}

function formatNumber(value) {
    return value.toLocaleString();
}

export { formatCurrency, formatPercentage, formatNumber };