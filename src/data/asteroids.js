// perigee_km: miss distance from Earth's surface in kilometers (visual input)
// velocity_km_s: relative velocity (for later mapping if needed)
export const ASTEROIDS = [
  { id: "A-1", perigee_km: 40000, velocity_km_s: 12.0, color:"#ff6b6b", eccentricity: 0.1, inclination_deg: 5 },
  { id: "A-2", perigee_km: 150000, velocity_km_s: 8.5, color:"#ffd93d", eccentricity: 0.3, inclination_deg: 20 },
  { id: "A-3", perigee_km: 384400, velocity_km_s: 6.5, color:"#4d96ff", eccentricity: 0.5, inclination_deg: 45 }, // ~ lunar distance
  { id: "A-4", perigee_km: 80000, velocity_km_s: 15.2, color:"#a29bfe", eccentricity: 0.05, inclination_deg: 10 },
  { id: "A-5", perigee_km: 600000, velocity_km_s: 5.2, color:"#2ecc71", eccentricity: 0.7, inclination_deg: 70 },
]
