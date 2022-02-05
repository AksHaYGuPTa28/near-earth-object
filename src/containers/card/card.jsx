import axios from "axios";
import React, { useEffect, useState } from "react";
import useGlobalState from "../../state";
import Asteroid from "../../assets/asteroid .gif";
import Miss from "../../assets/miss.gif";
import Hit from "../../assets/hit.gif";
import "./card.css";
import { FcApproval, FcCancel } from "react-icons/fc";

function formatStringToDecimal(str) {
  return Number(str).toFixed(2);
}

export const ResultsTable = () => {
  const { state } = useGlobalState();
  const { startDate, endDate } = state;
  const [neObjects, setNeObjects] = useState([]);

  useEffect(() => {
    const fetchNeObjects = async () => {
      const response = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=AriO34bLsAosAxWaoHMajZsMw8B9mR9adrPC0iiH`
      );
      setNeObjects(response.data);
    };
    fetchNeObjects();
  }, [startDate, endDate, setNeObjects]);

  const objectSets = neObjects["near_earth_objects"]
    ? Object.keys(neObjects["near_earth_objects"]).map((k) =>
        neObjects["near_earth_objects"][k].map((info) => {
          return {
            date: k,
            id: info.id,
            name: info.name,
            hazardous: info.is_potentially_hazardous_asteroid,
            diameterMin: formatStringToDecimal(
              info.estimated_diameter.meters.estimated_diameter_min
            ),
            diameterMax: formatStringToDecimal(
              info.estimated_diameter.meters.estimated_diameter_max
            ),
            missedBy: formatStringToDecimal(
              info.close_approach_data[0].miss_distance.kilometers
            ),
          };
        })
      )
    : [];
  let flattenedObjects = [].concat.apply([], objectSets);

  return (
    <div>
      {flattenedObjects.length === 0 ? (
        <div className="fetching-data">
          <img src={Asteroid} alt="Loading.." />
          <h1>Fetching me....?</h1>
        </div>
      ) : (
        <div>
          <h2 className="total-objects">
            Total Objects: {neObjects.element_count || 0}
          </h2>

          <div className="asteroid-container">
            {flattenedObjects.length === 0 && (
              <tr>
                <div>Failed to retrieve any data.</div>
              </tr>
            )}
            {flattenedObjects.map((obj) => {
              return (
                <div className="asteroid-card" key={obj.id}>
                  {obj.hazardous ? (
                    <img src={Hit} alt="Loading.." />
                  ) : (
                    <img src={Miss} alt="Loading.." />
                  )}

                  <p>Id: {obj.id}</p>
                  <p>Name: {obj.name}</p>
                  <p>Date: {obj.date}</p>
                  <div>
                    <div className="check-dangerous">
                      <p> Dangerous:</p>
                      {obj.hazardous ? <FcApproval /> : <FcCancel />}
                    </div>
                  </div>
                  <p>Minimum-Diameter: {obj.diameterMin}</p>
                  <p>Maximum-Diameter: {obj.diameterMax}</p>
                  <p>Missed By: {obj.missedBy}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsTable;
