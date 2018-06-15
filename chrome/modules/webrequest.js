
var webrequest = webrequest ? webrequest : {
	request_list : {},
	redirect_url : "https://localhost:3000/proxy",
	filters : {
		urls : [],
		headers:[]
	},

	before_request : ()=>{},
	before_send_headers : ()=>{},
	send_headers : ()=>{},
	before_redirect : ()=>{},
	complete : ()=>{},
	error_occurred : ()=>{}
};


webrequest.handleRequest = (function(details){
	console.log(details);
}).bind(webrequest);


webrequest.setHook = (function(){
	
	this.clearHook();

	chrome.webRequest.onBeforeRequest.addListener(this.before_request = (function(details){

		var url = details.url;
		console.log(url);
		var url_class = new URL(url);
		if(["http:","https:"].indexOf(url_class.protocol) < 0){
			return ;
		}

		if(url.indexOf("#do_not_redirect") > -1){
			return ;
		}
		// console.log(details.url,"onBeforeRequest");
		// this.request_list[details.requestId] = {
		// 	method : "",
		// 	url : "",
		// 	headers : {},
		// 	request_body : ""
		// };

		// this.request_list[details.requestId].url = details.url;
		// this.request_list[details.requestId].method = details.method;

		// if(details.requestBody){
		// 	//console.log(details.requestBody);
		// 	if(details.requestBody.formData){
		// 		this.request_list[details.requestId].request_body = details.requestBody.formData;
		// 		this.request_list[details.requestId].request_body_flag = 'form_data';
		// 	}
		// 	else if(details.requestBody.raw){
		// 		this.request_list[details.requestId].request_body = details.requestBody.raw;
		// 		this.request_list[details.requestId].request_body_flag = 'raw';
		// 	}
		// 	else if(details.requestBody.error){
		// 		this.request_list[details.requestId].request_body = details.requestBody.error;
		// 		this.request_list[details.requestId].request_body_flag = 'error';
		// 	}
		// 	else{
		// 		this.request_list[details.requestId].request_body = '';
		// 		this.request_list[details.requestId].request_body_flag = 'null';
		// 	}
		// }
		// else{
		// 	this.request_list[details.requestId].request_body = '';
		// 	this.request_list[details.requestId].request_body_flag = 'null';
		// }

		return { redirectUrl: this.redirect_url+ "?url=" + url + "#do_not_redirect" };

	}).bind(webrequest),{urls:this.filters.urls},["blocking", "requestBody"]);

		
	// chrome.webRequest.onBeforeSendHeaders.addListener(this.before_send_headers = (function(details){

	// }).bind(webrequest),{urls:this.filters.urls},["blocking", "requestHeaders"]);


	// chrome.webRequest.onSendHeaders.addListener(this.send_headers = (function(details){
	// 	// console.log(details.url,"onSendHeaders");
	// 	let headers = {};
	// 		for(let i = 0;i < details.requestHeaders.length;i++){
	// 		headers[details.requestHeaders[i]['name']] = details.requestHeaders[i]['value'];
	// 	}
	// 	this.request_list[details.requestId].headers = headers;

	// 	//console.log(request_list);

	// }).bind(webrequest),{urls:this.filters.urls},["requestHeaders"]);

	// chrome.webRequest.onBeforeRedirect.addListener(this.before_redirect = (details) =>{
	// 	// console.log(details.url,"onBeforeRedirect");
	// 	this.handleRequest(details);
	// 	delete this.request_list[details.requestId];							//释放

	// },{urls:this.filters.urls},["responseHeaders"]);

	// chrome.webRequest.onCompleted.addListener(this.complete = (function(details){
	// 	// console.log(details.url,"onComplete");
	// 	this.handleRequest(details);
	// 	delete this.request_list[details.requestId];							//释放

	// }).bind(webrequest),{urls:this.filters.urls},[]);
		
	// chrome.webRequest.onErrorOccurred.addListener(this.error_occurred = (function(details){
	// 	// console.log(details.url,"onErrorOccurred");
	// 	delete this.request_list[details.requestId];
	// }).bind(webrequest),{urls:this.filters.urls});

	// return true;
}).bind(webrequest);


webrequest.clearHook = (function(){
	chrome.webRequest.onBeforeRequest.removeListener(this.before_request);
	chrome.webRequest.onSendHeaders.removeListener(this.send_headers);
	chrome.webRequest.onCompleted.removeListener(this.before_redirect);
	chrome.webRequest.onCompleted.removeListener(this.complete);
	chrome.webRequest.onCompleted.removeListener(this.error_occurred);
	return true;
}).bind(webrequest);



module.exports = webrequest;