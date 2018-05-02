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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/client/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/client/ViewerLoader.js":
/*!************************************!*\
  !*** ./src/client/ViewerLoader.js ***!
  \************************************/
/*! exports provided: load */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"load\", function() { return load; });\nconst urn = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bW9kZWwyMDE4LTA0LTA2LTE5LTI3LTEyLWQ0MWQ4Y2Q5OGYwMGIyMDRlOTgwMDk5OGVjZjg0MjdlL2xhX21hcm1pdGVfXzEuc2tw';\nconst initialViewableIndex = 0;\n\nvar viewerApp;\nvar viewerObserver;\n\nfunction load(token) {\n    var options = {\n        env: 'AutodeskProduction',\n        accessToken: token.access_token\n    };\n\n    Autodesk.Viewing.Initializer(options, function onInitialized() {\n        viewerApp = new Autodesk.Viewing.ViewingApplication('viewer');\n        viewerApp.registerViewer(viewerApp.k3D, Autodesk.Viewing.Viewer3D);\n        viewerApp.loadDocument(urn, onDocumentLoadSuccess, onDocumentLoadFailure);\n    });\n}\n\nfunction onDocumentLoadSuccess(doc) {\n    let loadingData = viewerApp.bubble.search({'type':'geometry'});\n    if (loadingData.length === 0) {\n        throw 'Document contains no viewables';\n    }\n    viewerApp.selectItem(loadingData[initialViewableIndex].data, onViewableLoadSuccess, onViewableLoadFail);\n}\n\nfunction onDocumentLoadFailure(viewerErrorCode) {\n    throw ('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);\n}\n\nfunction onEverythingLoaded(e) {\n    viewerObserver.publish('VIEWER_TEXTURES_LOADED', e);\n}\n\nfunction onViewableLoadSuccess(viewer, viewable) {\n    viewerObserver.publish('VIEWER_LOADED', viewer);\n}\n\nfunction onViewableLoadFail(errorCode) {\n    throw ('onItemLoadFail() - errorCode:' + errorCode);\n}\n\n\n\n//# sourceURL=webpack:///./src/client/ViewerLoader.js?");

/***/ }),

/***/ "./src/client/index.js":
/*!*****************************!*\
  !*** ./src/client/index.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ViewerLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ViewerLoader */ \"./src/client/ViewerLoader.js\");\n\n\n$.getJSON('/auth', (data) => {\n    Object(_ViewerLoader__WEBPACK_IMPORTED_MODULE_0__[\"load\"])(data);\n})\n\n//# sourceURL=webpack:///./src/client/index.js?");

/***/ })

/******/ });