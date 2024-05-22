import {connect} from "@/config/db";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

connect()

export async function POST(request){
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody

        // const user = await User.findOne({email}).populate('abonements');
        // const user = await User.findOne({email}).populate('abonement', { strictPopulate: false });
        const user = await User.findOne({email}).populate('abonement');

        if(!user){
            console.log("User does not exist");
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }

        const validPassword = await bcryptjs.compare
        (password, user.password)
        if(!validPassword){
            console.log("Invalid password");
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            user: user,
        })

        response.cookies.set("gym_user_id", user._id, {
            httpOnly: true,
        })
        response.cookies.set("gym_role", user.role, {
            httpOnly: true,
        })
        response.cookies.set("gym_is_locked", user.is_locked, {
            httpOnly: true,
        })
        console.log(user.is_locked)

        return response;

    } catch (error) {
        console.log(error)
        return NextResponse.json({error: error.message}, {status: 500})

    }
}