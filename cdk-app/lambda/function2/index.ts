import { APIGatewayProxyHandler } from 'aws-lambda'
import * as dayjs from 'dayjs'

const handler: APIGatewayProxyHandler = async (event) => {

    console.log('event:', event);
    console.log('env variable:', process.env);
    console.log('now:', dayjs().format('YYYY年MM月DD日 hh時mm分'));

    return {
        statusCode: 200,
        body: 'success'
    }
}

exports.handler = handler

