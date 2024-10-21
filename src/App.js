import React, { useState } from 'react';
import { Button, Form, Table, Badge, Container, Row, Col } from 'react-bootstrap';

function StudentApp() {
  const [students, setStudents] = useState([
    { name: 'Nguyen Van A', code: 'CODE12345', isActive: true },
    { name: 'Tran Van B', code: 'CODE67890', isActive: false },
  ]);
  const [newStudent, setNewStudent] = useState({ name: '', code: '', isActive: false });
  const [selectedCount, setSelectedCount] = useState(0);

  const handleChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setNewStudent({ ...newStudent, isActive: e.target.checked });
  };

  const addStudent = () => {
    setStudents([{ ...newStudent }, ...students]);
    setNewStudent({ name: '', code: '', isActive: false });
  };

  const deleteStudent = (index) => {
    const updatedStudents = students.filter((_, i) => i !== index);
    setStudents(updatedStudents);
  };

  const handleSelect = (e) => {
    const count = e.target.checked ? selectedCount + 1 : selectedCount - 1;
    setSelectedCount(count);
  };

  const clearStudents = () => {
    setStudents([]);
    setSelectedCount(0);
  };

  return (
    <Container className="mt-5">
      <Row className="align-items-center mb-3">
        <Col>
          <h2>Total Selected Students: {selectedCount}</h2>
        </Col>
        <Col>
          <Button variant="primary" onClick={clearStudents} className="float-end">
            Clear All
          </Button>
        </Col>
      </Row>

      <Row className="align-items-center mb-4">
        <Col>
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
        </Col>
        <Col>
          <Button variant="success" onClick={addStudent} className="float-end">
            Add
          </Button>
        </Col>
      </Row>

      <Form.Group controlId="formStudentCode" className="mb-4">
        <Form.Label>Student Code</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter student code"
          name="code"
          value={newStudent.code}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formIsActive" className="mb-4">
        <Form.Check
          type="checkbox"
          label="Still Active"
          checked={newStudent.isActive}
          onChange={handleCheckboxChange}
        />
      </Form.Group>

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
    </Container>
  );
}

export default StudentApp;
