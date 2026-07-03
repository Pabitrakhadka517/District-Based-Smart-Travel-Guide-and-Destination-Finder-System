export type Category =
  | "Heritage" | "Adventure" | "Nature" | "Trekking"
  | "Religious" | "Wildlife" | "Cultural" | "Lake" | "City";

export type Season = "Spring" | "Summer" | "Autumn" | "Winter";

export interface Coordinates { lat: number; lng: number; }

export interface District {
  id: string;
  slug: string;
  name: string;
  province: string;
  description: string;
  heroImage: string;
  coordinates: Coordinates;
  cityCount: number;
  destinationCount: number;
  popularFor: string[];
  rating: number;
  bestSeason?: string;
  attractionCount?: number;
}


export interface BudgetEstimate {
  budget: number;
  midRange: number;
  luxury: number;
  currency: string;
}

export interface Attraction { name: string; description: string; }
export interface Restaurant { name: string; cuisine: string; priceRange: string; }

export interface Destination {
  id: string;
  slug: string;
  cityId: string;
  districtId: string;
  name: string;
  tagline: string;
  description: string;
  category: Category;
  tags: string[];
  heroImage: string;
  gallery: string[];
  coordinates: Coordinates;
  rating: number;
  reviewCount: number;
  bestTimeToVisit: Season[];
  budget: BudgetEstimate;
  attractions: Attraction[];
  activities: string[];
  restaurants: Restaurant[];
  localFoods: string[];
  travelTips: string[];
  pros: string[];
  cons: string[];
  nearby: string[];
  featured: boolean;
  trending: boolean;
  difficulty?: Difficulty;
  recommendedDuration?: string;
}

export interface WeatherInsight {
  condition: "Sunny" | "Clear" | "Cloudy" | "Rain" | "Snow";
  currentTemp: number;
  isIdealSeason: boolean;
  visitAdvice: "Go now" | "Good time" | "Off-season" | "Avoid";
  message: string;
  bestMonths: string[];
}

export interface Review {
  id: string;
  destinationId: string;
  userId?: string;
  author: string;
  avatar: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  helpful: number;
  status: "approved" | "pending" | "rejected";
  photos?: string[];
  verifiedTraveler?: boolean;
}

export interface RatingBreakdown {
  star: number;
  count: number;
  pct: number;
}

export interface WeatherDay {
  day: string;
  condition: "Sunny" | "Cloudy" | "Rain" | "Snow" | "Clear";
  high: number;
  low: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "user" | "admin";
  joinedAt: string;
  lastLogin: string;
  isActive: boolean;
}

export type TravelType =
  | "Adventure" | "Trekking" | "Cultural" | "Religious"
  | "Family" | "Wildlife" | "Luxury" | "Budget";

export interface TripActivity {
  id: string;
  time: string;
  title: string;
  type: "destination" | "attraction" | "custom";
  destinationId: string;
  location?: string;
  notes: string;
  visited?: boolean;
}

export interface TripDay {
  id: string;
  day: number;
  date: string;
  title: string;
  activities: TripActivity[];
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  category: string;
}

export interface BudgetBreakdown {
  accommodation: number;
  food: number;
  transportation: number;
  activities: number;
  other: number;
}

export interface TripPlan {
  id: string;
  title: string;
  travelType: TravelType;
  travelers: number;
  destinationIds: string[];
  startDate: string;
  endDate: string;
  budget: number;
  budgetBreakdown: BudgetBreakdown;
  status: "draft" | "planned" | "ready" | "ongoing" | "completed" | "cancelled";
  notes: string;
  itinerary: TripDay[];
  checklist: ChecklistItem[];
}

export type Difficulty = "Easy" | "Moderate" | "Challenging" | "Strenuous";

export interface TrekDay { day: number; title: string; detail: string; altitude: number; hours: string; }

export interface Trek {
  id: string;
  slug: string;
  name: string;
  region: string;
  tagline: string;
  description: string;
  heroImage: string;
  gallery: string[];
  difficulty: Difficulty;
  durationDays: number;
  maxAltitude: number;
  distanceKm: number;
  bestSeasons: Season[];
  permits: string[];
  highlights: string[];
  itinerary: TrekDay[];
  rating: number;
  priceFrom: number;
  featured: boolean;
}

export interface Festival {
  id: string;
  slug: string;
  name: string;
  month: string;
  season: Season;
  type: "Religious" | "Cultural" | "Harvest" | "National";
  description: string;
  image: string;
  where: string;
  duration: string;
}

export type AttractionCategory =
  | "Religious Sites" | "Historical Sites" | "Natural Attractions"
  | "Lakes & Rivers" | "Mountains & Trekking Routes" | "Adventure Activities"
  | "Cultural Heritage Sites" | "Viewpoints" | "National Parks & Wildlife"
  | "Local Experiences";

export interface EntryFee { nepali: number; saarc: number; foreigner: number; currency: string; }
export interface NearbyHotel { name: string; stars: number; priceRange: string; }
export interface NearbyRestaurant { name: string; cuisine: string; priceRange: string; }

export interface TouristAttraction {
  id: string;
  slug: string;
  districtId: string;
  name: string;
  category: AttractionCategory;
  tagline: string;
  description: string;
  history: string;
  heroImage: string;
  gallery: string[];
  coordinates: Coordinates;
  rating: number;
  reviewCount: number;
  openingHours: string;
  entryFee: EntryFee;
  bestTimeToVisit: string[];
  activities: string[];
  localFoods: string[];
  travelTips: string[];
  nearbyAttractions: string[];
  nearbyHotels: NearbyHotel[];
  nearbyRestaurants: NearbyRestaurant[];
  featured: boolean;
  trending: boolean;
}

export interface ActivityEvent {
  type: "trip_planned" | "trip_ongoing" | "trip_completed" | "review_written";
  date: string;
  tripTitle?: string;
  destinationCount?: number;
  destinationName?: string;
  destinationSlug?: string;
  rating?: number;
}

export interface GuideArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: "Tips" | "Itineraries" | "Culture" | "Food" | "Trekking";
  cover: string;
  author: string;
  authorAvatar: string;
  date: string;
  readMinutes: number;
  tags: string[];
  body: string[];
  featured: boolean;
}
