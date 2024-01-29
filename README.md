# svtplay-translate

This is a quick and dirty hack put together to run the subtitles in SVT Play through Google Translate, primarily to enhance enjoyment of watching Melodifestivalen when there isn't an English commentary available. But once installed it should translate most live or VOD subtitles on the player.

This project is my own work, and is in no way endorsed or supported by Sveriges Television or Google. It may even break the terms of service for either or both platforms, and should be used entirely at your own risk.

The project takes the form of browser plugins that need to be side loaded into Chrome using the extension development options, as they have not been packaged and released as formal extensions.

There are two versions of the plugin. The first uses the free API from Google Translate which is rate limited, and may not be fast enough to keep up with live subtitling as it can take up to 3 seconds to return a translation.

The second version ses the paid version of the Google Translate API, and requires you to provide your own API key in the top of the background.js file. The paid API usually returns a translation within 0.2 seconds, and so is better able to keep up with live subtitles.
