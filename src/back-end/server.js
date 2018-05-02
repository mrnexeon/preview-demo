var express = require('express'); 
var ForgeSDK = require('forge-apis');

var app = express(); 
var port = 8080; 
var CLIENT_ID = '7CMZFMmL22BaEhZSp0Uel052iL5aussd';
var CLIENT_SECRET = 'RnRA7ThEt0DGPAsK';
var autoRefresh = true; 
var publicFolder = "public";

app.use(express.static(publicFolder));

app.get('/auth', function(req, res){   
    var oAuth2TwoLegged = new ForgeSDK.AuthClientTwoLegged(CLIENT_ID, CLIENT_SECRET, [
        'data:read',
        'data:write'
    ], autoRefresh);
    
	oAuth2TwoLegged.authenticate().then(function(credentials){
        res.send(credentials);
    }, function(err){
        res.send("Нельзя зарегистрироваться");
    });
});

app.listen(port, function() {
	console.log('app running on port ' + port); 
}); 