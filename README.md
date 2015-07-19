# loki-cordova-fs-adapter
FileSystem adapter for LokiJS database persistence on Cordova

Based on the code from https://github.com/annoyingmouse/lokiFileSystemAdapter


```js
var LokiCordovaFSAdapter = require("./cordova-file-system-adapter");

var adapter = new LokiCordovaFSAdapter({"prefix": "loki"});

var db = new loki("dbname", {adapter: adapter});
```

