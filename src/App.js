import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import LidTable from "./components/Admin/adminBody/adminBodyLid/LidTable/LidTable";
import AdminBody from "./components/Admin/adminBody/AdminBody";
import Pupil from "./components/Admin/adminBody/adminBodyLid/pupilTable/Pupil";
import GroupTable from "./components/Admin/adminBody/adminBodyLid/groupTable/GroupTable";
import Login from "./components/login/Login";
import StudentDetails from "./components/Admin/adminBody/adminBodyLid/LidTable/Student/StudentDetails";
import TeacherTable from "./components/Admin/adminBody/adminBodyLid/teacherTable/TeacherTable";
import { useAddDataLid } from "./components/context/AddDataLidsFromModal";
import "./components/css/normalize.css"
import "./components/css/responsive.css"

function App() {


  const { PeopleTables } = useAddDataLid();



  return (
    <div className="App">
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="adminBody" element={<AdminBody />}>
          {PeopleTables.map((data) => (
            <Route
              key={data._id}
              path={`${data._id}`}
              element={<StudentDetails id={data._id} />} // Pass id as prop to StudentDetails
            />
          ))}
          <Route path="lid" element={<LidTable />} />
          <Route path="teacher" element={<TeacherTable />} />

          <Route path="pupil" element={<Pupil />} />
          <Route path="groups" element={<GroupTable />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;