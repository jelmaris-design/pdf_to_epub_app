// API service for backend communication
const API_URL = 'https://pdf-to-epub-app.vercel.app';

console.log('[API Service] Using API URL:', API_URL);

export const sendToKindleAPI = async (epubBlob, metadata, recipientEmail) => {
    try {
        // Convert blob to base64
        const reader = new FileReader();

        return new Promise((resolve, reject) => {
            reader.onloadend = async () => {
                const base64Data = reader.result.split(',')[1];

                try {
                    console.log('[API Service] Sending request to:', `${API_URL}/api/send-to-kindle`);
                    console.log('[API Service] Payload:', {
                        recipientEmail,
                        fileName: `${metadata.title || 'book'}.epub`,
                        title: metadata.title,
                        author: metadata.author,
                        fileDataLength: base64Data?.length
                    });

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

                    console.log('[API Service] Response status:', response.status);

                    const data = await response.json();
                    console.log('[API Service] Response data:', data);

                    if (!response.ok) {
                        throw new Error(data.error || 'Failed to send email');
                    }

                    resolve(data);
                } catch (error) {
                    console.error('[API Service] Error:', error);
                    console.error('[API Service] Error message:', error.message);
                    console.error('[API Service] Error stack:', error.stack);
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
