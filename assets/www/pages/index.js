function init() {
    document.addEventListener("deviceready", deviceReady, true);
    delete init;
}

function deviceReady() {
    FastClick.attach(document.body);
    document.addEventListener("backbutton", app.undo, false);
    
    home.init(); 
}

var app = {
        
    askExit: function() {
        navigator.notification.confirm(
                'Are you sure you want to exit the application?', 
                function(buttonIndex) {
                    if(buttonIndex == 1) return;
                    else if(buttonIndex == 2) navigator.app.exitApp();
                }, 
                'Exit app', 
                'Cancel,Exit');
    },
    
    askRefresh: function() {
        navigator.notification.confirm(
                'Are you sure you want to start a new game?', 
                function(buttonIndex) {
                    if(buttonIndex == 1) return;
                    else if(buttonIndex == 2) return;
                }, 
                'Refresh game', 
                'Cancel,Refresh');
    },
    
    undo: function() {},
    
};