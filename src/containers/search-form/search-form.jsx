import React, { useState } from "react";
import "./search-form.css";
import { Input } from "../../components/Input/input";
import useGlobalState from "../../state";
const SEVEN_DAYS_IN_MS = 7 * 24 * 60 * 60 * 1000;

function asMilliseconds(date) {
  return new Date(date).getTime();
}

export const SearchForm = () => {
  const { state, setStartDate, setEndDate } = useGlobalState();
  const [error, setError] = useState(null);

  const validate = (fieldName, fieldValue) => {
    const newDate = asMilliseconds(fieldValue);
    if (fieldName === "startDate") {
      if (newDate > asMilliseconds(state.endDate)) {
        setError("Start date must be less than or equal to the end date");
      } else if (asMilliseconds(state.endDate) - newDate > SEVEN_DAYS_IN_MS) {
        setError("Total range of start to end must not exceed 7 days");
      } else {
        setError(null);
      }

      setStartDate(fieldValue);
    } else if (fieldName === "endDate") {
      if (newDate < asMilliseconds(state.startDate)) {
        setError("End date must be greater than or equal to the start date");
      } else if (newDate - asMilliseconds(state.startDate) > SEVEN_DAYS_IN_MS) {
        setError("Total range of start to end must not exceed 7 days");
      } else {
        setError(null);
      }

      setEndDate(fieldValue);
    }
  };

  return (
    <div>
      <h1 className="main-heading"> Near Earth Object Tracker</h1>
      <h3 className="intruction-heading">
        Change Default start and end date to search for near earth objects
        during that time.
      </h3>
      <div className="date-container">
        <div className="date-selector">
          <p>Start Date:</p>
          <Input
            type="date"
            name="startDate"
            onChange={(value) => validate("startDate", value)}
            value={state.startDate}
          />
        </div>
        <div className="date-selector">
          <p>End Date:</p>
          <Input
            type="date"
            name="endDate"
            onChange={(value) => validate("endDate", value)}
            value={state.endDate}
          />
        </div>
      </div>
      <div>{error || ""}</div>
    </div>
  );
};

export default SearchForm;
