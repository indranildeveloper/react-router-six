import React from "react";
import ReactDOM from "react-dom";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  Outlet,
  useParams,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/myapps" element={<Navigate replace to="/learn" />} />
      <Route path="/learn" element={<Learn />}>
        <Route path="courses" element={<Courses />}>
          <Route path=":courseid" element={<CourseId />} />
        </Route>
        <Route path="bundles" element={<Bundles />} />
      </Route>
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </Router>,
  document.getElementById("root")
);

function Home() {
  return (
    <div className="container">
      <h1 className="display-1">Home Route</h1>
      <Link to="/learn" className="btn btn-primary btn-lg">
        Learn Page
      </Link>
    </div>
  );
}

function Learn() {
  return (
    <div className="container">
      <h1 className="display-1">Learn</h1>
      <h4 className="display-3">All courses are listed here!</h4>
      <Link to="/learn/courses" className="btn btn-success btn-lg me-3">
        Courses
      </Link>
      <Link to="/learn/bundles" className="btn btn-light btn-lg me-3">
        Bundle
      </Link>
      <Link to="/" className="btn btn-primary btn-lg">
        Go Home
      </Link>
      <Outlet />
    </div>
  );
}

function Courses() {
  const courseList = [
    "React",
    "Angular",
    "Vue",
    "NodeJS",
    "NextJS",
    "GatsbyJS",
  ];
  const randomCourseName =
    courseList[Math.floor(Math.random() * courseList.length)];

  return (
    <div className="container">
      <h1 className="display-1">Courses Route</h1>
      <h4 className="display-3">Courses Card</h4>
      <p>More Test</p>
      <NavLink
        className={({ isActive }) =>
          isActive ? "btn btn-primary me-3" : "btn btn-light me-3"
        }
        // style={({ isActive }) => {
        //   return {
        //     backgroundColor: isActive ? "pink" : "yellow",
        //   };
        // }}
        to={`/learn/courses/${randomCourseName}`}
      >
        {randomCourseName}
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "btn btn-primary" : "btn btn-light"
        }
        to={`/learn/courses/tests`}
      >
        Tests
      </NavLink>
      <Outlet />
    </div>
  );
}

function Bundles() {
  return (
    <div className="container">
      <h1 className="display-1">Bundles List</h1>
      <h4 className="display-3">Bundles Card</h4>
    </div>
  );
}

function CourseId() {
  const navigate = useNavigate();
  const { courseid } = useParams();
  return (
    <div className="container">
      <h1 className="display-1">URL Parameter is: {courseid} </h1>
      <button
        onClick={() => {
          navigate("/dashboard", { state: courseid });
        }}
        className="btn btn-warning"
      >
        Price
      </button>
      <Link to="/dashboard" state={"Django"}>Test Link</Link>
    </div>
  );
}

function Dashboard() {
  const location = useLocation();
  return (
    <div className="container">
      <h1 className="display-1">Info that I got is: {location.state}</h1>
    </div>
  );
}
