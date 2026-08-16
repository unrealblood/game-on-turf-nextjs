import { app } from "@/lib/firebase/admin-app";
import { getAuth } from "firebase-admin/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const auth = getAuth(app);

        const authHeader = request.headers.get('Authorization');
        const idToken = authHeader?.split('Bearer ')[1];

        const { userId } = await request.json();

        if (!idToken) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // 1. Verify the ID token first
        const decodedToken = await auth.verifyIdToken(idToken);

        if (!decodedToken) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // 2. Set session expiration to 7 days
        const expiresIn = 60 * 60 * 24 * 7 * 1000; 

        // 3. Create the session cookie
        const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });

        // 4. Set the cookie in the Next.js response
        (await cookies()).set('session', sessionCookie, {
            maxAge: expiresIn,
            httpOnly: true,
            secure: true
        });
        (await cookies()).set("userId", userId, {
            maxAge: expiresIn,
            httpOnly: true,
            secure: true
        });

        return NextResponse.json({ status: 'success' }, { status: 200 });
        
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
}