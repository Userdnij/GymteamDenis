import {connect} from "@/config/db";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request){
    try {
        const reqBody = await request.json()
        const {email} = reqBody

        const user = await User.findOne({email})

        if(!user){
            console.log("User does not exist");
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }

        user.is_locked = !user.is_locked;
        await user.save();

        const response = NextResponse.json({
            message: "Locked status changed successfully",
            success: true,
            user: user
        })

        return response;

    } catch (error) {
        console.log(error)
        return NextResponse.json({error: error.message}, {status: 500})

    }
}