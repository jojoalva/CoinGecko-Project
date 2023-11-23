// Fetch data and update dropdowns
d3.json("static/data/all_dataJSON.json").then((data) => {
  console.log(data);

  var coinNames = data.map(item => item.name);

  function updateDropdowns() {
    var dropdown1 = d3.select("#dropdown1")
    dropdown1.selectAll("option")
      .data(coinNames)
      .enter()
      .append("option")
      .attr("value", name => name)
      .text(name => name);

    var dropdown2 = d3.select("#dropdown2")
    dropdown2.selectAll("option")
      .data(coinNames)
      .enter()
      .append("option")
      .attr("value", name => name)
      .text(name => name);

    // Event listeners for changes in dropdowns
    document.getElementById('dropdown1').addEventListener('change', updateChart);
    document.getElementById('dropdown2').addEventListener('change', updateChart);
  }

  // Call updateDropdowns initially
  updateDropdowns();

  function updateChart(selectedCoin) {
    var selectedCoin1 = document.getElementById('dropdown1').value;
    var selectedCoin2 = document.getElementById('dropdown2').value;
  
    var filteredData1 = data.filter(item => item.name == selectedCoin1);
    var filteredData2 = data.filter(item => item.name == selectedCoin2);
  
    // Create traces for the bubble chart
    var trace1 = {
      x: [filteredData1[0].name,filteredData2[0].name],
      y: [filteredData1[0].ath, filteredData2[0].ath],
      name: 'All time high price',
      type: 'bar'
    };
    console.log(trace1)

    var trace2 = {
      x: [filteredData2[0].name,filteredData1[0].name],
      y: [filteredData2[0].atl, filteredData1[0].atl],
      name: 'All time low price',
      type: 'bar'
    };
    console.log(trace2)

    // Define layout for the chart
    var layout = {
      title: 'Comparison of Selected Coins',
      xaxis: { title: 'Coin Names' },
      yaxis: { title: 'Price in US Dollars' },
      barmode: 'group'
    };
    
    // Combine traces into data array
    var chartData = [trace1, trace2];
    console.log(chartData)
  
    // Plot the chart
    Plotly.newPlot("visualisation1", chartData, layout);
  }
})
