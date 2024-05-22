import {connect} from "@/config/db";
import Message from "@/models/message";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request){
    try {
        const reqBody = await request.json();
        const {_id} = reqBody;

        await Message.deleteOne({_id: _id});

        const response = NextResponse.json({
            success: true
        });

        return response;
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: error.message}, {status: 500})

    }
}