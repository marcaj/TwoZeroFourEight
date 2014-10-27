var game = {
		board: new Board(),
		view: null,
		
		init: function() {
		    menu.init();
		    
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
			
			this.run();
			
		},
		
		run: function() {
			var emptyCells = this.board.filter(function (cell) {
				  return cell.get('content') == 0;
			});
			
			if(emptyCells.length > 0) {
				var x = Math.floor(Math.random() * (emptyCells.length)) + 1;
				emptyCells[x-1].set('content', 2);
				
				
			} else {
				//TODO end
			}
		},
		
		newGame: function() {
		    this.board.setState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
		    this.run();
		}
};
