const button = document.getElementById('button-random-color');
const coresPallet = document.getElementsByClassName('color');

const randomColor = () => {
  const hex = '0123456789abcdef';
  let color = '#';

  for (let index = 0; index < 6; index += 1) {
    const randomIndex = Math.floor(Math.random() * hex.length);
    color += hex[randomIndex];
  }

  return color;
};

button.addEventListener('click', () => {
  for (let index = 1; index < coresPallet.length; index += 1) {
    coresPallet[index].style.backgroundColor = randomColor();

    if (coresPallet[index].style.backgroundColor === 'black') {
      coresPallet[index].style.backgroundColor = randomColor();
    }
  }
});
