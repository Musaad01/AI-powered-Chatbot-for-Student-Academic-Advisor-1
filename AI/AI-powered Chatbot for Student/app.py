# File: app.py

from flask import Flask, render_template, request, jsonify
import openai

app = Flask(__name__)

# OpenAI API Key Initialization
openai.api_key = "sk-sk-esgomDfZMpG2SKY-jQ_PZhsCz6HEL2TiCNR4HR_oNET3BlbkFJxb-LdLldbFbrPIOFwMaLxMa8APNwZt3UU7oxNz4VkA"

# Function to generate a response from ChatGPT
def get_chatgpt_response(message):
    try:
        response = openai.Completion.create(
            engine="gpt-3.5-turbo",  # You can change this to 'gpt-3.5-turbo' if needed
            prompt=message,
            max_tokens=150,
            temperature=0.7
        )
        return response.choices[0].text.strip()
    except Exception as e:
        return f"Error: {str(e)}"

# Main route to serve the HTML page
@app.route('/')
def index():
    return render_template('index.html')

# Chat API route to handle user messages
@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get("message")
    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    bot_response = get_chatgpt_response(user_message)
    return jsonify({"response": bot_response})

if __name__ == '__main__':
    app.run(debug=True)
