d3.json("static/data/all_dataJSON.json").then((data) => {
  console.log(data);

  // Select all buttons and attach a click event handler
  d3.selectAll("button").on("click", function() {
    // Inside the click event handler function
    let input = document.getElementById('search').value.toLowerCase();
    let selectedCoinData = data.find(item => item.name.toLowerCase() === input);
    
    // Call the updateMetaData function with the selected data
    updateMetaData(selectedCoinData);
  });

  // Define the updateMetaData function outside the event handler
  function updateMetaData(subjectMetadata) {
    let demoBox = d3.select("#sample-metadata");
    demoBox.html(""); // Clear the existing content

    if (subjectMetadata) {
      Object.entries(subjectMetadata).forEach(([key, value]) => {
        demoBox.append("p").text(`${key}: ${value}`);
      });
    } else {
      demoBox.append("p").text("No data found for the selected cryptocurrency.");
    }
  }
});