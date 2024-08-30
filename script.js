const button = document.getElementById('button-random-color');
const coresPallet = document.getElementsByClassName('color');
const input = document.getElementById('board-size');

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

// Adiciona classe selected à cor preta
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

// Adiciona evento de clique a cada pixel para pintá-lo
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

// Função para salvar o estado atual do quadro no localStorage
const saveColors = () => {
  const pixels = document.querySelectorAll('.pixel');
  const paintedColors = [];

  for (let index = 0; index < pixels.length; index += 1) {
    paintedColors.push(pixels[index].style.backgroundColor);
  }

  localStorage.setItem('pixelBoard', JSON.stringify(paintedColors));
};

// Limpa o quadro de pixels
const clearBoard = () => {
  const clearButton = document.getElementById('clear-board');

  clearButton.addEventListener('click', () => {
    const pixels = document.getElementsByClassName('pixel');
    for (let index = 0; index < pixels.length; index += 1) {
      pixels[index].style.backgroundColor = 'white';
    }
    saveColors();
  });
};
clearBoard();

// Adiciona evento de clique a cada pixel para salvar a cor no localStorage
const addClickEventToPixels = () => {
  const pixels = document.querySelectorAll('.pixel');

  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].addEventListener('click', () => {
      saveColors();
    });
  }
};

addClickEventToPixels();

// Função para recuperar o estado do quadro do localStorage
const loadColors = () => {
  const pixels = document.querySelectorAll('.pixel');
  const paintedColors = JSON.parse(localStorage.getItem('pixelBoard'));

  if (paintedColors) {
    for (let index = 0; index < pixels.length; index += 1) {
      pixels[index].style.backgroundColor = paintedColors[index];
    }
  }
};
loadColors();

const inputAlert = () => {
  if (input.value === '') {
    alert('Board inválido!');
  }
};

const buttonChangeBoard = document.getElementById('generate-board');

const changeBoard = () => {
  const pixelBoard = document.getElementById('pixel-board');

  pixelBoard.innerHTML = '';

  for (let linha = 0; linha < input.value; linha += 1) {
    const row = document.createElement('div');
    row.className = 'linha';
    pixelBoard.appendChild(row);

    for (let coluna = 0; coluna < input.value; coluna += 1) {
      const makePixel = document.createElement('div');
      makePixel.className = 'pixel';
      row.appendChild(makePixel);
    }
  }
  paintPixel();
};

const limitBoard = () => {
  if (input.value < 5) {
    input.value = 5;
  } else if (input.value > 50) {
    input.value = 50;
  }
};

const saveBoardLength = () => {
  let boardSize;
  if (input.value < 5) {
    boardSize = 5;
  } else if (input.value > 50) {
    boardSize = 50;
  } else {
    boardSize = input.value;
  }
  localStorage.setItem('boardSize', boardSize);
};

const loadBoardSize = () => {
  const boardSize = localStorage.getItem('boardSize');
  if (boardSize) {
    input.value = boardSize;
    changeBoard();
    loadColors();
    addClickEventToPixels(); // Add click event to new pixels
  }
};

window.onload = loadBoardSize;

buttonChangeBoard.addEventListener('click', makeCells);
buttonChangeBoard.addEventListener('click', inputAlert);
buttonChangeBoard.addEventListener('click', limitBoard);
buttonChangeBoard.addEventListener('click', changeBoard);
buttonChangeBoard.addEventListener('click', saveBoardLength);
