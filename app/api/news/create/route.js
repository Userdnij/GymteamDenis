import {connect} from "@/config/db";
import News from "@/models/news";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request){
    try {
        const reqBody = await request.json();
        const {text, title} = reqBody;
        const news = await News.create({
            title: title,
            text: text,
            date: new Date()
        });

        const response = NextResponse.json({
            news: news
        });

        return response;
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: error.message}, {status: 500})

    }
}