  const holes = document.querySelectorAll('.hole');
  const scoreBoard = document.querySelector('.score');
  const moles = document.querySelectorAll('.mole');
  let lastHole;
  let timeUp = false;
  let score = 0;

  function randomTime(min, max) {
  	return Math.round(Math.random() * (max - min) + min);
  }

  function randomHoles(holes) {
  	//console.log(holes.length);
  	const idx = Math.floor(Math.random() * holes.length);
  	const hole = holes[idx];
  	if(lastHole === hole) {
  		console.log('What the fuck!');
  		return randomHoles(holes);
  	}
  	//console.log(hole);
  	lastHole = hole;
  	return hole;
  }

  function pop() {
  	const time = randomTime(200, 1000);
  	const hole = randomHoles(holes);
  	//console.log(time, hole);
  	hole.classList.add('up');
  	setTimeout(() => {
  		hole.classList.remove('up');
  		if(!timeUp) pop();
  	}, time);
  }

  function startGame() {
  	scoreBoard.textContent = 0;
  	timeUp = false;
  	score = 0;
  	pop();
  	setTimeout(() => {
  		timeUp = true;
  	}, 12000)
  }

  function bonk(e) {
  	console.log(e);
    if(!e.isTrusted) return; // cheater!
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
  }

  moles.forEach(mole => mole.addEventListener('click', bonk));
