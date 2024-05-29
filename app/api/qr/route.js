export const dynamic = 'force-dynamic';

import {connect} from "@/config/db";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request){
    try {
        const reqBody = await request.json()
        const {data} = reqBody

        const isExpired = new Date(data.date) < new Date(Date.now() - 5 * 60 * 1000);
        console.log(isExpired)
        const user = await User.findOne({email: data.email}).populate('abonement');
        if (!user) {
            console.log('ne user')
            return NextResponse.json({message: "Deny", success: false})
        }
        const isAbonementPayed = new Date(user.abonement_payed_until) > new Date();

        if (
            !user
            || !user.abonement
            || isExpired
            || user.abonement._id.toString() !== data.abonement_id
            || !isAbonementPayed
        ) {
            return NextResponse.json({message: "Deny", success: false})
        }

        const response = NextResponse.json({
            message: "Success",
            success: true,
        })

        return response;

    } catch (error) {
        console.log(error)
        return NextResponse.json({error: error.message}, {status: 500})

    }
}