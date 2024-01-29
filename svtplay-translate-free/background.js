console.log("SVTPlay Translate background script started");

chrome.runtime.onMessage.addListener(

    function(request, sender, sendResponse) {

        if (request.contentScriptQuery == "translate") {
											
			(async () => {
				const response=await fetch("https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=sv&tl=en&q="+request.text,
					{
						method: "GET"
					}
				)
				
				if(response.ok){
					const resJson = await response.json();
					// console.log("Response: ", resJson)
					sendResponse(resJson);
				} else {
					console.log("Error calling translation: ", response);
					sendResponse({"HTTP error" : response.status});
				}

			})();
			
			return true;
		}
	}
)
