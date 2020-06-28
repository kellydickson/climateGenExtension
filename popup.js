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
  var result1val;
  var result2val;
  var result3val;
  var result4val;
  var result5val;
  getAPIAsync(miles,'anyCar')
  .then(data => {
    carMeasure = data.carbonFootprint;
    document.getElementById('cf').innerText = 'Carbon footprint (Pounds CO2):';
    document.getElementById('cf').style.display = 'block';
  })
  getAPIAsync(miles,'bus')
  .then(data => {
    busMeasure = data.carbonFootprint;
  })
  getAPIAsync(miles,'transitRail')
  .then(data => {
    transitMeasure = data.carbonFootprint;
  })
  getAPIAsync(miles,'motorbike')
  .then(data => {
    motorbikeMeasure = data.carbonFootprint;
  })
  getAPIAsync(miles,'businessFlight')
  .then(data => {
    planeMeasure = data.carbonFootprint;
    setTimeout(()=>{
      var res = ['Car: '+carMeasure,'Bus: '+busMeasure,'Transit: '+transitMeasure,'Motorbike: '+motorbikeMeasure,'Plane: '+planeMeasure];

    for (let i=0; i<5; i++){
      let min = i;
      for (let j=i+1; j<5; j++){
        var resmin = res[min];
        var resj=res[j];
        var slice1=resmin.slice(resmin.lastIndexOf(':')+2);
        var slice2=resj.slice(resj.lastIndexOf(':')+2);
        if (slice1>slice2){
          min=j;
        }
        if (min!==i){
          let temp=res[i];
          res[i]=res[min];
          res[min]=temp;
        }
      }
    }
    console.log(res);

    document.getElementById('result1').innerText = res[0];
    document.getElementById('result2').innerText = res[1];
    document.getElementById('result3').innerText = res[2];
    document.getElementById('result4').innerText = res[3];
    document.getElementById('result5').innerText = res[4];

    document.getElementById('result1').style.display = 'block';
    document.getElementById('result2').style.display = 'block';
    document.getElementById('result3').style.display = 'block';
    document.getElementById('result4').style.display = 'block';
    document.getElementById('result5').style.display = 'block';

  })
  },500);
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