var fs = require('fs');
var path = require('path');

function ensureAppComponent(webpackFile) {
    console.log("ensureAppComponent =>  webpackFile: "+webpackFile+ "  exists: "+fs.existsSync( webpackFile ));
    if (fs.existsSync( webpackFile )) {
        var contents = fs.readFileSync(webpackFile).toString();
        let appComponents = contents.indexOf("appComponents.push");
        if (appComponents >= 0) {
            appComponentsArray = contents.indexOf("[", appComponents);
            if (appComponentsArray > appComponents) {
                appComponentsArrayEnd = contents.indexOf("]", appComponentsArray);
                if (appComponentsArrayEnd > appComponentsArray) {
                    var arrStr = contents.substr(appComponentsArray, appComponentsArrayEnd-appComponentsArray+1);
                    arrStr = arrStr.replace(/\s+/g, "").replace(/\,\]/g,"]");
                    var arr = JSON.parse(arrStr);
                    if (arr.indexOf("@simplec-dev/nativescript-ssi-tv/activity")<0) {
                        arr.push("@simplec-dev/nativescript-ssi-tv/activity");
                        arrStr = (JSON.stringify(arr, null, "\t")).replace(/\]/,"\t]");
                        var s = contents.substr(0, appComponentsArray) + arrStr + contents.substr(appComponentsArrayEnd+1);
                        fs.writeFileSync(webpackFile, s);
                    }
                }
            }
        }
    }
}

module.exports = function (hookArgs, $projectData) {
    var webpackFile = path.join($projectData.projectDir, "webpack.config.js");
    ensureAppComponent(webpackFile);

  return null;
};
