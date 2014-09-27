// modified from http://www.w3schools.com/js/js_form_validation.asp 
// and http://webcheatsheet.com/javascript/form_validation.php#username
function validateGame(prefix) {
	// check for blank inputs
	var columns = document.getElementById(prefix + "columns").value;
	var rows = document.getElementById(prefix + "rows").value;
	var moves = document.getElementById(prefix + "moves").value;
	var turn_elements = document.getElementsByName(prefix + "turn");
	var turn;
	var values = [columns, rows, moves];
	var valueNames = ["number of columns", "number of rows", "moves"];
	for(var i = 0; i < values.length; i++) {
		if(values[i] === null || values[i] === "") {
			alert("Game must specify " + valueNames[i]);
			return false;
		}
	}
	columns = parseInt(columns, 10);
	rows = parseInt(rows, 10);
	if(columns < 4 || columns > 15) {
		alert("Must have between 4 and 15 columns.");
		return false;
	}
	if(rows < 4 || rows > 15) {
		alert("Must have between 4 and 15 rows.");
		return false;
	}
	if(!turn_elements[0].checked && !turn_elements[1].checked) {
		alert("Please pick whether you want to go first or second.");
		return false;
	}
	return true;
}

function validate_create() {
	var prefix = "newgame_";
	var columns = document.getElementById(prefix + "columns").value;
	var rows = document.getElementById(prefix + "rows").value;
	var turn_elements = document.getElementsByName(prefix + "turn");
	var isValidated = validateGame(prefix);
	if(isValidated) {
		// get the turn number (if the game is validated, one radio button must be checked.)
		if(turn_elements[0].checked)
			turn = 1;
		else turn = 2;
		// create the game
		create_game(columns, rows, turn);
		return false;
	}
	else {
		return false;
	}
}