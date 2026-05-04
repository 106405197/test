from flask import Flask, request, jsonify, send_from_directory
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv(override=True)

# Initialize Flask app to serve static files from current directory
app = Flask(__name__, static_folder='.', static_url_path='')

# Configure Gemini API
api_key = os.environ.get("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)
else:
    print("WARNING: GEMINI_API_KEY environment variable not found. Please add it to your .env file.")

# Initialize the model (using a fast model suitable for chat)
try:
    model = genai.GenerativeModel("gemini-3.1-flash-lite-preview")
except Exception as e:
    print(f"Error initializing model: {e}")
    model = None

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    if not model:
        return jsonify({"error": "Gemini model is not initialized. Check your API key."}), 500

    data = request.json
    user_message = data.get('message', '')

    if not user_message:
        return jsonify({"error": "Message is required"}), 400

    try:
        # Start or continue chat
        response = model.generate_content(user_message)
        return jsonify({"response": response.text})
    except Exception as e:
        print(f"Error generating content: {e}")
        return jsonify({"error": "An error occurred while generating the response."}), 500

if __name__ == '__main__':
    print("Starting Flask server... Please ensure you have set GEMINI_API_KEY in your .env file.")
    # Use 127.0.0.1 and port 8080 to avoid Windows permission or port conflict issues
    app.run(host='127.0.0.1', port=8080, debug=True)
