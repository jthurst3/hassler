// functions.js
// contains basic functions for the Automata Game
// J. Hassler Thurston
// 17 January 2014 (Adapted from Mathematica code written in June 2013)
// Please see README.md for a description of the game

var row, rows, columns, rules, score, rows_left, reveal, current_row, turn, human_player, computer_player, clickable_rules, clickable_squares;
var square_queue, invalid_squares, invalid_rule, game_over, human_color;

var initialize_vars = function(r, c, t) {
	turn = 0; // whose turn it is
	human_player = t; // whether the human player goes first or second
	computer_player = opposite(t); // the computer player is the other player
	row = 0; // the current row number
	rows = r; // the number of rows total
	columns = c; // the number of columns total
	current_row = initialize_row(c); // initialize the current row with half the chips for each player
	score = [0,0]; // initialize the score to be 0-0
	compute_score(current_row); // compute the score for the current (first) row
	rules = initialize_rules(); // initialize the automata rules
	rows_left = r-1; // the number of rows left to be revealed
	reveal = [2,2]; // the number of turns until each player must reveal a row
	if(human_player == 0) {
		clickable_squares = true;
		clickable_rules = true;
		human_color = "white";
	} else {
		clickable_squares = false;
		clickable_rules = false;
		human_color = "black";
	}
	square_queue = [];
	invalid_squares = []; // an array representing invalid squares to change (if the previous player just changed those squares)
	invalid_rule = -1; // a similar parameter for the invalid automata rules
	game_over = false; // the game has just begun.
};

// computes the score given the current row
var compute_score = function(current_row) {
	// reset the score
	score = [0,0];
	// count up the squares for each player
	for(var i = 0; i < current_row.length; i++) {
		score[current_row[i]]++;
	}
};

// initializes the first row of the board
var initialize_row = function(c) {
	// inspired by http://stackoverflow.com/questions/12987719/javascript-how-to-randomly-sample-items-without-replacement
	// we want to select the same number of 0s and 1s
	// initialize an array of positions
	var positions = [];
	for(var i = 0; i < c; i++) {
		positions.push(i);
	}
	// now set half of these values to randomly be "0s" by removing those values from the "positions" array
	for(var i = 0; i < c/2; i++) {
		// first pick a random position between 0 and (c-i)
		var random_index = Math.floor(Math.random()*(c-i));
		positions.splice(random_index, 1);
	}
	// finally, make the array of equal numbers of 0s and 1s
	var return_array = [];
	for(var i = 0; i < c; i++) {
		if(positions.indexOf(i) != -1)
			return_array[i] = 0;
		else return_array[i] = 1;
	}
	return return_array;
};

// initializes the four automata rules
var initialize_rules = function() {
	// call initialize_row with a parameter of 4
	var squares = initialize_row(4);
	return squares;
};

// calculates the next row of the board, based on the current state of the board (rules and current squares)
var calculate_next_row = function() {
	var next_row = [];
	// loop through the array of current squares, applying the correct automata rule to each pair
	for(var i = 0; i < columns; i++) {
		// get the relevant pair of squares (loops back around)
		var pair = [current_row[i], current_row[(i+1)%columns]];
		// apply the correct automata rule to these squares
		next_row.push(compute_rule(pair));
	}
	// update global parameters
	current_row = next_row;
	row++;
	rows_left--;
	check_game_over();
	compute_score(current_row);
};

// computes the correct next square given a pair of current squares
var compute_rule = function(pair) {
	// first, compute the correct automata replacement rule
	var automata_rule = 2*pair[0] + pair[1]; // we use a variant of Stephen Wolfram's numbering system for automata rules
	// finally, return the corresponding replacement
	return rules[automata_rule];
};

// changes the given rule
var change_rule = function(rule_number) {
	rules[rule_number] = opposite(rules[rule_number]);
	invalid_rule = rule_number;
};

// returns the opposite binary value
var opposite = function(binary_value) {
	return 1 - binary_value;
	// also could have done
	// return (binary_value+1)%2
};

// changes a set of squares
var change_squares = function(squares) {
	for(var i = 0; i < Math.min(squares.length, 5); i++) {
		current_row[squares[i]] = opposite(current_row[squares[i]]);
	}
	compute_score(current_row);
};

// computes a player's turn
// player is the player number (0 or 1)
// turn_type is a string representing what the player wants to do (either "reveal", "squares", or "rule")
// parameter is an extra parameter for calculations, if needed
// returns True if the turn was successful, False if something went wrong
var compute_turn = function(turn_type, parameter) {
	if(game_over) {
		console.log("The game is over.");
		return false;
	}
	if(turn_type == "reveal") {
		turn_reveal();
		return true;
	}
	else {
		// check to see if the player must reveal a row
		if(reveal[turn] == 0) {
			console.log("You must reveal the next row this turn.");
			return false;
		}
		// otherwise, continue
		if(turn_type == "squares") {
			// check if the player entered a valid number of squares to change
			if(parameter.length == 0 || parameter.length > 5) {
				console.log("Must change between 1 and 5 squares.");
				return false;
			}
			// check if the player entered valid square numbers to change
			if(!validNumbers(parameter)) {
				console.log("Some square numbers were invalid.");
				return false;
			}
			// if all this is good, change the given squares
			turn_squares(parameter);
			return true;
		}
		else if(turn_type == "rule") {
			// check if the player entered a valid rule number
			if(parameter < 0 || parameter > 3) {
				console.log("Rule number must be between 0 and 3");
				return false;
			}
			// if this is valid, change the given rule
			turn_rule(parameter);
			return true;
		}
		else {
			// player didn't enter a valid turn type
			console.log("Invalid turn type.");
			return false;
		}
	}
};

// function to call right before computing a move
var turn_preprocess = function(move_type) {
	if(move_type != "squares") {
		update_squares();
	}
	return true;
};
// function to call right after computing a move
var turn_postprocess = function(move_type, parameter) {
	if(move_type === "reveal") {
		show_next_row();
		reveal[turn] = 2;
		invalid_squares = [];
		invalid_rule = -1;
	} else if(move_type === "rule") {
		reveal[turn]--;
		invalid_squares = [];
		invalid_rule = parameter;
	} else if(move_type === "squares") {
		reveal[turn]--;
		invalid_squares = parameter;
		invalid_rule = -1;
	} else {
		// not a valid move
		console.log(move_type, " is not a valid type of move.");
		return false;
	}
	turn = opposite(turn); // update whose turn it is
	compute_clickable(); // compute the squares that can be changed
	square_queue = []; // re-initialize the square queue
	// update the squares and rules
	update_squares();
	update_rules();
	// update the headers
	update_score_header();
	update_turn_header();
	// make squares and rules clickable or not
	make_squares_clickable();
	make_rules_clickable();
	// see if we've finished the game
	if(rows_left == 0) {
		game_postprocess();
	}
	return true;
};

// function to call at the end of the game
var game_postprocess = function() {
	if(score[0]>score[1]) {
		// Player 1 won the game
		if(human_player == 0) {
			winning_message();
		} else {
			losing_message();
		}
	} else if(score[1]>score[0]) {
		// Player 2 won the game
		if(human_player == 1) {
			winning_message();
		} else {
			losing_message();
		}
	} else {
		// Game is tied
		tie_message();
	}
	start_game();
};
// the winning message
var winning_message = function() {
	alert("You just beat my computer program! Bet you can't beat it the next time around though...");
	return true;
}
// the losing message
var losing_message = function() {
	alert("You just lost to my computer program. Can you do better?");
	return true;
}
// message if the game is tied
var tie_message = function() {
	alert("The game is a draw. Can you do better?");
	return true;
}

// reveals a row
var turn_reveal = function() {
	turn_preprocess("reveal");
	calculate_next_row();
	turn_postprocess("reveal");
};
// changes a set of squares
var turn_squares = function(parameter) {
	turn_preprocess("squares");
	change_squares(parameter);
	turn_postprocess("squares", parameter);
};
// changes a rule
var turn_rule = function(parameter) {
	turn_preprocess("rule");
	change_rule(parameter);
	turn_postprocess("rule", parameter);
};

// checks to see if we can reveal turns or squares
var compute_clickable = function() {
	if(turn == human_player && reveal[human_player] > 0) {
		clickable_squares = true;
		clickable_rules = true;
	} else {
		clickable_squares = false;
		clickable_rules = false;
	}
};

// checks to see if a player entered valid square positions
var validNumbers = function(squares) {
	for(var i = 0; i < squares.length; i++) {
		if(squares[i] < 0 || squares[i] >= columns)
			return false;
	}
	return true;
};

// checks to see if the game is over
var check_game_over = function() {
	if(rows_left == 0) {
		game_over = true;
	}
	return true;
}






