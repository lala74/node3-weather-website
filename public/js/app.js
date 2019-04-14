console.log("Client side javascript has been loaded.");

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// messageOne.textContent = 'Testing message one';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()      // prevent reload page 

    const location = search.value;
    
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    var url = '/weather?address=' + location;
    fetch(url).then((respond) => {
        respond.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
}) 