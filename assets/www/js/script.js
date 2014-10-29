var game = {
		board: new Board(),
		view: null,
		history: new Stack('history'),
		
		init: function() {
		    
			var boardView = new BoardView({
				model: this.board,
				el: $('body')
			});
			this.view = boardView;
			
			for(var i = 0; i < 16; i++) {
				var cell = new Cell({id: i});
				this.board.add(cell);
				new CellView({model: cell, el: $('#board')});
			}
			
			var w = $('#board').css('width');
            $('#board').css('height', w);
            $('.cell').css('line-height', Math.round(w.substr(0, w.length-2)/4)+'px');
			
            var state = this.history.pop();
            if(state) {
                this.board.setState(state);
            } else {
                this.run();
            }
            
		},
		
		run: function() {
			var emptyCells = this.board.filter(function (cell) {
				  return cell.get('content') == 0;
			});
			
			if(emptyCells.length > 0) {
				var x = Math.floor(Math.random() * (emptyCells.length)) + 1;
				emptyCells[x-1].set('content', 2);
				
				this.history.push(this.board.getState());
			} else {
			    app.gameover();
			}
		},
		
		newGame: function() {
		    this.board.setState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
		    this.history.clear();
		    this.run();
		},
		
		back: function() {
		    this.history.pop();
		    var state = this.history.pop();
		    if(state) this.board.setState(state);
		    this.history.push(state);
		},
		
};
