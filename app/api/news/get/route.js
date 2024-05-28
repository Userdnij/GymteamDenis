import {connect} from "@/config/db";
import News from "@/models/news";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function GET(request){
    try {
        const news = await News.find({});

        const response = NextResponse.json({
            news: news
        });
        
        response.setHeader('Cache-Control', 'no-store');
        return response;
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: error.message}, {status: 500})

    }
}