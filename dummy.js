'use strict';

console.log('AAAAAAA')

fetch('https://jsonplaceholder.typicode.com/todos/1')
.then(response => response.json())
.then(json => {
    for (const key in json) {
        if (json.hasOwnProperty(key)) {
            document.getElementById(key).innerText = json[key];
        }
    }
})