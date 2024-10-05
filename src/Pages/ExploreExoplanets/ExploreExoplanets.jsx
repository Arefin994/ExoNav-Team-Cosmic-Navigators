import { useEffect, useState } from "react";
import Planet3D from "../../components/Planet3D/Planet3D";
import "./ExploreExoplanets.css";
import { Link } from "react-router-dom";

const textureUrls = {
  "OGLE-2016-BLG-1227L b":
    "https://images-assets.nasa.gov/image/PIA20690/PIA20690~large.jpg",
  "Kepler-276 c":
    "https://images-assets.nasa.gov/image/ACD20-0044-001/ACD20-0044-001~large.jpg",
  "Kepler-829 b":
    "https://images-assets.nasa.gov/image/PIA21473/PIA21473~orig.jpg",
  "Kepler-477 b":
    "https://images-assets.nasa.gov/image/PIA23689/PIA23689~large.jpg",
  "TOI-1260 c":
    "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001417/GSFC_20171208_Archive_e001417~large.jpg",
  "HD 149143 b":
    "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000132/GSFC_20171208_Archive_e000132~large.jpg",
};

const ExploreExoplanets = () => {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State to hold error messages

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await fetch("http://localhost:3000/exoplanets");
        if (!response.ok) {
          throw new Error(Error: ${response.status});
        }
        const data = await response.json();
        setPlanets(data);
      } catch (error) {
        console.error("Error fetching exoplanet data: ", error);
        setError("Failed to load exoplanet data.");
      } finally {
        setLoading(false);
      }
    };
    fetchPlanets();
  }, []);

  if (loading) return <p>Loading exoplanets...</p>;
  if (error) return <p>{error}</p>; // Display error message if there's an error

  return (
    <div className="explore">
      {/* <h1>Explore Exoplanets</h1> */}
      <ul className="exoplanet-container">
        {planets.map((planet, index) => (
          <li key={index} className="exoplanet-item">
            <h2>{planet.pl_name}</h2>
            {/* <Planet3D textureUrl="https://images-assets.nasa.gov/image/PIA20690/PIA20690~large.jpg" /> */}
            <Planet3D textureUrl={textureUrls[planet.pl_name]} />
            <div className="exploreBtn">
              <Link
                style={{ textDecoration: "none" }}
                className="explore-button"
                to={`/explore/${planet?.pl_name
                  .replace(/\s+/g, "-")
                  .toLowerCase()}`}
              >
                Explore{" "}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExploreExoplanets;