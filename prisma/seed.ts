import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Create sample users
  const user1 = await prisma.user.create({
    data: {
      email: "demo@betgenie.com",
      name: "Demo User",
      password: await bcrypt.hash("Demo123!", 10),
      subscriptionTier: "PREMIUM",
      isVerified: true,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "test@betgenie.com",
      name: "Test Account",
      password: await bcrypt.hash("Test123!", 10),
      subscriptionTier: "FREE",
      isVerified: false,
    },
  });

  console.log("✓ Created sample users");

  // Create sample predictions
  const prediction1 = await prisma.prediction.create({
    data: {
      userId: user1.id,
      league: "EPL",
      teams: "Manchester City vs Arsenal",
      prediction: "Over 2.5 Goals",
      confidence: 85,
      odds: 1.95,
      reasoning: "Both teams in excellent attacking form. City averaging 2.8 goals/game.",
      status: "WON",
      result: "3-1",
    },
  });

  const prediction2 = await prisma.prediction.create({
    data: {
      userId: user1.id,
      league: "La Liga",
      teams: "Real Madrid vs Barcelona",
      prediction: "Home Win",
      confidence: 72,
      odds: 2.10,
      reasoning: "Madrid unbeaten at home in last 12 matches.",
      status: "PENDING",
    },
  });

  const prediction3 = await prisma.prediction.create({
    data: {
      userId: user2.id,
      league: "NPFL",
      teams: "Kaizer Chiefs vs Orlando Pirates",
      prediction: "Both Teams Score",
      confidence: 78,
      odds: 1.88,
      reasoning: "Fierce rivalry with attacking threats on both sides.",
      status: "WON",
      result: "2-1",
    },
  });

  console.log("✓ Created sample predictions");

  // Create sample bets
  const bet1 = await prisma.bet.create({
    data: {
      userId: user1.id,
      betType: "SINGLE",
      predictions: {
        connect: [{ id: prediction1.id }],
      },
      stake: 5000,
      totalOdds: 1.95,
      potentialPayout: 9750,
      status: "WON",
      actualPayout: 9750,
    },
  });

  const bet2 = await prisma.bet.create({
    data: {
      userId: user1.id,
      betType: "DOUBLE",
      predictions: {
        connect: [{ id: prediction1.id }, { id: prediction2.id }],
      },
      stake: 2000,
      totalOdds: 4.095,
      potentialPayout: 8190,
      status: "PENDING",
    },
  });

  console.log("✓ Created sample bets");

  // Create sample accumulator
  const accumulator = await prisma.accumulator.create({
    data: {
      userId: user1.id,
      title: "Weekend Triple Accumulator",
      description: "Best predictions for this weekend's matches",
      totalMatches: 3,
      totalOdds: 6.72,
      suggestedStake: 5000,
      expectedPayout: 33600,
    },
  });

  console.log("✓ Created sample accumulator");

  console.log("\n✅ Database seeding complete!");
  console.log("\n📊 Sample Data Created:");
  console.log(`  - Users: 2`);
  console.log(`  - Predictions: 3`);
  console.log(`  - Bets: 2`);
  console.log(`  - Accumulators: 1`);
  console.log("\n🔐 Test Credentials:");
  console.log(`  Email: demo@betgenie.com`);
  console.log(`  Password: Demo123!`);
  console.log(`\nOR\n`);
  console.log(`  Email: test@betgenie.com`);
  console.log(`  Password: Test123!`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seed error:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
