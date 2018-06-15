/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../config.js":
/*!********************!*\
  !*** ../config.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\n\tserver_origin : \"http://localhost:3000\"\n};\n\n//# sourceURL=webpack:///../config.js?");

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_webrequest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/webrequest */ \"./modules/webrequest.js\");\n/* harmony import */ var _modules_webrequest__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_webrequest__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config */ \"../config.js\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_config__WEBPACK_IMPORTED_MODULE_1__);\n\n\n//webrequest.filters.urls.push(config.server_origin+\"/*\");\n_modules_webrequest__WEBPACK_IMPORTED_MODULE_0___default.a.redirect_url = _config__WEBPACK_IMPORTED_MODULE_1___default.a.server_origin + \"/proxy\";\n_modules_webrequest__WEBPACK_IMPORTED_MODULE_0___default.a.filters.headers.push({referer : _config__WEBPACK_IMPORTED_MODULE_1___default.a.server_origin+\"/*\"});\n\n\n_modules_webrequest__WEBPACK_IMPORTED_MODULE_0___default.a.setHook();\n\n//# sourceURL=webpack:///./main.js?");

/***/ }),

/***/ "./modules/webrequest.js":
/*!*******************************!*\
  !*** ./modules/webrequest.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nvar webrequest = webrequest ? webrequest : {\n\trequest_list : {},\n\tredirect_url : \"https://localhost:3000/proxy\",\n\tfilters : {\n\t\turls : [],\n\t\theaders:[]\n\t},\n\n\tbefore_request : ()=>{},\n\tbefore_send_headers : ()=>{},\n\tsend_headers : ()=>{},\n\tbefore_redirect : ()=>{},\n\tcomplete : ()=>{},\n\terror_occurred : ()=>{}\n};\n\n\nwebrequest.handleRequest = (function(details){\n\tconsole.log(details);\n}).bind(webrequest);\n\n\nwebrequest.setHook = (function(){\n\t\n\tthis.clearHook();\n\n\tchrome.webRequest.onBeforeRequest.addListener(this.before_request = (function(details){\n\n\t\tvar url = details.url;\n\t\tconsole.log(url);\n\t\tvar url_class = new URL(url);\n\t\tif([\"http:\",\"https:\"].indexOf(url_class.protocol) < 0){\n\t\t\treturn ;\n\t\t}\n\n\t\tif(url.indexOf(\"#do_not_redirect\") > -1){\n\t\t\treturn ;\n\t\t}\n\t\t// console.log(details.url,\"onBeforeRequest\");\n\t\t// this.request_list[details.requestId] = {\n\t\t// \tmethod : \"\",\n\t\t// \turl : \"\",\n\t\t// \theaders : {},\n\t\t// \trequest_body : \"\"\n\t\t// };\n\n\t\t// this.request_list[details.requestId].url = details.url;\n\t\t// this.request_list[details.requestId].method = details.method;\n\n\t\t// if(details.requestBody){\n\t\t// \t//console.log(details.requestBody);\n\t\t// \tif(details.requestBody.formData){\n\t\t// \t\tthis.request_list[details.requestId].request_body = details.requestBody.formData;\n\t\t// \t\tthis.request_list[details.requestId].request_body_flag = 'form_data';\n\t\t// \t}\n\t\t// \telse if(details.requestBody.raw){\n\t\t// \t\tthis.request_list[details.requestId].request_body = details.requestBody.raw;\n\t\t// \t\tthis.request_list[details.requestId].request_body_flag = 'raw';\n\t\t// \t}\n\t\t// \telse if(details.requestBody.error){\n\t\t// \t\tthis.request_list[details.requestId].request_body = details.requestBody.error;\n\t\t// \t\tthis.request_list[details.requestId].request_body_flag = 'error';\n\t\t// \t}\n\t\t// \telse{\n\t\t// \t\tthis.request_list[details.requestId].request_body = '';\n\t\t// \t\tthis.request_list[details.requestId].request_body_flag = 'null';\n\t\t// \t}\n\t\t// }\n\t\t// else{\n\t\t// \tthis.request_list[details.requestId].request_body = '';\n\t\t// \tthis.request_list[details.requestId].request_body_flag = 'null';\n\t\t// }\n\n\t\treturn { redirectUrl: this.redirect_url+ \"?url=\" + url + \"#do_not_redirect\" };\n\n\t}).bind(webrequest),{urls:this.filters.urls},[\"blocking\", \"requestBody\"]);\n\n\t\t\n\t// chrome.webRequest.onBeforeSendHeaders.addListener(this.before_send_headers = (function(details){\n\n\t// }).bind(webrequest),{urls:this.filters.urls},[\"blocking\", \"requestHeaders\"]);\n\n\n\t// chrome.webRequest.onSendHeaders.addListener(this.send_headers = (function(details){\n\t// \t// console.log(details.url,\"onSendHeaders\");\n\t// \tlet headers = {};\n\t// \t\tfor(let i = 0;i < details.requestHeaders.length;i++){\n\t// \t\theaders[details.requestHeaders[i]['name']] = details.requestHeaders[i]['value'];\n\t// \t}\n\t// \tthis.request_list[details.requestId].headers = headers;\n\n\t// \t//console.log(request_list);\n\n\t// }).bind(webrequest),{urls:this.filters.urls},[\"requestHeaders\"]);\n\n\t// chrome.webRequest.onBeforeRedirect.addListener(this.before_redirect = (details) =>{\n\t// \t// console.log(details.url,\"onBeforeRedirect\");\n\t// \tthis.handleRequest(details);\n\t// \tdelete this.request_list[details.requestId];\t\t\t\t\t\t\t//释放\n\n\t// },{urls:this.filters.urls},[\"responseHeaders\"]);\n\n\t// chrome.webRequest.onCompleted.addListener(this.complete = (function(details){\n\t// \t// console.log(details.url,\"onComplete\");\n\t// \tthis.handleRequest(details);\n\t// \tdelete this.request_list[details.requestId];\t\t\t\t\t\t\t//释放\n\n\t// }).bind(webrequest),{urls:this.filters.urls},[]);\n\t\t\n\t// chrome.webRequest.onErrorOccurred.addListener(this.error_occurred = (function(details){\n\t// \t// console.log(details.url,\"onErrorOccurred\");\n\t// \tdelete this.request_list[details.requestId];\n\t// }).bind(webrequest),{urls:this.filters.urls});\n\n\t// return true;\n}).bind(webrequest);\n\n\nwebrequest.clearHook = (function(){\n\tchrome.webRequest.onBeforeRequest.removeListener(this.before_request);\n\tchrome.webRequest.onSendHeaders.removeListener(this.send_headers);\n\tchrome.webRequest.onCompleted.removeListener(this.before_redirect);\n\tchrome.webRequest.onCompleted.removeListener(this.complete);\n\tchrome.webRequest.onCompleted.removeListener(this.error_occurred);\n\treturn true;\n}).bind(webrequest);\n\n\n\nmodule.exports = webrequest;\n\n//# sourceURL=webpack:///./modules/webrequest.js?");

/***/ })

/******/ });