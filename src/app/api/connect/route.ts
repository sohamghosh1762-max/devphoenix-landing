import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

// Initialize Resend with key or fallback mock
const resendApiKey = process.env.RESEND_API_KEY;
const resend = new Resend(resendApiKey || "re_mock_key");

// Define Zod schemas for validation
const studentSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  collegeName: z.string().min(2, "College name must be at least 2 characters"),
  yearOfStudy: z.enum(["1st Year", "2nd Year", "3rd Year", "4th Year", "Graduate"]),
  semester: z.enum([
    "Semester 1",
    "Semester 2",
    "Semester 3",
    "Semester 4",
    "Semester 5",
    "Semester 6",
    "Semester 7",
    "Semester 8",
  ]),
  domains: z.array(z.string()).min(1, "Select at least one domain"),
  contactNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Invalid email address"),
  linkedin: z.string().url("Invalid LinkedIn URL").or(z.literal("")).optional(),
  resumeBase64: z.string().min(1, "Resume file is required"),
  resumeName: z.string().min(1, "Resume name is required"),
  agreeToContact: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms to proceed",
  }),
});

const clientSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  designation: z.string().min(2, "Designation must be at least 2 characters"),
  contactNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Invalid email address"),
  service: z.enum([
    "AI & Automation",
    "Software Development",
    "Web Development",
    "Mobile App Development",
    "Cloud & DevOps",
    "Digital Transformation",
    "Enterprise Solutions",
  ]),
  budgetRange: z.enum([
    "Under ₹50K",
    "₹50K - ₹2L",
    "₹2L - ₹5L",
    "₹5L - ₹10L",
    "₹10L+",
  ]),
  projectDescription: z.string().min(10, "Description must be at least 10 characters"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type } = body;

    if (type === "student") {
      const result = studentSchema.safeParse(body.data);
      if (!result.success) {
        return NextResponse.json(
          { success: false, errors: result.error.flatten().fieldErrors },
          { status: 400 }
        );
      }

      const data = result.data;
      const subject = `[Academy App] Student Application: ${data.fullName} (${data.domains.join(", ")})`;
      
      const htmlContent = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ff5a1f/20; border-radius: 10px; background-color: #050505; color: #ffffff;">
          <h2 style="color: #ff5a1f; border-bottom: 2px solid #ff5a1f; padding-bottom: 10px; font-size: 20px; text-transform: uppercase;">
            New Academy Application
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr style="border-bottom: 1px solid #333;"><td style="padding: 8px; font-weight: bold; color: #ff5a1f; width: 35%;">Full Name</td><td style="padding: 8px; color: #ffffff;">${data.fullName}</td></tr>
            <tr style="border-bottom: 1px solid #333;"><td style="padding: 8px; font-weight: bold; color: #ff5a1f;">College Name</td><td style="padding: 8px; color: #ffffff;">${data.collegeName}</td></tr>
            <tr style="border-bottom: 1px solid #333;"><td style="padding: 8px; font-weight: bold; color: #ff5a1f;">Year of Study</td><td style="padding: 8px; color: #ffffff;">${data.yearOfStudy}</td></tr>
            <tr style="border-bottom: 1px solid #333;"><td style="padding: 8px; font-weight: bold; color: #ff5a1f;">Current Semester</td><td style="padding: 8px; color: #ffffff;">${data.semester}</td></tr>
            <tr style="border-bottom: 1px solid #333;"><td style="padding: 8px; font-weight: bold; color: #ff5a1f;">Domains</td><td style="padding: 8px; color: #ffffff;">${data.domains.join(", ")}</td></tr>
            <tr style="border-bottom: 1px solid #333;"><td style="padding: 8px; font-weight: bold; color: #ff5a1f;">Contact Number</td><td style="padding: 8px; color: #ffffff;">${data.contactNumber}</td></tr>
            <tr style="border-bottom: 1px solid #333;"><td style="padding: 8px; font-weight: bold; color: #ff5a1f;">Email Address</td><td style="padding: 8px; color: #ffffff;"><a href="mailto:${data.email}" style="color: #ff5a1f; text-decoration: none;">${data.email}</a></td></tr>
            <tr style="border-bottom: 1px solid #333;"><td style="padding: 8px; font-weight: bold; color: #ff5a1f;">LinkedIn</td><td style="padding: 8px; color: #ffffff;">${data.linkedin ? `<a href="${data.linkedin}" target="_blank" style="color: #ff5a1f; text-decoration: none;">${data.linkedin}</a>` : "Not provided"}</td></tr>
            <tr style="border-bottom: 1px solid #333;"><td style="padding: 8px; font-weight: bold; color: #ff5a1f;">Resume Filename</td><td style="padding: 8px; color: #ffffff;">${data.resumeName}</td></tr>
            <tr style="border-bottom: 1px solid #333;"><td style="padding: 8px; font-weight: bold; color: #ff5a1f;">Agreed to Contact</td><td style="padding: 8px; color: #ffffff;">Yes</td></tr>
          </table>
          <div style="margin-top: 25px; font-size: 11px; color: #666; text-align: center;">
            Submitted via DevPhoenix Onboarding Platform
          </div>
        </div>
      `;

      // Extract raw base64 data for attachment
      const base64Parts = data.resumeBase64.split(";base64,");
      const base64Data = base64Parts.length > 1 ? base64Parts[1] : base64Parts[0];
      const resumeBuffer = Buffer.from(base64Data, "base64");

      if (!resendApiKey || resendApiKey === "re_mock_key") {
        console.log("\n====== MOCK EMAIL FOR STUDENTS ======");
        console.log(`To: devphoenix@zohomail.in`);
        console.log(`Subject: ${subject}`);
        console.log(`Attached PDF: ${data.resumeName} (${resumeBuffer.byteLength} bytes)`);
        console.log(`Content HTML:\n${htmlContent}`);
        console.log("======================================\n");
        return NextResponse.json({ success: true, mock: true });
      }

      const response = await resend.emails.send({
        from: "DevPhoenix Connect <connect@devphoenix.com>",
        to: "devphoenix@zohomail.in",
        subject: subject,
        html: htmlContent,
        attachments: [
          {
            filename: data.resumeName,
            content: resumeBuffer,
          },
        ],
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      return NextResponse.json({ success: true, data: response.data });
    }

    if (type === "client") {
      const result = clientSchema.safeParse(body.data);
      if (!result.success) {
        return NextResponse.json(
          { success: false, errors: result.error.flatten().fieldErrors },
          { status: 400 }
        );
      }

      const data = result.data;
      const subject = `[Client Request] Consultation Enquiry: ${data.fullName} (${data.companyName})`;
      
      const htmlContent = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ff5a1f/20; border-radius: 10px; background-color: #050505; color: #ffffff;">
          <h2 style="color: #ff5a1f; border-bottom: 2px solid #ff5a1f; padding-bottom: 10px; font-size: 20px; text-transform: uppercase;">
            New Client Consultation Request
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr style="border-bottom: 1px solid #333;"><td style="padding: 8px; font-weight: bold; color: #ff5a1f; width: 35%;">Full Name</td><td style="padding: 8px; color: #ffffff;">${data.fullName}</td></tr>
            <tr style="border-bottom: 1px solid #333;"><td style="padding: 8px; font-weight: bold; color: #ff5a1f;">Company Name</td><td style="padding: 8px; color: #ffffff;">${data.companyName}</td></tr>
            <tr style="border-bottom: 1px solid #333;"><td style="padding: 8px; font-weight: bold; color: #ff5a1f;">Designation</td><td style="padding: 8px; color: #ffffff;">${data.designation}</td></tr>
            <tr style="border-bottom: 1px solid #333;"><td style="padding: 8px; font-weight: bold; color: #ff5a1f;">Contact Number</td><td style="padding: 8px; color: #ffffff;">${data.contactNumber}</td></tr>
            <tr style="border-bottom: 1px solid #333;"><td style="padding: 8px; font-weight: bold; color: #ff5a1f;">Email Address</td><td style="padding: 8px; color: #ffffff;"><a href="mailto:${data.email}" style="color: #ff5a1f; text-decoration: none;">${data.email}</a></td></tr>
            <tr style="border-bottom: 1px solid #333;"><td style="padding: 8px; font-weight: bold; color: #ff5a1f;">Service Required</td><td style="padding: 8px; color: #ffffff;">${data.service}</td></tr>
            <tr style="border-bottom: 1px solid #333;"><td style="padding: 8px; font-weight: bold; color: #ff5a1f;">Budget Range</td><td style="padding: 8px; color: #ffffff;">${data.budgetRange}</td></tr>
          </table>
          <div style="margin-top: 20px; padding: 15px; border: 1px solid #333; border-radius: 5px; background-color: #0b0b0b;">
            <p style="margin: 0 0 8px 0; font-weight: bold; color: #ff5a1f;">Project Description:</p>
            <p style="margin: 0; color: #ffffff; white-space: pre-wrap; font-size: 14px; line-height: 1.5;">${data.projectDescription}</p>
          </div>
          <div style="margin-top: 25px; font-size: 11px; color: #666; text-align: center;">
            Submitted via DevPhoenix Onboarding Platform
          </div>
        </div>
      `;

      if (!resendApiKey || resendApiKey === "re_mock_key") {
        console.log("\n====== MOCK EMAIL FOR CLIENTS ======");
        console.log(`To: devphoenix@zohomail.in`);
        console.log(`Subject: ${subject}`);
        console.log(`Content HTML:\n${htmlContent}`);
        console.log("=====================================\n");
        return NextResponse.json({ success: true, mock: true });
      }

      const response = await resend.emails.send({
         from: "DevPhoenix Connect <connect@devphoenix.com>",
        to: "devphoenix@zohomail.in",
        subject: subject,
        html: htmlContent,
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      return NextResponse.json({ success: true, data: response.data });
    }

    return NextResponse.json({ success: false, error: "Invalid type" }, { status: 400 });
  } catch (error) {
    console.error("API error during connect submission:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
