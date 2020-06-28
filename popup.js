var myCarbonFootprint='0';

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('button').addEventListener('click', function () {
    if(document.getElementById('miles').value=='') {
      document.getElementById('cf').innerText = 'Error: Please input a value for miles.';
      document.getElementById('cf').style.display = 'block';
    }
    else {
      document.getElementById('cf').style.display = 'none';
      calculateCarbonFootprint(document.getElementById('miles').value)
    }
  })
});

async function calculateCarbonFootprint(miles){
  var carMeasure;
  var busMeasure;
  var transitMeasure;
  var motorbikeMeasure;
  var planeMeasure;
  console.log('CCF MILES: '+miles);
  getAPIAsync(miles,'anyCar')
  .then(data => {
    carMeasure = data.carbonFootprint;
    document.getElementById('cf').innerText = 'Carbon footprint (Pounds CO2):';
    document.getElementById('cf').style.display = 'block';
    document.getElementById('carResult').innerText = 'Car: '+carMeasure;
    document.getElementById('carResult').style.display = 'block';
  })
  getAPIAsync(miles,'bus')
  .then(data => {
    busMeasure = data.carbonFootprint;
    document.getElementById('busResult').innerText = 'Bus: '+busMeasure;
    document.getElementById('busResult').style.display = 'block';
  })
  getAPIAsync(miles,'transitRail')
  .then(data => {
    transitMeasure = data.carbonFootprint;
    document.getElementById('transitResult').innerText = 'Transit: '+transitMeasure;
    document.getElementById('transitResult').style.display = 'block';
  })
  getAPIAsync(miles,'motorbike')
  .then(data => {
    motorbikeMeasure = data.carbonFootprint; 
    document.getElementById('motorbikeResult').innerText = 'Motorbike: '+motorbikeMeasure;
    document.getElementById('motorbikeResult').style.display = 'block';
  })
  getAPIAsync(miles,'businessFlight')
  .then(data => {
    planeMeasure = data.carbonFootprint;
    document.getElementById('planeResult').innerText = 'Plane: '+planeMeasure;
    document.getElementById('planeResult').style.display = 'block';
  })
}

async function getAPIAsync(miles,mode)
{
  console.log('miles: '+ miles + 'mode: ' + mode);
  let url = 'https://api.triptocarbon.xyz/v1/footprint?activity=';
  url = url + miles + '&activityType=miles&country=usa&mode=' + mode;
  let response = await fetch(url);
  let data = await response.json()
  return data;
}