import React, { useState , useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import Select from 'react-select';
import { levels, sessionType as rawSessionType, year } from '../../Sessions';
import { Table, TableBody, TableCell, TableHeader, TableRow, TableHead } from '../ui/table';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const courseTitles = {
  200: ["Anatomy", "Physiology", "Biochemistry"],
  300: ["Anatomy", "Physiology", "Biochemistry"],
  400: ["Pathology", "Pharmacology"],
  500: ["Obstetrics and Gynaecology", "Paediatrics", "Dermatology", "Mental health"],
  600: ["Medicine", "Surgery", "Community Health"],
};

const statusColors = {
  Promoted: "text-green-600 font-bold",
  Failed: "text-red-600 font-bold",
  Repeat: "text-yellow-600 font-bold",
  Withdrawn: "text-red-600 font-bold",
  Undetermined: "text-gray-500 font-bold"
};

const sessionType = rawSessionType.map(opt => ({
  ...opt,
  label: opt.label.charAt(0).toUpperCase() + opt.label.slice(1)
}));

const ScoreUpload = () => {
  const dispatch = useDispatch();
  const { newStudent: data } = useSelector((st) => st.app);
  const { token } = useSelector((st) => st.user); // Use token for API calls only

  const [studentResult, setStudentResult] = useState([]);
  const [valueError, setValueError] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [success, setSuccess] = useState(false);

  // Add new level/session card
  const addNewLevel = () => {
    const newLevel = {
      id: uuidv4(),
      level: null,
      studentStatus: 'Undetermined',
      session: null,
      academicSession: null,
      courses: [],
      errors: {}
    };
    setStudentResult(prev => [...prev, newLevel]);
  };

  // Update a level/session's data
  const updateStudentResult = (id, levelData) => {
    setStudentResult(prev =>
      prev.map(level =>
        level.id === id ? { ...level, ...levelData } : level
      )
    );
  };

  // Upload all results
  const uploadResult = async () => {
    if (!data?.name) {
      setUploadError(true);
      return;
    }
    const studentInfo = { ...data, details: studentResult };
    try {
      const resultUpload = await axios.post(
        "http://localhost:5000/api/transcript/addTranscript",
        { studentInfo },
        { headers: { Authorization: "Bearer " + token } }
      );
      if (resultUpload.data?.msg) {
        setUploadError(false);
        setSuccess(true);
        navigate("/results");
      } else {
        setUploadError(true);
      }
    } catch (err) {
      setUploadError(true);
    }
  };

  return (
    <div className="flex flex-col w-full px-4 py-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center">Upload Student Results</h2>
      <div className="flex flex-col gap-8">
        {studentResult.map((level, idx) => (
          <LevelCard
            key={level.id}
            id={level.id}
            updateResult={updateStudentResult}
            setValueError={setValueError}
            index={idx + 1}
          />
        ))}
      </div>
      <div className="flex gap-4 justify-center mt-10">
        <button
          className='bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition'
          disabled={valueError}
          onClick={addNewLevel}
        >
          Add New Level/Session
        </button>
        <button
          className='bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700 transition'
          onClick={uploadResult}
          disabled={valueError || studentResult.length === 0}
        >
          Submit All Results
        </button>
      </div>
      {uploadError && (
        <div className="text-center text-red-600 mt-4 font-semibold">
          Error uploading results. Please check your data and try again.
        </div>
      )}
      {success && (
        <div className="text-center text-green-600 mt-4 font-semibold">
          Results uploaded successfully!
        </div>
      )}
    </div>
  );
};

const LevelCard = ({ id, updateResult, setValueError, index }) => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [courseData, setCourseData] = useState([]);
  const [sessionDisabled, setSessionDisabled] = useState(false);
  const [studentStatus, setStudentStatus] = useState('Undetermined');
  const [errors, setErrors] = useState({});

  // Helper to check if all dropdowns are selected
  const allDropdownsSelected = selectedYear && selectedSession && selectedLevel;

  // Helper to check if all scores are filled and valid
  const allScoresFilled = courseData.length > 0 && courseData.every(course =>
    course.courseScore !== '' &&
    !isNaN(course.courseScore) &&
    parseInt(course.courseScore) >= 0 &&
    parseInt(course.courseScore) <= 100 &&
    // If fail, resit must be filled and valid
    (course.courseGrade !== 'Fail' || (
      course.resitScore !== '' &&
      !isNaN(course.resitScore) &&
      parseInt(course.resitScore) >= 0 &&
      parseInt(course.resitScore) <= 100
    ))
  );

  // Grade logic
  const determineGrade = (score) => {
    const num = Number(score);
    if (isNaN(num)) return '';
    if (num < 50) return 'Fail';
    if (num < 70) return 'Pass';
    return 'Distinction';
  };

  // Status logic (your clarified logic)
  const evaluateStudentStatus = (courses) => {
    // Count courses failed after resit

    
    let failedAfterResit = 0;
    courses.forEach(course => {
      if (
        course.courseGrade === 'Fail' &&
        (
          !course.resitScore || determineGrade(course.resitScore) === 'Fail'
        )
      ) {
        failedAfterResit += 1;
      }
    });

    let status = 'Promoted';
    if (failedAfterResit === 1) status = 'Repeat';
    if (failedAfterResit > 1) status = 'Withdrawn';
    return status;
    
  };
  useEffect(() => {
    if (allDropdownsSelected && allScoresFilled) {
      const newStatus = evaluateStudentStatus(courseData);
      setStudentStatus(newStatus);
      updateLevelData({ courses: courseData, studentStatus: newStatus });
    } else {
      setStudentStatus('Undetermined');
      updateLevelData({ courses: courseData, studentStatus: 'Undetermined' });
    }
  }, [courseData, selectedYear, selectedSession, selectedLevel]);
  // Handle dropdown changes
  const handleYearChange = (selected) => {
    setSelectedYear(selected);
    updateLevelData({ academicSession: selected?.value });
  };

  const handleSessionChange = (selected) => {
    setSelectedSession(selected);
    setSessionDisabled(selected.value !== "active");
    updateLevelData({ session: selected?.value });
  };

  const handleLevelChange = (selected) => {
    setSelectedLevel(selected);
    const levelKey = selected?.value;
    const courses = courseTitles[levelKey] || [];
    const formattedCourses = courses.map((title) => ({
      courseTitle: title,
      courseScore: '',
      courseGrade: '',
      resitScore: '',
      resitGrade: '',
      error: ''
    }));
    setCourseData(formattedCourses);
    updateLevelData({
      level: selected?.value,
      courses: formattedCourses
    });
  };

  // Handle score input
  const handleScoreChange = (idx, value, isResit = false) => {
    const updatedCourses = [...courseData];
    let errorMsg = "";

    if (value === "" || isNaN(value)) {
      errorMsg = "Enter a valid number";
      setValueError(true);
    } else if (parseInt(value) < 0 || parseInt(value) > 100) {
      errorMsg = "Score must be 0-100";
      setValueError(true);
    } else {
      setValueError(false);
    }

    if (isResit) {
      updatedCourses[idx].resitScore = value;
      updatedCourses[idx].resitGrade = determineGrade(value);
      updatedCourses[idx].error = errorMsg;
    } else {
      updatedCourses[idx].courseScore = value;
      updatedCourses[idx].courseGrade = determineGrade(value);
      updatedCourses[idx].error = errorMsg;
    }

    setCourseData(updatedCourses);
    if (allDropdownsSelected && allScoresFilled) {
      evaluateStudentStatus(updatedCourses);
    }
    updateLevelData({ courses: updatedCourses, studentStatus });
  };

  // Update parent
  const updateLevelData = (data) => {
    updateResult(id, {
      level: selectedLevel?.value,
      session: selectedSession?.value,
      courses: courseData,
      academicSession: selectedYear?.value,
      studentStatus,
      ...data
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-2">
      <div className="flex flex-col md:flex-row gap-4 mb-4 items-center">
        <div className="w-full md:w-1/3">
          <label className="block text-sm font-medium mb-1">Year/Session</label>
          <Select
            options={year}
            value={selectedYear}
            onChange={handleYearChange}
            placeholder='Select Year'
          />
        </div>
        <div className="w-full md:w-1/3">
          <label className="block text-sm font-medium mb-1">Session Type</label>
          <Select
            options={sessionType}
            value={selectedSession}
            onChange={handleSessionChange}
            placeholder='Select Session Type'
          />
        </div>
        <div className="w-full md:w-1/3">
          <label className="block text-sm font-medium mb-1">Level</label>
          <Select
            options={levels}
            value={selectedLevel}
            onChange={handleLevelChange}
            placeholder='Select Level'
          />
        </div>
      </div>
      {allDropdownsSelected && (
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow isHeaderRow={true}>
                <TableHead className="font-bold text-black">Course Title</TableHead>
                <TableHead className="font-bold text-black">Score</TableHead>
                <TableHead className="font-bold text-black">Grade</TableHead>
                <TableHead className="font-bold text-black">Resit Score</TableHead>
                <TableHead className="font-bold text-black">Resit Grade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!sessionDisabled ? (
                courseData.map((course, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{course.courseTitle}</TableCell>
                    <TableCell>
                      <input
                        type='number'
                        min="0"
                        max="100"
                        value={course.courseScore}
                        onChange={(e) => handleScoreChange(idx, e.target.value)}
                        className='w-20 border border-gray-300 rounded text-center'
                        placeholder='Score'
                      />
                      {course.error && (
                        <div className="text-xs text-red-500 mt-1">{course.error}</div>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className={
                        course.courseGrade === 'Fail' ? 'text-red-600 font-bold' :
                        course.courseGrade === 'Pass' ? 'text-green-600 font-bold' :
                        course.courseGrade === 'Distinction' ? 'text-blue-600 font-bold' : ''
                      }>
                        {course.courseGrade}
                      </span>
                    </TableCell>
                    <TableCell>
                      {course.courseGrade === 'Fail' && studentStatus !== 'Repeat' && studentStatus !== 'Withdrawn' ? (
                        <input
                          type='number'
                          min="0"
                          max="100"
                          value={course.resitScore}
                          onChange={(e) => handleScoreChange(idx, e.target.value, true)}
                          className='w-20 border border-gray-300 rounded text-center'
                          placeholder='Resit Score'
                        />
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {course.resitScore ? (
                        <span className={
                          course.resitGrade === 'Fail' ? 'text-red-600 font-bold' :
                          course.resitGrade === 'Pass' ? 'text-green-600 font-bold' :
                          course.resitGrade === 'Distinction' ? 'text-blue-600 font-bold' : ''
                        }>
                          {course.resitGrade}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500">
                    Session isn't active
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
      <div className="mt-4 flex flex-col md:flex-row justify-between items-center">
        <span className="text-base">
          <strong>Selected Year:</strong> {selectedYear?.value || <span className="text-gray-400">None</span>}
        </span>
        <span className={`text-base ${allScoresFilled ? statusColors[studentStatus] : "text-red-600 font-bold"}`}>
          <strong>Status:</strong>{" "}
          {!allDropdownsSelected
            ? "N/A"
            : allScoresFilled
              ? studentStatus
              : "Fill all values to view student status"}
        </span>
      </div>
    </div>
  );
};

export default ScoreUpload;
