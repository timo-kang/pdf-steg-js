const fs = require('fs');

function injectDataIntoPDF(inputPdfPath, outputPdfPath, hiddenData) {
    // Read the uncompressed PDF file
    let pdfContent = fs.readFileSync(inputPdfPath, 'utf8');

    // Regex to find all text objects (BT ... ET)
    const textObjects = pdfContent.match(/BT[\s\S]*?ET/gs);
    if (!textObjects) {
        console.log("No text objects (BT ... ET) found in the PDF.");
        return;
    }

    let dataIndex = 0; // Track current index in hiddenData
    const dataLength = hiddenData.length;

    // Iterate through each text object
    const modifiedContent = pdfContent.replace(/BT[\s\S]*?ET/gs, (match) => {
        return match.replace(/TJ/g, (tjMatch) => {
            // Inject data in chunks into each TJ operator
            const chunkSize = 10; // Adjust this size as needed
            if (dataIndex < dataLength) {
                const chunk = hiddenData.slice(dataIndex, dataIndex + chunkSize);
                dataIndex += chunk.length;
                return `(${chunk}) Tj TJ`;
            }
            return tjMatch; // If no data left, leave TJ as is
        });
    });

    // Write the modified content back to a new PDF file
    fs.writeFileSync(outputPdfPath, modifiedContent, 'utf8');
    console.log(`Data injected successfully into ${outputPdfPath}`);
}

// Example usage
const inputPdf = 'input_uncompressed.pdf'; // Path to the uncompressed PDF
const outputPdf = 'output_with_hidden_data.pdf'; // Path to the modified PDF
const hiddenMessage = "ThisIsAHiddenMessageThatIsVeryLongAndNeedsToBeSplitIntoChunks"; // Data to hide
injectDataIntoPDF(inputPdf, outputPdf, hiddenMessage);

