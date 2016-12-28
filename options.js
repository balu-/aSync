/* ./classFiles/settings.js */
/*settings.js*/

class settingsClass{
	constructor() {
		this.host = "";
      	this.user = "";
      	this.pw = "";
  	}

  	loadSettings(){
  		var sT = this; //variable to walk this to inner scope
  		//load settings from storage
		return browser.storage.local.get("settings").then(function(value){
			console.log("this.load");
			console.log(value);
			if(typeof value.settings !== 'undefined'){
				value = value.settings;
				if (typeof value.host !== 'undefined') {
	      			sT.host = value.host;
	      			console.log("set host" + sT.host);
				}
	      		if (typeof value.user !== 'undefined') 
	      			sT.user = value.user;
	      		if (typeof value.pw !== 'undefined') 
	      			sT.pw = value.pw;
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

  	saveSettings(){
  		console.log("this.Save");
  		var stObj = {};
  		stObj["settings"] = this;
  		console.log(stObj);
  		browser.storage.local.set(stObj);
  	}
}
var settings;

//save form settings to local storage
function saveForm(){
  /* get values from dom*/
  var inputElement = document.querySelector("#settings_host");
  if(inputElement != null)
    settings.setHost(inputElement.value);
}

function setupForm() {
  //append change Listener to all input fields
  var ar = document.querySelectorAll("input");
  if(ar != null){
    ar.forEach(function(element) {
      element.addEventListener("change", saveForm);
    });
  }

  //load stored values
  settings = new settingsClass();
  settings.loadSettings().then(function(res){
      console.log("settings loaded");
      console.log(settings);
      //set values to dom
      var inputElement = document.querySelector("#settings_host");
      if(inputElement != null)
        inputElement.value = settings.host;
  });
}

document.addEventListener("DOMContentLoaded", setupForm);
//document.querySelector("form").addEventListener("submit", saveOptions);
