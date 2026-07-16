export const PARKING_DATA = [
  {
    id: "p1", lat: 24.7113, lng: 46.6746, name: "Kingdom Centre", address: "King Fahad Road, Al Olaya", type: "Mall",
    distance: "0.3 km", walkTime: "4 min", available: 23, total: 120,
    priceHour: 15, priceDay: 80, priceMonth: 800, rating: 4.8, ratingCount: 342,
    status: "open", hours: "Open 24/7", heightLimit: "2.1m",
    features: ["ev", "covered", "security", "cameras", "valet"],
    mapX: 444, mapY: 215, color: "green",
    reviews: [
      { user: "Ahmed K.", rating: 5, text: "Excellent parking, very clean and safe. EV chargers work perfectly.", time: "2 days ago", verified: true },
      { user: "Sara M.", rating: 5, text: "Best parking in Al Olaya. Valet service is professional.", time: "1 week ago", verified: true },
      { user: "Khalid R.", rating: 4, text: "Good location but a bit pricey during weekends.", time: "2 weeks ago", verified: false },
    ],
  },
  {
    id: "p2", lat: 24.6907, lng: 46.6858, name: "Al Faisaliah Tower", address: "King Fahad Road, Al Olaya", type: "Tower",
    distance: "0.6 km", walkTime: "8 min", available: 5, total: 80,
    priceHour: 12, priceDay: 60, priceMonth: 650, rating: 4.5, ratingCount: 218,
    status: "open", hours: "06:00 – 01:00", heightLimit: "2.0m",
    features: ["covered", "cameras", "security"],
    mapX: 504, mapY: 145, color: "orange",
    reviews: [
      { user: "Noura A.", rating: 4, text: "Close to the tower, easy access. Attendants are helpful.", time: "3 days ago", verified: true },
      { user: "Faisal H.", rating: 5, text: "Always find a spot here. Good security.", time: "5 days ago", verified: true },
    ],
  },
  {
    id: "p3", lat: 24.7676, lng: 46.6373, name: "Riyadh Park Mall", address: "Prince Turki Al Awwal Rd, Al Nakheel", type: "Mall",
    distance: "1.2 km", walkTime: "15 min", available: 0, total: 200,
    priceHour: 10, priceDay: 50, priceMonth: 500, rating: 4.2, ratingCount: 156,
    status: "open", hours: "10:00 – 00:00", heightLimit: "2.2m",
    features: ["ev", "covered", "cameras", "disabled"],
    mapX: 635, mapY: 175, color: "red",
    reviews: [
      { user: "Reem S.", rating: 4, text: "Great for mall visits. Gets full on Fridays though.", time: "1 week ago", verified: true },
    ],
  },
  {
    id: "p4", lat: 24.7635, lng: 46.6416, name: "KAFD Parking Tower", address: "King Abdulaziz Rd, KAFD", type: "Business",
    distance: "2.1 km", walkTime: "26 min", available: 67, total: 300,
    priceHour: 20, priceDay: 100, priceMonth: 1200, rating: 4.9, ratingCount: 89,
    status: "open", hours: "Open 24/7", heightLimit: "2.4m",
    features: ["ev", "covered", "security", "cameras", "valet", "disabled"],
    mapX: 275, mapY: 320, color: "green",
    reviews: [
      { user: "Mohammed A.", rating: 5, text: "State-of-the-art facility. The app integration is seamless.", time: "4 days ago", verified: true },
      { user: "Lina B.", rating: 5, text: "Premium experience. Worth every riyal.", time: "1 week ago", verified: true },
    ],
  },
  {
    id: "p5", lat: 24.7477, lng: 46.7772, name: "Granada Mall", address: "Eastern Ring Road, Al Nafal", type: "Mall",
    distance: "3.5 km", walkTime: "42 min", available: 12, total: 150,
    priceHour: 8, priceDay: 40, priceMonth: 400, rating: 4.1, ratingCount: 203,
    status: "open", hours: "09:00 – 23:00", heightLimit: "2.0m",
    features: ["covered", "cameras"],
    mapX: 700, mapY: 90, color: "orange",
    reviews: [
      { user: "Tariq N.", rating: 4, text: "Affordable and accessible. Good for the area.", time: "3 days ago", verified: false },
    ],
  },
  {
    id: "p6", lat: 24.728, lng: 46.6743, name: "Riyadh Gallery", address: "Al Urubah Road, Al Mursalat", type: "Mall",
    distance: "1.8 km", walkTime: "22 min", available: 45, total: 180,
    priceHour: 10, priceDay: 55, priceMonth: 550, rating: 4.4, ratingCount: 178,
    status: "open", hours: "10:00 – 23:30", heightLimit: "2.1m",
    features: ["ev", "covered", "cameras", "security"],
    mapX: 370, mapY: 398, color: "green",
    reviews: [
      { user: "Dana F.", rating: 4, text: "Convenient and well-maintained. Love the app check-in.", time: "6 days ago", verified: true },
    ],
  },
  {
    id: "p7", lat: 24.7735, lng: 46.6288, name: "Al Nakheel Plaza", address: "Al Imam Saud Rd, Al Nakheel", type: "Complex",
    distance: "2.5 km", walkTime: "30 min", available: 8, total: 90,
    priceHour: 12, priceDay: 60, priceMonth: 600, rating: 3.9, ratingCount: 94,
    status: "open", hours: "08:00 – 00:00", heightLimit: "1.9m",
    features: ["covered", "security"],
    mapX: 510, mapY: 455, color: "orange",
    reviews: [],
  },
];

export const FILTERS = [
  { id: "available", label: "Available Now", icon: "CheckCircle" },
  { id: "ev", label: "EV Charging", icon: "Zap" },
  { id: "covered", label: "Covered", icon: "Shield" },
  { id: "cameras", label: "CCTV", icon: "Camera" },
  { id: "disabled", label: "Accessible", icon: "Activity" },
  { id: "valet", label: "Valet", icon: "Car" },
  { id: "cheapest", label: "Cheapest", icon: "DollarSign" },
  { id: "closest", label: "Closest", icon: "MapPin" },
  { id: "rated", label: "Top Rated", icon: "Star" },
];

export const NOTIFICATIONS = [
  { id: 1, type: "success", title: "Booking Confirmed", body: "Kingdom Centre · Today, 14:00–16:00", time: "2m ago", read: false },
  { id: 2, type: "warning", title: "Reservation Expires Soon", body: "Al Faisaliah · 30 minutes remaining", time: "28m ago", read: false },
  { id: 3, type: "info", title: "Parking Almost Full", body: "Riyadh Park Mall is now 95% full", time: "1h ago", read: true },
  { id: 4, type: "success", title: "Gate Opened", body: "Welcome to Kingdom Centre Parking", time: "2h ago", read: true },
  { id: 5, type: "success", title: "Payment Successful", body: "SAR 45.00 · Mada card ···· 3421", time: "3h ago", read: true },
];

export const MY_RESERVATIONS = [
  { id: "PRK-2024-4521", parking: "Kingdom Centre", type: "Mall", total: 120, address: "King Fahad Rd, Al Olaya", date: "Today, Mon 14 Jul", time: "14:00 – 16:00", duration: "2 hrs", status: "active", price: 30 },
  { id: "PRK-2024-4488", parking: "KAFD Parking Tower", type: "Business", total: 300, address: "King Abdulaziz Rd, KAFD", date: "Thu 11 Jul 2024", time: "09:00 – 18:00", duration: "9 hrs", status: "completed", price: 180 },
  { id: "PRK-2024-4421", parking: "Granada Mall", type: "Mall", total: 150, address: "Eastern Ring Rd, Al Nafal", date: "Mon 8 Jul 2024", time: "11:00 – 14:00", duration: "3 hrs", status: "completed", price: 24 },
  { id: "PRK-2024-4398", parking: "Riyadh Park Mall", type: "Mall", total: 200, address: "Prince Turki Rd, Al Nakheel", date: "Fri 5 Jul 2024", time: "15:00 – 17:00", duration: "2 hrs", status: "cancelled", price: 20 },
];

export const REVENUE_DATA = [
  { month: "Jan", revenue: 142, bookings: 2840 },
  { month: "Feb", revenue: 158, bookings: 3160 },
  { month: "Mar", revenue: 172, bookings: 3440 },
  { month: "Apr", revenue: 165, bookings: 3300 },
  { month: "May", revenue: 190, bookings: 3800 },
  { month: "Jun", revenue: 215, bookings: 4300 },
  { month: "Jul", revenue: 228, bookings: 4560 },
];

export const PIE_DATA = [
  { name: "Hourly", value: 45, color: "#7B62FF" },
  { name: "Daily", value: 30, color: "#4CC9F0" },
  { name: "Monthly", value: 25, color: "#22C55E" },
];

export const OCCUPANCY_DATA = [
  { name: "Kingdom Centre", pct: 81 },
  { name: "KAFD Tower", pct: 78 },
  { name: "Riyadh Park", pct: 100 },
  { name: "Granada Mall", pct: 92 },
  { name: "Al Faisaliah", pct: 94 },
];

export const colorHex = (c) => (c === "green" ? "#22C55E" : c === "orange" ? "#F59E0B" : "#EF4444");

export const availBadge = (c) =>
  c === "green"
    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/20"
    : c === "orange"
    ? "bg-amber-500/20 text-amber-400 border border-amber-500/20"
    : "bg-red-500/20 text-red-400 border border-red-500/20";

export const statusBadge = (s) =>
  s === "active"
    ? "bg-emerald-500/15 text-emerald-400"
    : s === "completed"
    ? "bg-blue-500/15 text-blue-400"
    : "bg-red-500/15 text-red-400";

export const barCl = (c) => (c === "green" ? "bg-emerald-500" : c === "orange" ? "bg-amber-500" : "bg-red-500");

export const featureMap = {
  ev: { icon: "Zap", label: "EV Charging", color: "text-sky-400" },
  covered: { icon: "Shield", label: "Covered", color: "text-violet-400" },
  security: { icon: "Shield", label: "24/7 Security", color: "text-emerald-400" },
  cameras: { icon: "Camera", label: "CCTV", color: "text-amber-400" },
  valet: { icon: "Car", label: "Valet", color: "text-pink-400" },
  disabled: { icon: "Activity", label: "Accessible", color: "text-cyan-400" },
};
