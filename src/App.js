import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import LidTable from "./components/Admin/adminBody/adminBodyLid/LidTable/LidTable";
import AdminBody from "./components/Admin/adminBody/AdminBody";
import Pupil from "./components/Admin/adminBody/adminBodyLid/pupilTable/Pupil";
import GroupTable from "./components/Admin/adminBody/adminBodyLid/groupTable/GroupTable";
import Login from "./components/login/Login";
import StudentDetails from "./components/Admin/adminBody/adminBodyLid/LidTable/Student/StudentDetails";
import { useAddDataLid } from "./components/context/AddDataLidsFromModal";
import FetchGet from "./components/context/FetchGet";
import PupilEdit from "./components/Admin/adminBody/adminBodyLid/pupilTable/PupilEdit";

function App() {
  const { data } = FetchGet("https://otviz-backend.vercel.app/pupils")
  console.log('salom', data);

  const { PeopleTables } = useAddDataLid();

  const pupil = {
    name: "akbar",
    surname: "ali",
    address: "ibn sino",
    born: "2000",
    pNumber: "+998-(99)-999-99-99",
    parentsNumber: "+998-(99)-999-99-99",
    sub1: "eng",
    sub2: "frontend",
    freeTime: "15:00 - 17:00",
    date: "22-22-2222"
  }

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
          {PeopleTables.map((data) => (
            <Route
              key={data._id}
              path={`${data._id}`}
              element={<StudentDetails id={data._id} />} // Pass id as prop to StudentDetails
            />
          ))}
          <Route path="lid" element={<LidTable />} />


          <Route path="pupil" element={<Pupil />} />
          <Route path="groups" element={<GroupTable />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;