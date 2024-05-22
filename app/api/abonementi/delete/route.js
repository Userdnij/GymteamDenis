import {connect} from "@/config/db";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
import Abonement from "@/models/abonement";

connect()
// Calls the connect function to establish a connection to the database.

export async function POST(request){
    try {
        const reqBody = await request.json();
        const {_id} = reqBody;
        const abonement = await Abonement.findOne({_id});

        await abonement.deleteOne();


        return NextResponse.json({
            message: "Abonement deleted successfully",
            success: true,
        });
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: error.message}, {status: 500})

    }
}