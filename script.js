
var cardsArray = [
  { name: './images/image1.jpg' },
  { name: './images/image2.jpg' },
  { name: './images/image3.jpg' },
  { name: './images/image4.jpg' },
  { name: './images/image5.jpg' },
  { name: './images/image6.jpg' },
  { name: './images/image7.jpg' },
  { name: './images/image8.jpg' },
  { name: './images/image1.jpg' },
  { name: './images/image2.jpg' },
  { name: './images/image3.jpg' },
  { name: './images/image4.jpg' },
  { name: './images/image5.jpg' },
  { name: './images/image6.jpg' },
  { name: './images/image7.jpg' },
  { name: './images/image8.jpg' },
];



var game = document.querySelector('.memory-game');
var grid = document.createElement('div');
grid.classList.add('memory-game-grid');
game.appendChild(grid);

var cardChosen = [];
var cardChosenId = [];
var cardsWon = [];

function createBoard() {
  shuffle(cardsArray).forEach((card, index) => {
    var newCard = document.createElement('div');
    newCard.classList.add('memory-card');
    newCard.setAttribute('data-id', index);
    newCard.addEventListener('click', flipCard);

    var grayDiv = document.createElement('div');
    grayDiv.classList.add('gray-div');

    var img = document.createElement('img');
    img.setAttribute('src', card.name);
    img.classList.add('front-img');

    newCard.appendChild(grayDiv);
    newCard.appendChild(img);

    grid.appendChild(newCard);
  });
}

function checkForMatch() {
  var cards = document.querySelectorAll('.memory-card');
  var optionOneId = cardChosenId[0];
  var optionTwoId = cardChosenId[1];

  if (cardChosen[0] === cardChosen[1] && optionOneId !== optionTwoId) {
    cards[optionOneId].removeEventListener('click', flipCard);
    cards[optionTwoId].removeEventListener('click', flipCard);
    cardsWon.push(cardChosen);
  } else {
    resetCards(cards, optionOneId, optionTwoId);
  }

  cardChosen = [];
  cardChosenId = [];
  if (cardsWon.length === cardsArray.length / 2) {
    alert('Congratulations! You found all matches!');
  }
}

function resetCards(cards, id1, id2) {
  setTimeout(() => {
    cards[id1].querySelector('.front-img').style.display = 'none';
    cards[id1].querySelector('.gray-div').style.display = 'block';
    cards[id2].querySelector('.front-img').style.display = 'none';
    cards[id2].querySelector('.gray-div').style.display = 'block';
  }, 500);
}

function flipCard() {
  var cardId = this.getAttribute('data-id');
  var grayDiv = this.querySelector('.gray-div');
  var frontImg = this.querySelector('.front-img');

  cardChosen.push(cardsArray[cardId].name);
  cardChosenId.push(cardId);
  grayDiv.style.display = 'none';
  frontImg.style.display = 'block';

  if (cardChosen.length === 2) {
    setTimeout(checkForMatch, 500);
  }
}

function shuffle(array) {
  var currentIndex = array.length;
  var temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

createBoard();
