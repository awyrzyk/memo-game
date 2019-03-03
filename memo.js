var startButton = document.getElementById("start"),
	timeleft = document.getElementById("time-left"),
	resetButton = document.getElementById("reset"),
	secsLeft = document.getElementById("secs-left"),
	question = document.getElementById("question"),
	scores = document.getElementById("score"),
	timer = document.getElementById("timer"),
	cards = document.querySelectorAll(".card"),
	timeUnit = document.getElementById("timeUnit"),
	turnCounter = document.getElementById("turnCounter"),
	numbers = generateRandomNumbers(12),
	number = numbers[Math.floor(Math.random()*numbers.length)],
	score=0,
	seconds=15,
	turn=0,
	handlers =[];

turnCounter.innerHTML="Turn counter: "+turn;
scores.innerHTML="| Score: "+score;
startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", resetGame);

function startGame(){
	startTimer();
	cardReveal();
}

function startTimer(){
	begin = setInterval(countdown, 1000); 
	startButton.removeEventListener("click", startGame);
	turn++;
	turnCounter.innerHTML="Turn counter: "+turn;
}

function cardReveal(){
	for (var i=0; i<cards.length; i++){
	cards[i].textContent = numbers[i];
	cards[i].style.backgroundColor = "#000000";
	}
}

function countdown(){
	timeleft.innerHTML="Time left: ";
    secsLeft.innerHTML=seconds;
	timeUnit.innerHTML="s";
    seconds--;
    if(secsLeft.innerHTML<=0){
		window.clearInterval(begin);
		timeleft.innerHTML="";
		timeUnit.innerHTML="";
		secsLeft.innerHTML="time is over";
		for (var i=0; i<cards.length; i++){
			cards[i].textContent="?";
			cards[i].style.backgroundColor = "gray";
		}
		question.innerHTML="Where was the "+number+" number?";
		cards.forEach(function(button, index){
			handlers.push(function(){ 
			checkNumber(index);
			});
			button.addEventListener("click", handlers[index]);
		});
	}
};

function checkNumber(x){
	if (numbers[x]==number){
		var audio = new Audio('audio.wav');
        audio.play(); 
		score++;
		scores.innerHTML="| Score: "+score;
		startButton.innerHTML = "Next turn?";
		cards[x].textContent=numbers[x];
		cards.forEach(function(d, index){
			if (d.textContent != number){
			d.style.backgroundColor="red";
			}
			else{
				d.style.backgroundColor="green";
			}
			showNumbers();
			d.removeEventListener("click", handlers[index]);
		})
		startButton.addEventListener("click", nextTurn);
	}else{
		var wrong = new Audio('wrong.wav');
        wrong.play(); 
		cards[x].textContent=numbers[x];
		cards.forEach(function(d, index){
			if (d.textContent != number){
			d.style.backgroundColor="red";
			}
			else{
				d.style.backgroundColor="green";
			}
			showNumbers();
			d.removeEventListener("click", handlers[index]);
			question.innerHTML="GAME OVER";
		})
		}
}

function showNumbers(){
	for (var i=0; i<cards.length; i++){
		cards[i].textContent=numbers[i];
	}
}

function generateRandomNumbers(amount){
	var numbers=[];
	var number;
	for (var i=0; i<amount; i++){
		do {
		number=(Math.floor(Math.random()*100));
		}
		while (isRepeated(numbers, number));
		numbers.push(number);
	}
	return numbers;
}

function isRepeated(arr, number){
	for (var j=0; j<arr.length; j++){
		if (arr[j]==number){
		return true;
		}
	}
	return false;
}

function nextTurn(){
	seconds=15;
	startButton.removeEventListener("click", nextTurn);
	cards.forEach(function(d){
			d.classList.remove("green");
			d.classList.remove("red");
	})
	numbers = generateRandomNumbers(12);
	number = numbers[Math.floor(Math.random()*numbers.length)];
	startGame();
	question.innerHTML="";
	timeleft.innerHTML="Time left: ";
	secsLeft.innerHTML="";
}

function resetGame(){
	startButton.innerHTML="New game";
	turn=0;
	turnCounter.innerHTML="Turn counter: "+turn;
	score=0;
	scores.innerHTML="| Score: "+score;
	numbers = generateRandomNumbers(12);
	number = numbers[Math.floor(Math.random()*numbers.length)];
	for (var i=0; i<cards.length; i++){
			cards[i].textContent="?";
			cards[i].style.backgroundColor = "gray";
	}
	window.clearInterval(begin);
	seconds=15;
	timeleft.innerHTML="";
	timeUnit.innerHTML="";
	secsLeft.innerHTML="";
	question.innerHTML="";
	cards.forEach(function(d, index){
		d.removeEventListener("click", handlers[index]);
	});
	startButton.addEventListener("click", startGame);
}




