import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export const generateEpub = async (metadata, content) => {
  const zip = new JSZip();
  const { title, author, coverImage } = metadata;
  const uuid = 'urn:uuid:' + crypto.randomUUID();

  // mimetype
  zip.file('mimetype', 'application/epub+zip', { compression: "STORE" });

  // META-INF/container.xml
  zip.folder('META-INF').file('container.xml', `<?xml version="1.0"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>`);

  // OEBPS folder
  const oebps = zip.folder('OEBPS');

  // content.opf
  const contentOpf = `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" unique-identifier="BookId" version="2.0">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:opf="http://www.idpf.org/2007/opf">
    <dc:title>${title}</dc:title>
    <dc:creator opf:role="aut">${author}</dc:creator>
    <dc:language>en</dc:language>
    <dc:identifier id="BookId" opf:scheme="UUID">${uuid}</dc:identifier>
    ${coverImage ? '<meta name="cover" content="cover-image" />' : ''}
  </metadata>
  <manifest>
    <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>
    <item id="content" href="content.xhtml" media-type="application/xhtml+xml"/>
    <item id="style" href="style.css" media-type="text/css"/>
    ${coverImage ? '<item id="cover-image" href="images/cover.jpg" media-type="image/jpeg"/>' : ''}
  </manifest>
  <spine toc="ncx">
    <itemref idref="content"/>
  </spine>
</package>`;

  oebps.file('content.opf', contentOpf);

  // toc.ncx
  const tocNcx = `<?xml version="1.0" encoding="UTF-8"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
  <head>
    <meta name="dtb:uid" content="${uuid}"/>
    <meta name="dtb:depth" content="1"/>
    <meta name="dtb:totalPageCount" content="0"/>
    <meta name="dtb:maxPageNumber" content="0"/>
  </head>
  <docTitle>
    <text>${title}</text>
  </docTitle>
  <navMap>
    <navPoint id="navPoint-1" playOrder="1">
      <navLabel>
        <text>Start</text>
      </navLabel>
      <content src="content.xhtml"/>
    </navPoint>
  </navMap>
</ncx>`;

  oebps.file('toc.ncx', tocNcx);

  // content.xhtml
  const contentXhtml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>${title}</title>
  <link rel="stylesheet" type="text/css" href="style.css"/>
</head>
<body>
  <h1>${title}</h1>
  <h2>${author}</h2>
  <hr/>
  ${content}
</body>
</html>`;

  oebps.file('content.xhtml', contentXhtml);

  // style.css - improved styling
  oebps.file('style.css', `
    body { 
      font-family: Georgia, serif; 
      line-height: 1.6; 
      margin: 5%; 
      text-align: justify;
    } 
    h1, h2 { 
      text-align: center; 
      margin-top: 1em;
      margin-bottom: 0.5em;
    }
    h1 {
      font-size: 1.8em;
      border-bottom: 2px solid #333;
      padding-bottom: 0.3em;
    }
    h2 {
      font-size: 1.4em;
      color: #444;
    }
    p {
      margin: 0.8em 0;
      text-indent: 1.5em;
    }
    .page-break {
      page-break-after: always;
      margin: 2em 0;
      border-top: 1px dashed #ccc;
    }
  `);

  // Cover image
  if (coverImage) {
    const imgFolder = oebps.folder('images');
    imgFolder.file('cover.jpg', coverImage);
  }

  // Generate blob
  const contentBlob = await zip.generateAsync({ type: "blob" });
  return contentBlob;
};
