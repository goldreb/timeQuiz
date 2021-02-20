
  
highScoreEl = document.querySelector('#highscore') || [];

function getHighscores() {
    
    // create highscore chart
    var scoreTitleEl = document.createElement('h2');
    scoreTitleEl.textContent = 'High Scores';
    highScoreEl.appendChild(scoreTitleEl);

    var highScoreListEl = document.createElement('ol');
    highScoreListEl.className = 'highscores';
    highScoreEl.appendChild(highScoreListEl);
    buttonDivEl = document.createElement('div');
    buttonDivEl.className = 'buttons';
    goBackBtnEl = document.createElement('button');
    goBackBtnEl.setAttribute('id', 'home');
    goBackBtnEl.className = 'btn high';
    goBackBtnEl.textContent = 'Go Back';
    buttonDivEl.appendChild(goBackBtnEl);
    clearScoresBtnEl = document.createElement('button');
    clearScoresBtnEl.setAttribute('id', 'clear');
    clearScoresBtnEl.className = 'btn high';
    clearScoresBtnEl.textContent = 'Clear High Scores';
    buttonDivEl.appendChild(clearScoresBtnEl);
    highScoreEl.appendChild(buttonDivEl);

   

    // pull highscores
    var highscores = JSON.parse(window.localStorage.getItem('highscores'));
  
    // compare scores and sort highest to lowest
    highscores.sort(function(a, b) {
        return b.score - a.score;
    });
  
    highscores.forEach(function(score) {
        // create highscore list
        var scoreItemEl = document.createElement('li');
        scoreItemEl.textContent = score.initials + ' - ' + score.score;
        highScoreListEl.appendChild(scoreItemEl);
       
      
    });
};

// clear scores
function clearHighscores() {

    window.localStorage.removeItem('highscores');
    window.location.reload();
};

// return to quiz
function returnHome(event) {
 event.preventDefault()
    window.location.href = "index.html";
    window.location.reload();
    
    
};
  
getHighscores();
document.getElementById('home').onclick = returnHome;

document.getElementById('clear').onclick = clearHighscores;


