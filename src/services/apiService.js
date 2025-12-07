// API service for backend communication
const API_URL = process.env.REACT_APP_API_URL || 'https://your-app.vercel.app';

export const sendToKindleAPI = async (epubBlob, metadata, recipientEmail) => {
    try {
        // Convert blob to base64
        const reader = new FileReader();

        return new Promise((resolve, reject) => {
            reader.onloadend = async () => {
                const base64Data = reader.result.split(',')[1];

                try {
                    const response = await fetch(`${API_URL}/api/send-to-kindle`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            recipientEmail,
                            fileName: `${metadata.title || 'book'}.epub`,
                            fileData: base64Data,
                            title: metadata.title,
                            author: metadata.author
                        })
                    });

                    const data = await response.json();

                    if (!response.ok) {
                        throw new Error(data.error || 'Failed to send email');
                    }

                    resolve(data);
                } catch (error) {
                    reject(error);
                }
            };

            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsDataURL(epubBlob);
        });
    } catch (error) {
        throw error;
    }
};
