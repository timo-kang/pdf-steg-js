# PDF Steganography with JS

A simple set of tools to inject, extract, and calculate hidden data in uncompressed PDF files using TJ operators for steganographic purposes.

With TJ(Text Show) operator, We can conceal data by replacing the operator.

## Prerequisites

Before using these tools, ensure that the PDF file is **uncompressed**. Use a tool like `qpdf` to uncompress the PDF:
``` bash
qpdf --qdf --object-streams=disable input.pdf output_uncompressed.pdf
# or
qpdf --qdf --stream-data=uncompress input.pdf output_uncompressed.pdf
```

## Usages
before run these scripts, you should check the input pdf file and message which you want to inject.

```bash
# for injection
node inject.js

# for extraction
node extract.js

# for calculation
node calc.js
```

## Examples
```
BT
/F1 11.04 Tf
1 0 0 1 72.024 791.52 Tm
0 g
/GS10 gs
0 G
[( )] (ThisIsAHid) Tj TJ
ET
Q
q
0.000008873 0 595.44 841.68 re
W* n
Q
 EMC /Artifact <</Attached [/Bottom]/Type/Pagination/Subtype/Footer>> BDC q
0.000008873 0 595.44 841.68 re
W* n
BT
/F1 11.04 Tf
1 0 0 1 72.024 43.56 Tm
0 g
0 G
[( )] (denMessage) Tj TJ
ET
Q
q
0.000008873 0 595.44 841.68 re
W* n
Q
 EMC  /P <</MCID 0>> BDC q
0.000008873 0 595.44 841.68 re
W* n
BT
/F2 26.04 Tf
1 0 0 1 135.62 724.18 Tm
0 g
0 G
[<052304930865>] (ThatIsVery) Tj TJ
ET
Q
q
0.000008873 0 595.44 841.68 re
W* n
BT
/F3 26.04 Tf
1 0 0 1 213.77 724.18 Tm
0 g
0 G
[( )] (LongAndNee) Tj TJ
ET
```

## Notes

These scripts are designed for educational and research purposes only. Be aware of ethical and legal considerations when using steganography.

Ensure the PDF is uncompressed before performing any operations. Use tools like qpdf for this purpose.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Reference

I refered this [paper(Ryan Klemm and Bo Chen)](https://arxiv.org/html/2405.00865v1) about the strategy on how to inject the data in PDF document.
