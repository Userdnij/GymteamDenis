import {connect} from "@/config/db";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect()

export async function POST(request){
    try {
        const reqBody = await request.json()
        const {_id, vards, uzvards, email, role, talrunis} = reqBody

        const user = await User.findOne({_id})

        if(!user){
            console.log("User does not exist");
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }

        user.vards = vards;
        user.uzvards = uzvards;
        user.email = email;
        user.role = role;
        user.talrunis = talrunis;
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