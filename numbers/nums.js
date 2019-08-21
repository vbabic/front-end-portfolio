var a = ['', 'vienas', 'du', 'trys', 'keturi', 'penki', 'šeši', 'septyni', 'aštuoni', 'devyni', 'dešimt', 'venuolika', 'dvylika', 'trylika', 'keturiolika', 'penkiolika', 'šešiolika', 'septyniolika','aštuoniolika', 'devyniolika'];
var b = ['', '', 'dvidešimt', 'trisdešimt', 'keturiasdešimt', 'penkiasdešimt', 'šešiasdešimt', 'septyniasdešimt', 'aštuonesdešimt', 'devyniasdešimt'];
var c = ['šimtas', 'šimtai', 'tūkstantis', 'tūkstnčiai', 'tūkstančiu', 'milijonas', 'milijonai','milijonu', 'milijardas', 'milijardai','milijardu', 'trilijonas', 'trilijonai', 'trilijonu', 'kvitilijonas', 'kvintilijonai', 'kvintilijonu'];

	words = "";
function numberToWord(number)
{
	number = number.toString();
	if (number[0] == 0)
	{
		return numberToWord(number.substr(1));
	}
	triad = lastTriad(number);
	gap = triad.toString().length;
	is_one = isOne(triad);
	plural = undefined;
	if (gap == 1) {console.log(a[triad.toString()[0]]); words += " " + a[triad.toString()[0]]; }
	if (gap == 2)
	{
		if (triad.toString().substr(0) < 20)
		{
			console.log(a[triad.toString().substr(0)]);
			words += " " + a[triad.toString().substr(0)];
			plural = true;
		}
		else if (triad.toString().substr(0) > 20)
		{
			if (triad.toString()[1] != 0)
			{
				console.log(b[triad.toString()[0]] + " " + a[triad.toString()[1]]);
				words += " " + b[triad.toString()[0]] + " " + a[triad.toString()[1]];
			}
			else {console.log(b[triad.toString()[0]]);
				plural = true;
				words += " " + b[triad.toString()[0]];
				}
		}
	}
	if (gap == 3)
	{
		if (triad.toString()[0] == 1)
		{
			console.log(c[0]);
			words += " " + c[0];
		}
		else
		{
			console.log(a[triad.toString()[0]] + " " +  c[1]);
			words += " " + a[triad.toString()[0]] + " " +  c[1];
		}
		if (triad.toString().substr(1) == 0)
		{
			plural = true;
		}
		else if (triad.toString().substr(1) == 01)
		{
			console.log(a[1]);
			words += " " + a[1];
			plural = false;
			is_one = true;
		}

		else if (triad.toString().substr(1) < 10)
		{
			console.log(a[triad.toString()[2]]);
			words += " " + a[triad.toString()[2]];
		}
		else if (triad.toString().substr(1) <20 )
		{
			console.log(a[triad.toString().substr(1)]);
			words += " " + a[triad.toString().substr(1)];
			plural = true;
		}
		else if (triad.toString().substr(1) > 19)
		{
			if (triad.toString()[2] != 0)
			{
				if (triad.toString()[2] == 1) {is_one=true;}
				if (triad.toString()[2] == 1) {is_one}
				console.log(b[triad.toString()[1]] + " " + a[triad.toString()[2]]);
				words += " " + b[triad.toString()[1]] + " " + a[triad.toString()[2]];
			}
			else {console.log(b[triad.toString()[1]]);
			words += " " + b[triad.toString()[1]];
					plural = true;
			}
		}

	}
	if (number.length < 4) { return }
	if (number.length <7)
	{
		if (plural)
		{
			console.log (c[4]);
			words += " " + c[4];
		} else {
			if(is_one)
			{
				console.log (c[2]);
				words += " " + c[2];
			} else
			{
				console.log(c[3]);
				words += " " + c[3];

			}
		}
		return numberToWord(number.substr(gap));
	}

	else if (number.length <10)
	{
		if (plural)
		{
			console.log (c[7]);
			words += " " + c[7];
		} else {
			if(is_one)
			{
				console.log (c[5]);
				words += " " + c[5];
			} else
			{
				console.log(c[6]);
				words += " " + c[6];
			}
		}
		return numberToWord(number.substr(gap));
	}
	else if (number.length <13)
	{
		if (plural)
		{
			console.log (c[10]);
			words += " " + c[10];
		} else {
			if(is_one)
			{
				console.log (c[8]);
				words += " " + c[8];
			} else
			{
				console.log(c[9]);
				words += " " + c[9];
			}
		}
		return numberToWord(number.substr(gap));
	}
	else if (number.length <16)
	{
		if (plural)
		{
			console.log (c[13]);
			words += " " + c[13];
		} else {
			if(is_one)
			{
				console.log (c[11]);
				words += " " + c[11];
			} else
			{
				console.log(c[12]);
				words += " " + c[12];
			}
		}
		return numberToWord(number.substr(gap));
	}
	else if (number.length <19)
	{
		if (plural)
		{
			console.log (c[16]);
				words += " " + c[16];
			} else {
			if(is_one)
			{
				console.log (c[14]);
				words += " " + c[14];
			} else
			{
				console.log(c[15]);
				words += " " + c[15];
			}
		}
		return numberToWord(number.substr(gap));
	}
}
function lastTriad (n) {
        if(n.length > 3)
		{
         return lastTriad(n.substr(0, n.length-3));
		}else {return n; }
}
function isOne(triad)
	{
		if (gap == 1 && triad.toString()[0] == 1)
		{
			return true;
		}
		return false;
	}

function takeNumber()
{
	let number = document.getElementById('number');
	let paragraph = document.getElementById('text');
	let history = document.getElementById('history');
	numberToWord(number.value);
	history.innerHTML += "<br> <strong>"+number.value + "</strong> - " +words;
	paragraph.innerHTML = words;
	words = "";
}

