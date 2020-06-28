//document.getElementById("myButton").addEventListener("click", callAPI);

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('button').addEventListener('click',callAPI);
});

function callAPI() {
    console.log("hey");
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            return response.json();
        })
        .then(users => {
            console.log(users);
        })
}