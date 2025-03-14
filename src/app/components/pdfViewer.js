import { useCallback, useState } from 'react';
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import { pdfjs, Document, Page } from 'react-pdf';
import { motion } from "motion/react"
import { IoIosClose } from "react-icons/io";
import { BsDownload } from "react-icons/bs";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import '../componentstyles/PDFViewer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

const resizeObserverOptions = {};
const maxWidth = 800;

export default function PDFViewer({ pdfUrl, showPDF, setShowPDF }) {
  const [file, setFile] = useState(pdfUrl);
  const [numPages, setNumPages] = useState(null);

  const [containerRef, setContainerRef] = useState(null);
  const [containerWidth, setContainerWidth] = useState();

  const onResize = useCallback((entries) => {
    const [entry] = entries;
    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function onFileChange(event) {
    const { files } = event.target;
    const nextFile = files?.[0];
    if (nextFile) {
      setFile(nextFile);
    }
  }

  function onDocumentLoadSuccess(pdf) {
    setNumPages(pdf.numPages);
  }


  const handleClosePDF = () => {
    setShowPDF(false);
  };

  return (
    <motion.div
      className="pdf"
      initial={{ opacity: 0, zIndex: -1 }}
      onClick={handleClosePDF}
      animate={{
        opacity: showPDF ? 1 : 0,
        zIndex: showPDF ? 15 : -1,
      }}
      exit={{ opacity: 0, zIndex: -1 }}
    >
      <div className="pdf-header">

        <motion.a
          className="pdf-download"
          href={pdfUrl}
          download
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <BsDownload />
        </motion.a>
        <motion.button
          className="pdf-close"
          onClick={handleClosePDF}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <IoIosClose />
        </motion.button>
      </div>
      {/* Optional file input to override the PDF (remove if not needed) */}
      <div className="pdf-container">
        <div className="pdf-container-document" ref={setContainerRef}>
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
          >
            {Array.from({ length: numPages || 0 }, (_, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={
                  containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
                }
              />
            ))}
          </Document>
        </div>
      </div>
    </motion.div>
  );
}
