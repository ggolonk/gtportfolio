"use client";
import "../projects.css";
import PDFViewer from "@/app/components/pdfViewer";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import PSelector from "@/app/components/pselector";
import PButton from "@/app/components/pbutton";



export default function designtools() {
    return (
        <div key="project-page-key"
                    className="page">
                    <PSelector />
        
                    <div className="projects">
                        <div className="projects-parent">
                            <h2 className="projects-header">Design Tools</h2>
                            <hr className="page-line"></hr>
                                <div className="project-parent">
                                  <div className="projects-child">
                                       <p> Designed and built a food delivery robot featuring an automatic 
                                        payload lifting system and opener. Using SOLIDWORKS, my team developed
                                         and analyzed individual subassemblies to establish design constraints
                                          before integrating them into a fully functional robotic system. Within this project 
                                          I was in charge of general manufacturing and CAD design, making sure that we followed all project requirements.
                                              
                                    <br></br> <br></br> Our final report and bill of materials can be found with the following links.</p>
        
                                    <br></br>
                                    <div className="projects-button">
                                        <PButton pdfUrl="/DT2.pdf"
                                             title= "Final Report"></PButton>
                                        <PButton pdfUrl="/DT2FBOM.pdf"
                                             title= "Final BOM"></PButton>
                                        
                                    </div>
                                  </div>
                                  <div className="projects-child">
                                    <Image src="/CompAss.jpg" width={400} height={500} alt="Comp_ass" />
                                    <p>Comprehensive SolidWorks Assembly of final product.</p>
                                  </div>
                                </div>
        
        
                    </div>
        
                </div>
                </div >
    );
}
