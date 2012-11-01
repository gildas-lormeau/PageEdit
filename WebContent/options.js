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

function initOptions() {
	var bgPage = chrome.extension.getBackgroundPage(), options = bgPage.getOptions(), skinInput = document.getElementById("skinInput"), toolbarInput = document
			.getElementById("toolbarInput");
	skinInput.value = options.skin;
	skinInput.addEventListener("change", function() {
		options.skin = skinInput.value;
		bgPage.setOptions(options);
	});
	toolbarInput.value = options.toolbar;
	toolbarInput.addEventListener("change", function() {
		options.toolbar = toolbarInput.value;
		bgPage.setOptions(options);
	});
	document.getElementById('main').style.display = 'block';
}

addEventListener("load", initOptions, false);
