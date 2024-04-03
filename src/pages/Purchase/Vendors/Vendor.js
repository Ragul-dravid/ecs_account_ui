import React, { useEffect, useRef } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import DeleteModel from "../../../components/common/DeleteModel";
// import DeleteModel from "../../components/common/DeleteModel";

const Vendor = () => {
  const tableRef = useRef(null);

  const datas = [
    {
      id: 1,
      name: "Raghul",
      companyName: "ECS",
      email: "ragulecs@gmail.com",
      phone: "987665432",
      
    },
    {
      id: 2,
      name: "Raghul",
      companyName: "ECS",
      email: "ragulecs@gmail.com",
      phone: "987665432",
    },
    {
      id: 3,
      name: "Raghul",
      companyName: "ECS",
      email: "ragulecs@gmail.com",
      phone: "987665432",
    },
    {
      id: 4,
      name: "Raghul",
      companyName: "ECS",
      email: "ragulecs@gmail.com",
      phone: "987665432",
    },
    {
      id: 5,
      name: "Raghul",
      companyName: "ECS",
      email: "ragulecs@gmail.com",
      phone: "987665432",
    },
  ];

  useEffect(() => {
    const table = $(tableRef.current).DataTable();

    return () => {
      table.destroy();
    };
  }, []);

  return (
    <div className="container-fluid minHeight">
      <div className="card shadow border-0 mb-2 top-header">
        <div className="container-fluid py-4">
          <div className="row align-items-center justify-content-between ">
            <div className="col">
              <div className="d-flex align-items-center gap-4">
                <h1 className="h4 ls-tight headingColor ">Vendor</h1>
              </div>
            </div>
            <div className="col-auto">
              <div className="hstack gap-2 justify-content-end">
                <Link to="/vendor/add">
                  <button type="submit" className="btn btn-sm btn-button">
                    <span>Add New Vendor</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow border-0 my-2">
        <div className="table-responsive p-2 minHeight">
          <table ref={tableRef} className="display table ">
            <thead className="thead-light">
              <tr>
                <th scope="col" style={{ whiteSpace: "nowrap" }}>
                  S.NO
                </th>
                {/* <th scope="col">EMPLOYEE ID</th> */}
                <th scope="col">NAME</th>
                <th scope="col" >COMPANY NAME</th>
                <th scope="col">EMAIL</th>
                <th scope="col">PHONE</th>
                <th scope="col" className="text-center ">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {datas.map((data, index) => (
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>
                  {/* <td>{data.empId}</td> */}
                  <td>{data.name}</td>
                  <td>{data.companyName}</td>
                  <td>{data.email}</td>
                  <td>{data.phone}</td>
                  <td className="text-center">
                    <div>
                      <Link to="/vendor/view">
                        <button className="btn btn-sm ps-0 shadow-none border-none">
                          <FaEye />
                        </button>
                      </Link>
                      <Link to="/vendor/edit">
                        <button className="btn btn-sm shadow-none border-none">
                          <FaEdit />
                        </button>
                      </Link>
                      <DeleteModel />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card-footer border-0 py-5"></div>
      </div>
    </div>
  );
};

export default Vendor;
