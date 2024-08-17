// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import CreateQuestion from "./components/CreateQuestion";
import BulkUploadQuestions from "./components/BulkUploadQuestions";
import Signup from "./components/Signup";
import TeacherDashboard from "./components/TeacherDashboard";
import UploadBlueprint from "./components/teacherPanel/UploadBlueprint";
import FetchQuestions from "./components/teacherPanel/FetchQuestions";
import CreatePaper from "./components/teacherPanel/CreatePaper";
import AddAdmin from "./components/addAdmin";
import LogoutButton from "./components/Logout";
import GoogleSuccess from "./components/Google";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/teacher/dashboard"
          element={
            <PrivateRoute>
              <TeacherDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/teacher/dashboard/questions"
          element={
            <PrivateRoute>
              <FetchQuestions />
            </PrivateRoute>
          }
        />
        <Route
          path="/teacher/dashboard/generate-question-paper"
          element={
            <PrivateRoute>
              <CreatePaper />
            </PrivateRoute>
          }
        />
        <Route
          path="/teacher/dashboard/upload-blueprint"
          element={
            <PrivateRoute>
              <UploadBlueprint />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/questions/create"
          element={
            <PrivateRoute>
              <CreateQuestion />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/questions/bulk-upload"
          element={
            <PrivateRoute>
              <BulkUploadQuestions />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/add-admin"
          element={
            <PrivateRoute>
              <AddAdmin />
            </PrivateRoute>
          }
        />
        <Route path="/logout" element={<LogoutButton />} />
        <Route path="/google-success" element={<GoogleSuccess />} />
      </Routes>
    </Router>
  );
};

export default App;
