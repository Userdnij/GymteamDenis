import {connect} from "@/config/db";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request){
    try {
        const reqBody = await request.json()
        const {oldEmail, newEmail, vards, uzvards, talrunis} = reqBody

        const user = await User.findOne({email: oldEmail})

        if(!user){
            console.log("User does not exist");
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }

        user.email = newEmail;
        user.vards = vards;
        user.uzvards = uzvards;
        user.talrunis = talrunis;
        await user.save();

        const response = NextResponse.json({
            message: "Password changed successfully",
            success: true,
            user: user
        })

        return response;

    } catch (error) {
        console.log(error)
        return NextResponse.json({error: error.message}, {status: 500})

    }
}