async function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    const chatContainer = document.getElementById('chatContainer');
    const chatMessage = document.createElement('div');
    chatMessage.classList.add('chat-message');
    chatMessage.innerText = `You: ${userInput}`;
    chatContainer.appendChild(chatMessage);

    const response = await getChatGPTResponse(userInput);
    const botMessage = document.createElement('div');
    botMessage.classList.add('chat-message');
    botMessage.innerText = `ChatGPT: ${response}`;
    chatContainer.appendChild(botMessage);
}

async function getChatGPTResponse(userInput) {
    // Replace 'YOUR_API_KEY' with your actual ChatGPT API key
    const apiKey = 'YOUR_API_KEY';
    const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'text-davinci-003',
            prompt: userInput,
            max_tokens: 50
        })
    });
    const data = await response.json();
    return data.choices[0].text.trim();
}