// ConvertAPI service for PDF to EPUB conversion
const CONVERT_API_SECRET = 'YOUR_API_SECRET_HERE'; // User needs to add their API key
const CONVERT_API_URL = 'https://v2.convertapi.com/convert/pdf/to/epub';

export const convertPdfToEpubAPI = async (pdfFile, metadata) => {
    try {
        const formData = new FormData();
        formData.append('File', pdfFile);
        formData.append('StoreFile', 'true');

        // Add metadata if provided
        if (metadata.title) {
            formData.append('Title', metadata.title);
        }
        if (metadata.author) {
            formData.append('Author', metadata.author);
        }

        const response = await fetch(`${CONVERT_API_URL}?Secret=${CONVERT_API_SECRET}`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`ConvertAPI error: ${response.status}`);
        }

        const result = await response.json();

        if (result.Files && result.Files.length > 0) {
            const epubUrl = result.Files[0].Url;

            // Download the EPUB file
            const epubResponse = await fetch(epubUrl);
            const epubBlob = await epubResponse.blob();

            return epubBlob;
        } else {
            throw new Error('No files returned from ConvertAPI');
        }
    } catch (error) {
        console.error('ConvertAPI conversion failed:', error);
        throw error;
    }
};

export const isAPIConfigured = () => {
    return CONVERT_API_SECRET !== 'YOUR_API_SECRET_HERE' && CONVERT_API_SECRET.length > 0;
};
