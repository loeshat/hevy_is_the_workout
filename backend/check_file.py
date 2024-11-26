import csv

REQUIRED_HEADERS = [
  "title", "start_time", "end_time", "description", "exercise_title",
  "superset_id", "exercise_notes", "set_index", "set_type", "weight_kg",
  "reps", "distance_km", "duration_seconds", "rpe"
]

def validate_csv(file_path):
  try:
    with open(file_path, mode='r') as csv_file:
      reader = csv.reader(csv_file)
      headers = next(reader)
      if headers == REQUIRED_HEADERS:
        return True, "CSV is valid."
      else:
        return False, f"Invalid CSV headers. Expected: {REQUIRED_HEADERS}"
  except Exception as e:
    return False, f"Error reading CSV file: {str(e)}"

if __name__ == "__main__":
  # For testing purposes
  is_valid, message = validate_csv("data.csv")
  print(message)
