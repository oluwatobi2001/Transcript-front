import React, { useState } from 'react';
import Select from 'react-select';
import { levels, sessionType, year } from '../../Sessions';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../ui/table';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';

const courseTitles = {
  200: ["Anatomy", "Physiology", "Biochemistry"],
  300: ["Anatomy", "Physiology", "Biochemistry"],
  400: ["Pathology", "Pharmacology"],
  500: ["Obstetrics and Gynaecology", "Paediatrics", "Dermatology", "Mental health"],
  600: ["Medicine", "Surgery", "Community Health"],
};

const ScoreUpload = () => {

  const dispatch = useDispatch();

  const { newStudent: data, setSelectedStudentData, } = useSelector(
    (st) => st.app
  );
  console.log(data)
  const { token } = useSelector((st) => st.user);
  const [studentResult, setStudentResult] = useState([]);
const [valueError , setValueError] = useState(false)
  const addNewLevel = () => {
    const newLevel = {
      id: uuidv4(),
      level: null,
      session: null,
      courses: []
    };
    setStudentResult(prev => [...prev, newLevel]);
  };

  const updateStudentResult = (id, levelData) => {
    setStudentResult(prev => {
      return prev.map(level => 
        level.id === id ? { ...level, ...levelData } : level
      );
    });
  };

  const uploadResult = () => {
    console.log(data)
  
    console.log('Final Student Result:', studentResult);
  };

  return (
    <div className="flex flex-col w-full ">
      {studentResult.map((level) => (
        <NewScore 
          key={level.id} 
          id={level.id} 
          updateResult={updateStudentResult} 
          setValueError = {setValueError}
        />
      ))}
      <button 
        className=' flex flex-col  items-center mx-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-6 disabled:bg-grey' 
        disabled={valueError}
        onClick={addNewLevel}
      >
        Add new level
      </button>
      <button 
        className='flex flex-col justify-end items-center mx-auto bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-4 disabled:bg-grey'
        onClick={uploadResult}
        disabled={valueError}
      >
        Submit result
      </button>
    </div>
  );
};

const NewScore = ({ id, updateResult, setValueError }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectSession, setSelectSession] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [courseData, setCourseData] = useState([]);
  const [sessionDisabled, setSessionDisabled] = useState(false)
  const [studentStatus, setStudentStatus] = useState('');

  const sessionTypeFunc = (selected) => {
    setSelectSession(selected);
    if (selected.value !== "active") {
      setSessionDisabled(true)
    }
    else {
      setSessionDisabled(false)
    }
  };

  const selectLevel = (selected) => {
    setSelectedOption(selected);
  };

  const setLevel = (selected) => {
    setSelectedLevel(selected);

    // Dynamically update courses based on selected level
    const levelKey = selected?.value;
    const courses = courseTitles[levelKey] || [];
    const formattedCourses = courses.map((title) => ({
      courseTitle: title,
      courseScore: '',
      courseGrade: '',
      resitScore: '',
      resitGrade: '',
    }));
    setCourseData(formattedCourses);

    updateResult(id, {
      level: selected?.value,
      courses: formattedCourses
    });
  };

  const handleCellChange = (index, value, isResit = false) => {
    const updatedCourses = [...courseData];
    if (isNaN(value)) {
      alert("Please enter only numbers");
      setValueError(true);
      value = ""
    }

    if (parseInt(value) > 100) {
      alert("Please enter values below 100 marks");
      setValueError(true)
      value=""
    }

    if (isResit) {
      updatedCourses[index].resitScore = value;
      updatedCourses[index].resitGrade = determineGrade(value);
    } else {
      updatedCourses[index].courseScore = value;
      updatedCourses[index].courseGrade = determineGrade(value);
      setValueError(false)
    }

    setCourseData(updatedCourses);

    updateResult(id, {
      level: selectedLevel?.value,
      session: selectSession?.value,
      courses: updatedCourses
    });
  };

  const determineGrade = (score) => {
    if (!Number(score)) {
      alert('Please enter correct digits');
      return '';
    }
    if (Number(score) < 50) return 'Fail';
    else if (Number(score) < 70) return 'Pass';
    else return 'Distinction';
  };

  const evaluateStudentStatus = () => {
    if (selectedLevel?.value) {
      const failCount = courseData.filter(
        (course) =>
          course.courseGrade === 'Fail' && course.resitGrade !== 'Pass'
      ).length;

      if (failCount >= 3) {
        setStudentStatus('Withdrawn');
      } else if (failCount === 2) {
        setStudentStatus('Repeat');
      } else {
        setStudentStatus('Promoted');
      }
    } else {
      setStudentStatus('N/A');
    }
  };

  React.useEffect(() => {
    evaluateStudentStatus();
  }, [courseData, selectedLevel]);

  return (
    <>
      <div className='flex w-full  justify-center items-center mb-6'>
        <div className='w-full max-w-4xl'>
          <table className='w-[95%] mx-auto mt-3 border border-gray-300 rounded-lg'>
            <TableHeader>
              <tr className='flex space-x-4 p-4 bg-gray-100 rounded-t-lg w-full' isHeaderRow={true}>
              <td className=' flex w-1/3 '>
                  <Select
                    options={year}
                    value={selectedOption}
                    onChange={selectLevel}
                    placeholder='Select Year'
                  />
                </td>
                <td className=' flex w-1/3'>
                  <Select
                    options={sessionType}
                    value={selectSession}
                    onChange={sessionTypeFunc}
                    placeholder='Select Session Type'
                  />
                </td>
                <td className=' flex w-1/3'>
                  <Select
                    options={levels}
                    value={selectedLevel}
                    onChange={setLevel}
                    placeholder='Select Level'
                  />
                </td>
              </tr>
            </TableHeader>

            <TableBody className='flex flex-col border-primaryGray'>
              {!sessionDisabled  ? 
              <TableRow key={1}>
                {courseData.map((course, idx) => (
                  <td
                    key={idx}
                    className='border border-gray-300 w-1/3 text-center p-2'
                  >
                    <TableCell className='flex w-full text-center items-center justify-center mx-auto'>
                      {course.courseTitle}
                    </TableCell>
                    <input
                      type='text'
                      value={course.courseScore}
                      onChange={(e) => handleCellChange(idx, e.target.value)}
                      className='w-full border h-[40px] border-gray-300 rounded text-center'
                      placeholder='Score'
                    />
                    {course.courseScore && (
                      <TableCell>{course.courseGrade}</TableCell>
                    )}

                    {course.courseGrade === 'Fail' && (
                      <>
                        <TableCell>Resit</TableCell>
                        <input
                          type='text'
                          value={course.resitScore}
                          onChange={(e) =>
                            handleCellChange(idx, e.target.value, true)
                          }
                          className='w-full border h-[40px] border-gray-300 rounded text-center'
                          placeholder='Resit Score'
                        />
                        {course.resitScore && (
                          <TableCell>{course.resitGrade}</TableCell>
                        )}
                      </>
                    )}
                  </td>
                ))}
              </TableRow> : <p>Session isn't active</p> }
            </TableBody>
          </table>
        </div>
      </div>
      <p className='text-center mt-4'>Selected Year: {selectedOption?.value}</p>
      <p className='text-center mt-4'>Student Status: {studentStatus}</p>
    </>
  );
};

export default ScoreUpload;
