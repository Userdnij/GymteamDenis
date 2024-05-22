import {connect} from "@/config/db";
import Message from "@/models/message";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function GET(request){
    try {
        const messages = await Message.find({}).sort({ answered: 1 });

        const response = NextResponse.json({
            messages: messages
        });

        return response;
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: error.message}, {status: 500})

    }
}