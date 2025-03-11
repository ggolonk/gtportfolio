"use client";
import "./contact.css";
import { motion as m, AnimatePresence } from "motion/react";

export default function Contact() {
  // Javacript code goes here

  return (
    <AnimatePresence mode="popLayout">
      <m.div
        key="contact-page-key"
        className="page"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 20 }}
      >
        <h1>Contact</h1>
        <hr className="page-line" />
        <div className="contact-parent">
          <div className="contact-child">
            <p>Feel free to contact me using any of the following:</p>
          
          </div>
          <div className="contact-child">
            <div className="contact-button">
              <a href="https://www.linkedin.com/in/ggolonka/" target="_blank" rel="noopener noreferrer" className="linkedin-button">
                <img src="linkedin.png" className="linkedin-pic"></img>
              </a>
              <p>Linkedin</p>
            </div>

            <div className="contact-button">
              <a href="mailto:gtgolonka91602@gmail.com" className="gmail-button">
                <img src="gmail.png" className="gmail-pic"></img>
              </a>
              <p>Email : gtgolonka91602@gmail.com</p>



            </div>
          </div>

        </div>
      </m.div>
    </AnimatePresence>
  );
}
