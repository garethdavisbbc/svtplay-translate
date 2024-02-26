# svtplay-translate

This is a quick and dirty hack put together to run the subtitles in SVT Play through Google Translate, primarily to enhance enjoyment of watching Melodifestivalen when there isn't an English commentary available. But once installed it should translate most live or VOD subtitles on the player.

This project is my own work, and is in no way endorsed or supported by Sveriges Television or Google. It may even break the terms of service for either or both platforms, and should be used entirely at your own risk.

The project takes the form of browser plugins that need to be side loaded into Chrome using the extension development options, as they have not been packaged and released as formal extensions.

There are two versions of the plugin. The first uses the free API from Google Translate which is rate limited, and may not be fast enough to keep up with live subtitling as it can take up to 3 seconds to return a translation.

The second version uses the paid version of the Google Translate API, and requires you to provide your own API key in the top of the background.js file. The paid API usually returns a translation within 0.2 seconds, and so is better able to keep up with live subtitles.

There are plenty of guides online of how to get a Google Translate API key, and I've found that you can get a months worth of Melfest within the free 'half a millon' translation characters the Google API gives you each month. So unless you start going through the SVT back catalogue, you'll only get a $0 bill from Google each month if you stick to watching Melfest - and don't share your key! 

## Installation

### How to install the free version
1. Go to the green Code button above, and download the zip file.
2. Extract the zip file somewhere on your hard drive, you should have an svtplay-translate-main folder containing the two plugin folders.
3.	Open chrome, open the address Chrome:Extensions
4.	Turn on developer mode on the right hand side if not already done so
5.	Click Load Unpacked, and browse to the svtplay-translate-main\svtplay-translate-free folder and choose ‘select folder’
6.	You may get a warning that the extension needs to access svtplay.se and google.com, accept this.
7.	Browse to something available internationally - The news programme Rapport is usually available: https://www.svtplay.se/rapport
9.	Once playing, turn on Undertexter Svenska from the subtitle icon bottom right player toolbar.
10. Subtitles should start being replaced with English translations

The plugin can be left installed, it will only activate on svtplay.se pages. 

•	To remove the plugin, go back to Chrome:Extensions and click the remove button on the plugin.

### How to install non free version
Installing the paid version is the same, other than you need to open the file svtplay-translate-main\svtplay-translate\background.js in a text editor, and insert your API key in the third line where the API key is currently blank - it needs to go between the quotation marks.

## Known issues
•	Free version screws up the translation if the original text contans a % sign, I'm probably not escaping it correctly before sending.

•	Colour changes are not handled correctly - they are so rarely used by SVT I've not seen enough examples to allow for them in the code
