
# Enhance CP Tools

A script that injects useful tools into the Enhance CP under a 'Tools' menu. Uses the Enhance API to show data.


## Demo Visual
![Demo SS](https://i.ibb.co/HhGQScX/Screenshot-2023-01-25-at-6-22-32-PM.png)



## Deployment

To add this to your installation, currently the only way is to modify the index.html file on your Control Panel server:
```
/var/www/control-panel/ui/index.html
```

Add the following (CDN by jsDelivr) between the `<head></head>` section.

```
<script src="https://cdn.jsdelivr.net/gh/ss88uk/enhancecp-tools@stable/load.js"></script>
```
