import styles from "../styles/Navrbar/Navbar.module.css";
import { useState } from "react";
import { useRef } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useAuth } from "../context/auth";

export default function Navbar() {
  const [navIcon, setNavIcon] = useState("fontisto:nav-icon-a");
  const [isMobileNav, setIsMobileNav] = useState(false);
  const navbarRef = useRef();
  
  const { deleteToken, getToken } = useAuth();
  const token = getToken();

  const changeIcon = () => {
    
    if (navIcon == "fontisto:nav-icon-a") {
      // lines - mobile navbar icon
      setNavIcon("uis:multiply");
      setIsMobileNav(true);

    } else {
      setNavIcon("fontisto:nav-icon-a");
      setIsMobileNav(false);
    }
  };

  const signOut = () => {
    if (isMobileNav == true) changeIcon();
    deleteToken();
  };

  const isLoggedIn = [
    {
      link: "/",
      title: "HOME",
    },
    {
      link: "/gallery",
      title: "GALLERY",
    },
    {
      link: "/todo",
      title: "TODO",
    },
  ];
  const isNotLoggedIn = [
    {
      link: "/",
      title: "HOME",
    },
    {
      link: "/sign-in",
      title: "SIGN-IN",
    },
    {
      link: "/sign-up",
      title: "SIGN-UP",
    },
  ];

  return (
    <div className={`${styles.container} md:h-16 sticky top-0 z-50 h-24`}>
      <div
        ref={navbarRef}
        className={isMobileNav ? styles.mobileNavActive : styles.main}
      >
        <div className={`${styles.logo} ml-12 cursor-pointer`}>
          <Link href="/">
            <a>
              <Icon
                icon="dashicons:admin-home"
                style={{
                  width: "50px",
                  height: "50px",
                }}
              />
            </a>
          </Link>
        </div>

        <nav className={`${styles.navbar}`}>
          <ul className="relative flex justify-center items-center">
            
            {token &&
              isLoggedIn.map((page, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => {
                      if (isMobileNav == true) changeIcon();
                    }}
                  >
                    <Link href={page.link}>{page.title}</Link>
                  </li>
                );
              })}

            {!token &&
              isNotLoggedIn.map((page, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => {
                      if (isMobileNav == true) changeIcon();
                    }}
                  >
                    <Link href={page.link}>{page.title}</Link>
                  </li>
                );
              })}

            {token && (
              <li onClick={() => signOut()}>
                <Link href="/">SIGN-OUT</Link>
              </li>
            )}

          </ul>
        </nav>
      </div>

      <div className={`${styles.mobileNav}`}>
        <Icon
          icon={navIcon}
          style={{
            width: "40px",
            height: "40px",
            color: "white",
          }}
          onClick={() => changeIcon()}
        />
      </div>

    </div>
  );
}
