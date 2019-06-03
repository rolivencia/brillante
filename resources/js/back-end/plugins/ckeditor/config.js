/*
Copyright (c) 2003-2011, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.editorConfig = function( config )
{
	// Define changes to default configuration here. For example:
	//config.language = 'fr';
	//config.uiColor = '#AADC6E';
    /*config.extraPlugins = 'autogrow';
    config.autoGrow_maxHeight = false;
	config.autoGrow_minHeight = 16;
    config.autoGrow_onStartup = true;*/
    config.skin = 'bootstrapck';
    config.width = '100%';
    /*config.entities = false;
    config.entities_greek = false;*/
    /*config.entities_latin = false;*/
    config.enterMode = CKEDITOR.ENTER_BR;
    config.autoParagraph = false;
    config.tabSpaces = 4;
    config.ignoreEmptyParagraph = true;
    config.toolbar = [
            			['Bold','Italic','Underline'],
            			['FontSize','TextColor','BGColor','RemoveFormat','Styles','Format'],
            			['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock','Image'],
                        '/',
            			['NumberedList','BulletedList','HorizontalRule'],
                        ['Cut','Copy','Paste','PasteText','PasteFromWord','-','Undo','Redo'],
            			['Table'],
                        ['Outdent','Indent'],            			
            			['Link','Unlink'],
                        ['Undo','Redo'],
            			['Source'],
            			['Maximize', 'ShowBlocks','-','About' ]
            		];
    config.removePlugins = 'elementspath,resize';
    /*config.sharedSpaces = {top : 'contenedorToolbarCKE_cn'};*/
    config.toolbarCanCollapse = false;
    config.fullPage = false;
    config.disableNativeTableHandles = true;
    //config.readOnly = true;
        
    config.filebrowserBrowseUrl = '/js/back-end/plugins/kcfinder/browse.php?type=files';
    config.filebrowserImageBrowseUrl = '/js/back-end/plugins/kcfinder/browse.php?type=images';
    config.filebrowserFlashBrowseUrl = '/js/back-end/plugins/kcfinder/browse.php?type=flash';
    config.filebrowserUploadUrl = '/js/back-end/plugins/kcfinder/upload.php?type=files';
    config.filebrowserImageUploadUrl = '/js/back-end/plugins/kcfinder/upload.php?type=images';
    config.filebrowserFlashUploadUrl = '/js/back-end/plugins/kcfinder/upload.php?type=flash';
};