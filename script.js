const button = document.getElementById('button-random-color');
const coresPallet = document.getElementsByClassName('color');

// Cria cor aleatória
const randomColor = () => {
  const hex = '0123456789abcdef';
  let color = '#';

  for (let index = 0; index < 6; index += 1) {
    const randomIndex = Math.floor(Math.random() * hex.length);
    color += hex[randomIndex];
  }

  return color;
};

// Armazena paleta padrão no localStorage
const createStorage = () => {
  if (localStorage.getItem('colorPalette') === null) {
    const colors = [];

    for (let index = 0; index < coresPallet.length; index += 1) {
      colors.push(coresPallet[index].style.backgroundColor);
    }
    return localStorage.setItem('colorPalette', JSON.stringify(colors));
  }
};
createStorage();

// Adiciona cor aleatória ao clicar no botão à paleta de cores sem deixar o preto repetir
button.addEventListener('click', () => {
  const cores = ['#000000'];

  for (let index = 1; index < coresPallet.length; index += 1) {
    coresPallet[index].style.backgroundColor = randomColor();
    cores.push(coresPallet[index].style.backgroundColor);

    if (coresPallet[index].style.backgroundColor === '#000000') {
      coresPallet[index].style.backgroundColor = randomColor();
    }
  }
  localStorage.setItem('colorPalette', JSON.stringify(cores));
});

// Adiciona a cor clicada ao quadro de pixels
const pullFromStorage = () => {
  const colors = JSON.parse(localStorage.getItem('colorPalette'));
  for (let index = 0; index < coresPallet.length; index += 1) {
    coresPallet[index].style.backgroundColor = colors[index];
  }
};
pullFromStorage();

// Adiciona quadro de pixels
const makeCells = () => {
  const pixelBoard = document.getElementById('pixel-board');

  for (let linha = 0; linha < 5; linha += 1) {
    const row = document.createElement('div');
    row.className = 'linha';
    pixelBoard.appendChild(row);

    for (let coluna = 0; coluna < 5; coluna += 1) {
      const pixel = document.createElement('div');
      pixel.className = 'pixel';
      row.appendChild(pixel);
    }
  }
};
makeCells();
