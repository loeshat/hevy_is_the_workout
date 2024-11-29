import Papa from "papaparse";

import {
  totalWorkouts,
  totalWorkoutTime,
  workoutPercent,
  averageWorkoutDuration,
  mostFrequentDayOfWeek,
  workoutsPerDayOfWeek,
  mostActiveTimeOfDay,
  workoutsPerTimeOfDay,
  percentageMostActiveTimeOfDay,
  exerciseSummary,
  totalVolume,
} from "./process_data_helpers.js";

export function handleFileUpload(file, fullName, bodyWeight) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    // Read the file content when the file is loaded
    reader.onload = (event) => {
      const fileContent = event.target.result;
      try {
        const processedData = processWorkoutData(
          fileContent,
          Number(bodyWeight),
          fullName.trim()
        );
        resolve(processedData);
      } catch (error) {
        console.error("Error processing the file:", error.message);
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error("Error reading the file."));
    };

    reader.readAsText(file);
  });
}

function processWorkoutData(fileContent, bodyWeight, fullName) {
  const { data } = Papa.parse(fileContent, { header: true });

  // Extract workout times and ensure uniqueness
  const uniqueWorkoutTimes = Array.from(
    new Set(
      data
        .filter((row) => row.start_time && row.end_time)
        .map((row) =>
          JSON.stringify({ startTime: row.start_time, endTime: row.end_time })
        )
    )
  ).map((item) => JSON.parse(item));

  const workoutTimes = uniqueWorkoutTimes.map((row) => ({
    startTime: new Date(row.startTime),
    endTime: new Date(row.endTime),
  }));

  // Process each workout entry
  workoutTimes.forEach((row) => {
    row.durationMinutes = (row.endTime - row.startTime) / 60000;
    row.dayOfWeek = row.startTime.toLocaleString("en-US", { weekday: "long" });
    row.timeOfDay = categorizeTimeOfDay(row.startTime.getHours());
  });

  const userInfo = {
    total_workouts: totalWorkouts(workoutTimes),
    total_workout_time_minutes: totalWorkoutTime(workoutTimes),
    workout_percentage_days: workoutPercent(data, workoutTimes),
    average_workout_duration_minutes: averageWorkoutDuration(workoutTimes),
    most_frequent_day_of_week: mostFrequentDayOfWeek(workoutTimes),
    workouts_per_day_of_the_week: workoutsPerDayOfWeek(workoutTimes),
    most_active_time_of_day: mostActiveTimeOfDay(workoutTimes),
    workouts_per_time_of_day: workoutsPerTimeOfDay(workoutTimes),
    percentage_most_active_time_of_day:
      percentageMostActiveTimeOfDay(workoutTimes),
    top_five_exercises: exerciseSummary(data, bodyWeight).slice(0, 5),
    total_volume_kgs: totalVolume(data, bodyWeight),
    name: fullName,
  };

  return userInfo;
}

function categorizeTimeOfDay(hour) {
  if (hour < 9) return "Early Morning";
  if (hour < 12) return "Morning";
  if (hour < 17) return "Afternoon";
  if (hour < 21) return "Evening";
  return "Late Night";
}
