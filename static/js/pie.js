d3.json("static/data/all_dataJSON.json").then((data) => {
  console.log(data);


// Sort the array in descending order and asdign the results to a variable
let sorted = data.sort(function sortFunction(a,b) {
      return b.circulating_supply - a.circulating_supply;
  }); 

let sliced1 = sorted.slice(94, 100);
let sliced2 = sorted.slice(0, 5);
console.log(sliced2)
// total circulating supply of bottom 5
function totalCirculating1() {
    let total = 0;

  for (let i = 0; i < sliced1.length; i++) {
    total += sliced1[i].circulating_supply;
  }

    let totalCirculatingSupply1 = total;
    return totalCirculatingSupply1;
    
};

// total circulating supply of top 5
function totalCirculating2() {
  let total = 0;

for (let i = 0; i < sliced2.length; i++) {
  total += sliced2[i].circulating_supply;
}

  let totalCirculatingSupply2 = total;
  return totalCirculatingSupply2;
};

let totalCirculatingSupply1= totalCirculating1();
let totalCirculatingSupply2= totalCirculating2();

// Button event listeners
d3.selectAll("#topfive").on("click", topFive);
d3.selectAll("#bottomfive").on("click", bottomFive);

function bottomFive() {
  let currentSupplypercentage = [];
  let labels = [];
  for (let i = 0; i < sliced1.length; i++) {
    currentSupplypercentage.push((sliced1[i].circulating_supply / totalCirculatingSupply1) * 100);
    labels.push(sliced1[i].name);
  }

  var pieData = [{
    values: currentSupplypercentage,
    labels: labels,
    type: 'pie'
  }];

  var layout = {
    height: 400,
    width: 500
  };

  Plotly.newPlot('visualisation2', pieData, layout);
}

bottomFive();

function topFive() {
  let currentSupplypercentage = [];
  let labels = [];
  for (let i = 0; i < sliced2.length; i++) {
    currentSupplypercentage.push((sliced2[i].circulating_supply / totalCirculatingSupply2) * 100);
    labels.push(sliced2[i].name);
  }
  var pieData = [{
    values: currentSupplypercentage,
    labels: labels,
    type: 'pie'
  }];

  var layout = {
    height: 400,
    width: 500
  };

  Plotly.newPlot('visualisation2', pieData, layout);
}

topFive();

})