"use client";
import "./home.css";
import { motion as m } from 'motion/react';
import PDFViewer from "./components/pdfViewer";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import Image from "next/image";

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
                            width={300}
                            ></img>

                    </div>
                    <div className="home-header-child">
                        <p>I’m Gregory Golonka, a recent graduate in aerospace engineering
                             from the University of Notre Dame. I enjoy tackling challenging problems 
                             in aerodynamics, fluid mechanics and mechanical design, with an academic background that includes hands-on projects and
                              computational research. I’m eager to apply my skills and curiosity to projects 
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
                                    pdfUrl={`/Gregory_Golonka.pdf`}
                                    showPDF={showResume}
                                    setShowPDF={setShowResume}
                                />
                            )}
                            <a href="https://www.linkedin.com/in/ggolonka/" target="_blank" rel="noopener noreferrer" className="linkedin-button">
                                <Image src="/linkedin.png" 
                                 width={300}
                                 height={300}
                                 className="linkedin-pic"></Image>
                            </a>
                            <a href="mailto:gregorygolonka@outlook.com" className="gmail-button">
                                <Image src="/Mail.png" 
                                 width={300}
                                 height={300} 
                                 className="mail-pic"></Image>
                            </a>

                        </div>
                    </div>

                </div>
                <div className="about-photo-container">
    <div className="about-photo-grid">
        <Image src="/abroad.JPG" 
        width={120}
        height={120}
         className="gallery-photo" />
        <Image src="/dol2.png" 
        width={120}
        height={120}
        className="gallery-photo" />
        <Image src="/cin.png" 
        width={120}
        height={120}
        className="gallery-photo" />
        <Image src="/dol.png" 
        width={120}
        height={120}
        className="gallery-photo" />
        <Image src="/aca.png" 
        width={120}
        height={120}
        className="gallery-photo" />
        <Image src="/game.png" 
        width={120}
        height={120}
        className="gallery-photo" />
        <Image src="/game2.png" 
        width={120}
        height={120}
        className="gallery-photo" />
        <Image src="/eng.png" 
        width={120}
        height={120}
        className="gallery-photo" />
        <Image src="/pal.png" 
        width={120}
        height={120}
        className="gallery-photo" />
        <Image src="/ski.png" 
        width={120}
        height={120}
        className="gallery-photo" />
    </div>
</div>
            </m.div>
        </AnimatePresence>
    );
}
