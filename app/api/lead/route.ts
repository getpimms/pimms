import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// Define the type for the request body
type LeadRequestBody = {
  eventName: string;
  externalId: string;
  customerName?: string | null;
  customerEmail?: string | null;
  customerAvatar?: string | null;
  metadata?: Record<string, any> | null;
};

export async function POST(request: NextRequest) {
  try {
    // Get the pimms_id from cookies
    const cookieStore = await cookies();
    const pimmsId = cookieStore.get("pimms_id")?.value;

    console.log("pimmsId", pimmsId, process.env.PIMMS_API_KEY);

    if (!pimmsId) {
      return NextResponse.json(
        { error: "No click ID found in cookies" },
        { status: 400 }
      );
    }

    // Parse the request body
    const body: LeadRequestBody = await request.json();

    // Validate required fields
    if (!body.eventName) {
      return NextResponse.json(
        { error: "eventName is required" },
        { status: 400 }
      );
    }

    if (!body.externalId) {
      return NextResponse.json(
        { error: "externalId is required" },
        { status: 400 }
      );
    }

    // Make the request to Pimms API
    const response = await fetch("https://api.pimms.io/track/lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.PIMMS_API_KEY}`,
      },
      body: JSON.stringify({
        clickId: pimmsId,
        eventName: body.eventName,
        externalId: body.externalId,
        ...(body.customerName && { customerName: body.customerName }),
        ...(body.customerEmail && { customerEmail: body.customerEmail }),
        ...(body.customerAvatar && { customerAvatar: body.customerAvatar }),
        ...(body.metadata && { metadata: body.metadata }),
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(error, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error tracking lead:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
