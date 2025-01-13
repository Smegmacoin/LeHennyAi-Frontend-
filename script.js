const chatInput = document.getElementById("chat-input");
const chatBox = document.getElementById("chat-box");

chatInput.addEventListener("keypress", async function (event) {
    if (event.key === "Enter") {
        const userMessage = chatInput.value.trim();
        if (userMessage) {
            appendMessage("You", userMessage);
            chatInput.value = "";

            // Call the backend API
            try {
                const response = await fetch("https://lehennybackend-24e9a3db1b3a.herokuapp.com/ask", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ message: userMessage }),
                });

                const data = await response.json();
                if (data.response) {
                    appendMessage("LeHenny", data.response);
                } else {
                    appendMessage("LeHenny", "Yo, I couldn't process that. Try again!");
                }
            } catch (error) {
                appendMessage("LeHenny", "Yo, there was a problem connecting. Check your setup!");
            }
        }
    }
});

function appendMessage(sender, message) {
    const messageElement = document.createElement("div");
    messageElement.textContent = `${sender}: ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
