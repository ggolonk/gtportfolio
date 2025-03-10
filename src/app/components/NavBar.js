"use client";
import Link from 'next/link';
import '../componentstyles/navbar.css';
import { motion as m } from "framer-motion";

export default function NavBar() {
  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Me' },
    { href: '/projects', label: 'My Projects' },
    { href: '/contact', label: 'Contact Me' },
  ];

  const buttonVariants = {
    initial: {
      background: "var(--foreground)",
      color: "var(--copy)",
      scale: 1,
      borderRadius: "var(border-radius)" 
    },
    hovered: {
      background: "var(--primary-light)",
      color: "var(--foreground)",
      scale: 1.1,
      borderRadius: "var(--border-radius)" 
    },
  };

  return (
    <div className="navbar-container">

      <div className="navbar-child logo-container">
        <Link href="/">
          <img src='/Logo.png' width={75} className='logo' alt="Logo" />
        </Link>
      </div>
      <div className="navbar-child links-container">
        {links.map((link) => (
          <Link key={`navbar-link-${link.href}`} href={link.href} passHref className='nav-link'>
            <m.button
              variants={buttonVariants}
              initial="initial"
              whileHover="hovered"
              whileTap={{ scale: 0.95 }} // Adds a subtle click effect
              className="navbar-link"
              transition={{ duration: 0.2, ease: "easeOut" }} // Smooth animation
            >
              <p>{link.label}</p>
            </m.button>
          </Link>
        ))}
      </div>
    </div>
  );
}
``
