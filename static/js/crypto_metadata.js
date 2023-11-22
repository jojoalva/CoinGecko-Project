d3.json("static/data/all_dataJSON.json").then((data) => {
  console.log(data);

  function updateMetaData(subjectMetadata) {
  
    let demoBox = d3.select("#sample-metadata");
  
    // Clear the existing content
    demoBox.html("")
  
  // Iterate through the metadata object and append each key-value pair
  Object.entries(subjectMetadata).forEach(([key, value]) => {
    demoBox.append("p").text(`${key}: ${value}`);
  });
  
  }