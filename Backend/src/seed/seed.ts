import bcrypt from "bcryptjs";
import { connectDB, disconnectDB } from "../config/db";
import { District } from "../models/District";
import { City } from "../models/City";
import { Destination } from "../models/Destination";
import { Review } from "../models/Review";
import { Trek } from "../models/Trek";
import { Festival } from "../models/Festival";
import { Guide } from "../models/Guide";
import { User } from "../models/User";
import { TripPlan } from "../models/TripPlan";
import { Attraction } from "../models/Attraction";
import * as data from "./data";

export async function seed(): Promise<void> {
  // Seed IDs — only these demo accounts and their trip plans are replaced; real user accounts are preserved.
  const seedUserIds = data.users.map((u) => u.id);

  console.log("[seed] Clearing collections...");
  await Promise.all([
    District.deleteMany({}),
    City.deleteMany({}),
    Destination.deleteMany({}),
    Review.deleteMany({}),
    Trek.deleteMany({}),
    Festival.deleteMany({}),
    Guide.deleteMany({}),
    User.deleteMany({ id: { $in: seedUserIds } }),
    TripPlan.deleteMany({ userId: { $in: seedUserIds } }),
    Attraction.deleteMany({})
  ]);

  // Drop the old sparse compound index so the new partialFilterExpression definition takes effect.
  await Review.collection.dropIndex("destinationId_1_userId_1").catch(() => {});

  console.log("[seed] Inserting content...");
  await District.insertMany(data.districts);
  await City.insertMany(data.cities);
  await Destination.insertMany(data.destinations);
  await Review.insertMany(data.reviews);
  await Review.syncIndexes();
  await Trek.insertMany(data.treks);
  await Festival.insertMany(data.festivals);
  await Guide.insertMany(data.guides);

  console.log("[seed] Creating users (hashing passwords)...");
  const users = await Promise.all(
    data.users.map(async (u) => ({ ...u, password: await bcrypt.hash(u.password, 10) }))
  );
  await User.insertMany(users);
  await TripPlan.insertMany(data.trips);
  await Attraction.insertMany(data.attractions);

  const counts = {
    districts: data.districts.length,
    cities: data.cities.length,
    destinations: data.destinations.length,
    reviews: data.reviews.length,
    treks: data.treks.length,
    festivals: data.festivals.length,
    guides: data.guides.length,
    users: data.users.length,
    trips: data.trips.length,
    attractions: data.attractions.length
  };
  console.log("[seed] Done:", counts);
}

// Run directly via `npm run seed`
if (require.main === module) {
  (async () => {
    await connectDB();
    await seed();
    await disconnectDB();
    process.exit(0);
  })().catch((err) => {
    console.error("[seed] Failed:", err);
    process.exit(1);
  });
}
