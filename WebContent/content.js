/*
 * Copyright 2011 Gildas Lormeau
 * contact : gildas.lormeau <at> gmail.com
 * 
 * This file is part of PageEdit.
 *
 *   PageEdit is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU Lesser General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   PageEdit is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU Lesser General Public License for more details.
 *
 *   You should have received a copy of the GNU Lesser General Public License
 *   along with PageEdit.  If not, see <http://www.gnu.org/licenses/>.
 */

var EXT_ID = "pageedit";

var port = chrome.extension.connect();

function toggleEditor(options) {
	var script = document.createElement("script");
	script.setAttribute("type", "text/javascript");
	script.setAttribute("src", chrome.extension.getURL("scripts/inject_editor.js") + "#" + ("" + Math.random()).split(".")[1]);
	script.addEventListener("load", function() {
		postMessage(EXT_ID + "::" + JSON.stringify({
			toggleEditor : true,
			extensionURI : chrome.extension.getURL(""),
			configScript : chrome.extension.getURL("scripts/ckeditor_config.js"),
			scripts : [ "ckeditor/ckeditor.js", "plugins/codemirror/js/codemirror.js", "plugins/codemirror/plugin.js" ],
			options : options
		}), "*");
	});
	document.head.appendChild(script);
}

port.onMessage.addListener(function(msg) {
	toggleEditor(msg.options);
});

port.postMessage({
	init : true
});