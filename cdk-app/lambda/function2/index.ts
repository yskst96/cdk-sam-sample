import { APIGatewayProxyHandler } from 'aws-lambda'

const handler: APIGatewayProxyHandler = async (event) => {

    console.log('event:', event);
    console.log('env variable:', process.env);

    return {
        statusCode: 200,
        body: 'success'
    }
}

exports.handler = handler

