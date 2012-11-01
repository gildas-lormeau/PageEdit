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

var tabs = [];

function getOptions() {
	return localStorage.options ? JSON.parse(localStorage.options) : {
		skin : "kama",
		toolbar : "CustomFull"
	};
}

function setOptions(options) {
	localStorage.options = JSON.stringify(options);
}

chrome.browserAction.onClicked.addListener(function(tab) {
	tabs[tab.id].port.postMessage({
		toggleEditor : true,
		options : getOptions()
	});
});

chrome.extension.onConnect.addListener(function(port) {
	port.onMessage.addListener(function(msg) {
		if (msg.init)
			tabs[port.sender.tab.id] = {
				port : port
			};
	});
});

chrome.tabs.onRemoved.addListener(function(tabId) {
	if (tabs[tabId])
		delete tabs[tabId];
});