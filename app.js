/* eslint-disable no-undef */
/* eslint-disable strict */
/**
 * Example store structure
 */

//Display score along side question number
//show correct answer if you get it wrong

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
      realAnswer: "Wubba Lubba Dub-Dub is Rick's catchphrase, which he recurrently uses in the show, mostly in season one. He uses this phrase every time he's happy or makes a joke. Birdperson said 'wubba lubba dub dub' means 'I am in great pain'.",
      imgUrl: './Images/dance.gif',
      questionImg: './Images/happy.gif'
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
      realAnswer: "In desperation, Rick and Morty compose and perform the song 'Get Schwifty'. The head is pleased and transports the entire Earth to an intergalactic musical competition, viewed by more Cromulons, where the losers' planets are obliterated.",
      imgUrl: './Images/schwifty.gif',
      questionImg: './Images/happy.gif'
    },
    {
      question: 'Which implement does Rick use to travel between dimensions?',
      answers: ['Rift Ray', 'Jump Laser', 'Interdimensional Ray', 'Portal Gun'],
      correctAnswer: 'Portal Gun',
      realAnswer: "With this gadget Rick can travel not only to other places in the known universe, but also to other dimensions. It is highly coveted by the Galactic Federation, as the inter-dimensional travel seems to be a feature that only Rick's portal gun possesses.",
      imgUrl: './Images/portal.gif',
      questionImg: './Images/happy.gif'
    },
    {
      question:
        'Morty does accidentally have a child who is half alien. What species is his non-human half?',
      answers: ['Smarkian', 'Cromulan', 'Gazorpazorp', 'Gromflomite'],
      correctAnswer: 'Gazorpazorp',
      realAnswer: "Gazorpians are a species of large humanoid aliens living on Gazorpazorp. Their species is divided into upper class and lower class by genders.",
      imgUrl: './Images/Gazorpazorp.gif',
      questionImg: './Images/happy.gif'
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
      realAnswer: "He is known for saying 'bitch' at the end of almost every sentence. After Scary Terry spots Rick Sanchez and Morty Smith, Rick aptly describes him as a 'legally-safe knockoff of an '80s horror character with miniature swords for fingers instead of knives'.",
      imgUrl: './Images/terry.gif',
      questionImg: './Images/happy.gif'
    }
  ],
  correctOrNot: [
    { correct: 'CORRECT!!', incorrect: 'INCORRECT!'},

    { correct: 'THAT IS CORRECT!!', incorrect: 'TOTALLY WRONG!' },

    { correct: 'YOU ARE RIGHT!!', incorrect: 'NOT THE RIGHT ANSWER!' },

    { correct: 'YOU GOT IT!!', incorrect: 'NOPE!' },

    {
      correct: 'YOU CHOSE WISELY!',
      incorrect: 'INCORRECT YOU!'
    }
  ],
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
  let currentQuestion = questionArr[store.num];
  return currentQuestion;
}

function renderQuestion() {
  let currentQuestion = getCurrentQuestion();
  let html = generateQuestion(currentQuestion);
  $('main').html(html);
}

function generateQuestion(question) {
  return `
  <div class="outer-box-question">
  <div class="inner-box-question">
  <header class="question-score-list">
    <ul>
      <li>
          Question ${store.num + 1} of ${store.questions.length} /
      </li> 
      <li>
          Your Current Score is ${store.score}
      </li>
    <ul>
  </header>
  <section class="question-list">${question.question}</section>
    <img class="question-circle-img"
      src =${
        store.questions[store.num].questionImg
      } alt="A Rick gif displayed on question"/>
      <form class="question-list-form">  
        ${question.answers
          .map((e, index) => {
            return `<input id="answer ${index}" name="questionDisplay" type="radio" value="${e}" required />
            <label id="btn-answers" for="answer${index}">${e}</label>
            <br>`;
          })
          .join('')}
          <button type="submit" id="submit-button-list">SUBMIT</button>
      </form>
   
      </div>
      </div>`;
}

//RENDER WRONG ANSWER RESPONSE

function renderWrong(answer) {
  let html = generateWrong(answer);
  $('main').html(html);
}

function generateWrong(input) {
  let currentWrong = store.correctOrNot[store.num].incorrect;
  return `
  <div class="outer-box-answers">
  <section class="inner-box-answers">
    <form>
        <h1>${currentWrong}</h1> 
        <p>You chose "${input}"</p> 
        <p>The correct answer was "${store.questions[store.num].correctAnswer}"</p>
        <p>
          "${store.questions[store.num].realAnswer}"
        </p>
        <button type="button" id="next-question">Next</button>
    </form>
  </section>
  </div>`;
}

//RENDER CORRECT ANSWER RESPONSE

function renderCorrect() {
  let html = generateCorrect();
  $('main').html(html);
}

function generateCorrect() {
  let currentCorrect = store.correctOrNot[store.num].correct;
  return `
  <div class="outer-box-answers">
  <section class="inner-box-answers">
    <form>
      <h1>${currentCorrect}</h1>
      <img id="correct-img" src=${store.questions[store.num].imgUrl} />
      <p id="you-are-correct">That was correct</p>
      <button type="button" id="next-question">Next</button>
    </form>
  </section>
  </div>`;
}

function generateScore() {
  if (store.score === 0) {
    return `<div class='outer-score-div'>
    <div class='inner-score-div'>
    <p>Your current Score is ${store.score}</p> 
    <p>YOU GOT NONE OF THEM RIGHT!!</p>
    </div>
    </div>`;
  } else if (store.score > 0 && store.score < store.questions.length) {
    return `<div class='outer-score-div'>
    <div class='inner-score-div'>
    <p>Your current Score is ${store.score}<p> 
    <p>Not too bad, but you can do better!</p>
    </div>
    </div>`;
  } else if (store.score === store.questions.length) {
    return `<div class='outer-score-div'>
    <div class='inner-score-div'>
    <p>Your current Score is ${store.score}</p>
    <p>YOU ARE THE RICKEST OF RICKS!</p>
    </div>
    </div>`;
  }
}

//FINAL PAGE DISPLAY FUNCTIONS

//RESET QUIZ TO BEGINNING
function resetQuiz() {
  const score = generateScore();
  $('main').html(`${score}
  <div id="go-back-btn">
  <button id="goBack">Click Me</button>
  </div>`);
  $('main').on('click', '#goBack', function() {
    store.num = 0;
    store.score = 0;
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
      $('main').append(renderWrong(userAnswer));
    }

    store.num += 1;

    $('#next-question').show();
  });

  $('main').on('click', '#next-question', function(e) {
    //make a button on the last page that is a listener
    e.preventDefault();

    if (store.num === store.questions.length) {
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
  <div id="intro-info">
        <h2> The Best Rick and Morty quiz ever </h2>
        <h3>
        <p>It's time to do some Rick and Morty trivia!</p>
        <p>ONLY the Rickest of Ricks will be able to pass.</p>
    </h3>
    <div id = "schwift">
      <button id = "js-start-btn">LET'S GO!</button> 
    </div>
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
