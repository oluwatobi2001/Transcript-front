"use client";

import React from "react";
import { Card, CardContent } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

//import { data } from '../../Sessions';
import { convertToDigit } from "@/lib/convertToDigit";
import { transformAcademicSession } from "@/lib/convertAcademicSession";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";



const ResultsTable = () => {
  const { selectedStudentData: data } = useSelector((st) => st.app); 
  const classes = data.details;

  return (
    <Card className="mb-5">
      <CardContent className="pt-8">'
    <div className="flex flex-col w-full mx-auto items-center justify-center mb-2">
      <p className="flex mb-1 text-lg"> <span className="font-bold">Name:{" "} </span> {""} {data?.name}</p>
    <p className="flex mb-1 text-lg"> Email: {data?.email}</p>
    <p className="flex mb-1 text-lg"> Matriculation number: {data?.matricNo}
    </p>
   <p className="flex mb-1 text-lg">Academic session admitted : {data?.academicSessionAdmitted}</p>
   </div>

        {classes.map((level, index) => {
          
        
          return (
            <div key={index} className=" flex flex-col gap-5 mb-10">
              <div className="border-primaryGray border rounded ">
                <div className="h-[40px] w-full grid items-center px-2">
                  <div className="border-r font-bold border-primaryGray grid items-center h-full w-[fit-content] ">
                   
                  </div>
                </div>

                <TableSection  index={index} level={level} />
              </div>

              {/* // TODO: Fix button style */}

              <Button className="self-end  ">
                {level.studentStatus}
              </Button>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

const TableSection = ({ level , index}) => {
  return (
    <table className="w-full mx-auto flex flex-col">
      <th className= " flex w-full border-primaryGray">
        <tr className="w-full flex mx-auto justify-around flex-row bg-placeholder text-black" >
          
            <thead
              key={index}
              className=" w-1/3 h-[40px] justify-center capitalize text-black font-bold text-center"
            >
              {level?.level}
            </thead>
            <thead
              key={index}
              className=" w-1/3 h-[40px] justify-center capitalize text-black font-bold text-center"
            >
              {level?.academicSession}
            </thead>
          
            <thead
              key={index}
              className=" w-1/3 h-[40px] justify-center align-middle capitalize text-black font-bold text-center"
            >
              {level?.session}
            </thead>
          
          
        </tr>
      </th>
      <tbody className="
       flex w-[95%] flex-row justify-center  p-0 mx-auto border-primaryGray">
        
          {level?.courses?.map((course, index) => (
            
            <>
            <tbody className="flex w-full ">
            <tr className='flex w-full flex-col  items-center justify-center'  key={1}>
            <div className="flex flex-col  items-center mx-auto">
            <td
              key={index}
              className=" w-full flex border-r mx-auto text-black font-bold text-center"
            >
              {course?.courseTitle}
            </td>
            <td
              key={index}
              className=" w-full border-r mx-auto text-black font-bold text-center"
            >
              {course?.courseScore}
            </td>
            <td
              key={index}
              className=" w-full border-r mx-auto text-black font-bold text-center"
            >
              {course?.courseGrade}
            </td>
            <td
            key={index}
            className=" w-full flex border-r mx-auto text-black font-bold text-center"
          >
            {course?.resitScore}
          </td>
          <td
            key={index}
            className=" w-full flex border-r mx-auto text-black font-bold text-center"
          >
            {course?.resitGrade}
          </td>
            </div> </tr>


            </tbody>
        
            </>
          ))}
       
        
      </tbody>
    </table>
  );
};

export default ResultsTable;
