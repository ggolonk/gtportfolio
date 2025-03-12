"use client";
import "./projects.css";
import PDFViewer from "../components/pdfViewer";
import { useState, useRef, useEffect } from "react";
import { motion as m } from "motion/react";
import Image from "next/image";
import { AnimatePresence } from "motion/react";

const buttonVariants = {
  initial: { background: "var(--foreground)", color: "var(--copy)", scale: 1 },
  hovered: { background: "var(--primary)", color: "var(--primary-content)", scale: 1.02 },
  tapped: { background: "var(--primary)", color: "var(--primary-content)", scale: 0.98 },
  selected: { background: "var(--primary)", color: "var(--primary-content)", scale: 1.02 },
};

const classContainerVariants = {
  initial: { height: "37px", padding: 0 },
  open: { height: "auto", padding: "10px" },
};

const projects = [
  { id: "Senior Design", title: "Conceptual Design Review", description: "Presentation of Plane Initial Design", pdf: "/CDR-fall.pdf" },
  { id: "Senior Design", title: "Preliminary Design Review", description: "Presentation of Plane Initial Design", pdf: "/PDR-fall.pdf" },
  { id: "Senior Design", title: "Final Design Report", description: "Final Design Plane Report", pdf: "/Fall-final-report.pdf" },
  { id: "Undergraduate Research", title: "One Dimensional Viscous Shock Wave Analysis", description: "This is my first project", pdf: "/GG-Research.pdf" },
  { id: "Experimental Aerodynamics", title: "Transducer Calibration", description: "This is my first project", pdf: "/project0.pdf" },
  { id: "Experimental Aerodynamics", title: "Circulation about a 2-D Airfoil", description: "This is my Second project", pdf: "/project1.pdf" },
  { id: "Experimental Aerodynamics", title: "Airfoil Pressure Distribution", description: "This is my third project", pdf: "/project2.pdf" },
  { id: "Experimental Aerodynamics", title: "Lift and Drag of a Finite Wing", description: "This is my Fourth project", pdf: "/project3.pdf" },
  { id: "Gas Turbines & Propulsions", title: "HAVE TO PUT IN", description: "This is my Fourth project", pdf: "/project3.pdf" },
  { id: "Design Tools II", title: "HAVE TO PUT IN", description: "This is my Fourth project", pdf: "/project3.pdf" },
];

const pictures = [
  { id: "Senior Design", src: "sdes.jpg" },
  { id: "Undergraduate Research", src: "unres.JPG" },
  { id: "Personal Projects", src: "html.jpg" },
  { id: "Experimental Aerodynamics", src: "wind-tunnel.png" },
  { id: "Gas Turbines & Propulsions", src: "Galaxy.jpg" },
  { id: "Design Tools II", src: "CompAss.jpg" },
];

const classes = [
  "Senior Design",
  "Undergraduate Research",
  "Personal Projects",
  "Experimental Aerodynamics",
  "Gas Turbines & Propulsions",
  "Design Tools II",
];

const courseDescriptions = [
  "Designed a radio-controlled airplane to complete a specific mission, focusing on aerodynamic optimization and structural integrity. Utilizing XFLR5 and SOLIDWORKS CFD software to analyze and refine the base model, ensuring efficient flight performance through iterative simulations.  Beyond design and analysis, my primary role in the team centered on budgeting, logistics, and construction. I used CAD models to guide the final build and directed teammates in assembling different sections, ensuring efficiency and accuracy. Additionally, I managed resource allocation to keep the project within financial constraints while sourcing materials that balanced cost, weight, and durability.The design phase emphasized performance predictions and preparation for testing, laying the groundwork for successful flight trials and final refinements.",
  "Conducted an independent study into shock wave structures and their interaction with reactive systems, under the guidance of Dr. Joseph M. Powers. The project primarily focused on investigating the dissociation of diatomic molecules within a viscous shock structure. By examining the behavior of molecular bonds under the extreme temperatures and pressures present in shock waves, the study aimed to provide deeper insights into the molecular-level dynamics at play, contributing to improved modeling and design in propulsion systems and detonation processes. This research analyzes the physical properties of a shock wave by utilizing the one dimensional Navier-Stokes equations.",
  "Welcome to my first personal project! This website was created using a combination of JavaScript, HTML, Next.js, and CSS. The development process was a great learning experience, where I honed my skills by utilizing a variety of online resources. I also received valuable guidance from my brother, an aspiring software engineer, who helped me navigate the challenges of building and refining the website. The picture attach is a snippet from the actual website code.",
  "Gained hands-on experience with wind tunnel testing at Hessert Laboratories on the Notre Dame campus, working on a series of key aerodynamic experiments. These included calibrating pressure transducers to convert pressure measurements into digital data, analyzing circulation around a 2D airfoil, studying airfoil pressure distribution, and evaluating the lift and drag characteristics of a finite wing. Each experiment contributed to a deeper understanding of fluid dynamics, aerodynamic forces, and data analysis techniques, providing a comprehensive foundation in experimental aerodynamics.",
  "Description for Gas Turbines & Propulsions: Focuses on turbine engine mechanics and performance.",
  "Description for Design Tools II: Covers computational methods used in aerodynamics design.",
];

export default function Projects() {
  const [showProject, setShowProject] = useState(false);
  const [project, setProject] = useState(null);
  const [classCode, setClassCode] = useState("Course Selector");
  const [showSelectClass, setShowSelectClass] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState("");
  const [selectedPicture, setSelectedPicture] = useState("");
  const classSelectRef = useRef(null);

  const handleShowProject = (selectedProject) => {
    setProject(selectedProject);
    setShowProject(true);
  };

  const handleClassChange = (index) => {
    setClassCode(classes[index]);
    setSelectedDescription(courseDescriptions[index]);
    const pictureObject = pictures.find((pic) => pic.id === classes[index]);
    setSelectedPicture(pictureObject ? pictureObject.src : "");
    setShowSelectClass(false);
  };

  const filteredProjects = projects.filter((project) => project.id === classCode);

  useEffect(() => {
    if (showSelectClass && classSelectRef.current) {
      classSelectRef.current.scrollTop = 0;
    }
  }, [showSelectClass]);

  return (
    <AnimatePresence mode="popLayout">
      <m.div
        key="project-page-key"
        className="page"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="projects">
          <div className="projects-header">
            <h2 className="ac-header">Academic Projects</h2>
            <div
              ref={classSelectRef}
              className="class-select-container"
              variants={classContainerVariants}
              initial="initial"
              animate={showSelectClass ? "open" : "initial"}
              transition={{ duration: 0.5 }}
            >
              <m.button
                className="selected-class"
                variants={buttonVariants}
                initial="initial"
                whileHover="hovered"
                whileTap="tapped"
                onClick={() => setShowSelectClass(!showSelectClass)}
              >
                <p>{classCode}</p>
              </m.button>

              {showSelectClass && (
                <div className="dropdown">
                  {classes.map((c, index) => (
                    <m.button
                      key={`c-button-key-${index}`}
                      variants={buttonVariants}
                      className="proj-button"
                      initial="initial"
                      whileHover="hovered"
                      whileTap="tapped"
                      animate={c === classCode ? "selected" : "initial"}
                      onClick={() => handleClassChange(index)}
                    >
                      {c}
                    </m.button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <hr className="page-line" />

          <div className="project-main">
            {classCode !== "Course Selector" && <h1>{classCode}</h1>}
            {classCode !== "Course Selector" && <hr className="page-line" />}
            <div className="project-grid">
              {filteredProjects.map((project, index) => (
                <m.button
                  key={`p-button-key-${index}`}
                  className="pbutton"
                  variants={buttonVariants}
                  whileHover="hovered"
                  whileTap="tapped"
                  onClick={() => handleShowProject(project)}
                >
                  {project.title}
                </m.button>
              ))}
              <div className="project-parent">
                <div className="project-child">
                  {classCode === "Course Selector" && <p>
                    As an senior aerospace engineering student at the University of Notre Dame,
                    my past projects show my interdiciplinary skills.
                    My work spans from analyzing viscous shock waves with molecular dissociation to
                    designing and optimizing RC aircraft. With hands-on experience in wind tunnel testing, computational simulations, and
                    engineering design. I am interested in high-speed aerodynamics, propulsion, and mechanical systems.
                    <hr />
                    <br />
                    To discover more about each project, use the <i>Course Selector</i> menu to discover my most recent projects</p>}
                  {selectedDescription && <p>{selectedDescription}</p>}
                </div>
                {classCode !== "Course Selector" && selectedPicture && (
                  <div className="project-child">
                    <img src={selectedPicture} alt={classCode} width={400} height={300} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {showProject && project && (
            <PDFViewer pdfUrl={project.pdf} showPDF={showProject} setShowPDF={setShowProject} />
          )}
        </div>
      </m.div>
    </AnimatePresence>
  );
}
