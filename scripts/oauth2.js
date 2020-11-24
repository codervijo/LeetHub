var oAuth2 = {

    /**
     * Initialize
     */
    init: function() {
        
        this.KEY = "leethub_token";
        this.ACCESS_TOKEN_URL = "https://github.com/login/oauth/access_token";
        this.AUTHORIZATION_URL = "https://github.com/login/oauth/authorize";
        this.CLIENT_ID = "CHANGE1";
        this.CLIENT_SECRET = "CHANGE2";
        this.REDIRECT_URL = "https://github.com"; //for example, https://github.com
        this.SCOPES = ['repo'];
    },

    /**
     * Begin
     */
    begin: function() {
        this.init(); //secure token params.

        var url = this.AUTHORIZATION_URL + "?client_id=" + this.CLIENT_ID + "&redirect_uri" + this.REDIRECT_URL + "&scope=";

        for(var i in this.SCOPES) {
            url += this.SCOPES[i];
        }
        chrome.storage.sync.set({"pipe_leethub" : true}, data=>{ //opening pipe temporarily
            
            chrome.tabs.create({url: url, selected: true}, function(data) {
                window.close();
                chrome.tabs.getCurrent(function(tab) {
                    chrome.tabs.remove(tab.id, function(){});
                });
            });

        });

    }
};
