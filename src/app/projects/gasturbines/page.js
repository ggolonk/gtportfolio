"use client";
import "../projects.css";
import PDFViewer from "@/app/components/pdfViewer";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import PSelector from "@/app/components/pselector";
import PButton from "@/app/components/pbutton";



export default function gasturbines() {
    return (
        <div key="project-page-key"
                    className="page">
                    <PSelector />
        
                    <div className="projects">
                        <div className="projects-parent">
                            <h2 className="projects-header">Gas Turbines and Propulsion</h2>
                            <hr className="page-line"></hr>
                                <div className="project-parent">
                                  <div className="projects-child">
                                       <p> Conducted a thermodynamic analysis of the Williams F-107 Turbofan engine to make it more 
                                        thermodynamically efficient. The redesigned engine was then evaluated using a mission simulation 
                                        code, which quantified fuel consumption during key flight phases, including ascent, cruise, and maneuvering,
                                         as outlined in the original problem statement.
        
                                    <br></br> Mission reports can be found with the following links.</p>
        
                                    <br></br>
                                    <div className="projects-button">
                                        <PButton pdfUrl="/SMCR.pdf"
                                             title= "Simplified Study"></PButton>
                                        <PButton pdfUrl="/MCR.pdf"
                                             title= "Mission Code"></PButton>
                                    </div>
                                  </div>
                                  <div className="projects-child">
                                    <Image src="/TOMA.png" width={300} height={500} alt="Missile" />
                                  </div>
                                </div>
        
        
                    </div>
        
                </div>
                </div >
    );
}
