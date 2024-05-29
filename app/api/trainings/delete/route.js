export const dynamic = 'force-dynamic';

import {connect} from "@/config/db";
import Training from "@/models/training";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request){
    try {
        const reqBody = await request.json()
        const {trainingId} = reqBody

        const training = await Training.findById(trainingId);

        if(!training){
            return NextResponse.json({message: "Training not found", success: false}, {status: 404})
        }

        await training.deleteOne()

        const response = NextResponse.json({
            message: "Training deleted successfully",
            success: true,
        })

        return response;

    } catch (error) {
        console.log(error)
        return NextResponse.json({error: error.message}, {status: 500})

    }
}