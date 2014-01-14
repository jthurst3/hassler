// modified from http://www.w3schools.com/js/js_form_validation.asp 
// and http://webcheatsheet.com/javascript/form_validation.php#username
function validateGame(prefix) {
	// check for blank inputs
	var columns = document.getElementById(prefix + "columns").value;
	var rows = document.getElementById(prefix + "rows").value;
	var moves = document.getElementById(prefix + "moves").value;
	var values = [columns, rows, moves];
	var valueNames = ["number of columns", "number of rows", "moves"];
	for(var i = 0; i < values.length; i++) {
		if(values[i] == null || values[i] == "") {
			alert("Game must specify " + valueNames[i]);
			return false;
		}
	}
	columns = parseInt(columns);
	rows = parseInt(rows);
	if(columns < 4 || columns > 15) {
		alert("Must have between 4 and 15 columns.");
		return false;
	}
	if(rows < 4 || rows > 15) {
		alert("Must have between 4 and 15 rows.");
		return false;
	}
	return true;
}

function validate_create() {
	var prefix = "newgame_";
	var columns = document.getElementById(prefix + "columns").value;
	var rows = document.getElementById(prefix + "rows").value;
	var isValidated = validateGame(prefix);
	if(isValidated) {
		create_game(columns, rows);
		return false;
	}
	else {
		return false;
	}
}