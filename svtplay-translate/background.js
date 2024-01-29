console.log("SVTPlay-Translate background script started");

const api_key="";

chrome.runtime.onMessage.addListener(

    function(request, sender, sendResponse) {

        if (request.contentScriptQuery == "translate") {
					
		var jsonData = {};
		jsonData["q"]=request.text;
		jsonData["source"]="sv";
		jsonData["target"]="en";
		jsonData["format"]="html";								
		
		
		(async () => {
			const response=await fetch("https://translation.googleapis.com/language/translate/v2?key="+api_key,
				{
					method: "POST",
					headers: {'Content-Type': 'application/json'}, 
					body: JSON.stringify(jsonData)
				}
			)
			
			if(response.ok){
				const resJson = await response.json();
				const translation= resJson.data.translations[0];
				//console.log("Translation: ", translation);
				sendResponse(translation);
			} else {
				console.log("Error calling translation: ", response);
				sendResponse({"HTTP error" : response.status});
			}

		})();
		return true;
		}
	}
)
