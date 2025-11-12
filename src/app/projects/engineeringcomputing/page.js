"use client";
import "../projects.css";
import PDFViewer from "@/app/components/pdfViewer";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import PSelector from "@/app/components/pselector";
import PButton from "@/app/components/pbutton";



export default function engineeringcomputing() {
    return (
        <div key="project-page-key"
                    className="page">
                    <PSelector />
        
                    <div className="projects">
                        <div className="projects-parent">
                            <h2 className="projects-header">Python</h2>
                            <hr className="page-line"></hr>
                                <div className="project-parent">
                                  <div className="projects-child">
                                       <p> This project focuses on developing a numerical model 
                                        to simulate the internal temperature gradient of a steak over
                                         time during the cooking process. By accounting for variable oven 
                                         temperatures, the model provides insight into how heat propagates
                                          through the meat and enables the evaluation of different cooking 
                                          strategies. The ultimate goal is to optimize the method of cooking
                                           a steak to achieve a thin, well-defined char layer while maintaining 
                                           a uniform internal temperature below medium-rare thresholds. Additionally,
                                            the model is designed to estimate the time remaining until the steak is
                                             fully cooked based on its temperature history, even when certain system 
                                             parameters are unknown.  
                                            <br></br> To solve the initial boundary value problem, or IBVP, we first had to use the boundary and material information to discretize the heat distribution across the material at our initial time.
                                                    Once the initial temperature was solved we can then move through the rest of the time domain.
                                              
                                    <br></br> <br></br> Our technical report can be found with the following link.</p>
        
                                    <br></br>
                                    <div className="projects-button">
                                        <PButton pdfUrl="/COMPHT.pdf"
                                             title= "Comprehensive Heat Transfer Study"></PButton>
                                        
                                    </div>
                                  </div>
                                  <div className="projects-child">
                                    <Image src="/T_Mrare.png" width={400} height={500} alt="Temp_rare" />
                                    <p>Temperature distribution across Medium rare cylindical steak.</p>

                                  </div>
                                </div>
        
        
                    </div>
        
                </div>
                </div >
    );
}
