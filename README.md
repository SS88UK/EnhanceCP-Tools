
# Enhance CP Tools

A script that injects useful tools into the Enhance CP under a 'Tools' menu. Uses the Enhance API to show data.


## Demo Visual
![Screen Recording 2023-03-10 at 8 03 32 AM](https://user-images.githubusercontent.com/17299026/224324214-16eccd27-80a1-40d7-817a-9fb6b5ead660.gif)




## Deployment

To add this to your installation, currently the only way is to modify the index.html file on your Control Panel server:
```
/var/www/control-panel/ui/index.html
```

Add the following (CDN by jsDelivr) between the `<head></head>` section.

```
<script src="https://cdn.jsdelivr.net/gh/ss88uk/enhancecp-tools@stable/load.js"></script>
```
