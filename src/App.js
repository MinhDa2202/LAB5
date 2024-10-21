import React, { useState } from 'react';
import { Button, Form, Table, Badge } from 'react-bootstrap';

function StudentApp() {
  const [students, setStudents] = useState([
    { name: 'Nguyen Van A', code: 'CODE12345', isActive: true },
    { name: 'Tran Van B', code: 'CODE67890', isActive: false },
  ]);
  const [newStudent, setNewStudent] = useState({ name: '', code: '', isActive: false });
  const [selectedCount, setSelectedCount] = useState(0);

  // Handle form input change
  const handleChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  // Handle checkbox change for active status
  const handleCheckboxChange = (e) => {
    setNewStudent({ ...newStudent, isActive: e.target.checked });
  };

  // Add new student to the list
  const addStudent = () => {
    setStudents([{ ...newStudent }, ...students]);
    setNewStudent({ name: '', code: '', isActive: false });
  };

  // Delete student from the list
  const deleteStudent = (index) => {
    const updatedStudents = students.filter((_, i) => i !== index);
    setStudents(updatedStudents);
  };

  // Handle checkbox selection for counting selected students
  const handleSelect = (e) => {
    const count = e.target.checked ? selectedCount + 1 : selectedCount - 1;
    setSelectedCount(count);
  };

  // Clear all students
  const clearStudents = () => {
    setStudents([]);
    setSelectedCount(0);
  };

  return (
    <div className="container">
      <h2>Total Selected Students: {selectedCount}</h2>
      <Button variant="primary" onClick={clearStudents} className="mb-3">Clear All</Button>

      <Form className="mb-4">
        <Form.Group controlId="formStudentName">
          <Form.Label>Student Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter student name"
            name="name"
            value={newStudent.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formStudentCode">
          <Form.Label>Student Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter student code"
            name="code"
            value={newStudent.code}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formIsActive">
          <Form.Check
            type="checkbox"
            label="Still Active"
            checked={newStudent.isActive}
            onChange={handleCheckboxChange}
          />
        </Form.Group>

        <Button variant="success" onClick={addStudent}>Add</Button>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Select</th>
            <th>Student Name</th>
            <th>Student Code</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>
                <Form.Check
                  type="checkbox"
                  onChange={handleSelect}
                />
              </td>
              <td>{student.name}</td>
              <td>{student.code}</td>
              <td>
                {student.isActive ? (
                  <Badge bg="primary">Active</Badge>
                ) : (
                  <Badge bg="danger">In-active</Badge>
                )}
              </td>
              <td>
                <Button variant="danger" onClick={() => deleteStudent(index)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default StudentApp;
