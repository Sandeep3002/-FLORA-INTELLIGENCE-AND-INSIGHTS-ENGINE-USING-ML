// src/services/communityService.js
import { getNextApiKey } from '../utils/apiKeys';

// Fallback data in case API fails
const fallbackPosts = [
    {
        author: "Dr. Sarah Johnson",
        topic: "Sustainable Farming",
        content: "Looking to implement sustainable farming practices? Start with crop rotation and natural pest control methods. I've seen remarkable improvements in soil health using these techniques.",
        likes: 45,
        comments: 12,
    },
    {
        author: "Mike Chen",
        topic: "Organic Farming",
        content: "Just completed my first season of organic farming. The yield was better than expected! Happy to share my experience with anyone interested in making the transition.",
        likes: 32,
        comments: 8,
    },
    {
        author: "Emma Rodriguez",
        topic: "Technology in Agriculture",
        content: "Using soil sensors has revolutionized my irrigation system. Water usage is down 30% while crop health has improved significantly.",
        likes: 56,
        comments: 15,
    },
    // Add more fallback posts as needed
];

export const generateCommunityContent = async (prompt) => {
    try {
        const apiKey = getNextApiKey();
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            })
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text;
    } catch (error) {
        console.error('Error generating content:', error);
        return null;
    }
};

export const getFallbackPosts = () => fallbackPosts;