import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    // Fetch all accumulators
    const accumulators = await prisma.accumulator.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        bets: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ accumulators }, { status: 200 });
  } catch (error) {
    console.error("Fetch accumulators error:", error);
    return NextResponse.json(
      { message: "Failed to fetch accumulators" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      userId,
      title,
      description,
      totalMatches,
      totalOdds,
      suggestedStake,
      expectedPayout,
    } = await request.json();

    // Validation
    if (!userId || !title || !totalMatches || !totalOdds) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create accumulator
    const newAccumulator = await prisma.accumulator.create({
      data: {
        userId,
        title,
        description,
        totalMatches: parseInt(totalMatches),
        totalOdds: parseFloat(totalOdds),
        suggestedStake: parseFloat(suggestedStake),
        expectedPayout: parseFloat(expectedPayout),
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
      { message: "Accumulator created successfully", accumulator: newAccumulator },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create accumulator error:", error);
    return NextResponse.json(
      { message: "Failed to create accumulator" },
      { status: 500 }
    );
  }
}
