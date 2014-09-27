// modified from http://www.w3schools.com/js/js_form_validation.asp 
// and http://webcheatsheet.com/javascript/form_validation.php#username
function validateGame(prefix) {
	// check for blank inputs
	var columns = document.getElementById(prefix + "columns").value;
	var rows = document.getElementById(prefix + "rows").value;
	var turn_elements = document.getElementsByName(prefix + "turn");
	var turn_clicked;
	var values = [columns, rows];
	var valueNames = ["number of columns", "number of rows"];
	for(var i = 0; i < values.length; i++) {
		if(values[i] == null || values[i] == "") {
			alert("Game must specify " + valueNames[i]);
			return false;
		}
	}
	columns = parseInt(columns);
	rows = parseInt(rows);
	// make sure number of columns is even
	if(columns % 2 != 0) {
		alert("Must have an even number of columns.");
		return false;
	}
	if(columns < 10 || columns > 30) {
		alert("Must have between 10 and 30 columns.");
		return false;
	}
	if(rows < 10 || rows > 30) {
		alert("Must have between 10 and 30 rows.");
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
			turn_clicked = 0;
		else turn_clicked = 1;
		// create the game
		console.log("turn ", turn_clicked);
		create_game(columns, rows, turn_clicked);
		return false;
	}
	else {
		return false;
	}
}