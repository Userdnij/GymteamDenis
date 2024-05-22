import {connect} from "@/config/db";
import Message from "@/models/message";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request){
    try {
        const reqBody = await request.json();
        const {name, surname, email, text} = reqBody;

        const message = await Message.create({
            name: name,
            surname: surname,
            email: email,
            message: text,
            date: new Date()
        });

        const response = NextResponse.json({
            message: message
        });

        return response;
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: error.message}, {status: 500})

    }
}