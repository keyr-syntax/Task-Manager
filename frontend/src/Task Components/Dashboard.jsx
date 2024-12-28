import { Link, Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./Dashboard.css";
import { useState } from "react";
function Dashboard() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

  return (
    <>
      <Navbar
        fixed="top"
        style={{
          backgroundColor: "#151533",
          color: "white",
          border: "1px solid rgb(255,255,255,0.2)",
        }}
        expand="md"
        className="mb-3"
      >
        <Container fluid>
          <Navbar.Brand className="fs-4 text-light" as={Link} to="/">
            Afro-Syntax
          </Navbar.Brand>
          <Navbar.Toggle
            className="toggler"
            aria-controls="offcanvasNavbar-expand-md"
            onClick={handleShow}
          />
          <Navbar.Offcanvas
            style={{
              backgroundColor: "#151533",
              color: "white",
              width: "250px",
            }}
            id="offcanvasNavbar-expand-md"
            aria-labelledby="offcanvasNavbarLabel-expand-md"
            placement="start"
            show={showOffcanvas}
            onHide={handleClose}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title
                style={{ color: "white", textDecoration: "none" }}
                className="fs-4 text-light"
                id="offcanvasNavbarLabel-expand-md"
                as={Link}
                to="/"
              >
                Afro-Syntax
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-evenly flex-grow-1 pe-3">
                <NavDropdown
                  className="dropdown"
                  title="Task"
                  id="offcanvasNavbarDropdown-expand-md"
                  drop="down-centered"
                >
                  <NavDropdown.Item
                    as={Link}
                    to="/createtask"
                    onClick={handleClose}
                  >
                    Add New Task
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/alltasks"
                    onClick={handleClose}
                  >
                    All Tasks
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/pendingtasks"
                    onClick={handleClose}
                  >
                    Pending Tasks
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/completedtasks"
                    onClick={handleClose}
                  >
                    Completed Tasks
                  </NavDropdown.Item>

                  <NavDropdown.Item
                    as={Link}
                    to="/reminder"
                    onClick={handleClose}
                    style={{ wordWrap: "nowrap" }}
                  >
                    Tasks on Reminder List
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/repeat"
                    onClick={handleClose}
                    style={{ wordWrap: "nowrap" }}
                  >
                    Tasks on Repeat List
                  </NavDropdown.Item>

                  <NavDropdown.Item
                    as={Link}
                    to="/tasksfortoday"
                    onClick={handleClose}
                  >
                    Today&apos;&apos;s Tasks
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown
                  className="dropdown"
                  title="Filter Tasks"
                  id="offcanvasNavbarDropdown-expand-md"
                  drop="down-centered"
                >
                  <NavDropdown.Item
                    as={Link}
                    to="/filterbypriority"
                    onClick={handleClose}
                  >
                    Filter by Category
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/filterbydate/:date"
                    onClick={handleClose}
                  >
                    Filter by Date
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown
                  className="dropdown"
                  title="Category"
                  id="offcanvasNavbarDropdown-expand-md"
                  drop="down-centered"
                >
                  <NavDropdown.Item
                    as={Link}
                    to="/createpriority"
                    onClick={handleClose}
                  >
                    Create Category
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/prioritylist"
                    onClick={handleClose}
                  >
                    Category List
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link
                  style={{ fontSize: "18px", color: "white" }}
                  as={Link}
                  to="/tasksfortoday"
                  onClick={handleClose}
                >
                  Today&apos;s Tasks
                </Nav.Link>
                <Nav.Link
                  style={{ fontSize: "18px", color: "white" }}
                  as={Link}
                  to="/createtask"
                  onClick={handleClose}
                >
                  New Task
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default Dashboard;
