import {connect} from "@/config/db";
import Training from "@/models/training";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";

connect()

export async function GET(request){
    try {
        const query = request.nextUrl.searchParams;

        const trener = query.get('trener');
        const client = query.get('client');
        const history = query.get('history');
        console.log(client)

        let trainings;

        if (trener) {
            trainings = await Training.find({trener: trener}).populate('client').populate('trener');
        } else if (client) {
            trainings = await Training.find({client: client}).populate('client').populate('trener');

            const now = new Date();

            trainings = trainings.filter(training => {
                const trainingStart = new Date(`${training.date}T${training.startTime}:00`);

                if (history) {
                    return trainingStart < now;
                }
                return trainingStart >= now;
            }).sort((a, b) => {
                const aStart = new Date(`${a.date}T${a.startTime}:00`);
                const bStart = new Date(`${b.date}T${b.startTime}:00`);

                if (history) {
                    return bStart - aStart;
                }
                return aStart - bStart;
            });


        }

        const response = NextResponse.json({
            trainings: trainings
        });

        return response;

    } catch (error) {
        console.log(error)
        return NextResponse.json({error: error.message}, {status: 500})

    }
}