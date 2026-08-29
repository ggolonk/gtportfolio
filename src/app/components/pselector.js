"use client";

import Link from "next/link";
import { useState } from "react";
import { motion as m } from "motion/react";
import "../componentstyles/pselector.css";

export default function PSelector() {
  const [isOpen, setIsOpen] = useState(false);

  const buttonVariants = {
    initial: { background: "var(--foreground)", color: "var(--copy)", scale: 1 },
    hovered: { background: "var(--primary)", color: "var(--foreground)", scale: 1.05 },
  };

  const dropdownLinks = [
    { href: "/projects/sdesign", label: "Senior Design" },
    { href: "/projects/uresearch", label: "Undergraduate Research" },
    { href: "/projects/engineeringcomputing", label: "Engineering Computing" },
    { href: "/projects/personalprojects", label: "Personal Projects" },
    { href: "/projects/experimentalaerodynamics", label: "Experimental Aerodynamics" },
    { href: "/projects/gasturbines", label: "Gas Turbines & Propulsion" },
    { href: "/projects/designtools", label: "Design Tools" },
    { href: "/projects/stocktool", label: "Stonks" },

  ];

  return (

          <div
            className="dropdown-container"
            onMouseEnter={() => setIsOpen(true)}
            
          >
            <m.button
              className="dropdown-button"
              variants={buttonVariants}
              initial="initial"
              whileHover="hovered"
              whileTap={{ scale: 0.95 }}
            >
              Course Selector
            </m.button>

            {isOpen && (
              <div className="dropdown-menu"
                   onMouseLeave={() => setIsOpen(false)} >
                {dropdownLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <m.button
                      className="dropdown-item"
                      variants={buttonVariants}
                      initial="initial"
                      whileHover="hovered"
                      whileTap={{ scale: 0.97 }}
                    >
                      {link.label}
                    </m.button>
                  </Link>
                ))}
              </div>
            )}
          </div>
  );
}
