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
      const makePixel = document.createElement('div');
      makePixel.className = 'pixel';
      row.appendChild(makePixel);
    }
  }
};
makeCells();

const selectClass = () => {
  coresPallet[0].classList.add('selected');
  for (let index = 0; index < coresPallet.length; index += 1) {
    coresPallet[index].addEventListener('click', (event) => {
      for (let index2 = 0; index2 < coresPallet.length; index2 += 1) {
        coresPallet[index2].classList.remove('selected');
      }
      event.target.classList.add('selected');
    });
  }
};
selectClass();

const paintPixel = () => {
  const pixels = document.getElementsByClassName('pixel');
  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].addEventListener('click', (event) => {
      const { target } = event;
      const selectedColor = document.querySelector('.selected').style.backgroundColor;
      target.style.backgroundColor = selectedColor;
    });
  }
};

paintPixel();

const clearBoard = () => {
  const clearButton = document.getElementById('clear-board');

  clearButton.addEventListener('click', () => {
    const pixels = document.getElementsByClassName('pixel');
    for (let index = 0; index < pixels.length; index += 1) {
      pixels[index].style.backgroundColor = 'white';
    }
  });
};

clearBoard();

// Função para salvar o estado atual do quadro no localStorage
const saveColors = () => {
  const pixels = document.querySelectorAll('.pixel');
  const paintedColors = [];

  for (let i = 0; i < pixels.length; i += 1) {
    paintedColors.push(pixels[i].style.backgroundColor);
  }

  localStorage.setItem('pixelBoard', JSON.stringify(paintedColors));
};

// Adiciona evento de clique a cada pixel para salvar a cor no localStorage
const addClickEventToPixels = () => {
  const pixels = document.querySelectorAll('.pixel');

  for (let i = 0; i < pixels.length; i += 1) {
    pixels[i].addEventListener('click', () => {
      saveColors();
    });
  }
};

// Função para recuperar o estado do quadro do localStorage
const loadColors = () => {
  const pixels = document.querySelectorAll('.pixel');
  const paintedColors = JSON.parse(localStorage.getItem('pixelBoard'));

  if (paintedColors) {
    for (let i = 0; i < pixels.length; i += 1) {
      pixels[i].style.backgroundColor = paintedColors[i];
    }
  }
};

// Chama as funções para adicionar eventos e carregar as cores ao carregar a página
window.onload = () => {
  addClickEventToPixels();
  loadColors();
};
