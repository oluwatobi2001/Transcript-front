import React from "react";
import { Link } from "react-router-dom";
import HeaderOne from "../components/custom/HeaderOne";

function Welcome() {
  return (
    <div className="welcome-page bg-welcome-bg bg-cover h-screen">
      <HeaderOne />
      <main className="h-full w-full flex justify-center items-center">
        <div className="text-center w-[40%]">
          <h1 className="text-primaryBlue text-2xl md:text-3xl font-bold py-4">
            Welcome to OAUCHS transcript website
          </h1>
          <p className="text-white py-16 text-base 2xl:text-lg">
            A platform designed for seamless retrieval of school transcripts for students and alumni of the OAU College of Health Sciences.
          </p>
          <Link
            to={"/login"}
            className="px-4 py-2 text-white font-bold bg-primaryBlue rounded-lg"
          >
            Get Started
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Welcome;
