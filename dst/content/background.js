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