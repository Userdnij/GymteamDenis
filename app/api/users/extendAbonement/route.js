import {connect} from "@/config/db";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import Abonement from "@/models/abonement";

connect()

export async function POST(request){
    try {
        const reqBody = await request.json()
        const {_id, term} = reqBody
        const formattedTerm = parseInt(term);

        const user = await User.findOne({_id})

        if(!user){
            console.log("User does not exist");
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }

        const oldDate = new Date(user.abonement_payed_until);
        user.abonement_payed_until = oldDate.setMonth(oldDate.getMonth() + formattedTerm);

        await user.save();

        const response = NextResponse.json({
            message: "User updated successfully",
            success: true,
        })

        return response;

    } catch (error) {
        console.log(error)
        return NextResponse.json({error: error.message}, {status: 500})

    }
}