import { useState } from "react";
import "./App.css";
import Upload from "./pages/Upload";
import Test from "./pages/Test";
import Results from "./pages/Results";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import UploadIndividual from "./pages/UploadIndividual";
import ResultsPage from "./pages/ResultsPage";
import AdminCreateSubAdmin from "./pages/AdminCreateSubAdmin";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewScore from "./components/custom/newScore";
import ScoreUpload from "./components/custom/ScoreUpload";
import ErrorPage from "./components/custom/ErrorPage";
import ProtectedRoute from "./components/custom/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/create-subadmin" element={
          // <ProtectedRoute>
            <AdminCreateSubAdmin />
          // </ProtectedRoute>
        } />
        <Route path="/results" element={
          <ProtectedRoute>
            <Results />
          </ProtectedRoute>
        } />
        <Route path="/upload" element={
          <ProtectedRoute>
            <Upload />
          </ProtectedRoute>
        } />
        <Route path="/score-upload" element={
          <ProtectedRoute>
            <ScoreUpload />
          </ProtectedRoute>
        } />
        <Route path="/upload/:identifier" element={<UploadIndividual />} />
        <Route path="/results/:id" element={<ResultsPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
