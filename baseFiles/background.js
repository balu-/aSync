console.log("hallo")

// mache einen request optional mit headers (für put / post ...)
function makeRequest(apiFunction, settings, requestParams){
	function makeBasicauth(user, password) {
	  var tok = user + ':' + password;
	  var hash = window.btoa(tok);
	  return "Basic " + hash;
	}

	// set default params if no request params submitted
	if(requestParams == null ){

		var authString = makeBasicauth(settings.user, settings.pw);
		console.log("Auth string "+authString);
		requestParams = {
			method: 'GET', 
			mode: 'cors', 
			redirect: 'follow',
			headers: new Headers({
				'Content-Type': 'text/plain',
  				'Authorization': authString

			})
		};
		/*
		{
			method: "POST",
			body: data
		}
		*/
	}

	//var request = new Request('http://localhost:8080/'+apiFunction);
	var request = new Request('http://localhost:8080/'+apiFunction, requestParams);

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
					//resolve(response.text());
					resolve(response.json());
				}
				reject();
			}).catch(function(err) {
				// Error :(
				console.error(err);
				reject();
			});
	});
}


var settings = new settingsClass();
settings.loadSettings().then(function(){
	makeRequest("collections",settings).then(function(obj){
		console.log("API "+obj);
		console.log(obj);
		console.log("-" + typeof (obj));
		//if liste?
		if(typeof (obj) == "Array"){
			obj.forEach(function(element) {
			    browser.notifications.create( {
		        	type: "basic",
		       		title: "aSync - Message",
		       		message: element.name
				});

			});
		} else {
			//unespected
		}

		if(typeof (obj.msg) !== "undefined"){
			console.log("I've got a message \""+obj.msg+"\"");
			browser.notifications.create( {
	        	type: "basic",
	       		title: "aSync - Message",
	       		message: obj.msg
			});

		}
	}).catch(function (obj){ 
		console.error("fehler in request");
		console.error(obj);


		browser.notifications.create( {
        	type: "basic",
       		title: "aSync - Error",
       		message: "fehler in request"
		});


	});
})
