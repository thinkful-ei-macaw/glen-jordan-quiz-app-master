/* eslint-disable no-undef */
/* eslint-disable strict */
/**
 * Example store structure
 */

const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'What does wubba lubba dub dub mean?',
      answers: [
        'Please leave',
        "I'm a genius",
        "Let's Party",
        "I'm in great pain"
      ],
      correctAnswer: "I'm in great pain",
      imgUrl:
        'https://media1.giphy.com/media/wFbI8gwCfCxeo/giphy.gif?cid=790b7611dd0e3159809d12d9b3d4485a28d00299967efaa9&rid=giphy.gif'
    },
    {
      question: ' Name the song Rick uses to save the earth',
      answers: [
        'Rock Hortz',
        'Get Schwifty',
        'Do the Bingortz',
        'Stop, Drop, and Slitz'
      ],
      correctAnswer: 'Get Schwifty',
      imgUrl:
        'https://media1.giphy.com/media/tJqyalvo9ahykfykAj/giphy.gif?cid=790b7611dd0e3159809d12d9b3d4485a28d00299967efaa9&rid=giphy.gif'
    },
    {
      question: 'Which implement does Rick use to travel between dimensions?',
      answers: ['Rift Ray', 'Jump Laser', 'Interdimensional Ray', 'Portal Gun'],
      correctAnswer: 'Portal Gun',
      imgUrl: './Images/wrecked.gif'
    },
    {
      question:
        'Morty does accidentally have a child who is half alien. What species is his non-human half?',
      answers: ['Smarkian', 'Cromulan', 'Gazorpazorp', 'Gromflomite'],
      correctAnswer: 'Gazorpazorp'
    },
    {
      question: "What is Scary Terry's catchphrase?",
      answers: [
        "I'm your worst nightmare!",
        'Welcome to your nightmare, bitch!',
        'This is your nightmare!',
        "You can run, but you'll still die!"
      ],
      correctAnswer: 'Welcome to your nightmare, bitch!',
      imgUrl: './Images/pickle.gif'
    }
  ],
  correctOrNot: [
    { correct: 'GET SCHWIFTY!', incorrect: 'NOPE!' },

    { correct: 'THE RICKEST OF RICKS!', incorrect: 'HA HA NO...' },

    { correct: 'TURBULENT JUICE!', incorrect: 'THE GODS ARE LAUGHING AT YOU' },

    { correct: 'YOU GET REAL FAKE DOORS!', incorrect: 'NO EYEHOLES FOR YOU' },

    {
      correct: 'THE CITIDEL OF RICKS WELCOMES YOU!',
      incorrect: 'CONSPIRING WITH A ROGUE SUMMER I SEE...'
    }
  ],
  questionNumber: 0,
  score: 0,
  wrong: 0,
  num: 0,
  quizStart: false
};

//click event listener for renderQuestion function
function clickMe() {
  $('main').on('click', '#js-start-btn', function() {
    $(location).attr('href', renderQuestion);
  });
}

//FUNCTIONS FOR CURRENT QUESTION IN STORE OBJECT
function getCurrentQuestion() {
  const questionArr = store.questions;
  let currentQuestion = questionArr[store.questionNumber];
  return currentQuestion;
}

function renderQuestion() {
  let currentQuestion = getCurrentQuestion();
  let html = generateQuestion(currentQuestion);
  $('main').html(html);
}

function generateQuestion(question) {
  return `
  
  <header>
    <ul>
      <li>
          Question ${store.questionNumber + 1} of ${store.questions.length}
      </li> 
    <ul>
  </header>
  <img src=${question.imgUrl} />
  
  <section>${question.question}</section>
      <form>  
        ${question.answers
          .map((e, index) => {
            return `<input id="answer ${index}" name="questionDisplay" type="radio" value="${e}" required />
            <label id="btnAnswers" for="answer${index}">${e}</label>
            <br>`;
          })
          .join('')}
          <button type="submit" id="submit-button">Submit</button>     
      </form>`;
}

//RENDER WRONG ANSWER RESPONSE

function renderWrong() {
  let currentWrong = incorrectAnswer();
  let html = generateWrong(currentWrong);
  $('main').html(html);
}

function incorrectAnswer() {
  return store.correctOrNot[store.num].incorrect;
}

function generateWrong(input) {
  return `
  <section>
    <form>
        ${input}     
        <button type="button" id="next-question">Next</button>
    </form>
  </section>`;
}

//RENDER CORRECT ANSWER RESPONSE

function renderCorrect() {
  let currectCorrect = correctAnswer();
  let html = generateCorrect(currectCorrect);
  $('main').html(html);
}

function correctAnswer() {
  return store.correctOrNot[store.num].correct;
}

function generateCorrect(input) {
  return `
  <section>
    <form>
        ${input}
        <button type="button" id="next-question">Next</button>
    </form>
  </section>`;
}

function generateScore() {
  return `<div class='scoreDiv'>
      <p>Your current Score is ${store.score}</p>
      </div>`;
}

//RESET QUIZ TO BEGINNING
function resetQuiz() {
  const score = generateScore();
  $('main').html(`${score}<button id="goBack">Click Me</button>`);
  $('main').on('click', '#goBack', function() {
    store.questionNumber = 0;
    store.num = 0;
    renderFirstPage();
  });
}

function registerListeners() {
  $('main').on('submit', 'form', function(e) {
    e.preventDefault();
    let currentQuestion = getCurrentQuestion();
    let userAnswer = $('input:checked').val();

    if (userAnswer === currentQuestion.correctAnswer) {
      store.score += 1;
      $('main').append(renderCorrect());
    } else {
      store.wrong += 1;
      $('main').append(renderWrong());
    }

    store.num += 1;
    store.questionNumber += 1;

    $('#next-question').show();
  });

  $('main').on('click', '#next-question', function(e) {
    //make a button on the last page that is a listener
    e.preventDefault();

    if (store.questionNumber === store.questions.length) {
      resetQuiz();
    } else {
      renderQuestion();
    }
  });
}

function renderFirstPage() {
  $('main').html(`
  
  <header id="rick-intro">
  
  <h1>THE RICK AND MORTY QUIZ</h1>
  
  </header>

<div id="intro-page">

<img class="circle" src=./Images/dance.gif />

</div>

<div id="intro-info">
<h3>
It's time to do some Rick and Morty trivia and only the Rickest of Ricks will be able to pass.
</h3>
</div>

<div id="schwift">

<button id="js-start-btn">GET SCHWIFTY</button>

</div>

`);
}

function runQuiz() {
  registerListeners();
  renderFirstPage();
  clickMe();
}

$(runQuiz);

/**
 *
 * Your app should include a render() function, that regenerates
 * the view each time the store is updated. See your course
 * material, consult your instructor, and reference the slides
 * for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 */

// Used to add sibling elements to the
// function domElementMaker(element) {
//   const newElement = document.createElement(element);
//   document.body.appendChild(newElement);
//   return newElement;
// }
