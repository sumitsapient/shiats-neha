import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import admin from "firebase-admin";

// ✅ Ensure Firebase Admin is initialized only once
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID, // 🔥 Secure environment variable
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    });
  } catch (error) {
    console.error("🔥 Firebase initialization error:", error);
  }
}

const db = admin.firestore();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("✅ Received data:", body);
    const event = new Date();
    const expirationDate = admin.firestore.Timestamp.fromDate(event);
    console.log(process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"));
    console.log(process.env.FIREBASE_CLIENT_EMAIL);
    console.log(process.env.FIREBASE_PROJECT_ID);

    const { name, email, company, message, product } = body;

    // ✅ Validate required fields before proceeding
    if (!name || !email || !message) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    // ✅ Save inquiry to Firestore
    const inquiryRef = await db.collection("inquiries").add({
      name,
      email,
      company: company || "Not provided", // Default value
      message,
      product: product || "No product specified",
      timestamp: expirationDate,
    });

    console.log("✅ Saved to Firestore:", inquiryRef.id);

    // ✅ Send email notification using Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Website Inquiry" <${process.env.EMAIL_USER}>`,
      to: "myth.sumit@gmail.com",
      subject: `New Inquiry for ${product}`,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nMessage: ${message}`,
    });

    console.log("✅ Email sent successfully!");

    return NextResponse.json({ success: true, message: "Inquiry saved & email sent!" });
  } catch (error) {
    console.error("❌ Error processing inquiry:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json({ success: false, message: `Failed to process inquiry: ${errorMessage}` });
  }
}
