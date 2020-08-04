'use strict'
import { APIGatewayProxyHandler } from 'aws-lambda'

export const handler: APIGatewayProxyHandler = async (event) => {

    console.log("lambda1 start");
    console.log(event);

    return {
        statusCode: 200,
        body: "success"
    }
}
