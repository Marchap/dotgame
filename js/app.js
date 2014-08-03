var DotGame = Ember.Application.create();

DotGame.Router.map(function() {
	//routes..if we need them
	this.route('settings', {path: '/settings'})
});

DotGame.IndexRoute = Ember.Route.extend({
	model: function() {
		return DotGame.IndexModel.create({});
	}

});
DotGame.IndexController = Ember.Controller.extend({
	availableSelections: Em.Object.create({firstSelectionMade: false, selections: Em.A(), prevChoice: null}),
	actions: {
		selectDot: function(square, corner) {
			var checked = square.get(corner).get('checked'),
				availableSelections = this.get('availableSelections'),
				selections = availableSelections.get('selections'),
				map = this.get('model.map'),
				index = square.get('index'),
				selectionValid = false;
			if (!checked && availableSelections.get('firstSelectionMade')) {
				selections.forEach(function(selection) {
					if(square[corner] === selection) {
						selectionValid = true;
					}
				});
				if (selectionValid) {

				}
			}
			else if (!checked && !availableSelections.get('firstSelectionMade')) {
				square.get('corner').set('checked', true);
				availableSelections.set('firstSelectionMade', true);
				upper = map[index-6][corner];
				lower = map[index+6][corner];
				left = map[index-1][corner];
				right = map[index+1][corner];
				this._isValidMove(square, corner, upper, "upper") ? selections.push(upper); 
				this._isValidMove(square, corner, lower, "lower") ? selections.push(lower); 
				this._isValidMove(square, corner, left, "left") ? selections.push(left); 
				this._isValidMove(square, corner, right, "right") ? selections.push(right); 
				availableSelections.set('prevChoice', square[corner]);
			} else {
				square.get('corner').set('checked', false);
				this.set('availableSelections', Em.Object.create({firstSelectionMade: false, selections: Em.A(), prevChoice: null }) );
			}
		},
		_isValidMove: function(square, corner, possibleChoice, relativePos) {
			var prevChoice = this.get('availableSelections.prevChoice'),
				map = this.get('model.map');
			if (possibleChoice) {
				switch (corner) {
					case "NE": 
					if (relativePos === "left" && square["top"] || relativePos === "lower" && square["right"]){
						return false;
					}
					else if (relativePos === "right" || relativePos === "upper") {
						return this._outerSquareValidation(square, corner, relativePos);
					}
					else {
						return true;
					}
					case "NW":
					 if (relativePos === "right" && square["top"] || relativePos === "lower" && square["left"]) {
					 	return false;
					 }
					 else if (relativePos === "upper" || relativePos == "left") {
					 	return this._outerSquareValidation( square, corner, relativePos);
					 }
					 else {
					 	return true;
					 }
					case "SW": 
					 if (relativePos === "upper" && square["left"] || relativePos === "right" && square["bottom"]) {
					 	return false;
					 }
					 else if (relativePos === "left" || relativePos === "lower"){
					 	return this._outerSquareValidation( square, corner, relativePos);
					 }
					 else {
					 	return true;
					 }
					case "SE":
					 if ( relativePos === "upper" && square["right"] || relativePos === "left" && square["bottom"]) {
					 	return false;
					 }
					 else if (relativePos === "lower" || relativePos === "right") {
					 	return this._outerSquareValidation( square, corner, relativePos);
					 }
					 else {
					 	return true;
					 }
				}
				
			}
		},
		_outerSquareValidation: function() {

		}
	}
});

DotGame.IndexModel = Ember.Object.extend({
	init: function() {
		this._buildBoard();
		this._super();
	},
	_buildBoard: function() {
		this.set('map', Em.A());
		var rows = Em.A(),
			row,
			square,
			map = this.get('map'),
			n = 0;
		for (var i = 0, _rowsLength = 10; i < _rowsLength; i++) {
			row = Ember.A();
			for (var j = 0, _squaresLength = 6; j < _squaresLength; j++) {
				if ( i > 0 && j > 0) {
					square = Em.Object.create({
						NE: rows[i-1][j]["SE"],
						NW: rows[i-1][j]["SW"],
						SE: Em.Object.create({checked: false}),
						SW: row[j-1]["SE"],
					});
				}
				else if (i && !j){
					square = Em.Object.create({
						NE: rows[i-1][j]["SE"],
						NW: rows[i-1][j]["SW"],
						SE: Em.Object.create({checked: false}),
						SW: Em.Object.create({checked: false})
					});
				}
				else if (!i && j) {
					square = Ember.Object.create({
								NE: Em.Object.create({checked: false}),
								NW: row[j-1]["NE"],
								SE: Em.Object.create({checked: false}),
								SW: row[j-1]["SE"]
							});

				}
				else if (!i && !j) {
					square = Ember.Object.create({
								NE: Em.Object.create({checked: false}),
								NW: Em.Object.create({checked: false}),
								SE: Em.Object.create({checked: false}),
								SW: Em.Object.create({checked: false})
							});
				}
				square.set('top', false);
				square.set('bottom', false);
				square.set('left', false);
				square.set('right', false);
				square.set('claimed', null);
				square.set('index', n);
				row.push(square);
				map.push(square);
				n++;
			}
			rows.push(row);
		}
		this.set('rows', rows);
	}
});