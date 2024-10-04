from flask import Flask, request, jsonify
import openai

app = Flask(__name__)

openai.api_key = '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'

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message')

    if not user_input:
        return jsonify({"reply": "No message provided"}), 400

    # Fetch response from OpenAI
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=user_input,
        max_tokens=150
    )

    bot_reply = response.choices[0].text.strip()
    return jsonify({"reply": bot_reply})

if __name__ == '__main__':
    app.run(debug=True)
