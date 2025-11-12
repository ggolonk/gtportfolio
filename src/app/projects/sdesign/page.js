"use client";
import "../projects.css";
import PDFViewer from "@/app/components/pdfViewer";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import PSelector from "@/app/components/pselector";
import PButton from "@/app/components/pbutton";


export default function seniordesign() {
    return (
        <div key="project-page-key"
            className="page"
        >
            <PSelector />
            <div className="projects">
                <div className="projects-parent">
                    <h2 className="projects-header">Senior Design</h2>
                    <hr className="page-line"></hr>
                    <div className="project-parent">
                        <div className="projects-child">
                            <p>  Designed a radio-controlled airplane to complete a specific mission, focusing on aerodynamic optimization
                                and structural integrity. Utilizing XFLR5 and SOLIDWORKS CFD software to analyze and refine the base model,
                                ensuring efficient flight performance through iterative simulations.  Beyond design and analysis, my primary
                                role in the team centered on budgeting, logistics, and construction. I used CAD models to guide the final
                                build and directed teammates in assembling different sections, ensuring efficiency and accuracy. Additionally,
                                I managed resource allocation to keep the project within financial constraints while sourcing materials that
                                balanced cost, weight, and durability.The design phase emphasized performance predictions and preparation for
                                testing, laying the groundwork for successful flight trials and final refinements.


                                <br></br><br></br>You can find our technical reports and design reviews Below. </p>

                            <br></br>
                            <div className="projects-button">
                                <PButton pdfUrl="/PDR-fall.pdf"
                                    title="Fall Design Review"></PButton>
                                <PButton pdfUrl="/CDR-fall.pdf"
                                    title="Final Design Review"></PButton>
                                <PButton pdfUrl="/Fall-final-report.pdf"
                                    title="Fall Report"></PButton>
                                <PButton pdfUrl="/Senior_Design_Final_Report_Spring.pdf"
                                    title="Final Report"></PButton>
                            </div>

                        </div>
                        <div className="projects-child">
                            <Image src={"/sdes.jpg"} width={300} height={500} alt="manufacturing" />
                            <p> Model plane in manufacturing process.</p>
                        </div>
                    </div>


                </div>

            </div>

        </div>
    );
}
