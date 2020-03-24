'use strict';

const boxs = document.querySelectorAll('.box');
const reset = document.querySelector('.reset')

let turn = 'player1';
let result = false;
let tateti1 = [1, 2, 3];
let tateti2 = [4, 5, 6];
let tateti3 = [7, 8, 9];
let tateti4 = [1, 4, 7];
let tateti5 = [2, 5, 8];
let tateti6 = [3, 6, 9];
let tateti7 = [1, 5, 9];
let tateti8 = [1, 5, 9];
let tateti9 = [3, 5, 7];
let tateti = [tateti1, tateti2, tateti3, tateti4, tateti5, tateti6, tateti7, tateti8, tateti9];
let player1 = 'Mechell',
	player2 = 'Solange',
	winner,
	winnerPlace;

function whoseTurn(box) {
	if (turn === 'player1') {
		box.classList.remove('player2');
		box.classList.add('player1');
		turn = 'player2';
	} else {
		box.classList.remove('player1');
		box.classList.add('player2');
		turn = 'player1';
	}
}

reset.addEventListener('click', () => {
	turn = 'player1';
	result = false;
	winner = null;
	winnerPlace = null;
	boxs.forEach(e => e.classList.remove('player1', 'player2'));
	boxs.forEach(e => e.classList.remove('disabled', 'winner'));
	boxs.forEach(e => e.innerHTML = '');
})

boxs.forEach(box => {
	box.addEventListener('click', () => {
		whoseTurn(box);
		if (wasTateti()) {
			console.log(winner);
			console.log(tateti[winnerPlace]);
			boxs.forEach(e => e.classList.remove('player1', 'player2'));
			boxs.forEach(e => e.classList.add('disabled'));
			tateti[winnerPlace].forEach(i => {
				boxs[i - 1].classList.add('winner')
				boxs[i - 1].innerHTML = '<i class="far fa-smile-wink"></i>';
			});
		}
	});
});

function wasTateti() {
	let playsP1 = [],
		playsP2 = [];
	boxs.forEach((box, index) => {
		if (box.classList.contains('player1')) {
			playsP1.push(index + 1);
		} else if (box.classList.contains('player2')) {
			playsP2.push(index + 1);
		}
	});

	for (let j = 0; j < 2; j++) {
		for (let i = 0; i < 9; i++) {
			result = tateti[i].every(val => (playsP1.indexOf(val) === -1 ? false : true));
			if (result) {
				winner = player1;
				winnerPlace = i;
				return true;
			}
		}
	}

	for (let i = 0; i < 9; i++) {
		result = tateti[i].every(val => (playsP2.indexOf(val) === -1 ? false : true));
		if (result) {
			winner = player2;
			winnerPlace = i;
			return true;
		}
	}

	return false;
}
