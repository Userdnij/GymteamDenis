export const dynamic = 'force-dynamic';

import {connect} from "@/config/db";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
import Abonement from "@/models/abonement";

connect()

export async function POST(request){
    try {
        const reqBody = await request.json();
        const {name, price, term, parameters} = reqBody;
        const abonement = await Abonement.findOne({name});
        console.log(price);

        if(abonement){
            return NextResponse.json({error: "Abonement already exists"}, {status: 400})
        }

        const newAbonement = new Abonement({
            name,
            price,
            term,
            parameters
        });


        const savedAbonement = await newAbonement.save();


        return NextResponse.json({
            message: "Abonement created successfully",
            success: true,
            savedAbonement
        });
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: error.message}, {status: 500})

    }
}