"use client";
import "../projects.css";
import PDFViewer from "@/app/components/pdfViewer";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import PSelector from "@/app/components/pselector";
import PButton from "@/app/components/pbutton";



export default function experimentalaerodynamics() {
    return (
        <div key="project-page-key"
                    className="page">
                    <PSelector />
        
                    <div className="projects">
                        <div className="projects-parent">
                            <h2 className="projects-header">Theroretical and Experimental Aerodynamics</h2>
                            <hr className="page-line"></hr>
                                <div className="project-parent">
                                  <div className="projects-child">
                                       <p> Gained hands-on experience with wind tunnel testing at Hessert 
                                        Laboratories on the Notre Dame campus, working on a series of key aerodynamic 
                                        experiments. These included calibrating pressure transducers to convert pressure 
                                        measurements into digital data, analyzing circulation around a 2D airfoil, studying 
                                        airfoil pressure distribution, and evaluating the lift and drag characteristics of a
                                         finite wing. Each experiment contributed to a deeper understanding of fluid dynamics,
                                          aerodynamic forces, and data analysis techniques, providing a comprehensive foundation 
                                          in experimental aerodynamics.
                                    <br></br> <br></br> Technical lab reports can be found with the following links.</p>
        
                                    <br></br>
                                    <div className="projects-button">
                                        <PButton pdfUrl="/project0.pdf"
                                             title= "Tranducer Calibration"></PButton>
                                        <PButton pdfUrl="/project1.pdf"
                                             title= "Circulation"></PButton>
                                        <PButton pdfUrl="/project2.pdf"
                                             title= "Pressure Distribution"></PButton>
                                        <PButton pdfUrl="/project3.pdf"
                                             title= "Finite Wing"></PButton>
                                    </div>
                                  </div>
                                  <div className="projects-child">
                                    <Image src="/wind-tunnel.png" width={400} height={500} alt="Hessert" />
                                  </div>
                                </div>
        
        
                    </div>
        
                </div>
                </div >
    );
}
