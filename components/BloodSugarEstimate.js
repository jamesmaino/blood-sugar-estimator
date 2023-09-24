import React from "react";
import LineGraph from "./LineGraph";

function BloodSugarEstimate({ nutrition }) {
  if (typeof nutrition !== "string") return null;
  if (nutrition === "") return null;

  const times = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; //hours

  function estimateBloodSugar(total_carb_grams) {
    const initial_blood_sugar = 100; // baseline blood sugar
    const rise_per_gram = 5; // mg/dL rise per gram of carbohydrate
    const fall_per_hour = 10; // mg/dL fall per hour post-absorption

    const max_blood_sugar_rise = total_carb_grams * rise_per_gram;

    return times.map((time) => {
      // time is assumed to be in hours since carbohydrate consumption
      const estimated_rise = max_blood_sugar_rise - fall_per_hour * time;
      return initial_blood_sugar + Math.max(estimated_rise, 0); // Ensure blood sugar doesn't go negative
    });
  }

  const arr = JSON.parse(nutrition);
  function extractNumber(str) {
    const match = str.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : null;
  }
  const totalCarbGrams = extractNumber(
    arr.filter((a) => a.name == "total")[0].value
  );
  const y = estimateBloodSugar(totalCarbGrams, times);

  const data = {
    x: times,
    y: y,
  };

  return (
    <div className="App">
      <h2>Assumptions</h2>
      <p> Every gram of carbohydrate raises blood sugar by 5 mg/dL. </p>
      <p>
        Blood sugar decreases by 10 mg/dL every hour after the consumption of
        the carbohydrate (post-absorption).
      </p>
      <p>
        Initial blood sugar (before any food intake) is set to a fixed value,
        let's say 100 mg/dL.
      </p>
      <h2>Estimate of blood sugar</h2>
      <LineGraph data={data} width={500} height={300} />
    </div>
  );
}

export default BloodSugarEstimate;
