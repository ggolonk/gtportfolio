"use client";
import "./home.css";
import { motion as m } from 'motion/react';
import PDFViewer from "./components/pdfViewer";
import { useState } from "react";
import { AnimatePresence } from "motion/react";

const pictures = [
    // Profile Picture
    {
        src: "Galaxy.jpg",
    },
]



export default function Home() {
    // Javacript code goes here

    const [showResume, setShowResume] = useState(false); // Show Project Popup
    const handleShowResume = () => {
        setShowResume(true)
    }


    return (
        <AnimatePresence mode="popLayout">
            <m.div
                key="home-page-key"
                className="page"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 20 }}
            >
                <h1>Gregory Golonka</h1>
                <hr className="page-line"></hr>
                <div className="home-header">
                    <div className="home-header-child">
                        <img src="/profile-pic.jpg"
                            width={200}></img>

                    </div>
                    <div className="home-header-child">
                        <p>I’m Gregory Golonka, a recent graduate in aerospace engineering
                             from the University of Notre Dame. I enjoy tackling challenging problems 
                             in aerodynamics and propulsion, and my background includes hands-on work in
                              both research and design. I’m eager to apply my skills and curiosity to projects 
                              that push the boundaries of aerospace technology.</p>


                        <div className="h-h-child">
                            <m.button
                                key="resume-button-key"
                                className="resume-button"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleShowResume()}
                            >
                                <p>View Resume</p>
                            </m.button>
                            {showResume && (
                                <PDFViewer
                                    pdfUrl={`/resume.pdf`}
                                    showPDF={showResume}
                                    setShowPDF={setShowResume}
                                />
                            )}
                            <a href="https://www.linkedin.com/in/ggolonka/" target="_blank" rel="noopener noreferrer" className="linkedin-button">
                                <img src="linkedin.png" className="linkedin-pic"></img>
                            </a>
                            <a href="mailto:gregorygolonka@outlook.com" className="gmail-button">
                                <img src="Mail.png" className="mail-pic"></img>
                            </a>

                        </div>



                    </div>


                </div>
                <div className="about-photo-container">
    <div className="about-photo-grid">
        <img src="abroad.JPG" className="gallery-photo" />
        <img src="dol2.png" className="gallery-photo" />
        <img src="cin.png" className="gallery-photo" />
        <img src="dol.png" className="gallery-photo" />
        <img src="aca.png" className="gallery-photo" />
        <img src="game.png" className="gallery-photo" />
        <img src="game2.png" className="gallery-photo" />
        <img src="eng.png" className="gallery-photo" />
        <img src="pal.png" className="gallery-photo" />
        <img src="ski.png" className="gallery-photo" />
    </div>
</div>
            </m.div>
        </AnimatePresence>
    );
}
