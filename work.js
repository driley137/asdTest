// Dustin S. Riley   ASD1408   Week4

// Install Local Database
Ti.Database.install('lclDatabase.sqlite', 'localDB');

var tblData = [];

var apiSuccess = function(){
	// Variables to drill into Data (from API)
	var response = JSON.parse(this.responseText);
	var postInfo = response.data.children;
	alert('apiSuccess called.');
	
	// OPEN DB
	var DB = Ti.Database.open('localDB');
	
	var tblRows = DB.execute('SELECT id, title, author FROM lclTable');
	while (tblRows.isValidRow()) {
		tblData.push({
			id: tblRows.fieldByName('id'),
			title: tblRows.fieldByName('title'),
			author: tblRows.fieldByName('author'),
		}); //   END   PUSH
		tblRows.next(); // Check to see if another row is present.
	}; // END WHILE LOOP
	// Close and Clean up
	tblRows.close();

	// Push API info into DB
	DB.execute('INSERT INTO lclTable(title, author) VALUES(?,?)', postInfo.title, postInfo.author);

	
	// Add scrollView to the main window.		
	uiFile.mainWin.add(
			uiFile.mainScroll
	);  //   END  m a i n W i n d o w . a d d


	// Loop to add information per post
	for (var i = 0; i < postInfo.length; i++){
		var title = postInfo[i].data.title;
		// var img = postInfo[i].data.url;
		// var upvote = postInfo[i].data.ups;
		// var postText = postInfo[i].data.selftext;
		// var endURL = img.substring((img.length - 3), img.length);
			
		// if(endURL === "jpg" || endURL === "png" || endURL === "gif"){
				// View to put behind the labels. Using views so I can offset the text labels easier.
				var textView = Ti.UI.createView({
					backgroundColor: grayColor,
					top: ".30%",
					left: 2,
					right: 2,
					height: 50,
					verticalAlign: "center",
					title: title
				});   //   END   t e x t V i e w
				
				// Labels to be added to the Scroll View
				var textLabel = Ti.UI.createLabel({
					text: title,
					color: ltblueColor,
					font: {fontSize: 16, fontFamily: ("tahoma")},
					left: 10,
					top: 5,
					title: title
				});   //   END    t e x t L a b e l
				
				// ------------------------------------------ Adding Children to Parents ( MAIN WINDOW )
				
				textView.add(
						textLabel
				);  //   END   t e x t V i e w . a d d
				
				uiFile.mainScroll.add(
						textView
				);  //   END   s c r o l l V i e w . a d d
			
				// EventListener to Scroll View to open new window with info.
				// textView.addEventListener('click', infoWinFunc);

			// }// END OF IF
	
		
	}; //  END  FOR LOOP FOR postInfo
	
	// Initiate
	uiFile.mainWin.open();
}; // ------------------------------------------------------ End Success Function / mainWin opening


// Function to notify if the API request fails.
var apiError = function(){
	alert("Something isn't right. I can't pull info from Reddit.");
};

// Exports
exports.errorCall = apiError;
exports.successCall = apiSuccess;
