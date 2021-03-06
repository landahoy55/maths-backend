import { Router } from 'express';
import Device from '../model/deviceid';

//import package
var apn = require('apn');

export default ({ config, db }) => {

    let api = Router();


    //Record device ID
    //When user accepts notifications record device ID in db
    //Anonymised, everyone get the messages - amend Account model if any logic needs to happen
    //Handle dupliactes here.
    api.post('/deviceids', (req, res) => {

        //will not add duplicate records - thanks to upsert - this can be done with FindOneAndUpdate if issues arrise
        Device.update({'deviceid':req.body.device},
                      {$setOnInsert: {'deviceid':req.body.device}},
                      {upsert: true},
                      function(err, device){
                          if (err) {
                              res.send(err)
                          }
                          res.send(device)
                      });

        //findOneAndUpdate along with upsert will check for dupes

        // will save  duplicates if a device deletes app and install again...
  

    });

    //Send a push notification - with alert as a JSON body
    //TODO: Loop over device collection
    //Guidance on multiple devices - https://github.com/node-apn/node-apn/issues/128
    //EventEmmitter Memory leak - http://www.jongleberry.com/understanding-possible-eventemitter-leaks.html
    //Possibly change to a different package? at the bottom https://github.com/node-apn/node-apn/issues/518
    api.post('/send', (req, res) => {
        
        //set up options
        var options = {
            token: {
                key: "./dist/297Q6R63U6.p8",
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
        notification.alert = req.body.alert
        notification.topic = "com.landahoy55.maths-app";
        notification.sound = "ping.aiff"

        //Find all device tokens - duplicates handled on creation
        var devicesToNotify = [];
        
        Device.find({}, (err, devices) => {
            //loop over decives add to array
            
            devices.forEach((device) => {
                console.log("Device id...", device.deviceid)
                devicesToNotify.push(device.deviceid)
            })
        
            console.log("ARRAY", devicesToNotify);

                apnProvider.send(notification, devicesToNotify).then( (result) => {
                //response.sent is array containing successful device tokens
                    result.sent.forEach( (token) => {
                        console.log("Sent ok", token)
                        res.send({message: "sent"});
                    });

                    //response.failed is array of objects containing failed tokens and errors
                    result.failed.forEach((failure) => {
                        if (failure.error) {
                            console.log("Unable to send - likely network issue")
                        } else {
                            console.log(failure.status)
                            console.log(failure.response)
                        }
                    });
                //memory leak appearing in console without shutting down provider
                //http2 issue?
                apnProvider.shutdown()
            });
        });
    });

    return api;

}