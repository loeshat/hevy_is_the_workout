import csv
import io

REQUIRED_HEADERS = [
  "title", "start_time", "end_time", "description", "exercise_title",
  "superset_id", "exercise_notes", "set_index", "set_type", "weight_kg",
  "reps", "distance_km", "duration_seconds", "rpe"
]

def validate_csv(file):
  file.seek(0)  # Ensure the file pointer is at the start
  # Decode the file without wrapping it, so it doesn't close
  decoded_file = file.read().decode("utf-8")
  lines = decoded_file.splitlines()
  reader = csv.DictReader(lines)

  # Check if all required headers are in the file
  missing_headers = [header for header in REQUIRED_HEADERS if header not in reader.fieldnames]
  if missing_headers:
    return False

  return True
