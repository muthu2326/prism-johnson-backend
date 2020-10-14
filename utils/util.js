config = require('config');
const log = require('../utils/logger').get();
const FILE_INFO = 'Util';
const HINDI_LANG = 'hi';
const ENGLISH_LANG = 'en';

var formatJSONBasedOnLang = (content, requiredLang) => {
    const FUN_LABEL = `\n\t formatJSONBasedOnLang ${FILE_INFO} \n\t`; 
    if(!requiredLang) {
        requiredLang = null;
    }
    log.info(`${FUN_LABEL} IN`);
    log.info(`content ${JSON.stringify(content)}`);
    log.info(`requiredLang ${JSON.stringify(requiredLang)}`);
    let allKeys = [];
    let keysToBeRemoved = [];
    let keysToBeModified = [];
    let thisObject = {};
    let objects = [];
    try {
        if(content[0]['_options'] && content[0]['_options']['attributes']) {
            allKeys = content[0]['_options']['attributes'].filter(fieldName => {
                return fieldName;
            });
        } else {
            allKeys = Object.keys(content[0]);
        }
    } catch(e){
        log.error(`Unable to get all keys`);
        log.error(e);
        return content;
    }
    if(requiredLang === HINDI_LANG) {
        keysToBeRemoved = allKeys.filter(fieldName => {
            log.debug(`fieldName >>>> ${fieldName}`);
            if(fieldName.endsWith(ENGLISH_LANG)){
                return fieldName;
            }
        });
        keysToBeModified = allKeys.filter(fieldName => {
            // log.debug(`fieldName >>>> ${fieldName}`);
            if(fieldName.endsWith(HINDI_LANG)){
                return fieldName;
            }
        });
    } else {
        keysToBeRemoved = allKeys.filter(fieldName => {
            // log.debug(`fieldName >>>> ${fieldName}`);
            if(fieldName.endsWith(HINDI_LANG)) {
                return fieldName;
            }
        });
        keysToBeModified = allKeys.filter(fieldName => {
            // log.debug(`fieldName >>>> ${fieldName}`);
            if(fieldName.endsWith(ENGLISH_LANG)){
                return fieldName;
            }
        });
    }
    log.debug(`\n >>>>>>> allKeys ${JSON.stringify(allKeys)}`);
    log.debug(`\n >>>>>>> keysToBeRemoved ${JSON.stringify(keysToBeRemoved)}`);
    log.debug(`\n >>>>>>> keysToBeModified ${JSON.stringify(keysToBeModified)}`);

    content.forEach(element => {
        allKeys.forEach(e => {
            thisObject[e] = element[e];
        })
        log.debug(`\n\n >>>>>> before thisObject ${JSON.stringify(thisObject)}`);
        keysToBeRemoved.forEach(e => {
            thisObject[e] = undefined;
        })
        keysToBeModified.forEach(e => {
            newKey = e.slice(0, e.length-3);
            log.debug(`Generated key ${newKey}`);
            thisObject[newKey] = thisObject[e];
            log.debug(`thisObject[newKey] ${thisObject[newKey]}`);
            log.debug(`e ${e}`);
            thisObject[e] = undefined;
        })
        log.debug(`\n\n >>>>>> after thisObject ${JSON.stringify(thisObject)}`);
        objects.push(thisObject);
        thisObject = {};
    });
    log.info(`content ${JSON.stringify(objects)}`);
    console.log(`${FUN_LABEL} OUT`);
    return objects;
}
module.exports = {
    formatJSONBasedOnLang
};
