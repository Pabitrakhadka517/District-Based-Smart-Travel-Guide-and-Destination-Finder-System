import type { User, TripPlan } from "@/types";

export const currentUser: User = {
  id: "u1", name: "Aarav Shrestha", email: "aarav@example.com",
  avatar: "https://i.pravatar.cc/150?img=68", role: "user",
  joinedAt: "2025-09-01", lastLogin: "2026-06-16",
  isActive: true
};

export const trips: TripPlan[] = [
  { id: "t1", title: "Kathmandu Heritage Weekend", travelType: "Cultural",  travelers: 2, destinationIds: ["p1", "p2", "p3"], startDate: "2026-07-04", endDate: "2026-07-06", budget: 450,  budgetBreakdown: { accommodation: 180, food: 112, transportation: 90, activities: 45, other: 23 }, status: "planned",   notes: "Focus on UNESCO sites. Hire a guide for day 1.", itinerary: [], checklist: [] },
  { id: "t2", title: "Annapurna Escape",            travelType: "Adventure", travelers: 1, destinationIds: ["p5", "p6"],        startDate: "2026-06-20", endDate: "2026-06-24", budget: 620,  budgetBreakdown: { accommodation: 248, food: 155, transportation: 124, activities: 62,  other: 31 }, status: "ongoing",    notes: "Paragliding booked for day 2.",                  itinerary: [], checklist: [] },
  { id: "t3", title: "Everest Base Camp",           travelType: "Trekking",  travelers: 3, destinationIds: ["p7"],              startDate: "2025-11-02", endDate: "2025-11-16", budget: 1700, budgetBreakdown: { accommodation: 680, food: 425, transportation: 340, activities: 170, other: 85 }, status: "completed", notes: "Incredible. Kala Patthar at sunrise was the highlight.", itinerary: [], checklist: [] },
  { id: "t4", title: "Pokhara Lakeside Retreat",   travelType: "Family",    travelers: 4, destinationIds: ["p5"],              startDate: "2026-08-10", endDate: "2026-08-14", budget: 800,  budgetBreakdown: { accommodation: 320, food: 200, transportation: 160, activities: 80,  other: 40 }, status: "draft",      notes: "Still deciding on activities.",                  itinerary: [], checklist: [] },
];

export const adminStats = {
  totalUsers: 12480, userGrowth: 12.4,
  totalDestinations: 142, totalReviews: 8932,
  monthlyVisits: 264000, revenue: 48200, revenueGrowth: 8.1
};
