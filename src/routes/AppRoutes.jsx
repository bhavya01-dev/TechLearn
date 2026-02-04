import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Learn from '../pages/Learn';
import Courses from '../pages/Courses';
import CourseDetail from '../pages/CourseDetail';
import CourseTopic from '../pages/CourseTopic';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ComingSoon from '../components/common/ComingSoon';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/learn" element={<Learn />} />
      <Route path="/coming-soon" element={<ComingSoon />} />
      <Route path="/learn/courses" element={<Courses />} />
      <Route path="/learn/courses/:id" element={<CourseDetail />} />
      <Route path="/learn/courses/:id/learn" element={<CourseTopic />} />
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;