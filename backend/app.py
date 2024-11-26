from flask import Flask, request, jsonify
from check_file import validate_csv
from user_info import process_workout_data 
import os

from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Define a folder to save uploaded files
UPLOAD_FOLDER = './uploaded_files'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

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

  body_weight = int(body_weight)
  file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
  file.save(file_path)

  # Validate CSV structure
  is_valid, message = validate_csv(file_path)
  if not is_valid:
    os.remove(file_path)
    return message, 400

  try:
    processed_info = process_workout_data(file_path, body_weight)  # Pass body_weight here
    return jsonify(processed_info), 200
  except Exception as e:
    return f"Error processing file: {str(e)}", 500



if __name__ == "__main__":
    app.run(debug=True, port=5000)
