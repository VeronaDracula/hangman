import {
    wordsTopic,
    alphabet
} from './utils.js';

let word = 'ПАСТА'; //слово, которое надо угадать
let wordFields = document.querySelectorAll('.word-write__text'); //поля для ввода букв
let count = 0; //счет ходов
let countRight = 0; //счет правильных букв

const topics = document.querySelectorAll('.topic__item'); //темы
const selectedTopicBox = document.querySelector('.title-topic__text'); //выбранная тема

const gallowsImg = document.querySelectorAll('.hangman-img'); //картинки виселицы

const lettersContainer = document.querySelector('.letters'); //контейнер букв
const wordWriteContainer = document.querySelector('.word-write'); //контейнер слова

const letterTemplateContent = document.querySelector('.letter-template').content; //шаблон букв
const wordWriteTemplateContent = document.querySelector('.word-write-template').content; //шаблон слова

// const wordWriteElement = wordWriteTemplateContent.cloneNode(true);

//блокировщик букв
const overlayStart = document.querySelector('.letters-overlay--type--start');
const overlayNewGame = document.querySelector('.letters-overlay--type--new-game');
const overlayNewGameText = document.querySelector('.letters-overlay__text');
const overlayBtnNewTopic = document.querySelector('.letters-overlay__btn--type--new-topic');
const overlayBtnProceed = document.querySelector('.letters-overlay__btn--type--proceed');


let selectedTopic = '';



//выбираем тему
topics.forEach(topic => {
    topic.addEventListener('click', () => {
        gallowsImg.forEach(img => {
            img.classList.remove('img-active');
        })

        word = arrayRandElement(askWord(topic.id, wordsTopic));
        selectedTopic = topic;

        renderWordFields(word, topic);

        // //почистили старые буквы выбора
        // const letterItems = document.querySelectorAll('.letter');
        // letterItems.forEach((item) => {
        //     item.remove();
        // })

        // //почистили старые буквы слова
        // const letterWordItems = document.querySelectorAll('.word-write__letter');
        // letterWordItems.forEach((item) => {
        //     item.remove();
        // })

        // for (const letter in word) {
        //     const wordWriteElement = wordWriteTemplateContent.cloneNode(true);
        //     addCard(wordWriteContainer, wordWriteElement);
        // }

        // overlayStart.classList.add('disabled');
        // selectedTopicBox.textContent = topic.textContent;

        // wordFields = document.querySelectorAll('.word-write__text');

        // receivingData(alphabet, lettersContainer);
    })
})


function renderWordFields(word, topic) {

    //почистили старые буквы выбора
    const letterItems = document.querySelectorAll('.letter');
    letterItems.forEach((item) => {
        item.remove();
    })

    //почистили старые буквы слова
    const letterWordItems = document.querySelectorAll('.word-write__letter');
    letterWordItems.forEach((item) => {
        item.remove();
    })

    for (const letter in word) {
        const wordWriteElement = wordWriteTemplateContent.cloneNode(true);
        addCard(wordWriteContainer, wordWriteElement);
    }

    overlayStart.classList.add('disabled');
    selectedTopicBox.textContent = topic.textContent;

    wordFields = document.querySelectorAll('.word-write__text');

    receivingData(alphabet, lettersContainer);

}







//рандомное слово из списка
function arrayRandElement(arr) {
    const rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
}

//задаем слово из темы
function askWord(topic, wordsTopic) {
    let words = [];

    for (const wordTopic in wordsTopic) {
        if (wordTopic === topic) {
            words = wordsTopic[wordTopic];
        }
    }

    return words
}


//определение индексов буквы
function searchLetters(letter, word) {
    let indices = [];

    let idx = word.indexOf(letter);
    while (idx !== -1) {
        indices.push(idx);
        idx = word.indexOf(letter, idx + 1);
    }

    return indices;
}



//обработчик для кнопок внутри карточек
function setEventListeners(letterElement) {

    const letterBox = letterElement.querySelector('.letter__text');
    const letter = letterBox.textContent;
    const ok = letterElement.querySelector('.letter__mark--type--ok');
    const error = letterElement.querySelector('.letter__mark--type--error');

    letterBox.addEventListener('click', () => {

        if (word.includes(letter)) {
            ok.classList.add('mark-active');

            const lettersIndex = searchLetters(letter, word);

            lettersIndex.forEach(index => {
                wordFields[index].textContent = letter;
                countRight += 1;
            })

            if (word.length === countRight) {
                overlayNewGame.classList.remove('disabled');
                overlayNewGameText.textContent = 'Вы победили';
                countRight = 0;
                count = 0;
            }

        } else {
            error.classList.add('mark-active');

            if (count < 7) {
                gallowsImg.forEach(img => {
                    gallowsImg[count].classList.add('img-active');
                })
                count += 1;
            }
            if (count === 7) {
                overlayNewGame.classList.remove('disabled');
                overlayNewGameText.textContent = 'Вы проиграли';
                countRight = 0;
                count = 0;

                wordFields.forEach((field, index) => {
                    wordFields[index].textContent = word[index];
                })
            }
        }
    })
}

//создание карточки
function renderCard(text) {
    const letterElement = letterTemplateContent.cloneNode(true);
    const letterTextElement = letterElement.querySelector('.letter__text');

    letterTextElement.textContent = text;

    setEventListeners(letterElement);

    return letterElement;
}



//добавление карточек в контейнер
function addCard(container, element) {
    container.appendChild(element);
}

//получение данных карточек
function receivingData(letters, container) {

    letters.forEach(letter => {
        const text = letter;

        const letterBox = renderCard(text);
        addCard(container, letterBox);
    })
}

receivingData(alphabet, lettersContainer);


overlayBtnNewTopic.addEventListener('click', () => {
    overlayStart.classList.remove('disabled');
    overlayNewGame.classList.add('disabled');
})

overlayBtnProceed.addEventListener('click', () => {
    word = arrayRandElement(askWord(selectedTopic.id, wordsTopic));
    renderWordFields(word, selectedTopic);
    overlayNewGame.classList.add('disabled');
    gallowsImg.forEach(img => {
        img.classList.remove('img-active');
    })
})