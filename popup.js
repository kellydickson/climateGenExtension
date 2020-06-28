var myCarbonFootprint='0';

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('button').addEventListener('click', function () {
    console.log("inside first block")
  })

  /*getAPIAsync('taxi')
  .then(data => {
    console.log("carbon footprint: ");
    console.log(data);
    myCarbonFootprint = data.carbonFootprint;
    console.log("CARBON FOOTPRINT"+myCarbonFootprint)
    displayResults();
  })*/
  //var total = calculateCarbonFootprint(10,11, 12,13,14);
  //console.log("CCF: " + calculateCarbonFootprint());
  /*calculateCarbonFootprint(10,11, 12,13,14)
  .then(total => {
    console.log("CCF: "+total);
  })*/
  calculateCarbonFootprint(122);
});

function displayResults() {
  document.getElementById('cf').innerText = 'Your route\'s carbon footprint is '+myCarbonFootprint+".";
  document.getElementById('comp1').innerText = 'That\'s comparable to ';
  document.getElementById('comp2').innerText = 'or ';
  document.getElementById('cf').style.display = 'block';
  document.getElementById('comp1').style.display = 'block';
  document.getElementById('comp2').style.display = 'block';
}

async function calculateCarbonFootprint(miles){
  var carMeasure;
  var busMeasure;
  var transitMeasure;
  var motorbikeMeasure;
  var planeMeasure;
  console.log('CCF MILES: '+miles);
  getAPIAsync(miles,'anyCar')
  .then(data => {
    carMeasure = data.carbonFootprint; //*carMiles
    console.log("car: "+carMeasure);
  })
  getAPIAsync(miles,'bus')
  .then(data => {
    busMeasure = data.carbonFootprint; //*carMiles
    console.log("bus: "+busMeasure);
  })
  getAPIAsync(miles,'transitRail')
  .then(data => {
    transitMeasure = data.carbonFootprint; //*carMiles
    console.log("transit: "+transitMeasure);
  })
  getAPIAsync(miles,'motorbike')
  .then(data => {
    motorbikeMeasure = data.carbonFootprint; //*carMiles
    console.log("motorbike: "+motorbikeMeasure);
  })
  getAPIAsync(miles,'businessFlight')
  .then(data => {
    planeMeasure = data.carbonFootprint; //*carMiles
    console.log("plane: "+planeMeasure);
  })
  //var total = carMeasure+busMeasure+transitMeasure+motorbikeMeasure+planeMeasure;
  //console.log("TOTAL: " + total);
}


/*async function calculateCarbonFootprint(carMiles,busMiles,transitMiles,motorbikeMiles,planeMiles){
  var carMeasure;
  var busMeasure;
  var transitMeasure;
  var motorbikeMeasure;
  var planeMeasure;
  getAPIAsync('anyCar')
  .then(data => {
    carMeasure = data.carbonFootprint; //*carMiles
    console.log("car: "+carMeasure);
  })
  getAPIAsync('bus')
  .then(data => {
    busMeasure = data.carbonFootprint; //*carMiles
    console.log("bus: "+busMeasure);
  })
  getAPIAsync('transitRail')
  .then(data => {
    transitMeasure = data.carbonFootprint; //*carMiles
    console.log("transit: "+transitMeasure);
  })
  getAPIAsync('motorbike')
  .then(data => {
    motorbikeMeasure = data.carbonFootprint; //*carMiles
    console.log("motorbike: "+motorbikeMeasure);
  })
  var total;
  getAPIAsync('businessFlight')
  .then(data => {
    planeMeasure = data.carbonFootprint; //*carMiles
    console.log("plane: "+planeMeasure);
    total = parseInt(carMeasure)+parseInt(busMeasure)+parseInt(transitMeasure)+parseInt(motorbikeMeasure)+parseInt(planeMeasure);
    console.log("yup" + carMeasure + " "+busMeasure+ " "+transitMeasure+" "+motorbikeMeasure+ " "+ planeMeasure);
    console.log("total value!!!!! "+total);
  })
  //var total = carMeasure+busMeasure+transitMeasure+motorbikeMeasure+planeMeasure;
  //console.log("TOTAL: " + total);
  displayTotal(total);
  return total;
}*/

async function displayTotal(total){
  console.log("the total value is "+total);
}

async function getAPIAsync(miles,mode)
{
  console.log('miles: '+ miles + 'mode: ' + mode);
  //let url = 'https://api.triptocarbon.xyz/v1/footprint?activity=10&activityType=miles&country=usa&mode=';
  let url = 'https://api.triptocarbon.xyz/v1/footprint?activity=';
  url = url + miles + '&activityType=miles&country=usa&mode=' + mode;
  let response = await fetch(url);//check that this works
  let data = await response.json()
  return data;
}
//https://api.triptocarbon.xyz/v1/footprint?activity=10&activityType=miles&country=usa&mode=taxi