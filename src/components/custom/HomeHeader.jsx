"use client";
import React, { useState } from "react";
import { Menubar } from "../ui/menubar";
import { useNavigate, Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

function HomeHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="absolute inset-x-0 flex justify-center items-center py-6 text-xl 2xl:text-[28px] z-[100]">
      <div className="w-[98%] grid grid-flow-col items-center relative">
        <div className="logo flex-1">
          <img
            src="/oaulogo.png"
            className="w-[80px] 2xl:w-[116px]"
            alt="oaulogo"
          />
        </div>
        <Link
          to={"/"}
          className="h2 absolute flex flex-col items-center text uppercase w-[40vw] text-center font-bold justify-self-center left-[50%] -translate-x-[50%] top-[50%] -translate-y-[50%]"
        >
          <span>OAU TRANSCRIPT</span>
          <span>RETRIEVAL PORTAL</span>
        </Link>
        {/* Desktop Menu */}
        <Menubar className="justify-self-end hidden md:flex">
          <Link
            to={"/"}
            className="flex font-bold h-10 items-center text-primaryBlue space-x-1 rounded-md p-1"
          >
            Home
          </Link>
          <Link
            to={"/results"}
            className="flex font-bold h-10 items-center text-primaryBlue space-x-1 rounded-md p-1"
          >
            Results
          </Link>
          <Link
            to={"/upload"}
            className="flex font-bold h-10 items-center text-primaryBlue space-x-1 rounded-md p-1"
          >
            Upload
          </Link>
          <Link
            to={"/"}
            className="flex font-bold h-10 items-center text-primaryBlue space-x-1 rounded-md p-1"
          >
            Log Out
          </Link>
        </Menubar>
        {/* Mobile Hamburger */}
        <button
          className="md:hidden justify-self-end text-primaryBlue text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
        {/* Mobile Menu */}
        {menuOpen && (
          <div className= {`absolute top-[70px] right-4 bg-white shadow-lg rounded-lg flex flex-col items-center  p-4 w-[50%] md:hidden z-50   transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <Link
              to={"/"}
              className="font-bold py-2 text-primaryBlue"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to={"/results"}
              className="font-bold py-2 text-primaryBlue"
              onClick={() => setMenuOpen(false)}
            >
              Results
            </Link>
            <Link
              to={"/upload"}
              className="font-bold py-2 text-primaryBlue"
              onClick={() => setMenuOpen(false)}
            >
              Upload
            </Link>
            <Link
              to={"/"}
              className="font-bold py-2 text-primaryBlue"
              onClick={() => setMenuOpen(false)}
            >
              Log Out
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default HomeHeader;
