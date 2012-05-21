/**
 * Window template for each demo. Creates a new window, with a toolbar if is under iPhone platform,
 * inserts a ViewTemplateDemo and finally creates the demo view.
 */


var Mods = require('ModulePaths');

var Tools = require(Mods.TOOLS),
	$$ = require(Mods.STYLES);

var blankLabel = function(){
	return Ti.UI.createLabel({text:'ERROR: Demo not defined'});
}

module.exports = function(args) {

	var args = args || {};
	
	args.title = args.title || '';
	
	args.demo = args.demo || {
		createView: blankLabel
	}
	
	var win = Ti.UI.createWindow(Tools.combine($$.WINDOW_DEMO, args));
	
	//if iphone or ipad, set close button
	if(Ti.Platform.osname !== 'android'){
		
		var btnClose = Ti.UI.createButton({
			title:'Close',
			top:10, right:40,
			width:Ti.UI.SIZE,
			zIndex:99
		});
	
		btnClose.addEventListener('click', function() {
			win.close();
		});	
		
		if(Ti.Platform.osname === 'iphone'){
			win.rightNavButton = btnClose;	
		}
		
		if(Ti.Platform.osname === 'mobileweb'){
			win.add(btnClose);	
		}
	}

	var scroll = Ti.UI.createScrollView($$.SCROLLDEMO_VIEW);
	
	scroll.add(args.demo.createView());
	
	win.add(scroll);

	return win;
}
