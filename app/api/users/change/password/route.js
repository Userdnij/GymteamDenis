export const dynamic = 'force-dynamic';

import {connect} from "@/config/db";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

connect()

export async function POST(request){
    try {
        const reqBody = await request.json()
        const {email, oldPassword, newPassword} = reqBody

        const user = await User.findOne({email})

        if(!user){
            console.log("User does not exist");
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }

        const validPassword = await bcryptjs.compare
        (oldPassword, user.password)
        if(!validPassword){
            console.log("Invalid password");
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        const response = NextResponse.json({
            message: "Password changed successfully",
            success: true,
        })

        return response;

    } catch (error) {
        console.log(error)
        return NextResponse.json({error: error.message}, {status: 500})

    }
}