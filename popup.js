/* document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('button').addEventListener('click',callAPI);
}); */

document.addEventListener('DOMContentLoaded', callAPI);

function callAPI() {
    console.log("hey");
    fetch('https://api.triptocarbon.xyz/v1/footprint?activity=10&activityType=miles&country=usa&mode=taxi')
        .then(response => {
          console.log("response:: ");
          console.log(response);
          return response.json();
        })
        .then(carbonFootprint => {
          console.log("carbon footprint: ");
          console.log(carbonFootprint);
        })
}