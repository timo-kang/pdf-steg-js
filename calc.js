const fs = require('fs');

function calculateInjectableData(inputPdfPath) {
    // Read the uncompressed PDF file
    const pdfContent = fs.readFileSync(inputPdfPath, 'utf8');

    // Regex to find all text objects (BT ... ET) and count TJ operators
    const textObjects = pdfContent.match(/BT[\s\S]*?ET/gs);
    if (!textObjects) {
        console.log("No text objects (BT ... ET) found in the PDF.");
        return 0;
    }

    let totalInjectableBytes = 0;
    let totalTJOperators = 0;

    textObjects.forEach(textObject => {
        // Count TJ operators in each text object
        const tjOperators = (textObject.match(/\bTJ\b/g) || []).length;
        totalTJOperators += tjOperators;

        // Assuming each TJ can safely accept a certain number of bytes
        // For example, each TJ can contain an injected string like "(hidden_data)"
        // This calculation assumes a placeholder of 16 bytes per TJ
        totalInjectableBytes += tjOperators * 16; // Adjust 16 as needed based on actual usage
    });

    console.log(`Total text objects (BT ... ET): ${textObjects.length}`);
    console.log(`Total TJ operators found: ${totalTJOperators}`);
    console.log(`Estimated injectable data size: ${totalInjectableBytes} bytes`);

    return totalInjectableBytes;
}

// Example usage
const inputPdf = 'uncomp-steg-sample.pdf'; // Path to the uncompressed PDF
const injectableDataSize = calculateInjectableData(inputPdf);

console.log(`You can inject approximately ${injectableDataSize} bytes into ${inputPdf}.`);

