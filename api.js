// Dustin S. Riley  ASD 1408  Week4


// URL Variable of the subreddit being pulled in. (This can be changed)
var url = "http://api.reddit.com/r/food";


// Function that veries the HTTPClient is working.
var redditCall = Ti.Network.createHTTPClient({
	onload: workFile.successCall,
	onerror: workFile.errorCall,
	timeout: 5000
});

// Pulling information from the API
redditCall.open('GET', url);

// Send so server knows theres a response.
redditCall.send();
