d3.json("static/data/all_dataJSON.json").then((plotdata) => {
    //  Create the Traces
    let trace1 = {
      x: plotdata.name,
      y: plotdata.current_price,
      type: "bar",
    };

    let layout = {
        title: "Coin's current price"
      };
      
    // Create the data array for the plot.
    let plotData = [trace1];

    // Plot the chart to a div tag with an ID of "plot".
    Plotly.newPlot("visualization1", plotData, layout);
  });
  
