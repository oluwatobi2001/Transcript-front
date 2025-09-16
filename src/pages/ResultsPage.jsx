"use client";
import { useRef } from "react";
import ResultsTable from "../components/custom/ResultsTable";
import Student from "../components/custom/StudentProfileLayout";
import { Button } from "../components/ui/button";
import {  generateTranscript } from "@/components/custom/PDF";
import { downloadData } from "@/_data/studentOne";
import { useSelector } from "react-redux";
import axios from "axios";
// import html2pdf from "html2pdf.js";

export default function ResultsPage({ params }) {
  const resultsTableRef = useRef(null);
  const { selectedStudentData: data } = useSelector((st) => st.app); 
  const { token } = useSelector((st) => st.user);
  const studentId = data._id;
  const handleGenerateTranscript = async() => {
    // Ensure that the resultsTableRef has a current value

	const url = `${import.meta.env.VITE_PUBLIC_BASE_API_URL}/api/transcript/my-transcript/${studentId}/generate`
  console.log(url)
const res = await axios.get(url,  {
   responseType: "blob",
  headers: {
     Authorization: "Bearer " + token,
  },
 });
 const urlA = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement("a");
  link.href = urlA;
  link.setAttribute("download", "output.pdf");
  document.body.appendChild(link);
  link.click();
  };

  return (
    <>
      <Student>
        <div className="w-[80%] min-w-[300px] py-14 flex flex-col ">
          <h2 className="font-bold capitalize mb-4 text-[24px]">
            Student's result
          </h2>
          <ResultsTable ref={resultsTableRef} />
          <Button
            className="capitalize self-end"
            variant="destructive"
            onClick={handleGenerateTranscript}
          >
            Generate Transcript
          </Button>
        </div>
      </Student>
    </>
  );
}
