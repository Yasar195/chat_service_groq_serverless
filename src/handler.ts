import {APIGatewayEvent, Context, Callback} from 'aws-lambda';
import { responsetype, chatInput } from './dto/dto';
import { chat } from './logic/chat';

export const handler = async (event: APIGatewayEvent, context: Context, callback: Callback)=> {

    try {
        if(!event.body) {
            (() => { throw new Error("Request body is missing.") })();
        }

        const body: chatInput = JSON.parse(event.body);
        
        if(!body.message) {
            (() => { throw new Error("Request body is malformed.") })();
        }

        const chatresponse = await chat( { message: body.message } );

        
        const response = {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(chatresponse)
        }

        return response;
    }
    catch(error) {
        const errbody: responsetype<null> = {
            success: false,
            message: "Internal server error",
            data: null,
            error: (error instanceof Error) ? error.message : String(error)
        }

        const response = {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(errbody)
        }
    
        return response;   
    }
}