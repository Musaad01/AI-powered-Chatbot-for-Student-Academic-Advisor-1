document.getElementById("send-btn").addEventListener("click", async function() {
    const userInput = document.getElementById("user-input").value;

    if (userInput) {
        displayMessage(userInput, "user");
        showLoadingIndicator();
        await fetchResponse(userInput);
        document.getElementById("user-input").value = "";  // Clear input field after sending
    }
});

async function fetchResponse(userInput) {
    try {
        const response = await fetch("http://127.0.0.1:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userInput })  // Sending message to backend
        });

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        hideLoadingIndicator();
        displayMessage(data.reply, "bot");
    } catch (error) {
        hideLoadingIndicator();
        displayMessage("Error: Unable to fetch the response", "error");
    }
}

function displayMessage(message, sender) {
    const chatBox = document.getElementById("chat-box");
    const messageElement = document.createElement("div");
    messageElement.classList.add("chat-message", sender);
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function showLoadingIndicator() {
    // Show loading indicator if needed
}

function hideLoadingIndicator() {
    // Hide loading indicator when request is completed
}
