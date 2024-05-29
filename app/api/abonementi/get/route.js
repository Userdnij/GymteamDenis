export const dynamic = 'force-dynamic';

import {connect} from "@/config/db";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
import Abonement from "@/models/abonement";

connect()
// Calls the connect function to establish a connection to the database.

export async function GET(request){
    try {
        const query = request.nextUrl.searchParams;

        const search = query.get('search') || '';

        const abonements = await Abonement.find({ name: { $regex: search, $options: 'i' } });

        // Create a JSON response indicating successful login
        const response = NextResponse.json(abonements);

        return response;

    } catch (error) {
        console.log(error)
        return NextResponse.json({error: error.message}, {status: 500})

    }
}