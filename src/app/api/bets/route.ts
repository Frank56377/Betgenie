import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    // Fetch all bets
    const bets = await prisma.bet.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        predictions: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ bets }, { status: 200 });
  } catch (error) {
    console.error("Fetch bets error:", error);
    return NextResponse.json(
      { message: "Failed to fetch bets" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      userId,
      betType,
      predictions,
      stake,
      totalOdds,
      potentialPayout,
    } = await request.json();

    // Validation
    if (!userId || !betType || !stake || !totalOdds) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create bet with predictions
    const newBet = await prisma.bet.create({
      data: {
        userId,
        betType,
        stake: parseFloat(stake),
        totalOdds: parseFloat(totalOdds),
        potentialPayout: parseFloat(potentialPayout || stake * totalOdds),
        status: "PENDING",
        predictions: {
          connect: predictions?.map((id: string) => ({ id })) || [],
        },
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        predictions: true,
      },
    });

    return NextResponse.json(
      { message: "Bet created successfully", bet: newBet },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create bet error:", error);
    return NextResponse.json(
      { message: "Failed to create bet" },
      { status: 500 }
    );
  }
}
