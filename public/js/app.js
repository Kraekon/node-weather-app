const formElement = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#messageOne');
const messageTwo = document.querySelector('#messageTwo');

formElement.addEventListener('submit', (event) => {
  event.preventDefault();

  const location = search.value;

  messageOne.style.backgroundColor = 'rgb(244, 248, 168)';

  messageOne.textContent = 'Loading..';
  messageOne.style.display = 'block';
  messageTwo.style.display = 'none';

  fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
        messageOne.style.backgroundColor = 'rgb(237, 103, 94)';
        messageOne.style.display = 'block';
        messageTwo.style.display = 'none';
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
        messageOne.style.display = 'block';
        messageTwo.style.display = 'block';
      }
    });
  });
});
