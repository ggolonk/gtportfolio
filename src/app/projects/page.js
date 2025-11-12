"use client";

import Link from "next/link";
import Image from "next/image"
import { useState } from "react";
import { motion as m } from "motion/react";
import "./projects.css";
import PSelector from "../components/pselector";


export default function Projects() {

    return (
      <div key="project-page-key"
        className="page">
        <PSelector />

        <div className="projects">
          <div className="projects-parent">
            <h2 className="projects-header">Projects</h2>
            <hr className="page-line"></hr>
            <div className="project-parent">
              <div className="projects-child">
                <p> As a Aerospace Engineering graduate from the University of Notre Dame, my past projects demonstrate my different interdisciplinary skills.
                  My work ranges from analyzing viscous shock waves with molecular dissociation to designing and optimizing RC aircraft. With hands-on
                  experience in wind tunnel testing, computational simulations, and engineering design, I am particularly interested in high-speed aerodynamics,
                  propulsion, and mechanical systems. <br></br><br></br>To explore each project in greater detail, please use the <i>Course Selector</i> menu, which organizes completed
                  projects by their respective courses.</p>
              </div>
              <div className="projects-child">
                <Image src="/eng.png" width={400} height={500} alt="Projects" />
                <p>Cut out of turbofan engine at Rolls Royce Museum.</p>
              </div>
            </div>


          </div>

        </div>
      </div >
    );
}
