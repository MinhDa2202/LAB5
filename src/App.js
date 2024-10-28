import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Button, Table, Form, Row, Col, Badge, Modal, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import StudentApp from "./components/StudentApp";
import StudentDetail from "./components/StudentDetail";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentList />} />
        <Route path="/students/:id" element={<StudentDetail />} />
      </Routes>
    </Router>
  );
}

const StudentList = () => (
  <StudentApp>
    {({
      students,
      selectedCount,
      newStudent,
      setNewStudent,
      selectedStudents,
      addStudent,
      updateStudent,
      deleteStudent,
      handleSelect,
      clearStudents,
      showModal,
      openUpdateModal,
      closeModal,
      editingStudent,
      setEditingStudent,
      currentPage,
      totalPages,
      goToPreviousPage,
      goToNextPage,
    }) => (
      <div className="container mt-4">
        <Container className="mt-5">
          {/* Hàng hiển thị số lượng sinh viên đã chọn và nút Clear All */}
          <Row className="align-items-center mb-3">
            <Col>
              <h2>Total Selected Students: {selectedCount}</h2>
            </Col>
            <Col>
              <Button variant="outline-primary" onClick={clearStudents}>
                Clear All
              </Button>
            </Col>
          </Row>

          {/* Hàng nhập tên sinh viên và nút Add */}
          <Row className="align-items-center mb-4">
            <Col>
              <Form.Group controlId="formStudentName">
                <Form.Control
                  type="text"
                  placeholder="Enter student name"
                  name="name"
                  value={newStudent.name}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, name: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
            <Col>
              <Button variant="success" onClick={addStudent}>
                Add
              </Button>
            </Col>
          </Row>

          {/* Trường nhập mã sinh viên */}
          <Form.Group controlId="formStudentCode" className="mb-4">
            <Form.Control
              type="text"
              placeholder="Enter student code"
              name="code"
              value={newStudent.studentCode}
              onChange={(e) =>
                setNewStudent({ ...newStudent, studentCode: e.target.value })
              }
            />
          </Form.Group>

          {/* Checkbox cho trạng thái của sinh viên */}
          <Form.Group controlId="formIsActive" className="mb-4">
            <Form.Check
              type="checkbox"
              label="Still Active"
              checked={newStudent.isActive}
              onChange={(e) =>
                setNewStudent({ ...newStudent, isActive: e.target.checked })
              }
            />
          </Form.Group>
        </Container>

        {/* Bảng hiển thị danh sách sinh viên */}
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
            {students.map((student) => (
              <tr key={student._id}>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={selectedStudents.includes(student._id)}
                    onChange={(e) =>
                      handleSelect(student._id, e.target.checked)
                    }
                  />
                </td>
                <td>
                  <Link to={`/students/${student._id}`}>{student.name}</Link>
                </td>
                <td>{student.studentCode}</td>
                <td>
                  {student.isActive ? (
                    <Badge bg="primary">Active</Badge>
                  ) : (
                    <Badge bg="danger">In-active</Badge>
                  )}
                </td>

                <td>
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => openUpdateModal(student)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => deleteStudent(student._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Điều khiển phân trang */}
        <div className="d-flex justify-content-center align-items-center gap-2 mt-4">
          <Button
            variant="outline-secondary"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span>Page {currentPage} of {totalPages}</span>
          <Button
            variant="outline-secondary"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>


        {/* Modal để cập nhật thông tin sinh viên */}
        <Modal show={showModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Update Student</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {editingStudent && (
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Student Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={editingStudent.name}
                    onChange={(e) =>
                      setEditingStudent({
                        ...editingStudent,
                        name: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Student Code</Form.Label>
                  <Form.Control
                    type="text"
                    value={editingStudent.studentCode}
                    onChange={(e) =>
                      setEditingStudent({
                        ...editingStudent,
                        studentCode: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Check
                  type="checkbox"
                  label="Still Active"
                  checked={editingStudent.isActive}
                  onChange={(e) =>
                    setEditingStudent({
                      ...editingStudent,
                      isActive: e.target.checked,
                    })
                  }
                />
              </Form>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={updateStudent}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )}
  </StudentApp>
);

export default App;
