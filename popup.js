var myCarbonFootprint='0';

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('button').addEventListener('click', function () {
    if(document.getElementById('miles').value=='') {
      document.getElementById('cf').innerText = 'Error: Please input a numerical value for miles.';
      document.getElementById('result1').style.display = 'none';
      document.getElementById('result2').style.display = 'none';
      document.getElementById('result3').style.display = 'none';
      document.getElementById('result4').style.display = 'none';
      document.getElementById('result5').style.display = 'none';
      document.getElementById('cf').style.display = 'block';
    }
    else if (isNaN(document.getElementById('miles').value)){
      document.getElementById('cf').innerText = 'Error: Please input a numerical value for miles.';
      document.getElementById('result1').style.display = 'none';
      document.getElementById('result2').style.display = 'none';
      document.getElementById('result3').style.display = 'none';
      document.getElementById('result4').style.display = 'none';
      document.getElementById('result5').style.display = 'none';
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
  getAPIAsync(miles,'anyCar')
  .then(data => {
    carMeasure = data.carbonFootprint;
    document.getElementById('cf').innerText = 'Carbon footprint (Pounds CO2):';
    document.getElementById('cf').style.display = 'block';

    document.getElementById('result1').innerText = 'Car: '+carMeasure;
    document.getElementById('result1').style.display = 'block';
  })
  getAPIAsync(miles,'bus')
  .then(data => {
    busMeasure = data.carbonFootprint;

    document.getElementById('result2').innerText = 'Bus: '+ busMeasure;
    document.getElementById('result2').style.display = 'block';
  })
  getAPIAsync(miles,'transitRail')
  .then(data => {
    transitMeasure = data.carbonFootprint;
    document.getElementById('result3').innerText = 'Transit: ' + transitMeasure;
    document.getElementById('result3').style.display = 'block';
  })
  getAPIAsync(miles,'motorbike')
  .then(data => {
    motorbikeMeasure = data.carbonFootprint;
    document.getElementById('result4').innerText = 'Motorbike: ' + motorbikeMeasure;
    document.getElementById('result4').style.display = 'block';
  })
  getAPIAsync(miles,'businessFlight')
  .then(data => {
    planeMeasure = data.carbonFootprint;
    document.getElementById('result5').innerText = 'Plane: ' + planeMeasure;
    document.getElementById('result5').style.display = 'block';
  })
}

async function getAPIAsync(miles,mode)
{
  let url = 'https://api.triptocarbon.xyz/v1/footprint?activity=';
  url = url + miles + '&activityType=miles&country=usa&mode=' + mode;
  let response = await fetch(url);
  let data = await response.json()
  return data;
}