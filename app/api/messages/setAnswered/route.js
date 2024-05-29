export const dynamic = 'force-dynamic';

import {connect} from "@/config/db";
import Message from "@/models/message";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request){
    try {
        const reqBody = await request.json();
        const {_id} = reqBody;

        const message = await Message.findOneAndUpdate({_id: _id}, {answered: true});
        const response = NextResponse.json({
            message: message
        });

        return response;
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: error.message}, {status: 500})

    }
}