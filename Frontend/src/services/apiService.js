// src/services/apiService.js
import { getNextApiKey, resetApiKeyIndex } from '../utils/apiKeys';

export const generateAIResponse = async (prompt, retryCount = 0) => {
    try {
        const apiKey = getNextApiKey();
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        topK: 40,
                        topP: 0.8,
                        maxOutputTokens: 1024,
                    },
                }),
            }
        );

        if (!response.ok) {
            console.error('API Response Error:', await response.text());
            if (retryCount < 3) {
                return generateAIResponse(prompt, retryCount + 1);
            }
            return getFallbackResponses(prompt); // Pass the prompt to get contextual fallback
        }

        const data = await response.json();
        const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!responseText) {
            return getFallbackResponses(prompt);
        }

        try {
            const jsonStart = responseText.indexOf("{");
            const jsonEnd = responseText.lastIndexOf("}") + 1;
            const jsonStr = responseText.slice(jsonStart, jsonEnd);
            return JSON.parse(jsonStr).responses;
        } catch (error) {
            console.error("Failed to parse response:", error);
            return getFallbackResponses(prompt);
        }
    } catch (error) {
        console.error("API Error:", error);
        return getFallbackResponses(prompt);
    }
};

// Enhanced fallback responses based on prompt content
const getFallbackResponses = (prompt) => {
    // Create contextual responses based on the prompt
    const promptLower = prompt.toLowerCase();

    if (promptLower.includes('soil')) {
        return [
            {
                author: "Dr. Rajesh Kumar",
                village: "Pratappur",
                experience: 15,
                content: "For soil management, I recommend regular testing and organic amendments. Based on my experience, maintaining proper pH levels and organic matter content is crucial."
            },
            {
                author: "Mahesh Patel",
                village: "Krishnanagar",
                experience: 20,
                content: "In our region, we've had great success with crop rotation and green manuring. This has significantly improved soil health over the years."
            }
        ];
    } else if (promptLower.includes('market') || promptLower.includes('price') || promptLower.includes('cost')) {
        return [
            {
                author: "Suresh Verma",
                village: "Ganeshganj",
                experience: 25,
                content: "Market prices fluctuate based on demand and season. I recommend checking the latest APMC rates and connecting with local traders for current prices."
            },
            {
                author: "Dinesh Singh",
                village: "Madhavpur",
                experience: 18,
                content: "From my trading experience, prices vary significantly across regions. It's best to compare rates from multiple markets and consider transportation costs."
            }
        ];
    } else {
        return [
            {
                author: "Dr. Prakash Sharma",
                village: "Sitapur",
                experience: 22,
                content: "Based on my research and field experience, I recommend implementing integrated farming practices. This approach has shown consistent results across different conditions."
            },
            {
                author: "Kishan Reddy",
                village: "Devgarh",
                experience: 30,
                content: "Traditional knowledge combined with modern techniques has worked best for us. Regular monitoring and timely interventions are key to success."
            }
        ];
    }
};