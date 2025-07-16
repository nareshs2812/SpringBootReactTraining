import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const AddEmployees = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    userName: "",
    roleNames: ""
  });

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const addNewEmployee = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("invalid token");
      navigate("/login");
      return;
    }

    const roleArray = form.roleNames.split(",").map((r) => r.trim());

    try {
      const res = await axios.post(
        "http://localhost:8080/employee/add",
        {
          name: form.name,
          email: form.email,
          password: form.password,
          userName: form.userName,
          roleNames: roleArray
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (res.data) {
        alert(res.data);
        navigate("/getemployees");
      } else {
        alert("Error when Add employee");
      }
    } catch (error) {
      console.error("error", error);
        alert("Error Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <section className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-center mb-4">Add New Employee</h3>
                <form onSubmit={addNewEmployee}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Employee Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="userName" className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      id="userName"
                      value={form.userName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={form.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="roleNames" className="form-label">Roles (comma separated)</label>
                    <input
                      type="text"
                      className="form-control"
                      id="roleNames"
                      value={form.roleNames}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    ADD EMPLOYEE
                  </button>
                </form>
                <p className="mt-3 text-center">
                  Already a user? <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddEmployees;
