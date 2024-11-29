export function totalWorkouts(workoutTimes) {
  return workoutTimes.length;
}

export function totalWorkoutTime(workoutTimes) {
  return workoutTimes.reduce(
    (sum, workout) => sum + workout.durationMinutes,
    0
  );
}

export function workoutPercent(data, workoutTimes) {
  const days = new Set(
    data.map((row) => new Date(row.start_time).toDateString())
  );
  const daysBetween =
    (new Date(data[data.length - 1].start_time) -
      new Date(data[0].start_time)) /
    (1000 * 60 * 60 * 24);
  return (-(workoutTimes.length / daysBetween) * 100).toFixed(0);
}

export function averageWorkoutDuration(workoutTimes) {
  return (totalWorkoutTime(workoutTimes) / totalWorkouts(workoutTimes)).toFixed(
    0
  );
}

export function mostFrequentDayOfWeek(workoutTimes) {
  const frequency = {};
  workoutTimes.forEach((row) => {
    frequency[row.dayOfWeek] = (frequency[row.dayOfWeek] || 0) + 1;
  });
  return Object.keys(frequency).reduce((a, b) =>
    frequency[a] > frequency[b] ? a : b
  );
}

export function workoutsPerDayOfWeek(workoutTimes) {
  const frequency = {};
  workoutTimes.forEach((row) => {
    frequency[row.dayOfWeek] = (frequency[row.dayOfWeek] || 0) + 1;
  });
  return frequency;
}

export function mostActiveTimeOfDay(workoutTimes) {
  const frequency = {};
  workoutTimes.forEach((row) => {
    frequency[row.timeOfDay] = (frequency[row.timeOfDay] || 0) + 1;
  });
  return Object.keys(frequency).reduce((a, b) =>
    frequency[a] > frequency[b] ? a : b
  );
}

export function workoutsPerTimeOfDay(workoutTimes) {
  const frequency = {};
  workoutTimes.forEach((row) => {
    frequency[row.timeOfDay] = (frequency[row.timeOfDay] || 0) + 1;
  });
  return frequency;
}

export function percentageMostActiveTimeOfDay(workoutTimes) {
  const frequency = workoutsPerTimeOfDay(workoutTimes);
  const max = Math.max(...Object.values(frequency));
  return ((max / totalWorkouts(workoutTimes)) * 100).toFixed(0);
}

export function exerciseSummary(data, bodyWeight) {
  const exercises = data
    .filter((row) => row.weight_kg || row.reps)
    .map((row) => ({
      exerciseTitle: row.exercise_title,
      weightKg: row.weight_kg || bodyWeight,
      reps: row.reps,
      volume: (row.weight_kg || bodyWeight) * row.reps,
    }));

  const summary = {};
  exercises.forEach((row) => {
    if (!summary[row.exerciseTitle]) {
      summary[row.exerciseTitle] = { totalSets: 0, totalVolume: 0 };
    }
    summary[row.exerciseTitle].totalSets += 1;
    summary[row.exerciseTitle].totalVolume += row.volume;
  });

  const sortedSummary = Object.entries(summary)
    .map(([exerciseTitle, stats]) => ({ exerciseTitle, ...stats }))
    .sort((a, b) => b.totalSets - a.totalSets);

  // Return only the top 5 exercises
  return sortedSummary;
}

export function totalVolume(data, bodyWeight) {
  const summary = exerciseSummary(data, bodyWeight);
  return Object.values(summary).reduce(
    (sum, exercise) => sum + exercise.totalVolume,
    0
  );
}
