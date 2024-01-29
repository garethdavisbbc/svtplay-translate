 console.log("SVT-Translate content script started");
 
 let lastElementChange="";
 
 let observer = new MutationObserver(mutations => {
    for(let mutation of mutations) {
         for(let addedNode of mutation.addedNodes) {
				if (addedNode.nodeName === "DIV"){	
					if (typeof addedNode.parentNode.innerHTML === 'undefined' || addedNode.parentNode.innerHTML === null){
						// do nothing
					} else {
						let content=addedNode.parentNode.innerHTML;
						if (content === lastElementChange) { 
							//prevent a potential feedback loop by doing nothing
							//console.log("Element already translated");
						} else {
							// console.log("div content='",content,"'");
						
							if (content.includes("width:100%;height:100%;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;")){
								//This is the VOD subtitle div
								// console.log("Subtitle");
								let subtitle=addedNode.innerHTML;
								//Attempt to translate smaller text area
								var entireElement=true;
								const foundvod=content.match("(.*)<span>(.*?)<\/span>(.*)"); // single line
								if (foundvod){
									entireElement=false;
									subtitle=foundvod[2];
								}
								
								console.log("Subtitle content=",subtitle);
								(async () => {
									const response = await chrome.runtime.sendMessage({contentScriptQuery: "translate", text: subtitle});
									console.log("response =",response);
									if (response.translatedText) {
										if (entireElement){
											addedNode.innerHTML=response.translatedText;
											lastElementChange=response.translatedText;
										} else {
											//addedNode.innerHTML=foundvod[1]+"<span>"+response.translatedText+"</span>"+foundvod[3];
											addedNode.innerHTML=addedNode.innerHTML.replace(">"+subtitle+"<",">"+response.translatedText+"<");;
											lastElementChange=addedNode.innerHTML;
										}
									};	// else do nothing - no translation returned					
								})();

							 // end of if content matches vod subtitle div	
							} else {
								// check for live subtitles div
								if (content.includes("rxp-texttrack-region")){
									// live titles
										
									// Try and match something smaller than entire element
									const founddouble=content.match("(.*)<span(.*)>(.*?)<\/span>(.*)<span(.*)>(.*?)<\/span>(.*)"); // double line
									if (founddouble){
										const subtitle1=founddouble[3];
										console.log("Live Translate double line 1:",subtitle1);
										var temp=addedNode.innerHTML;
										(async () => {
												const response1 = await chrome.runtime.sendMessage({contentScriptQuery: "translate", text: subtitle1});
												console.log("response =",response1);
												addedNode.innerHTML=addedNode.innerHTML.replace(">"+subtitle1+"<",">"+response1.translatedText+"<");
												if (response1.translatedText) {
													const subtitle2=founddouble[6];
													console.log("Live Translate double line 2:",subtitle2);
													const response2 = await chrome.runtime.sendMessage({contentScriptQuery: "translate", text: subtitle2});
													console.log("response =",response2);
													if (response2.translatedText) {														
														addedNode.innerHTML=addedNode.innerHTML.replace(">"+subtitle2+"<",">"+response2.translatedText+"<");
														lastElementChange=addedNode.innerHTML;
													};// else do nothing - no translation returned
												};	// else do nothing - no translation returned					
											})();
									} else {
									
										const foundsingle=content.match("(.*)<span(.*)>(.*?)<\/span>(.*)"); // single line
										if (foundsingle){
											console.log("Live Translate single line:",foundsingle[3]);
											
											let subtitle=foundsingle[3];
											console.log("Subtitle content=",subtitle);
											(async () => {
												const response = await chrome.runtime.sendMessage({contentScriptQuery: "translate", text: subtitle});
												console.log("response =",response);
												if (response.translatedText) {
													addedNode.innerHTML=addedNode.innerHTML.replace(">"+subtitle+"<",">"+response.translatedText+"<");;
													lastElementChange=addedNode.innerHTML;
												};	// else do nothing - no translation returned					
											})();
																						
										} else {
											console.log("Live Translate entire element");
											let subtitle=addedNode.innerHTML;
											console.log("Subtitle content=",subtitle);
											(async () => {
												const response = await chrome.runtime.sendMessage({contentScriptQuery: "translate", text: subtitle});
												console.log("response =",response);
												if (response.translatedText) {
													addedNode.innerHTML=response.translatedText;
													lastElementChange=addedNode.innerHTML;
												};	// else do nothing - no translation returned					
											})();
										}
									}
								} else {
									console.log("Unable to find subtitles in this div");
								}// end of if live subtitles
							} // end of if VOD subtitles
						} // end of content === lastElementChange
					} // end of if parent not null
				} // end of if DIV
		 }// end of added nodes for loop				
    }// end of observed mutations
 });
 observer.observe(document, { childList: true, subtree: true });
 
 