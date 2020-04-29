/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var activePlayer = 1;


var dice,prevdice;
var current_score;

var winningScore = 20;


newgame();




function update(){
	prevdice = dice;
	dice = Math.floor(Math.random()*6)+1;
	document.querySelector('.dice').src = "dice-"+dice+".png";
	if(dice===6 && prevdice === 6){
		document.querySelector("#current-" + activePlayer).textContent = 0;
		document.querySelector('#score-'+activePlayer).textContent = 0;
		document.querySelector(".player-"+activePlayer+"-panel").classList.remove('active');
		activePlayer = (activePlayer + 1)%2;
		prevdice = 0;
		document.querySelector(".player-"+activePlayer+"-panel").classList.add('active');

	}
	else if(dice===1){
		document.querySelector("#current-" + activePlayer).textContent = 0;
		document.querySelector(".player-"+activePlayer+"-panel").classList.remove('active');
		activePlayer = (activePlayer + 1)%2;
		prevdice = 0;
		document.querySelector(".player-"+activePlayer+"-panel").classList.add('active');
		
	}
	else {
	current_score = Number(document.querySelector("#current-" + activePlayer).textContent);
	current_score += dice;
	document.querySelector("#current-" + activePlayer).textContent = current_score;
	}
}


function hold_update(){
	current_score = Number(document.querySelector("#current-" + activePlayer).textContent);
	total_score = Number(document.querySelector("#score-"+activePlayer).textContent);
	total_score += current_score;
	document.querySelector("#score-"+activePlayer).textContent = total_score;
	document.querySelector("#current-"+activePlayer).textContent = 0;
	if(total_score >= winningScore){
		document.querySelector('#name-'+activePlayer).textContent = 'winner';
		document.querySelector(".player-"+activePlayer+"-panel").classList.remove('active');
		document.querySelector('.btn-roll').style.display = 'none';
		document.querySelector('.btn-hold').style.display = 'none';
		document.querySelector('.dice').style.display = 'none';
		return;
	}
	document.querySelector(".player-"+activePlayer+"-panel").classList.remove('active');
	activePlayer = (activePlayer + 1)%2;
	prevdice = 0;
	document.querySelector(".player-"+activePlayer+"-panel").classList.add('active');

}

document.querySelector(".btn-roll").addEventListener('click',update);
document.querySelector('.btn-hold').addEventListener('click',hold_update);

/*document.querySelector(".btn-hold").addEventListener('click',function(){
	//anonymous function (function without a name)
	current_score = Number(document.querySelector("#current-" + activePlayer).textContent);
	total_score = Number(document.querySelector("#score-"+activePlayer).textContent);
	total_score += current_score;
	document.querySelector("#score-"+activePlayer).textContent = total_score;
	document.querySelector("#current-"+activePlayer).textContent = 0;
	if(total_score >= 20){
		document.querySelector('#name-'+activePlayer).textContent = 'winner';
		document.querySelector(".player-"+activePlayer+"-panel").classList.remove('active');
		document.querySelector('.btn-roll').style.display = 'none';
		document.querySelector('.btn-hold').style.display = 'none';
		return;
	}
	document.querySelector(".player-"+activePlayer+"-panel").classList.remove('active');
	activePlayer = (activePlayer + 1)%2;
	document.querySelector(".player-"+activePlayer+"-panel").classList.add('active');
});
*/


document.querySelector('.btn-new').addEventListener('click',newgame);
function newgame(){
	document.querySelector(".player-0-panel").classList.add('active');
	document.querySelector(".player-1-panel").classList.remove('active');

	document.querySelector('#name-0').textContent = 'Player 1';
	document.querySelector('#name-1').textContent = 'Player 2';
	activePlayer = 0;
	current_score = 0;
	dice = 1;
	var temp = document.querySelector('#winscore').value;
	if (Number(temp) > 1) winningScore = Number(temp);
	alert(winningScore);

	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent='0';
	document.getElementById('current-1').textContent='0';
	document.querySelector('.btn-roll').style.display = 'block';
	document.querySelector('.btn-hold').style.display = 'block';
	document.querySelector('.dice').style.display = 'block';
	
}
