var DotGame = Ember.Application.create();

DotGame.Router.map(function() {
	//routes..if we need them
	this.resource('games', {path: '/games'}, function() {
		this.route('new');
		this.route('show', {path: '/games/:game_id'});
	});
});

DotGame.GameRoute = Ember.Route.extend({
	model: function() {
		return DotGame.GameBoardModel.create({});
	}

});
DotGame.GameController = Ember.ObjectController.extend({
	availableSelections: Em.Object.create({firstSelectionMade: false, selections: Em.A(), prevChoice: null}),
	actions: {
		selectDot: function(square, corner) {
			var checked = square.get(corner).get('checked'),
				availableSelections = this.get('availableSelections'),
				selections = availableSelections.get('selections'),
				map = this.get('model.map'),
				index = square.get('index'),
				selectionValid = false,
				upper, lower, left, right, model, prevChoice, prevChoiceLength;
				prevChoice = this.get('availableSelections.prevChoice');
				prevChoiceLength = prevChoice && this.get('availableSelections.prevChoice').length;
				if (prevChoiceLength > 1) {
					prevChoice.forEach(function(choice) {
						choice.set('checked', false);
					});
				}
			if (!checked && availableSelections.get('firstSelectionMade')) {
				console.log('cry')
				selections.forEach(function(selection) {
					if(square[corner] === selection) {
						selectionValid = true;
					}
				});
				if (selectionValid) {
					console.log('poop');
					square[corner].set('checked', true);
					this.setProperties({'availableSelections.firstSelectionMade': false, selections: Em.A() });
					this.get('availableSelections.prevChoice').addObject(square[corner]);

				}
			}
			else if (!checked && !availableSelections.get('firstSelectionMade')) {
				
				model = this.get('model');
				upper = map[index-6] && map[index-6][corner];
				lower = map[index+6] && map[index+6][corner];
				left = map[index-1] && map[index-1][corner];
				right = map[index+1] && map[index+1][corner];
				model._isValidMove(square, corner, index, upper, "upper") && selections.push(upper); 
				model._isValidMove(square, corner, index, lower, "lower") && selections.push(lower); 
				model._isValidMove(square, corner, index, left, "left") && selections.push(left); 
				model._isValidMove(square, corner, index, right, "right") && selections.push(right);
				if(selections){
					square.get(corner).set('checked', true);
					availableSelections.set('firstSelectionMade', true);
					availableSelections.set('prevChoice', Em.A([square[corner]]));
				}
			} else {
				console.log('snarf')
				square.get(corner).set('checked', false);
				this.set('availableSelections', Em.Object.create({firstSelectionMade: false, selections: Em.A(), prevChoice: Em.A() }) );
			}
		}
	}
});

DotGame.Square = Ember.Object.extend({
	NE: null,
	NW: null,
	SW: null,
	SE: null,
	top: false,
	bottom: false,
	left: false,
	right: false,
	computeTop: function(){
		var NE = this.get('NE.checked'),
			NW = this.get('NW.checked'),
			top = this.get('top');
		if (NE && NW && !top) {
			this.set('top', true);

		}
	}.observes("NE.checked", "NW.checked"),

	computeBottom: function() {
		var SE = this.get("SE.checked"),
			SW = this.get("SW.checked"),
			bottom = this.get("bottom");
		if (SE && SW && !bottom) {
			this.set('bottom', true);
		}
	}.observes("SE.checked", "SW.checked"),

	computeLeft: function() {
		var NW = this.get("NW.checked"),
			SW = this.get("SW.checked"),
			left = this.get("left");
		if (NW && SW && !left) {
			this.set('left', true);
		}
	}.observes("NW.checked", "SW.checked"),

	computeRight: function() {
		var NE = this.get("NE.checked"),
			SE = this.get("SE.checked"),
			right = this.get("right");
		if (NE && SE && !right) {
			this.set('right', true);
		}
	}.observes("NE.checked", "SE.checked"),

	computeClaimed: function() {
		var top = this.get('top'),
			bottom = this.get('bottom'),
			left = this.get('left'),
			right = this.get('right');
		if (top && bottom && right && left) {
			this.set('claimed', true);
		}
	}.observes("top", "bottom", "left", "right")
});

DotGame.GameBoardModel = Ember.Object.extend({
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
					square = DotGame.Square.create({
						NE: rows[i-1][j]["SE"],
						NW: rows[i-1][j]["SW"],
						SW: row[j-1]["SE"],
						SE: Em.Object.create({checked: false}),
					});
				}
				else if (i && !j){
					square = DotGame.Square.create({
						NE: rows[i-1][j]["SE"],
						NW: rows[i-1][j]["SW"],
						SE: Em.Object.create({checked: false}),
						SW: Em.Object.create({checked: false}),
					});
				}
				else if (!i && j) {
					square = DotGame.Square.create({
								NW: row[j-1]["NE"],
								SW: row[j-1]["SE"],
								SE: Em.Object.create({checked: false}),
								NE: Em.Object.create({checked: false}),
							});

				}
				else if (!i && !j) {
					square = DotGame.Square.create({
						NE: Em.Object.create({checked: false}),
						NW: Em.Object.create({checked: false}),
						SE: Em.Object.create({checked: false}),
						SW: Em.Object.create({checked: false}),
					});
				}
				square.set('top', false);
				square.set('bottom', false);
				square.set('left', false);
				square.set('right', false);
				square.set('index', n);
				row.addObject(square);
				map.addObject(square);
				n++;
			}
			rows.addObject(row);
		}
		this.set('rows', rows);
	},
	_isValidMove: function(square, corner, index, possibleChoice, relativePos) {
			var prevChoice = this.get('availableSelections.prevChoice'),
				map = this.get('map');
			if (possibleChoice) {
				switch (corner) {
					case "NE": 
					if (relativePos === "left" && square["top"] || relativePos === "lower" && square["right"]){
						return false;
					}
					else if (relativePos === "right" && map[index -6 + 1]["bottom"] || relativePos === "upper" && map[index - 6 + 1]["left"]) {
						return false;
					}
					else {
						return true;
					}
					case "NW":
					 if (relativePos === "right" && square["top"] || relativePos === "lower" && square["left"]) {
					 	return false;
					 }
					 else if (relativePos === "upper" && map[index - 6 -1]["right"] || relativePos == "left" && map[index - 6 - 1]["bottom"]) {
					 	return false;
					 }
					 else {
					 	return true;
					 }
					case "SW": 
					 if (relativePos === "upper" && square["left"] || relativePos === "right" && square["bottom"]) {
					 	return false;
					 }
					 else if (relativePos === "left" && map[index + 6 -1]["top"] || relativePos === "lower" && map[index + 6 -1]["right"]){
					 	return false;
					 }
					 else {
					 	return true;
					 }
					case "SE":
					 if ( relativePos === "upper" && square["right"] || relativePos === "left" && square["bottom"]) {
					 	return false;
					 }
					 else if (relativePos === "lower" && map[index + 6 +1]["left"] || relativePos === "right" && map[index + 6 + 1]["top"]) {
					 	return false;
					 }
					 else {
					 	return true;
					 }
				}
			}
			else {
				return false;
			}
		}
});

DotGame.PlayerModel = Em.Object.extend({
	name: null,
	color: null,
	score: 0
});
