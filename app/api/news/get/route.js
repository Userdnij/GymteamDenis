export const dynamic = 'force-dynamic';

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

        response.headers.set('cache', 'no-store');
        return response;
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: error.message}, {status: 500})

    }
}
