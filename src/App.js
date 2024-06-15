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
import FetchGet from "./components/context/FetchGet";
import PupilEdit from "./components/Admin/adminBody/adminBodyLid/pupilTable/PupilEdit";
import AddGroup from "./components/Admin/adminBody/adminBodyLid/groupTable/AddGroup";
import "./components/css/normalize.css"
import "./components/css/responsive.css"

function App() {
  const { data } = FetchGet("https://otviz-backend.vercel.app/pupils")
  // const groups = FetchGet("https://otviz-backend.vercel.app/groups").data;

  const { PeopleTables } = useAddDataLid();



  return (
    <div className="App">
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="adminBody" element={<AdminBody />}>
          {data.map((item) => (
            <Route
              key={item._id}
              path={`${item._id}`}
              element={<PupilEdit data={item} />}
            />
          ))}
          <Route path={"addgroup"} element={<AddGroup />} />

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