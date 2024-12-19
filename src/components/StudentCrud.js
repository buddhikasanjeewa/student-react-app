import axios from "axios";
import { useEffect, useState } from "react";
import "../App.css";
import dateFormat from "dateformat";

function StudentCrud() {
  const [id, setId] = useState("");
  const [studentCode, setStudentCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nic, setNIC] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmailAdd] = useState("");
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState("");
  // const { students, setStudents } = useState([]);
  const [students, setStudents] = useState([]);
  const [formerrors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const lurl = global.config.url;
  // const initalvalues = {
  //   id: "",
  //   studentcode: "",
  //   firstname: "",
  //   lastname: "",
  //   Address: "",
  //   MobileNo: "",
  //   EmailAdd: "",
  //   nic: "",
  // };
  // const [formvalues, setFormValues] = useState(initalvalues);
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormValues({ ...formvalues, [name]: value });
  //   console.log(formvalues);
  // };

  /**
   *
   */

  const validate = () => {
    const errors = {};
    const regex = /^\S+@\S+\.\S+$/i;
    if (!studentCode) {
      errors.studentCode = "Student Code is required!";
    }
    if (!firstName) {
      errors.firstName = "First Name is required!";
    }
    if (!lastName) {
      errors.lastName = "Last Name is required!";
    }
    if (!mobile) {
      errors.mobile = "Moible is required!";
    }
    if (!email) {
      errors.email = "Email is required!";
    } else if (!regex.test(email)) {
      errors.email = "Email is invalid!";
    }
    return errors;
  };

  useEffect(() => {
    (async () => await Load())();
  }, []);
  useEffect(() => {
    console.log(formerrors);
    if (Object.keys(formerrors).length === 0 && isSubmit) {
      debugger;

      console.log(studentCode);
    }
  }, [formerrors]);

  async function Load() {
    debugger;
    console.log(lurl);
    const result = await axios.get(lurl);
    // const result = await axios.get("https://localhost:7120/api/StudentApi");

    setStudents(result.data);
    console.log(result.data);
  }
  async function Sumbit(event) {
    debugger;
    event.preventDefault();
    setErrors(validate());
    setIsSubmit(true);
    if (isSubmit) {
      save();
    }
  }
  async function save(event) {
    debugger;
    //  event.preventDefault();
    // setErrors(validate());
    // setIsSubmit(true);

    try {
      await axios.post(lurl, {
        StudentCode: studentCode,
        FirstName: firstName,
        LastName: lastName,
        Address: address,
        Mobile: mobile,
        Email: email,
        NIC: nic,

        Dob: dob === "" ? "1900-01-01" : dob,
      });
      alert("Student Registred Successfully");
      clearData();
      Load();
    } catch (err) {
      alert(err);
    }
  }
  function clearData() {
    setAddress("");
    setEmailAdd("");
    setFirstName("");
    setLastName("");
    setMobile("");
    setNIC("");
    setStudentCode("");
    setId("");
    setDob("");
  }
  async function update(event) {
    debugger;
    event.preventDefault();
    try {
      await axios.put(
        lurl +
          students.find((u) => u.id === id && u.studentCode == studentCode).id +
          "/" +
          students.find((u) => u.id === id && u.studentCode == studentCode)
            .studentCode,

        {
          id: id,
          StudentCode: studentCode,
          FirstName: firstName,
          LastName: lastName,
          Address: address,
          Mobile: mobile,
          Email: email,
          NIC: nic,

          Dob: dob === "" ? "1900-01-01" : dob,
        }
      );
      alert("Record sucessfully Updated");
      clearData();
    } catch (err) {
      alert(err);
    }
  }
  async function editStudent(student) {
    debugger;
    setId(student.id);
    setStudentCode(student.studentCode);
    setAddress(student.address);
    setFirstName(student.firstName);
    setLastName(student.lastName);
    setEmailAdd(student.email);
    setMobile(student.mobile);
    setNIC(student.nic);
    setDob(dateFormat(student.dob, "yyyy-mm-dd"));
  }
  async function deleteStudent(id, studentCode) {
    await axios.delete(lurl + id + "/" + studentCode);
    alert("Student deleted Successfully");
    setAddress("");
    setEmailAdd("");
    setFirstName("");
    setLastName("");
    setMobile("");
    setNIC("");
    setStudentCode("");
    Load();
  }

  return (
    <div>
      <h1>Student Details</h1>
      <input
        type="hidden"
        className="form-control"
        id="Id"
        // value={formvalues.id}
        // onChange={handleChange}
        // onChange={(event) => {
        //   setId(event.target.value);
        // }}
      />

      <form className="row g-3">
        <div className="row">
          <div className="col-md-6">
            <label className="form-label">Student Code</label>
            <input
              type="text"
              className="form-control"
              id="StudentCode"
              maxLength={10}
              value={studentCode}
              // onChange={handleChange}
              onChange={(event) => {
                setStudentCode(event.target.value);
              }}
              // value={formvalues.studentcode}
              // onChange={handleChange}
            />
          </div>
          <p style={{ color: "red" }}>{formerrors.studentCode}</p>
          <div className="col-md-6">
            <label className="form-label">NIC</label>
            <input
              type="text"
              className="form-control"
              id="NIC"
              maxLength={20}
              value={nic}
              onChange={(event) => {
                setNIC(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="col-md-6">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            id="FirstName"
            maxLength={50}
            value={firstName}
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          />
        </div>
        <p className="errors">{formerrors.firstName}</p>
        <div className="col-md-6">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            maxLength={50}
            id="lastName"
            value={lastName}
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          />
        </div>
        <p className="errors">{formerrors.lastName}</p>
        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="EmailAdd"
            maxLength={50}
            value={email}
            onChange={(event) => {
              setEmailAdd(event.target.value);
            }}
          />
        </div>
        <p className="errors">{formerrors.EmailAdd}</p>
        <div className="col-md-6">
          <label className="form-label">Mobile</label>
          <input
            type="text"
            className="form-control"
            id="MobileNo"
            maxLength={20}
            value={mobile}
            onChange={(event) => {
              setMobile(event.target.value);
            }}
          />
        </div>
        <p className="errors">{formerrors.MobileNo}</p>
        <div className="col-12">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            id="Address"
            maxLength={250}
            placeholder=""
            value={address}
            onChange={(event) => {
              setAddress(event.target.value);
            }}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            className="form-control"
            id="Dob"
            placeholder=""
            value={dob}
            onChange={(event) => {
              setDob(event.target.value);
            }}
          />
        </div>

        <div className="col-12">
          <button type="button" onClick={Sumbit} className="btn btn-primary">
            Save
          </button>
          <button className="btn btn-secondary" onClick={update}>
            Update
          </button>
        </div>
      </form>
      <hr></hr>
      <br></br>
      <table className="table table-dark" align="center">
        <thead>
          <tr>
            <th scope="col">Student Code</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Mobile</th>
            <th scope="col">Option</th>
          </tr>
        </thead>
        {students.map(function fn(student) {
          return (
            <tbody>
              <tr>
                <th scope="row">{student.studentCode}</th>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.email}</td>
                <td>{student.mobile}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => editStudent(student)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() =>
                      deleteStudent(student.id, student.studentCode)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
}
export default StudentCrud;
