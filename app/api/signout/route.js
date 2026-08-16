import { app } from "@/lib/firebase/admin-app";
import { getAuth } from "firebase-admin/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const authHeader = request.headers.get('Authorization');
    const accessToken = authHeader?.split('Bearer ')[1];

    if (!accessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    //Verify the ID token first
    const auth = getAuth(app);
    const decodedToken = await auth.verifyIdToken(accessToken);

    if(!decodedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    //Tell Next.js to delete the session cookie
    (await cookies()).delete('session');
    (await cookies()).delete('userId');

    // Note: You can optionally use the Firebase Admin SDK here to completely 
    // revoke the user's refresh tokens if you want strict security, 
    // but deleting the cookie is the required step for the Next.js app.

    return NextResponse.json({ status: 'success' }, { status: 200 });
  } catch (error) {
    throw new Error('Error deleting session cookie: ' + error.message);
  }
}