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
        const {_id, name, price, term, parameters} = reqBody;
        const abonement = await Abonement.findOne({_id});
        console.log(price);

        if(!abonement){
            return NextResponse.json({error: "Abonement doesn't exists"}, {status: 404})
        }

        abonement.name = name;
        abonement.price = price;
        abonement.term = term;
        abonement.parameters = parameters;

        const savedAbonement = await abonement.save();


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