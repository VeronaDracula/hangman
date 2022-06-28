import {
    wordsTopic,
    alphabet
} from './utils.js';


let word = 'ПАСТА';


const overlay = document.querySelector('.letters-overlay');

let wordFields = document.querySelectorAll('.word-write__text');
const gallowsImg = document.querySelectorAll('.hangman-img');
let count = 0;


const lettersContainer = document.querySelector('.letters');
const wordWriteContainer = document.querySelector('.word-write');

const letterTemplateContent = document.querySelector('.letter-template').content;
const wordWriteTemplateContent = document.querySelector('.word-write-template').content;




const topics = document.querySelectorAll('.topic__item');


topics.forEach(topic => {
    topic.addEventListener('click', () => {

        word = arrayRandElement(askWord(topic.id, wordsTopic));


        //почистили старые
        const letterItems = document.querySelectorAll('.letter');
        letterItems.forEach((item) => {
            item.remove();
        })


        for (const letter in word) {
            const wordWriteElement = wordWriteTemplateContent.cloneNode(true);
            addCard(wordWriteContainer, wordWriteElement);
        }

        // let wordLength = 0;
        // while (wordLength < word.length) {
        //     const wordWriteElement = wordWriteTemplateContent.cloneNode(true);
        //     addCard(wordWriteContainer, wordWriteElement);
        //     wordLength++;
        //     console.log(wordLength)
        // }


        wordFields = document.querySelectorAll('.word-write__text');

        receivingData(alphabet, lettersContainer);
    })
})


function arrayRandElement(arr) {
    const rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
}


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
            })

        } else {
            error.classList.add('mark-active');

            if (count < 7) {
                gallowsImg.forEach(img => {
                    gallowsImg[count].classList.add('img-active');
                })
                count += 1;
            }
            if (count === 7) {
                overlay.classList.remove('disabled');
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