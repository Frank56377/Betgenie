import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    // Fetch all predictions
    const predictions = await prisma.prediction.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ predictions }, { status: 200 });
  } catch (error) {
    console.error("Fetch predictions error:", error);
    return NextResponse.json(
      { message: "Failed to fetch predictions" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, league, teams, prediction, confidence, odds, reasoning } =
      await request.json();

    // Validation
    if (!userId || !league || !teams || !prediction || !confidence || !odds) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create prediction
    const newPrediction = await prisma.prediction.create({
      data: {
        userId,
        league,
        teams,
        prediction,
        confidence: parseInt(confidence),
        odds: parseFloat(odds),
        reasoning,
        status: "PENDING",
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json(
      { message: "Prediction created successfully", prediction: newPrediction },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create prediction error:", error);
    return NextResponse.json(
      { message: "Failed to create prediction" },
      { status: 500 }
    );
  }
}
