import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { FaPlus } from "react-icons/fa";
import { Card, CardContent } from "../ui/card";

import { transformAcademicSession } from "@/lib/convertAcademicSession";
import { convertToDigit } from "@/lib/convertToDigit";
import { Button } from "../ui/button";
import { number } from "yup";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";

import {
createNewStudent
} from "../../Global/slices/AppSlice";

const courseTitles = {
  twohundredlevel: ["Anatomy", "Physiology", "Biochemistry"],
  threehundredlevel: ["Anatomy", "Physiology", "Biochemistry"],
  fourhundredlevel: ["Pathology", "Pharmacology"],
  fivehundredlevel: [
    "Obstetrics and Gynaecology",
    "Paediatrics",
    "Dermatology",
    "Mental health",
  ],
  sixhundredlevel: ["Medicine", "Surgery", "Community Health"],
};

const coursesArray = Object.keys(courseTitles);

const EditableCell = ({ value, onSave, className }) => {
  const [editing, setEditing] = useState(false);
  const [cellValue, setCellValue] = useState(value);

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleBlur = () => {
    setEditing(false);
    onSave(cellValue);
  };

  const handleChange = (e) => {
    setCellValue(e.target.value);
  };

  return (
    <td
      onClick={handleDoubleClick} // Click event instead of double click
      onBlur={handleBlur}
      className={`${className} min-w-[100px] h-[25px]`} // Adjust these values as needed
    >
      {editing ? (
        <input
          type="text"
          value={cellValue}
          onChange={handleChange}
          autoFocus
          onBlur={handleBlur}
          className="w-[min-content] text-center h-full border-none outline-none px-2"
        />
      ) : (
        value
      )}
    </td>
  );
};

const TableSection = ({ courses, onSave }) => {
  const { selectedStudentData: data } = useSelector((st) => st.app);
  const { token } = useSelector((st) => st.user);
  const handleCellSave = (newValue, rowIndex) => {
    const updatedCourses = [...courses];
    updatedCourses[rowIndex].courseScore = newValue;
    onSave(updatedCourses);
  };

  return (
    <Table>
      <TableHeader className="border-primaryGray">
        <TableRow className="bg-placeholder text-black" isHeaderRow={true}>
          {courses.map((course, index) => (
            <th
              key={index}
              className="capitalize text-black font-bold text-center"
            >
              {course.courseTitle}
            </th>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody className="border-primaryGray">
        <TableRow key={1}>
          {courses.map((course, index) => (
            <EditableCell
              key={index}
              value={course.courseScore}
              onSave={(value) => handleCellSave(value, index)}
              className="border-r border-primaryGray text-black font-bold text-center"
            />
          ))}
        </TableRow>
      </TableBody>
    </Table>
  );
};

const UploadTable = ({}) => {
  const dispatch = useDispatch();
  const [numberOfLevels, setNumberOfLevels] = useState(1);
  const { newStudent: data, setSelectedStudentData, } = useSelector(
    (st) => st.app
  );
  const { token } = useSelector((st) => st.user);
  const [firstPart, secondPart] = transformAcademicSession(data.academicSessionAdmitted).split("/");
  const [tableData, setTableData] = useState([
    {
      level: "twohundredlevel",
      session: `${firstPart}/${secondPart}`,
      courses: courseTitles["twohundredlevel"].map((x) => ({
        courseTitle: x,
        courseScore: "",
        courseGrade: "",
      })),
    },
  ]);

  const handleAddLevel = () => {
    if (numberOfLevels < coursesArray.length) {
      setNumberOfLevels((prev) => prev + 1);
    }

    setTableData((prev) => [
      ...prev,
      {
        session: `${parseInt(firstPart) + numberOfLevels }/${parseInt(secondPart) + numberOfLevels}`,
        level: coursesArray[numberOfLevels], //uses the previous number of levels which equals to the index
        courses: courseTitles[coursesArray[numberOfLevels]].map((x) => ({
          courseTitle: x,
          courseScore: "",
          courseGrade: "",
        })),
      },
    ]);
  };

  useEffect(() => {
    console.log(tableData);
  }, [tableData, numberOfLevels]);


 
  const handleLogTableData = async() => {
    // Gather data from the table and log in the required format

   await dispatch( createNewStudent( tableData));
   console.log(data)
    console.log(token)
    
    console.log(tableData);
    console.log(data);
    const uploadTrans = {
      name : data.name,
      matricNo : data.matricNo,
      academicSessionAdmitted: data.academicSessionAdmitted,
      details : [
        {
        twoHundredLevel: {
          name: "200 Level",
          year: 5,
          courses: data[0]?.courses.map(course => (
           { courseTitle: course.courseTitle,
            courseScore :course.courseScore,
            courseGrade: course.courseGrade
           }
          
          )) 
        ,
        
        },
        threeHundredLevel: {
          name: "300 Level",
          year: 5,
          courses: data[1]?.courses.map(course => (
           { courseTitle: course.courseTitle,
            courseScore :course.courseScore,
            courseGrade: course.courseGrade
           }
          
          )) 
        ,
        
        },
        fourHundredLevel: {
          name: "400 Level",
          year: 5,
          courses: data[2]?.courses.map(course => (
           { courseTitle: course.courseTitle,
            courseScore :course.courseScore,
            courseGrade: course.courseGrade
           }
          
          )) 
        ,
        
        },
        
        fiveHundredLevel: {
          name: "500 Level",
          year: 5,
          courses: data[3]?.courses.map(course => (
           { courseTitle: course.courseTitle,
            courseScore :course.courseScore,
            courseGrade: course.courseGrade
           }
          
          )) 
        ,
        
        },
        sixHundredLevel: {
          name: "600 Level",
          year: 5,
          courses: data[4]?.courses.map(course => (
           { courseTitle: course.courseTitle,
            courseScore :course.courseScore,
            courseGrade: course.courseGrade
           }
          
          )) 
        ,
        
        },
      }
        
      ]
        }

        console.log(uploadTrans)
    const handleUploadResults = async () => {
      try {
        console.log("Starting upload...");
  console.log(data)
        const response = await axios.post(
          `${import.meta.env.VITE_PUBLIC_BASE_API_URL}/api/transcript/addTranscript`,
          uploadTrans,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
  
        console.log("Upload successful:", response.data);
        // Optionally return data or trigger additional logic
        return response.data;
      } catch (error) {
        console.error("Error uploading results:", error);
      }
    };

    handleUploadResults();
  };

  const handleSaveCourseData = (updatedCourses, levelIndex) => {
    const updatedTableData = [...tableData];
    updatedTableData[levelIndex].courses = updatedCourses;
    setTableData(updatedTableData);
  };

  return (
    <Card className="mb-5">
      <CardContent className="pt-8">
        <div className="flex flex-col gap-5 mb-10">
          {tableData.map((x, index) => (
            <div key={index} className="border-primaryGray border rounded">
              <div className="h-[40px] w-full grid items-center px-2">
                <div className="border-r font-bold border-primaryGray grid items-center h-full w-[fit-content]">
                  <span className="mr-5">
                    {`${convertToDigit(x.level)}L ${x.session} Session`}
                  </span>
                </div>
              </div>
              <TableSection
                courses={x.courses}
                onSave={(updatedCourses) =>
                  handleSaveCourseData(updatedCourses, index)
                }
              />
            </div>
          ))}
        </div>

        {numberOfLevels < coursesArray.length && (
          <div className="flex justify-center items-center">
            <button
              onClick={handleAddLevel}
              type="button"
              className="flex items-center"
            >
              <FaPlus className="text-xl mr-2" />
              <span>Add New Year</span>
            </button>
          </div>
        )}

        <div className="flex justify-center w-full mt-5">
          <Button
            className="capitalize self-end"
            variant="default"
            onClick={handleLogTableData}
          >
            Upload Results
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UploadTable;
