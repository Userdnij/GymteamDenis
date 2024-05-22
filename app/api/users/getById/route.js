import {connect} from "@/config/db";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

connect()

export async function GET(request){
    try {
        const query = request.nextUrl.searchParams;

        const id = query.get('id');

        const user = await User.findOne({_id: id}).populate('abonement');

        if(!user){
            console.log("User does not exist");
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }

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

        return response;

    } catch (error) {
        console.log(error)
        return NextResponse.json({error: error.message}, {status: 500})

    }
}