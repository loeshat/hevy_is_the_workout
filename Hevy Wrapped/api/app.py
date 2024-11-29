from flask import Flask, request, jsonify
from check_file import validate_csv
from user_info import process_workout_data
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

WRAPPED_FILE = "wrapped_details.txt"

@app.route("/upload", methods=["POST"])
def upload_file():
  # Check if a file is in the request
  if "file" not in request.files:
    return "No file part in the request.", 400

  file = request.files["file"]
  if file.filename == "":
    return "No file selected.", 400

  # Check if body_weight is in the form data
  body_weight = request.form.get("body_weight")
  if not body_weight or not body_weight.isdigit() or int(body_weight) <= 0:
    return "Invalid or missing body weight.", 400

  # Check if full_name is in the form data
  full_name = request.form.get("full_name")
  if not full_name or full_name.strip() == "":
    return "Invalid or missing full name.", 400

  body_weight = int(body_weight)
  full_name = full_name.strip()

  # Validate CSV file headers
  is_valid = validate_csv(file)
  if not is_valid:
    return "Invalid csv File. Please Review", 400

  # Append user details to the WRAPPED_FILE
  with open(WRAPPED_FILE, "a") as wrapped_file:
    wrapped_file.write(f"{full_name}, {body_weight}kg\n")

  # Reset the file pointer for reuse in process_workout_data
  file.stream.seek(0)

  # Process workout data
  try:
    processed_info = process_workout_data(file, body_weight, full_name)
    return jsonify(processed_info), 200
  except Exception as e:
    return f"Error processing file: {str(e)}", 500
