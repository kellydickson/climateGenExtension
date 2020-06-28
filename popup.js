var myCarbonFootprint='0';
var distance = '0';
var modeOfTransport = '';

fillValuesNoJQuery = function () {
  distance = document.getElementById("txtbox1").value;
  modeOfTransport = document.getElementById("txtbox2").value;
  displayResults();
}

document.getElementById("BTNSUBMIT").addEventListener("click",  function() {
  distance = document.getElementById("txtbox1").value;
  modeOfTransport = document.getElementById("txtbox2").value;
  displayResults();
});

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('button').addEventListener('click', function () {
    console.log("inside first block")
  })

  getAPIAsync('taxi')
  .then(data => {
    console.log("carbon footprint: ");
    console.log(data);
    myCarbonFootprint = data.carbonFootprint;
    console.log("CARBON FOOTPRINT"+myCarbonFootprint)
    displayResults();
  })
  //var total = calculateCarbonFootprint(10,11, 12,13,14);
  //console.log("CCF: " + calculateCarbonFootprint());
  /*calculateCarbonFootprint(10,11, 12,13,14)
  .then(total => {
    console.log("CCF: "+total);
  })*/
});

function displayResults() {
  document.getElementById('cf').innerText = 'Your route\'s carbon footprint is '+myCarbonFootprint+".";
  document.getElementById('comp1').innerText = 'That\'s comparable to ';
  document.getElementById('comp2').innerText = 'or ';
  document.getElementById('cf').style.display = 'block';
  document.getElementById('comp1').style.display = 'block';
  document.getElementById('comp2').style.display = 'block';
}

async function calculateCarbonFootprint(distance){
  var carMeasure;
  var busMeasure;
  var transitMeasure;
  var motorbikeMeasure;
  var planeMeasure;
  getAPIAsync('anyCar')
  .then(data => {
    carMeasure = data.carbonFootprint*distance; //*carMiles
    console.log("car: "+carMeasure);
  })
  getAPIAsync('bus')
  .then(data => {
    busMeasure = data.carbonFootprint*distance; //*carMiles
    console.log("bus: "+busMeasure);
  })
  getAPIAsync('transitRail')
  .then(data => {
    transitMeasure = data.carbonFootprint*distance; //*carMiles
    console.log("transit: "+transitMeasure);
  })
  getAPIAsync('motorbike')
  .then(data => {
    motorbikeMeasure = data.carbonFootprint*distance; //*carMiles
    console.log("motorbike: "+motorbikeMeasure);
  })
  getAPIAsync('businessFlight')
  .then(data => {
    planeMeasure = data.carbonFootprint*distance; //*carMiles
    console.log("plane: "+planeMeasure);
  })
  var total = carMeasure+busMeasure+transitMeasure+motorbikeMeasure+planeMeasure;
  //console.log("TOTAL: " + total);
  return total;
}

async function getAPIAsync(mode)
{
  let url = 'https://api.triptocarbon.xyz/v1/footprint?activity=10&activityType=miles&country=usa&mode=';
  let response = await fetch(url+mode);//check that this works
  let data = await response.json()
  return data;
}
//https://api.triptocarbon.xyz/v1/footprint?activity=10&activityType=miles&country=usa&mode=taxi