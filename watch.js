const args = process.argv.slice(2);

if (!args.length){
    console.log('config name undefined')
    exit()
}

const configName = args[0]
let configPath = ''
let config = {};

const os = require('os');
const { exit } = require('process');
switch (os.platform()) {
    case 'linux':
        configPath = os.homedir() + '/Projects/__configs__/' + configName
        config = require(configPath);
    break;
    case 'win32':
        configPath = 'C://__configs__/' + configName
        config = require(configPath);
    break;
}



function change(){
    if ('copy' in config){
        // var path = require('path');
        var ncp = require('ncp').ncp;

        // ncp.limit = 16;

        var srcPath = config.watch; //current folder
        var destPath = config.copy; //Any destination folder

        console.log('Copying files...');
        ncp(srcPath, destPath, function (err) {
            if (err) {
                return console.error(err);
            }
            console.log('Copying files complete.');
        });
    }
}



if ('watch' in config){
    var chokidar = require('chokidar');
    var watcher = chokidar.watch(config.watch, {ignored: /^\./, persistent: true});

    watcher
        .on('add', change)
        .on('change', change)
        .on('unlink', change)
}
