"use client";

import Link from "next/link";
import { useState } from "react";
import { motion as m } from "motion/react";
import "../componentstyles/pselector.css";
import PDFViewer from "@/app/components/pdfViewer";



export default function PButton({title,pdfUrl}) {
  const [showPDF, setShowPDF] = useState(false);

  return (
<div className="pdf-button-container">
      <m.button
        className="pbutton"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowPDF(true)}
      >
        {title}
      </m.button>

      {showPDF && (
        <PDFViewer
          pdfUrl={pdfUrl}
          showPDF={showPDF}
          setShowPDF={setShowPDF}
        />
      )}
      </div>
)}
      