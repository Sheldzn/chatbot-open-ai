const apiKey = "API_KEY_HERE";
const chatbox = document.getElementById("chatbox");
const userInput = document.getElementById("userInput");

async function sendMessage() {
  const message = userInput.value;
  if (!message) return;

  chatbox.innerHTML += `<div class="message user">${message}</div>`;
  userInput.value = "";

  try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${apiKey}`
          },
          body: JSON.stringify({
              model: "gpt-4o",
              messages: [{ role: "user", content: "Hello" }]
          })
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (!data.choices || data.choices.length === 0) {
          throw new Error("Invalid API response structure");
      }

      const botMessage = data.choices[0].message.content;
      chatbox.innerHTML += `<div class="message bot">${botMessage}</div>`;
      chatbox.scrollTop = chatbox.scrollHeight;
  } catch (error) {
      console.error("Error:", error);
      chatbox.innerHTML += `<div class="message bot">Error: I am taking a nap right</div>`;
  }
}

