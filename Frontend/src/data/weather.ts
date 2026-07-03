import type { WeatherDay } from "@/types";

export const forecast: WeatherDay[] = [
  { day: "Mon", condition: "Sunny", high: 24, low: 12 },
  { day: "Tue", condition: "Clear", high: 25, low: 13 },
  { day: "Wed", condition: "Cloudy", high: 22, low: 12 },
  { day: "Thu", condition: "Rain", high: 19, low: 11 },
  { day: "Fri", condition: "Sunny", high: 23, low: 12 },
  { day: "Sat", condition: "Clear", high: 26, low: 14 },
  { day: "Sun", condition: "Cloudy", high: 21, low: 11 }
];

export const seasons = [
  { name: "Spring (Mar–May)", best: "Trekking, rhododendrons, clear mountain views", rating: 5 },
  { name: "Summer / Monsoon (Jun–Aug)", best: "Upper Mustang, lush valleys, fewer crowds", rating: 3 },
  { name: "Autumn (Sep–Nov)", best: "Peak trekking season, festivals, crystal skies", rating: 5 },
  { name: "Winter (Dec–Feb)", best: "Wildlife safaris, lower-altitude treks, culture", rating: 4 }
];
