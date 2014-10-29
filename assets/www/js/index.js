function init() {
    document.addEventListener("deviceready", deviceReady, true);
    delete init;
}

function deviceReady() {
    FastClick.attach(document.body);
    document.addEventListener("backbutton", app.undo, false);
    
    i18n.init({ fallbackLng: 'en' }, function(t) {
        $(document).i18n();
    });
    
    game.init(); 
}

var app = {
        
    askExit: function() {
        navigator.notification.confirm(
                i18n.t("notification.exit.question"),
                function(buttonIndex) {
                    if(buttonIndex == 1) return;
                    else if(buttonIndex == 2) {
                        navigator.notification.vibrate(0);
                        navigator.app.exitApp();
                    }
                }, 
                i18n.t("notification.exit.title"),
                i18n.t("notification.exit.buttons")
        );
    },
    
    askRefresh: function() {
        navigator.notification.confirm(
                i18n.t("notification.refresh.question"),
                function(buttonIndex) {
                    if(buttonIndex == 1) return;
                    else if(buttonIndex == 2) {
                        game.newGame();
                    }
                }, 
                i18n.t("notification.refresh.title"), 
                i18n.t("notification.refresh.buttons")
        );
    },
    
    gameover: function() {
        navigator.notification.alert(
                i18n.t("notification.gameover.message"),
                function() {}, 
                i18n.t("notification.gameover.title"), 
                i18n.t("notification.gameover.button")
        );
    },
    
    undo: function() {
        game.back();
    },
    
};