import { Router } from 'express';
var apn = require('apn');


export default ({ config, db }) => {

    let api = Router();

    api.post('/test', (req, res) => {
        //post notification
        
        //set up options
        var options = {
            token: {
                key: "297Q6R63U6.p8",
                keyId: "297Q6R63U6",
                teamId: "6YRYEG2DL8"
            },
            production: false
        }

        //only one instance of provider required
        var apnProvider = new apn.Provider(options);
        
        //create a notification
        var notification = new apn.Notification();
        //set bits
        notification.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
        notification.alert = "Test";
        notification.topic = "com.landahoy55.maths-app";
        notification.sound = "ping.aiff"

        let deviceToken = "719E021E48CC4735CC1595C504AB8ADDFDA8609498FC6FC0D14A0CA89716A93F"

        apnProvider.send(notification, deviceToken).then( (result) => {
            //response.sent is array containing successful device tokens
            result.sent.forEach( (token) => {
                console.log("Sent ok", token)
                // notificationSent(user, token)
            });

            //response.failed is array of objects containing failed tokens and errors
            result.failed.forEach((failure) => {
                if (failure.error) {
                    console.log("Unable to send - likely network issue")
                } else {
                    console.log(failure.status)
                    console.log(failure.response)
                }
            })
        });
    });

    return api;

}