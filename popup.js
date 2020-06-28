//document.getElementById("myButton").addEventListener("click", callAPI);
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('button').addEventListener('click',callAPI);
    //document.querySelector('button').addEventListener('click',makeCorsRequest);
});

function callAPI() {
    console.log("hey");
    fetch('https://api.triptocarbon.xyz/v1/footprint?activity=10&activityType=miles&country=usa&mode=taxi')
    //fetch('https://jsonplaceholder.typicode.com/users')
    //fetch('https://www.googleapis.com/youtube/v3/channels?part=contentDetails&mine=true')
    //fetch('https://www.googleapis.com/auth/books/?dq=holmes')
        .then(response => {
          console.log(response);
          //console.log(response.json());
            return response.json();
        })
        .then(carbonFootprint => {
            console.log(carbonFootprint);
        })
}

// Create the XHR object.
function createCORSRequest(method, url) {
    console.log("create cors request");
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
      // XHR for Chrome/Firefox/Opera/Safari.
      xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
      // XDomainRequest for IE.
      xhr = new XDomainRequest();
      xhr.open(method, url);
    } else {
      // CORS not supported.
      xhr = null;
    }
    return xhr;
  }
  
  // Helper method to parse the title tag from the response.
  function getTitle(text) {
    console.log("get title");
    console.log("text: "+text);
    return text.match('<title>(.*)?</title>')[1];
  }
  
  // Make the actual CORS request.
  function makeCorsRequest() {
    console.log("make cors request");
    // All HTML5 Rocks properties support CORS.
    //var url = 'http://updates.html5rocks.com';
    //var url = 'https://jsonplaceholder.typicode.com/users'
    var url = 'https://api.triptocarbon.xyz/v1/footprint?activity=10&activityType=miles&country=usa&mode=taxi'
  
    var xhr = createCORSRequest('GET', url);
    //xhr.AppendHeader("Access-Control-Allow-Origin");
    if (!xhr) {
      alert('CORS not supported');
      return;
    }
  
    // Response handlers.
    xhr.onload = function() {
      var text = xhr.responseText;
      var title = getTitle(text);
      alert('Response from CORS request to ' + url + ': ' + title);
    };
  
    xhr.onerror = function() {
      alert('Woops, there was an error making the request.');
    };
  
    xhr.send();
  }