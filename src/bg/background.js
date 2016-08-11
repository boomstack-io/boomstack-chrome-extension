
const heartIconPath = 'icons/heart32.png';
const empyHeartIconPath = 'icons/heart2_32.png';

//loading animation :
let image_index = 0;
let keep_switching_icon = true;
const loading_images = ['icons/loading1.png',
                        'icons/loading2.png',
                        'icons/loading3.png',
                        'icons/loading4.png'];


chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
	if (change.status === 'complete') {
		var bookmarked = checkUrl(tab.url);
		console.log(tab.url + '  -->  ' + bookmarked);
		if (bookmarked) {
			chrome.browserAction.setIcon({tabId, path: heartIconPath});
		} else {
			chrome.browserAction.setIcon({tabId, path: empyHeartIconPath});
		}
	}
});

chrome.browserAction.onClicked.addListener( (tab) => {
	//console.log('browser action clicked');
	keep_switching_icon = true;
	rotateIcon(tab.id);
	setTimeout(() => {keep_switching_icon = false},5000);
})

function checkUrl(url) { //mockup
	if (url.length % 2 == 0) return true;
	else return false;
}


function rotateIcon(tabId)
{               
   if ( keep_switching_icon )
   {
   	  //console.log('switching...');
      chrome.browserAction.setIcon({tabId, path: loading_images[image_index]});
      image_index = (image_index + 1) % loading_images.length;
      window.setTimeout(() => {rotateIcon(tabId)}, 300);
   }
}