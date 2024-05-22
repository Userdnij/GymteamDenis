import {connect} from "@/config/db";
import Training from "@/models/training";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request){
    try {
        const reqBody = await request.json()
        const {date, startTime, endTime, price, trener} = reqBody

        const training = new Training({
            date,
            startTime,
            endTime,
            price,
            trener
        });

        const savedTraining = await training.save()

        const response = NextResponse.json({
            message: "Training created successfully",
            success: true,
            training: savedTraining
        })

        return response;

    } catch (error) {
        console.log(error)
        return NextResponse.json({error: error.message}, {status: 500})

    }
}