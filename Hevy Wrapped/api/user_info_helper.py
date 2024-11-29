import pandas as pd

# total workouts
def total_workouts(workout_times): 
  return workout_times.shape[0]


# total workout time
def total_workout_time(workout_times):
  return workout_times['duration_minutes'].sum()


# percentage of days with a workout (%)
def workout_percent(data, workout_times):
  data['start_time'] = pd.to_datetime(data['start_time'], format='%d %b %Y, %H:%M')
  days_between = (data['start_time'].max() - data['start_time'].min()).days
  return ((total_workouts(workout_times) / days_between) * 100)


# average workout duration
def average_workout_duration(workout_times):
  return workout_times['duration_minutes'].mean().round(0)


# most frequent day of the week for workouts
def most_frequent_day_of_week(workout_times):
  return workout_times['day_of_week'].mode()[0]


# calculate the number of workouts for each day of the week
def workouts_per_day_of_the_week(workout_times):
  return workout_times['day_of_week'].value_counts()


# most active time of day for workouts
def most_active_time_of_day(workout_times):
  return workout_times['time_of_day'].mode()[0]


# calculate the number of workouts for each time period
def workouts_per_time_of_day(workout_times):
  return workout_times['time_of_day'].value_counts()


# percentage of most active time of day for workouts
def percentage_of_most_active_time_of_day(workout_times): 
  return ((workout_times['time_of_day'].value_counts().max() / total_workouts(workout_times)) * 100).round(0)


def exercise_summary(data, body_weight):
  # Remove rows where both weight_kg and reps are missing and make a copy
  exercise = data.dropna(subset=['weight_kg', 'reps'], how='all').copy()
  
  exercise['weight_kg'] = exercise['weight_kg'].fillna(body_weight)
  exercise['volume'] = exercise['weight_kg'] * exercise['reps']
  
  exercise_group = exercise.groupby('exercise_title').agg({
    'set_index': 'count',  
    'volume': 'sum',       
  }).reset_index()
  
  # Rename columns for clarity
  exercise_group.rename(columns={
    'set_index': 'total_sets',
    'volume': 'total_volume'
  }, inplace=True)
  
  # Sort by total_sets in descending order
  exercise_group = exercise_group.sort_values(by='total_sets', ascending=False).reset_index(drop=True)
  
  return exercise_group


# total volume of workout sets
def total_volume(data, body_weight):
  return exercise_summary(data, body_weight)['total_volume'].sum()