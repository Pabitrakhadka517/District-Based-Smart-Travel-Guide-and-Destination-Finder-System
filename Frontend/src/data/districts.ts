import type { District } from "@/types";
import { img, PHOTO } from "./images";

export const districts: District[] = [
  {
    id: "d1", slug: "kathmandu", name: "Kathmandu", province: "Bagmati",
    description: "Nepal's vibrant capital district, a living museum of temples, palaces and bustling bazaars cradled in a Himalayan valley.",
    heroImage: img(PHOTO.stupa1, 1600),
    coordinates: { lat: 27.7172, lng: 85.3240 },
    cityCount: 3, destinationCount: 4, rating: 4.8,
    popularFor: ["Heritage", "Temples", "Nightlife", "Culture"]
  },
  {
    id: "d2", slug: "kaski", name: "Kaski", province: "Gandaki",
    description: "Home to Pokhara and the gateway to the Annapurnas — lakes, paragliding and the closest big mountains in Nepal.",
    heroImage: img(PHOTO.lake1, 1600),
    coordinates: { lat: 28.2096, lng: 83.9856 },
    cityCount: 2, destinationCount: 3, rating: 4.9,
    popularFor: ["Lakes", "Adventure", "Trekking", "Nature"]
  },
  {
    id: "d3", slug: "solukhumbu", name: "Solukhumbu", province: "Koshi",
    description: "The Everest district — Sherpa culture, monasteries and the trail to the roof of the world.",
    heroImage: img(PHOTO.himalaya1, 1600),
    coordinates: { lat: 27.7833, lng: 86.7167 },
    cityCount: 2, destinationCount: 2, rating: 4.9,
    popularFor: ["Trekking", "Everest", "Sherpa Culture", "Adventure"]
  },
  {
    id: "d4", slug: "chitwan", name: "Chitwan", province: "Bagmati",
    description: "Subtropical lowlands and Nepal's premier national park — rhinos, tigers and jungle safaris.",
    heroImage: img(PHOTO.jungle1, 1600),
    coordinates: { lat: 27.5291, lng: 84.3542 },
    cityCount: 1, destinationCount: 2, rating: 4.7,
    popularFor: ["Wildlife", "Safari", "Nature", "Jungle"]
  },
  {
    id: "d5", slug: "lalitpur", name: "Lalitpur", province: "Bagmati",
    description: "The city of artisans — Patan's exquisite Newari craftsmanship, courtyards and metalwork.",
    heroImage: img(PHOTO.square1, 1600),
    coordinates: { lat: 27.6588, lng: 85.3247 },
    cityCount: 1, destinationCount: 1, rating: 4.6,
    popularFor: ["Heritage", "Art", "Culture", "Crafts"]
  },
  {
    id: "d6", slug: "mustang", name: "Mustang", province: "Gandaki",
    description: "A high-altitude desert kingdom beyond the Himalayas — Tibetan culture, caves and dramatic canyons.",
    heroImage: img(PHOTO.himalaya2, 1600),
    coordinates: { lat: 29.1892, lng: 83.9311 },
    cityCount: 1, destinationCount: 1, rating: 4.8,
    popularFor: ["Trekking", "Tibetan Culture", "Adventure", "Nature"]
  }
];
