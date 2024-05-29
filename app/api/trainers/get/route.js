export const dynamic = 'force-dynamic';

import {connect} from "@/config/db";
import Training from "@/models/training";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";

connect()

export async function GET(request){
    try {
        const trainers = await User.find({role: 'treneris'});

        const response = NextResponse.json({
            trainers: trainers
        });

        return response;

    } catch (error) {
        console.log(error)
        return NextResponse.json({error: error.message}, {status: 500})

    }
}