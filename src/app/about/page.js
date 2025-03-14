"use client";
import "./about.css";
import { motion as m, AnimatePresence } from "motion/react";

export default function About() {
  // Javacript code goes here

  return (
    <AnimatePresence mode="popLayout">
      <m.div
        key="about-page-key"
        className="page"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 20 }}
      >
        <h1>About Me</h1>
        <hr className="page-line" />
        <div className="about-parent">
          <div className="about-child">
            <h3>Academic Background</h3>
            <hr className="page-line"></hr>
            <p>I’m a senior at the University of Notre Dame, working toward my B.S. in Aerospace Engineering,
              with coursework spanning thermodynamics, fluid mechanics, aerodynamics, and propulsion.
              Alongside my studies, I’ve built a strong foundation in engineering software
              and programming, including MATLAB, Python, and SolidWorks. Outside the classroom, I have participated in undergraduate research
              with Dr. Joseph Powers, studying the thermochemical properties of shockwaves.
            </p>
          </div>
          <div className="about-child">
            <img src={"meND.png"} width={300} height={500} />

          </div>
        </div>
        <hr className="about-line" />
        <div className="about-parent">
          <div className="about-child">
            <img src={"Fam.jpg"} width={500} height={200} />

          </div>
          <div className="about-child">
            <h3>Core Values</h3>
            <hr className="page-line"></hr>
            <p>
              My journey in engineering is driven by a strong foundation of hard work, perseverance,
              family, and friends that have shaped who I am both personally
              and professionally.</p>
            <p><strong>Hard Work & Determination</strong> – I believe that success is achieved through dedication and perseverance. 
            Whether overcoming complex homework assignments, contributing to the demanding efforts of a semester-long project, refining 
            intricate designs, or leading a team, I approach every challenge with a problem-solving mindset and an unwavering commitment 
            to excellence.</p>
            <p><strong>Family & Community </strong> – My family has always been a source of support
              and inspiration. Growing up, I learned the importance of commitment,
              teamwork, and integrity, values that I carry into my professional and
              academic pursuits.</p>
          </div>
        </div>

        <hr className="about-line" />
        <div className="about-parent">
          <div className="about-child">
            <h3>Leadership & Experience</h3>
            <hr className="page-line"></hr>
            <p> My first leadership experience was as the captain of my varsity hockey team,
              where I fostered accountability among teammates, emphasizing both physical and
              mental well-being. I further developed my leadership skills as Vice President of
              Dunne Hall, managing planning and budgeting for dorm-wide and campus-wide initiatives.</p>

          </div>
          <div className="about-child">
            <img src={"Dunne.png"} width={300} height={200} />

          </div>
        </div>

        <hr className="about-line" />
        <div className="about-parent">
          <div className="about-child">
            <img src={"hike1.jpeg"} width={500} height={200} />

          </div>
          <div className="about-child">
            <h3>Beyond Engineering</h3>
            <hr className="page-line"></hr>
            <p>
              Outside of my academic and professional pursuits, I enjoy spending time with friends and staying active.
              Some of my favorite activities include hockey, golf, skiing, and working out. Whereever I am, I always appreciate the challenge
              and excitement of staying active and exploring new experiences.          </p>
          </div>

        </div>


        <hr className="about-line" />
        <div className="about-photo-grid">
          <img src={"hockey1.jpg"} className="gallery-photo" />
          <img src={"golf.jpg"} className="gallery-photo" />
          <img src={"surf.JPG"} className="gallery-photo" />
          <img src={"barc.png"} className="gallery-photo" />
          <img src={"gracegame.jpg"} className="gallery-photo" />
          <img src={"hike4.jpg"} className="gallery-photo" />
          <img src={"Grace.jpg"} className="gallery-photo" />
        </div>

      </m.div>
    </AnimatePresence>
  );
}
