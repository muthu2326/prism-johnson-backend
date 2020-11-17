var request = require("request");
exports.sendSMS = (phone_numbers, msg) => {
    let smsContent = `TestSMS2ENcoded`;
    var options = {
        method: 'GET',
        url: `http://bhashsms.com/api/sendmsg.php?user=prismcement&pass=pcl@2017&sender=PRISMC&phone=8095794281&text=${encodeURI(smsContent)}&priority=ndnd&stype=normal`,
        // headers: {
        //     'x-auth-client': "",
        //     'x-auth-token': ""
        // }
    };

    request(options, function(error, response, body) {
        if (error) {
            // throw new Error(error);
            console.log("Could not send SMS")
        }
            console.log("SMS has been sent");
            console.log('response', JSON.stringify(response))
    });
}