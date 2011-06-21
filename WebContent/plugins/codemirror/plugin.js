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

/**
 * @fileOverview The "sourcearea" plugin. It registers the "source" editing
 *               mode, which displays the raw data being edited in the editor.
 */

CKEDITOR.plugins.add('codemirrorarea', {
	requires : [ 'editingblock' ],

	init : function(editor) {
		var sourcearea = CKEDITOR.plugins.codemirrorarea, win = CKEDITOR.document.getWindow();

		editor.on('editingBlockReady', function() {
			var textarea, onResize;

			editor.addMode('source', {
				load : function(holderElement, data) {
				editor.textarea = textarea = new CKEDITOR.dom.element('textarea');
				textarea.setAttributes( {
					dir : 'ltr',
					tabIndex : editor.tabIndex,
					'role' : 'textbox',
					'aria-label' : editor.lang.editorTitle.replace('%1', editor.name)
				});
				textarea.addClass('cke_source');
				textarea.addClass('cke_enable_context_menu');

				var styles = {
					width : '100%',
					height : '100%',
					resize : 'none',
					outline : 'none',
					'text-align' : 'left'
				};
				
				holderElement.setHtml('');
				holderElement.append(textarea);
				textarea.setStyles(styles);

				editor.fire('ariaWidget', textarea);

				textarea.on('blur', function() {
					editor.focusManager.blur();
				});

				textarea.on('focus', function() {
					editor.focusManager.focus();
				});

				// The editor data "may be dirty" after this point.
				editor.mayBeDirty = true;

				// Set the <textarea> value.
				this.loadData(data);

				var keystrokeHandler = editor.keystrokeHandler;
				if (keystrokeHandler)
					keystrokeHandler.attach(textarea);

				textarea.codeMirror = CodeMirror.fromTextArea(editor.textarea.$, {
					parserfile : [ "parsexml.js", "parsecss.js", "tokenizejavascript.js", "parsejavascript.js", "parsehtmlmixed.js" ],
					stylesheet : [ CKEDITOR.basePath + "../plugins/codemirror/css/xmlcolors.css",
							CKEDITOR.basePath + "../plugins/codemirror/css/jscolors.css",
							CKEDITOR.basePath + "../plugins/codemirror/css/csscolors.css" ],
					path : CKEDITOR.basePath + "../plugins/codemirror/js/"
				});				

				setTimeout(function() {
					editor.mode = 'source';
					editor.fire('mode');
				}, 0);
			},

			loadData : function(data) {
				textarea.setValue(data);
				editor.fire('dataReady');
			},

			getData : function() {
				return textarea.codeMirror.getCode();
			},

			getSnapshotData : function() {
				return textarea.getValue();
			},

			unload : function(holderElement) {
				editor.textarea = textarea = null;

				if (onResize) {
					editor.removeListener('resize', onResize);
					win.removeListener('resize', onResize);
				}

				if (CKEDITOR.env.ie && CKEDITOR.env.version < 8)
					holderElement.removeStyle('position');
			},

			focus : function() {
				textarea.codeMirror.focus();
			}
			});
		});

		editor.addCommand('source', sourcearea.commands.source);

		if (editor.ui.addButton) {
			editor.ui.addButton('Source', {
				label : editor.lang.source,
				command : 'source'
			});
		}

		editor.on('mode', function() {
			editor.getCommand('source').setState(editor.mode == 'source' ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF);
		});
	}
});

/**
 * Holds the definition of commands an UI elements included with the sourcearea
 * plugin.
 * 
 * @example
 */
CKEDITOR.plugins.codemirrorarea = {
	commands : {
		source : {
			modes : {
				wysiwyg : 1,
				source : 1
			},

			exec : function(editor) {
				if (editor.mode == 'wysiwyg')
					editor.fire('saveSnapshot');
				editor.getCommand('source').setState(CKEDITOR.TRISTATE_DISABLED);
				editor.setMode(editor.mode == 'source' ? 'wysiwyg' : 'source');
			},

			canUndo : false
		}
	}
};
