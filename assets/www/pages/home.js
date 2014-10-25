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

var menu = {
       status: false,
       init: function() {
           $("a.showMenu").click(function(){
               if(menu.status != true){                
                   menu.show();
                   return false;
               } else {
                   menu.hide();
                   return false;
               }
           });
        
           $('#homePage, #menu').live("swipeleft", function(e){
               if (menu.status){    
                   menu.hide();
               }
           });
           
           $('#homePage, #menu').live("swiperight", function(e){
               if (!menu.status){    
                   menu.show();
               }
           });
           
           $("#menu a.list-group-item").click(function(){
               if($(this).hasClass('active')){
                   $("#menu a.list-group-item").removeClass('active');
               } else {
                   $("#menu a.list-group-item").removeClass('active');
                   $(this).addClass('active');
               }
           });
       },
       
       show: function() {
           $('#menu').css('left', 0);
           $(".ui-page-active").animate({
               marginLeft: "165px",
           }, 300, function(){
               menu.status = true
           });
       },
       
       hide: function() {
           $(".ui-page-active").animate({
               marginLeft: "0px",
           }, 300, function(){
               $('#menu').css('left', '-165px');
               menu.status = false
           });
       }
}
