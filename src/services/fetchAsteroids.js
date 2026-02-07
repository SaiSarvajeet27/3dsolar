// src/services/fetchAsteroids.js
import sampleNeoWs from "../data/sample_neows.json"

/**
 * fetchAsteroids()
 * - Attempts to GET /api/neo (your backend). If it fails, fallback to local sample data.
 * - Expects the data to be in NASA NeoWs format:
 *   { near_earth_objects: { "YYYY-MM-DD": [ { ...neo object... }, ... ] } }
 *
 * Returns:
 * [
 *   {
 *     id,
 *     perigee_km,
 *     velocity_km_s,
 *     inclination_deg,
 *     eccentricity,
 *     is_potentially_hazardous_asteroid,
 *     raw: <original neo object> // optional, for later debugging
 *   }, ...
 * ]
 */
export async function fetchAsteroids() {
  // First try your backend proxy endpoint (/api/neo).
  // Your backend should respond with the NeoWs JSON shape (same as sample_neows.json).
  try {
    const res = await fetch("/api/neo")
    if (res.ok) {
      const json = await res.json()
      return mapNeoWsToAsteroids(json)
    }
    // if 404/500, we'll fallback to sample below
    console.warn("/api/neo fetch returned non-ok status, falling back to local sample.")
  } catch (err) {
    // network error or no backend - fallback to sample
    console.warn("Failed to fetch /api/neo (no backend?). Using local sample data.", err)
  }

  // Fallback: use the bundled sample NeoWs JSON
  return mapNeoWsToAsteroids(sampleNeoWs)
}

function mapNeoWsToAsteroids(neowsJson) {
  const out = []
  if (!neowsJson || !neowsJson.near_earth_objects) return out

  const neoGroup = neowsJson.near_earth_objects

  // neoGroup keys are dates (YYYY-MM-DD)
  for (const dateKey of Object.keys(neoGroup)) {
    const neoList = neoGroup[dateKey] || []
    for (const neo of neoList) {
      if (!neo.close_approach_data || neo.close_approach_data.length === 0) continue

      // use the first close approach entry for visualization
      const cad = neo.close_approach_data[0]

      // Defensive conversion — fields in NeoWs are strings
      const perigee_km = Number(cad.miss_distance?.kilometers || 0)
      const velocity_km_s = Number(cad.relative_velocity?.kilometers_per_second || 0)

      // orbital_data may be missing for some small NEOs
      const inclination_deg = Number(neo.orbital_data?.inclination || 0)
      const eccentricity = Number(neo.orbital_data?.eccentricity || 0.3)

      out.push({
        id: neo.name || neo.id || `neo-${Math.random().toString(36).slice(2, 8)}`,
        perigee_km,
        velocity_km_s,
        inclination_deg,
        eccentricity: Math.min(Math.max(eccentricity, 0.01), 0.95),
        is_potentially_hazardous_asteroid: !!neo.is_potentially_hazardous_asteroid,
        raw: neo
      })
    }
  }
  return out
}
