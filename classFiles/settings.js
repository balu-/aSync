/*settings.js*/

class collectionClass{
	constructor(){
		this.name ="";
		this.enabledSync = false;
		this.lastUpdate = 0;
	}
}



class settingsClass{
	constructor() {
		this.host = "";
      	this.user = "";
      	this.pw = "";
      	this.collections = {};
  	}

  	loadSettings(){
  		var sT = this; //variable to walk this to inner scope
  		//load settings from storage
		return browser.storage.local.get("settings").then(function(value2){
			console.log("this.load");
			console.log(value2);

			if(typeof value2.settings !== 'undefined'){
				var value = JSON.parse(value2.settings);
				if (typeof value.host !== 'undefined') {
	      			sT.host = value.host;
	      			console.log("set host" + sT.host);
				}
	      		if (typeof value.user !== 'undefined') 
	      			sT.user = value.user;
	      		if (typeof value.pw !== 'undefined') 
	      			sT.pw = value.pw;
	      		if (typeof value.collections !== 'undefined') 
	      			sT.collections = value.collections;
      		}
      	});
  	}

  	setHost(value){
  		this.host = value;
  		this.saveSettings();
  	}

  	setUser(value){
  		this.user = value;
  		this.saveSettings();
  	}

  	setPw(value){
  		this.pw = value;
  		this.saveSettings();
  	}

  	addCollection(value){
  		if(!(value instanceof collectionClass)) {
  			console.log("wrong type " + typeof(value) )
  			return false;
  		}

  		//check if object ist schon da?
  		if(typeof (this.collections[value.name]) === "undefined"){
	  		this.collections[value.name] = value;
	  		this.saveSettings();
	  		return true;
  		} else {
  			console.log("name undefined " + typeof(value) )
  			return false;
  		}
  	}

  	saveSettings(){
  		console.log("this.Save");
  		var stObj = {};
  		stObj["settings"] = JSON.stringify(this);
  		console.log(" : "+stObj["settings"]);
  		browser.storage.local.set(stObj);
  	}
}