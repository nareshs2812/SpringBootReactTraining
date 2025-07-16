import { useEffect, useState } from "react";
import axios from "axios";


const GetEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:8080/employee", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmployees(res.data);
      } catch (err) {
        console.error("", err);
        alert("error to fetching");
      }
    };

    if (token) {
      fetchEmployees();
    } else {
      alert("login to view employees data");
    }
  }, [token]);

  const handleDelete = async (empId) => {
    try {
      await axios.delete(`http://localhost:8080/employee/${empId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmployees((prev) => prev.filter((emp) => emp.empId !== empId));
      alert(" deleted successfully");
    } catch (err) {
      console.error("Error", err);
      alert("Delete fail");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>Employee List</h2>
        <table className="">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              {role === "ROLE_ADMIN" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.empId}>
                <td>{emp.empId}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                {role === "ROLE_ADMIN" && (
                  <td>
                    <button
                      onClick={() => handleDelete(emp.empId)}
                      className="btn btn-danger btn-sm me-2"
                    >
                      Delete
                    </button>
                    <button className="btn btn-primary btn-sm">Edit</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default GetEmployees;
