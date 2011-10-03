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

CKEDITOR.editorConfig = function(config) {
	config.toolbar_CustomFull = [ [ 'Source', '-', 'Save', 'NewPage', 'DocProps', 'Preview', '-', 'Templates', 'Print' ],
			[ 'Undo', 'Redo', '-', 'Find', 'Replace', '-', 'SelectAll', 'RemoveFormat' ],
			[ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField' ],
			[ 'Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak' ], '/',
			[ 'Bold', 'Italic', 'Underline', 'Strike', '-', 'Subscript', 'Superscript' ],
			[ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', 'Blockquote' ], [ 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ],
			[ 'Link', 'Unlink', 'Anchor' ], [ 'Styles', 'Format', 'Font', 'FontSize' ], [ 'TextColor', 'BGColor' ], [ 'ShowBlocks' ] ];

	config.toolbar_CustomBasic = [ [ 'Source', '-', 'Save', 'NewPage', 'DocProps', 'Preview', '-', 'Templates' ],
			[ 'Bold', 'Italic', 'Underline', 'Strike', '-', 'Subscript', 'Superscript' ], [ 'NumberedList', 'BulletedList' ],
			[ 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ], [ 'Link', 'Unlink', 'Anchor' ], [ 'Styles', 'Format', 'Font', 'FontSize' ],
			[ 'TextColor', 'BGColor' ], [ 'ShowBlocks' ] ];

	config.fullPage = true;
	config.startupFocus = true;
	CKEDITOR.config.extraPlugins = "codemirrorarea,tableresize,docprops,stylesheetparser";
};
