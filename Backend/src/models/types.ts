/** Explicit document interfaces — used as the generic for each Mongoose model. */

export type Category =
  | "Heritage" | "Adventure" | "Nature" | "Trekking"
  | "Religious" | "Wildlife" | "Cultural" | "Lake" | "City";
export type Season = "Spring" | "Summer" | "Autumn" | "Winter";
export type Difficulty = "Easy" | "Moderate" | "Challenging" | "Strenuous";

export interface ICoordinates { lat: number; lng: number; }

export interface IDistrict {
  id: string; slug: string; name: string; province: string;
  description: string; heroImage: string; coordinates: ICoordinates;
  cityCount: number; destinationCount: number; popularFor: string[]; rating: number;
  // Added with the attractions feature
  bestSeason: string; attractionCount: number;
}

export interface ICity {
  id: string; slug: string; districtId: string; name: string;
  description: string; image: string; coordinates: ICoordinates;
  categories: string[]; rating: number; destinationCount: number; altitude: number;
}

export interface IBudget { budget: number; midRange: number; luxury: number; currency: string; }
export interface IAttraction { name: string; description: string; }
export interface IRestaurant { name: string; cuisine: string; priceRange: string; }

export interface IDestination {
  id: string; slug: string; cityId: string; districtId: string;
  name: string; tagline: string; description: string; category: Category;
  tags: string[]; heroImage: string; gallery: string[]; coordinates: ICoordinates;
  rating: number; reviewCount: number; bestTimeToVisit: string[]; budget: IBudget;
  attractions: IAttraction[]; activities: string[]; restaurants: IRestaurant[];
  localFoods: string[]; travelTips: string[]; pros: string[]; cons: string[];
  nearby: string[]; featured: boolean; trending: boolean;
  difficulty?: Difficulty;
  recommendedDuration?: string;
}

export interface IReview {
  id: string; destinationId: string;
  userId?: string;        // authenticated user who submitted the review
  author: string; avatar: string;
  rating: number; title: string; body: string; date: string;
  helpful: number; status: "approved" | "pending" | "rejected";
  photos?: string[];
  verifiedTraveler?: boolean;
}

export interface ITrekDay { day: number; title: string; detail: string; altitude: number; hours: string; }
export interface ITrek {
  id: string; slug: string; name: string; region: string; tagline: string;
  description: string; heroImage: string; gallery: string[]; difficulty: Difficulty;
  durationDays: number; maxAltitude: number; distanceKm: number; bestSeasons: string[];
  permits: string[]; highlights: string[]; itinerary: ITrekDay[];
  rating: number; priceFrom: number; featured: boolean;
}

export interface IFestival {
  id: string; slug: string; name: string; month: string; season: Season;
  type: "Religious" | "Cultural" | "Harvest" | "National";
  description: string; image: string; where: string; duration: string;
}

export interface IGuide {
  id: string; slug: string; title: string; excerpt: string;
  category: "Tips" | "Itineraries" | "Culture" | "Food" | "Trekking";
  cover: string; author: string; authorAvatar: string; date: string;
  readMinutes: number; tags: string[]; body: string[]; featured: boolean;
}

export interface IRefreshTokenEntry {
  token: string;       // SHA-256 hash of the plain token
  device: string;
  rememberMe: boolean;
  createdAt: Date;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  role: "user" | "admin";
  joinedAt: string;
  lastLogin: string;
  wishlist: string[];
  passwordResetToken?: string;
  passwordResetExpiry?: Date;
  refreshTokens: IRefreshTokenEntry[];
  loginAttempts: number;
  lockUntil?: Date;
  isActive: boolean;
  emailVerified: boolean;
  emailVerificationToken?: string;
  emailVerificationExpiry?: Date;
}

export interface IAuditLog {
  id: string;
  userId: string;
  action: string;
  ip: string;
  userAgent: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

export interface ITripActivity {
  id: string; time: string; title: string;
  type: "destination" | "attraction" | "custom";
  destinationId: string; notes: string;
}

export interface ITripDay {
  id: string; day: number; date: string; title: string;
  activities: ITripActivity[];
}

export interface IChecklistItem {
  id: string; text: string; completed: boolean; category: string;
}

export interface IBudgetBreakdown {
  accommodation: number; food: number; transportation: number;
  activities: number; other: number;
}

export type TravelType = "Adventure" | "Trekking" | "Cultural" | "Religious" | "Family" | "Wildlife" | "Luxury" | "Budget";

export interface ITripPlan {
  id: string; userId: string; title: string;
  travelType: TravelType; travelers: number;
  destinationIds: string[];
  startDate: string; endDate: string;
  budget: number; budgetBreakdown: IBudgetBreakdown;
  status: "draft" | "planned" | "ready" | "ongoing" | "completed" | "cancelled";
  notes: string;
  itinerary: ITripDay[];
  checklist: IChecklistItem[];
}
