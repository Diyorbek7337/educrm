// StudentDetails.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function StudentDetails() {
  const { pupilId } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    // Fetch student details based on pupilId
    const fetchStudentDetails = async (id) => {
      try {
        const response = await fetch(`https://api.example.com/students/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch student details');
        }
        const studentData = await response.json();
        setStudent(studentData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudentDetails();

    return () => {
      // Cleanup function
    };
  }, [pupilId]);

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{student.name}</h2>
      {/* Display other student details */}
    </div>
  );
}

export default StudentDetails;
