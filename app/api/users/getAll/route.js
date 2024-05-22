import {connect} from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";

connect()

export async function GET(request){
    try {
        const query = request.nextUrl.searchParams;

        const search = query.get('search') || '';

        const users = await User.find({
            $or: [
                { vards: { $regex: search, $options: 'i' } },
                { uzvards: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ]
        });

        const response = NextResponse.json({
            users: users
        });

        return response;

    } catch (error) {
        console.log(error)
        return NextResponse.json({error: error.message}, {status: 500})

    }
}