"use client";
import "../projects.css";
import PDFViewer from "@/app/components/pdfViewer";
import Image from "next/image";
import PSelector from "@/app/components/pselector";

export default function PersonalProjects() {
  return (
    <div className="page">
      <PSelector />

      <div className="projects">
        <div className="projects-header">
          <h2 className="project-header">Personal Projects</h2>
        </div>

        {/* Row 1: Text | Image */}
        <hr className="page-line" />
        <div className="project-parent">
          <div className="projects-child">
            <p>
              Welcome to my first personal project! This website was created using a
              combination of JavaScript, HTML, Next.js, and CSS. The development
              process was a great learning experience, where I honed my skills by
              utilizing a variety of online resources. I also received valuable
              guidance from my brother, an aspiring software engineer, who helped me
              navigate the challenges of building and refining the website. The
              picture attached is a snippet from the actual website code.
            </p>
          </div>
          <div className="projects-child">
            <Image src="/html.jpg" width={400} height={500} alt="HTML Project" />
          </div>
        </div>

        {/* Row 2: Image | Text */}
        <hr className="page-line" />
        <div className="project-parent reverse">
          <div className="projects-child">
            <Image src="/inv_hole.jpg" width={600} height={400} alt="CFD Project" />
            <p>Formation of expansion fan into oblique shock web in a thin tube</p>
          </div>
          <div className="projects-child">
            <p>
              In my spare time, I have been independently studying <strong>SU2</strong>, 
              an open-source computational fluid dynamics (CFD) suite developed for solving
              a wide range of fluid flow problems. My focus has been on strengthening my
              understanding of both <strong>compressible</strong> and 
              <strong> incompressible flow regimes</strong> by recreating and analyzing
              several canonical cases from the{" "}
              <a
                href="https://su2code.github.io/tutorials/home/"
                target="_blank"
                rel="noopener noreferrer"
                className="su2-link"
              >
                SU2 tutorial collection
              </a>.
              <br />
              <br />
              These exercises have allowed me to explore numerical discretization methods,
              convergence behavior, and turbulence modeling while gaining hands-on
              experience setting up simulations that range from subsonic, viscous flows to
              high-speed compressible regimes involving shocks and expansion waves.
              Through this process, I have developed a stronger intuition for how governing
              equations of fluid motion—specifically the Navier–Stokes equations—behave
              under varying flow conditions and boundary constraints.
            </p>
          </div>
        </div>

        
      </div>
    </div>
  );
}
