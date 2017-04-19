# loki-cordova-fs-adapter [![npm version](https://badge.fury.io/js/loki-cordova-fs-adapter.svg)](https://badge.fury.io/js/loki-cordova-fs-adapter)

### NOTE: I don't use this plugin anymore since I moved to React Native.

FileSystem adapter for LokiJS database persistence on Cordova.

Dependency: https://github.com/apache/cordova-plugin-file

Based on the code from https://github.com/annoyingmouse/lokiFileSystemAdapter


### Usage
#### import file
`bin/loki-cordova-fs-adapter.js`

#### options
- `prefix`
specify the persistence filename prefix

- `dataDirectory`
specify the persistence file directory, default `cordova.file.dataDirectory`

```
var adapter = new lokiCordovaFsAdapter({
	"prefix": "loki",
	"dataDirectory": cordova.file.documentsDirectory
});

var db = new loki("dbname", {adapter: adapter});
```

