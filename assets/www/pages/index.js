function init() {
    document.addEventListener("deviceready", deviceReady, true);
    delete init;
}

function deviceReady() {
    FastClick.attach(document.body);
    document.addEventListener("backbutton", app.backbutton, false);
    
    home.init(); 
}

var app = {
        
    backbutton: function(e) {
        //TODO
    },

    askExit: function() {
        navigator.notification.confirm('Are you sure you want to exit the application?', app.exit, 'Exit app', 'Cancel,Exit')
    },
    
    exit: function(buttonIndex) {
        if(buttonIndex == 1) return;
        else if(buttonIndex == 2) navigator.app.exitApp();
    }
};