'use strict'
import { CloudWatchLogsHandler } from 'aws-lambda'

export const handler: CloudWatchLogsHandler = async (event) => {

    console.log("subscription lambda start");
    console.log(event);
}
