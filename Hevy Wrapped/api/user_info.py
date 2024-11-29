import pandas as pd
from user_info_helper import (
  total_workouts,
  total_workout_time,
  workout_percent,
  average_workout_duration,
  most_frequent_day_of_week,
  workouts_per_day_of_the_week,
  most_active_time_of_day,
  workouts_per_time_of_day,
  percentage_of_most_active_time_of_day,
  exercise_summary,
  total_volume
)

def process_workout_data(file_path, body_weight, full_name):
  # Read the CSV file
  data = pd.read_csv(file_path)

  # Extract start_time and end_time, and parse them as datetime objects
  workout_times = data[['start_time', 'end_time']].drop_duplicates()
  workout_times['start_time'] = pd.to_datetime(workout_times['start_time'], format='%d %b %Y, %H:%M')
  workout_times['end_time'] = pd.to_datetime(workout_times['end_time'], format='%d %b %Y, %H:%M')

  # Calculate workout duration in minutes
  workout_times['duration_minutes'] = (workout_times['end_time'] - workout_times['start_time']).dt.total_seconds() / 60

  # Add the day of the week
  workout_times['day_of_week'] = workout_times['start_time'].dt.day_name()

  # Categorize the time of day
  def categorize_time_of_day(hour):
    if hour < 9:
      return 'Early Morning'
    elif hour < 12:
      return 'Morning'
    elif hour < 17:
      return 'Afternoon'
    elif hour < 21:
      return 'Evening'
    else:
      return 'Late Night'

  workout_times['time_of_day'] = workout_times['start_time'].dt.hour.apply(categorize_time_of_day)

  # Process the data and calculate user information
  user_info = {
    'total_workouts': total_workouts(workout_times),
    'total_workout_time_minutes': total_workout_time(workout_times),
    'workout_percentage_days': workout_percent(data, workout_times),
    'average_workout_duration_minutes': average_workout_duration(workout_times),
    'most_frequent_day_of_week': most_frequent_day_of_week(workout_times),
    'workouts_per_day_of_the_week': workouts_per_day_of_the_week(workout_times).to_dict(),
    'most_active_time_of_day': most_active_time_of_day(workout_times),
    'workouts_per_time_of_day': workouts_per_time_of_day(workout_times).to_dict(),
    'percentage_most_active_time_of_day': percentage_of_most_active_time_of_day(workout_times),
    'top_five_exercises': exercise_summary(data, body_weight).head().to_dict(),
    'total_volume_kgs': total_volume(data, body_weight),
    'name': full_name
  }

  return user_info

