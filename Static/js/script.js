document.addEventListener('DOMContentLoaded', function() {
    // Get data from Flask template variables
    var top10currencies = MarketCap;

    // Extract labels (names) and market cap values from the data
    var labels = top10currencies.map(function (currency) {
        return currency.name;
    });

    var marketCaps = top10currencies.map(function (currency) {
        return currency.market_cap;
    });

    // Get the canvas element from your HTML
    var ctx = document.getElementById('myChart').getContext('2d');

    // Create the bar chart
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Market Cap of Top 10 Cryptocurrencies',
                data: marketCaps,
                backgroundColor: 'rgba(54, 162, 235, 0.6)', // Adjust the color as needed
                borderColor: 'rgba(54, 162, 235, 1)', // Adjust the border color as needed
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true // Start y-axis at 0
                }
            }
        }
    });
});
