d3.json("static/data/all_dataJSON.json").then((data) => {
  console.log(data);

  function init() {
    let cryptoNames = d3.select('#crypto-names');

    // Iterate through data to append names
    data.forEach((item) => {
      cryptoNames.append("p").text(item.name);
    });
  }

  init();

  // Select all buttons and attach a click event handler
  d3.selectAll("button").on("click", function() {

    // Inside the click event handler function
    let input = document.getElementById('search').value.toLowerCase();
    let selectedCoinData = data.find(item => item.name.toLowerCase() === input);
    
    // Call the updateMetaData function with the selected data
    updateMetaData(selectedCoinData);
    updateImage(selectedCoinData);
  });

  // Define the updateMetaData function outside the event handler
  function updateMetaData(coinMetadata) {
    let demoBox = d3.select("#sample-metadata");
    demoBox.html(""); // Clear the existing content

    if (coinMetadata) {
      Object.entries(coinMetadata).forEach(([key, value]) => {
        // Create a <p> element with HTML content, bolding the value
        demoBox.append("p").html(`<span>${key}:</span> <span><strong>${value}</strong></span>`);
      });
    }
  }
  
  function updateImage(coinData) {
    let img = d3.select("#image");
    img.html(""); // Clear the existing content

    if (coinData) {
      // Create an image element and set its src attribute to the image URL
      img.append("img")
        .attr("src", coinData.image)
        .attr("alt", "Coin Image");
    }
  }
});