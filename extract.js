const fs = require('fs');

function extractHiddenData(inputPdfPath) {
    // Read the uncompressed PDF file
    const pdfContent = fs.readFileSync(inputPdfPath, 'utf8');

    // Regex to find all text objects (BT ... ET)
    const textObjects = pdfContent.match(/BT[\s\S]*?ET/gs);
    if (!textObjects) {
        console.log("No text objects (BT ... ET) found in the PDF.");
        return [];
    }

    let hiddenDataList = [];

    textObjects.forEach(textObject => {
        // Regex to find all data in TJ operators
        const hiddenDataMatches = textObject.match(/\((.*?)\)\s*Tj/g);
        if (hiddenDataMatches) {
            hiddenDataMatches.forEach(match => {
                // Extract the content inside parentheses
                const hiddenData = match.match(/\((.*?)\)/)[1];
                hiddenDataList.push(hiddenData);
            });
        }
    });

    return hiddenDataList;
}

// Example usage
const inputPdf = 'output_with_hidden_data.pdf'; // Path to the modified PDF
const hiddenData = extractHiddenData(inputPdf);

if (hiddenData.length > 0) {
    console.log(`Extracted hidden data from ${inputPdf}:`);
    hiddenData.forEach((data, index) => {
        console.log(`[${index + 1}] ${data}`);
    });
} else {
    console.log(`No hidden data found in ${inputPdf}.`);
}

