const fs = require('fs');

function injectDataIntoPDF(inputPdfPath, outputPdfPath, hiddenData) {
    // Read the uncompressed PDF file
    let pdfContent = fs.readFileSync(inputPdfPath, 'utf8');

    // Regex to find text streams and inject hidden data
    const modifiedContent = pdfContent.replace(/BT(.*?)ET/gs, (match) => {
        return match.replace(/TJ/, `(${hiddenData}) Tj TJ`);
    });

    // Write the modified PDF content back to a file
    fs.writeFileSync(outputPdfPath, modifiedContent, 'utf8');
    console.log(`Hidden data '${hiddenData}' injected into ${outputPdfPath}`);
}

// Example usage
const inputPdf = 'uncomp-steg-sample.pdf'; // Path to the uncompressed PDF
const outputPdf = 'embeded-steg.pdf'; // Path to the modified PDF
const hiddenMessage = 'SecretData: HELLO WORLD!!!!'; // Data to hide
injectDataIntoPDF(inputPdf, outputPdf, hiddenMessage);
