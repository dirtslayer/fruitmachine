const PRIZE_AMOUNTS = [1, 5, 10, 50, 100];

    const NFRUITS = 5;
    const winning_indexs = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    const prizes = [0, 1, 2, 3, 4, 5];

function superspin() {
    var spin_outcome = 0;
    var numbers = new Array(9)
    for (var i = 0; i < numbers.length; i++) {
        numbers[i] = Math.floor(Math.random() * NFRUITS);
    }
    prizes[numbers[3]] + ' ' + prizes[numbers[4]] + ' ' + prizes[numbers[5]] + '\n' +
        prizes[numbers[6]] + ' ' + prizes[numbers[7]] + ' ' + prizes[numbers[8]];
    // win    
    winning_indexs.forEach(element => {

        if ((numbers[element[0]] == numbers[element[1]]) && (numbers[element[0]] == numbers[element[2]])) {
            //win
            spin_outcome += PRIZE_AMOUNTS[numbers[element[0]]];
        }
    });
    return spin_outcome;
}


function spin() {
    var spin_outcome = 0;
	var numbers = new Array(3)
	for (var i = 0; i < numbers.length; i++) {
		numbers[i] = Math.floor(Math.random() * NFRUITS);
	}
	if ((numbers[0] == numbers[1]) && (numbers[0] == numbers[2])) {
		//win
		spin_outcome +=  PRIZE_AMOUNTS[numbers[0]];
	} 
	return spin_outcome;
}

const nspins = 1000000;
var t1 = 0;
var t2 = 0;
s1 = 0;
m1 = 0;
for (x=0;x<nspins;x++) {
    s1 = superspin();
    if (s1>m1) m1 = s1;
    t1 += s1;
    t2 += spin();
}
console.log(t1/nspins);
console.log(m1);
console.log(t2/nspins);
