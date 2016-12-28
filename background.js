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
console.log("hallo")

// mache einen request optional mit headers (für put / post ...)
function makeRequest(apiFunction, requestParams){
	// set default params if no request params submitted
	if(requestParams == null ){
		requestParams = {
			method: 'GET', 
			mode: 'cors', 
			redirect: 'follow',
			headers: new Headers({
				'Content-Type': 'text/plain'
			})
		};
		/*
		{
			method: "POST",
			body: data
		}
		*/
	}

	var request = new Request('http://icanhazip.com/'+apiFunction, requestParams);

	return new Promise(
		// The resolver function is called with the ability to resolve or
		// reject the promise
		function(resolve, reject) {

			 fetch(request).then(function(response) {
				console.log(response);
				if(response.status == 200){
					//successfull request
					//json() - Returns a promise that resolves with a JSON object.
					//text() - Returns a promise that resolves with a USVString (text).
					resolve(response.text());
				}
				reject();
			}).catch(function(err) {
				// Error :(
				console.err(err);
				reject();
			});
	});
}

makeRequest().then(function(text){
	console.log("API "+text);
})