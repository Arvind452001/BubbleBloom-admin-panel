import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Children() {
  const navigate = useNavigate();

  const [children, setChildren] = useState([]);
  const [filter, setFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchChildren();
  }, []);

  // 🔥 Dummy Data
  const fetchChildren = () => {
    const dummy = [
      {
        _id: "1",
        name: "Baby Aarav",
        age: "1.5 yrs",
        gender: "Male",
        parentName: "Amit Sharma",
        totalRecords: 20,
        isActive: true,
      },
      {
        _id: "2",
        name: "Baby Riya",
        age: "2 yrs",
        gender: "Female",
        parentName: "Neha Verma",
        totalRecords: 12,
        isActive: false,
      },
    ];

    setChildren(dummy);
  };

  // 🔥 Filter
  const filteredData =
    filter === "all"
      ? children
      : children.filter((c) =>
          filter === "active" ? c.isActive : !c.isActive
        );

  // 🔥 Pagination
  const indexOfLast = currentPage * itemsPerPage;
  const currentItems = filteredData.slice(
    indexOfLast - itemsPerPage,
    indexOfLast
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="p-3">
      <div className="card">

        <div className="card-header d-flex justify-content-between">
          <strong>Children List</strong>

          <select
            className="form-select w-auto"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Parent</th>
                <th>Total Records</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {currentItems.map((c) => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{c.age}</td>
                  <td>{c.gender}</td>
                  <td>{c.parentName}</td>
                  <td>{c.totalRecords}</td>

                  <td>
                    <span
                      className={`badge ${
                        c.isActive ? "bg-success" : "bg-secondary"
                      }`}
                    >
                      {c.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td>
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() =>
                        navigate(`/children-details/${c._id}`)
                      }
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-center mt-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`btn btn-sm ${
                currentPage === i + 1 ? "btn-primary" : "btn-light"
              } mx-1`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}