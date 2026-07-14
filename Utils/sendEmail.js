import {
    SendEmailCommand
} from "@aws-sdk/client-ses";

import sesClient from "./awsConfig.js";

export const sendEmail = async (message, reciver, subject) => {

    try {
        const params = {
            Source: process.env.EMAIL_FROM,

            Destination: {
                ToAddresses: [reciver]
            },

            Message: {
                Subject: {
                    Data: subject
                },

                Body: {
                    Text: {
                        Data: message
                    }
                }
            }
        };

        const command = new SendEmailCommand(params);

        const response = await sesClient.send(command);
        console.log("email sent successfully");
    } catch (error) {
        console.log(error);
    }


}
