config = require('config');
const FILE_INFO = 'Logger Utils';


var get = () => {
    const FUN_LABEL = `\n\t getLogger ${FILE_INFO} \n\t`; 
    // console.log(`${FUN_LABEL} IN`);
    const log = require('simple-node-logger').createSimpleLogger();
    log.setLevel(config.log_level);
    // console.log(`${FUN_LABEL} OUT`);
    return log;
}
module.exports = {
    get
};
