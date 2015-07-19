class LokiCordovaFSAdapterError extends Error {}

const TAG = "[LokiCordovaFSAdapter]";

class LokiCordovaFSAdapter {
    constructor(options) {
        this.options = options;
    }

    saveDatabase(dbname, dbstring, callback) {
        console.log(TAG, "saving database");
        this._getFile(dbname,
            (fileEntry) => {
                fileEntry.createWriter(
                    (fileWriter) => {
                        fileWriter.onwriteend = () => {
                            if (fileWriter.length === 0) {
                                var blob = new Blob([dbstring], {type: "text/plain"});
                                fileWriter.write(blob);
                                callback();
                            }
                        };
                        fileWriter.truncate(0);

                    },
                    (err) => {
                        console.error(TAG, "error writing file", err);
                        throw new LokiCordovaFSAdapterError("Unable to write file" + JSON.stringify(err));
                    }
                );
            },
            (err) => {
                console.error(TAG, "error getting file", err);
                throw new LokiCordovaFSAdapterError("Unable to get file" + JSON.stringify(err));
            }
        );
    }

    loadDatabase(dbname, callback) {
        console.log(TAG, "loading database");
        this._getFile(dbname,
            (fileEntry) => {
                fileEntry.file((file) => {
                    var reader = new FileReader();
                    reader.onloadend = (event) => {
                        var contents = event.target.result;
                        if (contents.length === 0) {
                            console.warn(TAG, "couldn't find database");
                            callback(null);
                        }
                        else {
                            callback(contents);
                        }
                    };
                    reader.readAsText(file);
                }, (err) => {
                    console.error(TAG, "error reading file", err);
                    callback(new LokiCordovaFSAdapterError("Unable to read file" + err.message));
                });
            },
            (err) => {
                console.error(TAG, "error getting file", err);
                callback(new LokiCordovaFSAdapterError("Unable to get file: " + err.message));
            }
        );
    }

    _getFile(name, handleSuccess, handleError) {
        window.resolveLocalFileSystemURL(cordova.file.dataDirectory,
            (dir) => {
                let fileName = this.options.prefix + "__" + name;
                dir.getFile(fileName, {create: true}, handleSuccess, handleError);
            },
            (err) => {
                throw new LokiCordovaFSAdapterError(
                    "Unable to resolve local file system URL" + JSON.stringify(err)
                );
            }
        );
    }
}


export default LokiCordovaFSAdapter;
