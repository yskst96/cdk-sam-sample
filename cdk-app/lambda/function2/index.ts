import { APIGatewayProxyHandler } from 'aws-lambda'

const handler: APIGatewayProxyHandler = async (event) => {


    return {
        statusCode: 200,
        body: 'success'
    }
}

exports.handler = handler

