import {connect} from "@/config/db";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";


connect()


export async function POST(request){
    try {
        const reqBody = await request.json()
        const {email, vards, uzvards, talrunis, password} = reqBody

        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            email,
            vards,
            uzvards,
            talrunis,
            password: hashedPassword
        })

        const savedUser = await newUser.save()


        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })


    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}