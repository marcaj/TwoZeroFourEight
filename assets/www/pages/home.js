var home = {
        init: function() {
            menu.init();
            
            for(var i = 0; i < 16; i++) {
                var num = (i == 0) ? 0 : Math.pow(2, i);
                var cell = $('<div class="cell c'+num+'">'+num+'</div>');
                $('#board').append(cell);
            }
            
            var w = $('#board').css('width');
            $('#board').css('height', w);
            $('.cell').css('line-height', Math.round(w.substr(0, w.length-2)/4)+'px');
        } 
}
