config = require('config');
const FILE_INFO = 'Logger Utils';
opts = {
    logFilePath:'./mylogfile.log',
    timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
}

var get = () => {
    const FUN_LABEL = `\n\t getLogger ${FILE_INFO} \n\t`; 
    // console.log(`${FUN_LABEL} IN`);
    const log = require('simple-node-logger').createSimpleLogger(opts);
    log.setLevel(config.log_level);
    // console.log(`${FUN_LABEL} OUT`);
    return log;
}
module.exports = {
    get
};
