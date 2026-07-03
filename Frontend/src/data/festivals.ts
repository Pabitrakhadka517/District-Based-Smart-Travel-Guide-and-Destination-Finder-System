import type { Festival } from "@/types";
import { img, PHOTO } from "./images";

export const festivals: Festival[] = [
  { id: "f1", slug: "dashain", name: "Dashain", month: "Sep–Oct", season: "Autumn", type: "Religious",
    description: "Nepal's longest and most important festival, celebrating the victory of good over evil. Families reunite, elders bless the young with tika, and the whole country slows down for fifteen days of feasting and kite-flying.",
    image: img(PHOTO.square1, 1000), where: "Nationwide", duration: "15 days" },
  { id: "f2", slug: "tihar", name: "Tihar (Deepawali)", month: "Oct–Nov", season: "Autumn", type: "Religious",
    description: "The festival of lights, honouring animals, the goddess Laxmi and the bond between siblings. Homes glow with oil lamps and marigold garlands, and crows, dogs and cows are each celebrated on their own day.",
    image: img(PHOTO.stupa1, 1000), where: "Nationwide", duration: "5 days" },
  { id: "f3", slug: "holi", name: "Holi", month: "Mar", season: "Spring", type: "Cultural",
    description: "The exuberant festival of colours marking the arrival of spring. Streets fill with coloured powder, water and music as people of all ages celebrate together.",
    image: img(PHOTO.square1, 1000), where: "Kathmandu, Terai", duration: "1–2 days" },
  { id: "f4", slug: "indra-jatra", name: "Indra Jatra", month: "Sep", season: "Autumn", type: "Cultural",
    description: "Kathmandu's spectacular street festival honouring Indra, the god of rain. Masked dances, chariot processions and the appearance of the living goddess Kumari fill Durbar Square.",
    image: img(PHOTO.stupa2, 1000), where: "Kathmandu Durbar Square", duration: "8 days" },
  { id: "f5", slug: "tiji", name: "Tiji Festival", month: "May", season: "Spring", type: "Religious",
    description: "A vivid three-day monastic festival in the walled city of Lo Manthang, Upper Mustang, dramatising the triumph of compassion over demons through masked Cham dances.",
    image: img(PHOTO.himalaya2, 1000), where: "Lo Manthang, Mustang", duration: "3 days" },
  { id: "f6", slug: "buddha-jayanti", name: "Buddha Jayanti", month: "Apr–May", season: "Spring", type: "Religious",
    description: "Marking the birth, enlightenment and death of the Buddha. Boudhanath and Lumbini come alive with butter lamps, prayer and processions.",
    image: img(PHOTO.stupa1, 1000), where: "Boudhanath, Lumbini", duration: "1 day" },
  { id: "f7", slug: "losar", name: "Losar", month: "Feb–Mar", season: "Winter", type: "Cultural",
    description: "Tibetan and Sherpa New Year, celebrated in the high mountains and Tibetan communities with monastery dances, family feasts and colourful traditional dress.",
    image: img(PHOTO.himalaya4, 1000), where: "Khumbu, Boudha, Mustang", duration: "3 days" },
  { id: "f8", slug: "bisket-jatra", name: "Bisket Jatra", month: "Apr", season: "Spring", type: "National",
    description: "Bhaktapur's thunderous New Year chariot festival, where huge wooden chariots are pulled through the medieval streets in a centuries-old tug-of-war.",
    image: img(PHOTO.square1, 1000), where: "Bhaktapur", duration: "9 days" }
];
