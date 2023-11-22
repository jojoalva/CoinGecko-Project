function updateMetaData(subjectMetadata) {
  
  let demoBox = d3.select("#visualisation1");



// Create the plot
    // set variables for otu_ids and sample_values
    let crypto_names = sample.otu_ids;
    let sample_values = sample.sample_values;
    let otu_labels = sample.otu_labels;
  
    let data = [{
      type: 'bar',
      orientation: 'h',
      x: sample_values.slice(0, 10).reverse(),
      y: otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse(),
      text: otu_ids.slice(0, 10).map(id => `Name: ${otu_labels[otu_ids.indexOf(id)]}`).reverse(),
      marker: {
        color: sample_values.slice(0, 10),
        colorscale: 'YlOrRd'
      }
    }]
  
    let layout =  {title: 'Top 10 OTUs found'}
  
    // Create a horizontal bar plot using Plotly
    Plotly.newPlot("bar", data, layout);
  }

//Append the plot

}