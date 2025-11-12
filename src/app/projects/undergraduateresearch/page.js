"use client";
import "../projects.css";
import PDFViewer from "@/app/components/pdfViewer";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import PSelector from "@/app/components/pselector";
import { motion as m, AnimatePresence } from "motion/react";
import PButton from "@/app/components/pbutton";


export default function uresearch() {
    const [showPDF, setShowPDF] = useState(false);
    return (
        <div key="project-page-key"
            className="page">
            <PSelector />

            <div className="projects">
                <div className="projects-parent">
                    <h2 className="projects-header">Undergraduate Research</h2>
                    <hr className="page-line"></hr>
                        <div className="project-parent">
                          <div className="projects-child">
                               <p>  Conducted an independent study into shock wave structures and their interaction with reactive systems, under the guidance of Dr.
                            Joseph M. Powers. The project primarily focused on investigating the dissociation of diatomic molecules within a viscous shock structure.
                            By examining the behavior of molecular bonds under the extreme temperatures and pressures present in shock waves, the study aimed to provide
                            deeper insights into the molecular-level dynamics at play, contributing to improved modeling and design in propulsion systems and detonation
                            processes. This research analyzes the physical properties of a shock wave by utilizing the one dimensional Navier-Stokes equations.


                            <br></br><br></br>Both my Fall and Spring technical reports can be found with the following links.</p>

                            <br></br>
                            <div className="projects-button">
                                <PButton pdfUrl="/Fall-final-report.pdf"
                                     title= "Fall Report"></PButton>
                                <PButton pdfUrl="/Golonka_Research_Paper_Spring.pdf"
                                     title= "Spring Report"></PButton>
                            </div>
                          </div>
                          <div className="projects-child">
                            <Image src="/unres.png" width={400} height={500} alt="Undergrad Research" />
                            <p> Results of shock thickness computations.</p>
                          </div>
                        </div>


            </div>

        </div>
        </div >
    );
}
