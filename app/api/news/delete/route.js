export const dynamic = 'force-dynamic';

import {connect} from "@/config/db";
import News from "@/models/news";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request){
    try {
        const reqBody = await request.json();
        const {_id} = reqBody;
        await News.deleteOne({_id});

        const response = NextResponse.json({
            message: "News deleted",
            success: true
        });
        return response;
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: error.message}, {status: 500})

    }
}