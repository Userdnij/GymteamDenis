import { NextRequest, NextResponse } from "next/server";

export async function GET(request) {
    try {
        console.log('da')
        const response = NextResponse.json(
            {
                message: "Logout successful",
                success: true,
            }
        )
        response.cookies.set("gym_user_id", "",
        { httpOnly: true, expires: new Date(0)
        })

        response.cookies.set("gym_role", "",
        { httpOnly: true, expires: new Date(0)
        })

        response.cookies.set("gym_is_locked", "",
        { httpOnly: true, expires: new Date(0)
        })

        return response;

    } catch (error) {
        return NextResponse.json({ error: error.message},
            {status: 500});
    }

}