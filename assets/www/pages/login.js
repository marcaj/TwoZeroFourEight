function init() {
    document.addEventListener("deviceready", deviceReady, true);
//    delete init;
}

function deviceReady() {
    FastClick.attach(document.body);
    $.mobile.changePage("#homePage", {transition: 'pop'});
    
    $("#homePage").on("pageshow", function() {
       home.init(); 
    });

}

var app = {
        
        isNetwork: function() {
            var networkState = navigator.network.connection.type;
            return Connection.NONE != networkState;
        }
};
