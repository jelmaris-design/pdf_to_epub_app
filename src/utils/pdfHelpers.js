import * as pdfjsLib from 'pdfjs-dist';

// Configure worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export const extractPdfMetadata = async (file) => {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;
        const metadata = await pdf.getMetadata();

        return {
            title: metadata.info.Title || file.name.replace('.pdf', ''),
            author: metadata.info.Author || 'Unknown Author',
            pageCount: pdf.numPages
        };
    } catch (error) {
        console.error("Error extracting metadata:", error);
        return {
            title: file.name.replace('.pdf', ''),
            author: 'Unknown Author',
            pageCount: 0
        };
    }
};

export const extractPdfText = async (file) => {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;

        let chapters = [];

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();

            // Group text items by vertical position to detect paragraphs
            let currentY = null;
            let currentParagraph = [];
            let paragraphs = [];

            textContent.items.forEach((item) => {
                const y = item.transform[5];
                const text = item.str.trim();

                if (!text) return;

                // Detect new paragraph (significant Y position change)
                if (currentY !== null && Math.abs(y - currentY) > 5) {
                    if (currentParagraph.length > 0) {
                        paragraphs.push(currentParagraph.join(' '));
                        currentParagraph = [];
                    }
                }

                currentParagraph.push(text);
                currentY = y;
            });

            // Add last paragraph
            if (currentParagraph.length > 0) {
                paragraphs.push(currentParagraph.join(' '));
            }

            // Add page content
            if (paragraphs.length > 0) {
                chapters.push({
                    pageNum: i,
                    content: paragraphs
                });
            }
        }

        // Convert to HTML with proper structure
        let htmlContent = '';
        chapters.forEach((chapter, idx) => {
            chapter.content.forEach((para) => {
                // Detect headings (short paragraphs with capital letters)
                if (para.length < 100 && para === para.toUpperCase() && para.split(' ').length < 10) {
                    htmlContent += `<h2>${para}</h2>\n`;
                } else {
                    htmlContent += `<p>${para}</p>\n`;
                }
            });

            // Add page break marker
            if (idx < chapters.length - 1) {
                htmlContent += '<div class="page-break"></div>\n';
            }
        });

        return htmlContent;
    } catch (error) {
        console.error("Error extracting text:", error);
        return '<p>Error extracting text from PDF.</p>';
    }
};
