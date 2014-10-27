var Cell = Backbone.Model.extend({
	initialize: function(){},
	
	defaults: {
		content: 0,
		id: null
	},
	
	getRight: function(){
		if((this.get('id')+1) % 4 == 0) return;
		return game.board.at(this.get('id') + 1);
	},
	getLeft: function(){
		if(this.get('id') % 4 == 0) return;
		return game.board.at(this.get('id') - 1);
	},
	getTop: function(){
		if(this.get('id') < 4) return;
		return game.board.at(this.get('id') - 4);
	},
	getBottom: function(){
		if(this.get('id') > 11) return;
		return game.board.at(this.get('id') + 4);
	},
	
	move: function(e) {
		var moved = false;
		var collapsed = false;
		var moveTo = null;
		
		switch(e) {
		case 'left':
			moveTo = this.getLeft();
			break;
		case 'right':
			moveTo = this.getRight();
			break;
		case 'top':
			moveTo = this.getTop();
			break;
		case 'bottom':
			moveTo = this.getBottom();
			break;
		}
	
		if(this.get('content') != 0 && moveTo) {
			if(moveTo.get('content') == this.get('content')) {
				moveTo.set('content', 2 * this.get('content'));
				this.set('content', 0);
				collapsed = true;
			}
			else if(moveTo.get('content') == 0) {
				moveTo.set('content', this.get('content'));
				this.set('content', 0);
				moved = true;
			}
		}
		
		if(moved) return moveTo.move(e) || true;
		else return moved || collapsed;
	}
	
	

});

var CellView = Backbone.View.extend({
	template_wrapper: '<div class="cell c<%= content %>" id="cell-<%= id %>"><%= content %></div>',
	template: '<%= content %>',
	
	
	initialize: function(){
		this.render();
		this.listenTo(this.model, "change", this.render);
	},
    
    render: function(){
    	if($('#cell-'+this.model.get('id')).length > 0) {
    		var template = _.template( this.template, {content: this.model.get('content')} );
    		this.$el.html( template );
    		$('#cell-'+this.model.get('id')).removeClass('c0 c2 c4 c8 c16 c32 c64 c128 c256 c512 c1024 c2048 c4096 c8192 c16384 c32768 c65536');
    		$('#cell-'+this.model.get('id')).addClass('c'+this.model.get('content'));
    	} else {
    	    var num = (this.model.get('content') == 0) ? 0 : Math.pow(2, this.model.get('content'));
    		var template = _.template( this.template_wrapper, {content: this.model.get('content'), id: this.model.get('id')} );
    		this.$el.append( template );
    		this.$el = $('#cell-'+this.model.get('id'));
    	}
    },
    
});

var Board = Backbone.Collection.extend({
	model: Cell,

	getEmptyCells: function() {
		return this.findWhere({'content': 0});
	},
	
	getState: function() {
		var state = [];
		this.forEach(function(cell) {
			state.push(cell.get('content'));
		});
		return state;
	},
	
	setState: function(state) {
		this.forEach(function(cell) {
			cell.set('content', state[cell.get('id')]);
		});
	},
	
});

var BoardView = Backbone.View.extend({
	template: '<div id="board"></div>',
	
	initialize: function(){
		this.render();
		
		$(document).live("swipeleft", function(e){
		    var moved = false;
		    game.board.forEach(function(cell) {
                moved = cell.move('left') || moved;
            });
		    if(moved) game.run();
        });
		$(document).live("swipeup", function(e){
		    var moved = false;
		    game.board.forEach(function(cell) {
                moved = cell.move('top') || moved;
            });
		    if(moved) game.run();
		});
		$(document).live("swiperight", function(e){
		    var moved = false;
		    for(var i = game.board.length - 1; i >= 0; i--) {
                moved = game.board.at(i).move('right') || moved;
            }
		    if(moved) game.run();
        });
	    $(document).live("swipedown", function(e){
	        var moved = false;
	        for(var i = game.board.length - 1; i >= 0; i--) {
                moved = game.board.at(i).move('bottom') || moved;
            }
	        if(moved) game.run();
	    });
	},
	
	render: function(){
		var template = _.template( this.template, {} ); 
        this.$el.append( template );
    },
});
