import React, { useEffect, useRef } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye, FaEdit,FaPlus } from "react-icons/fa";
import DeleteModel from "../../../components/common/DeleteModel";


const Customers = () => {
    const tableRef = useRef(null);
    const datas = [
     {
      id:1,
      Name:"Harish",
      CompanyName:"CloudECS",
      email:"harish@gmail.com",
      phone:9632587411
     },
     {
      id:2,
      Name:"Antony",
      CompanyName:"CloudECS",
      email:"Antony@gmail.com",
      phone:9632587411
     },
     {
      id:3,
      Name:"Sakthi",
      CompanyName:"CloudECS",
      email:"Sakthi@gmail.com",
      phone:9632587411
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
              <h1 className="h4 ls-tight headingColor ">Customer</h1>
            </div>
          </div>
          <div className="col-auto">
            <div className="hstack gap-2 justify-content-end">
              <Link to="/customer/add">
                <button type="submit" className="btn btn-sm btn-button">
                <span cla>Add <FaPlus  className="pb-1"/></span>
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
              <th scope="col">NAME</th>
              <th scope="col">COMPANY NAME</th>
              <th scope="col">EMAIL</th>
              <th scope="col">PHONE</th>
              <th scope="col" className="text-center">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {datas.map((data, index) => (
              <tr key={index}>
                <td className="text-center">{index + 1}</td>
                <td>{data.Name}</td>
                <td>{data.CompanyName}</td>
                <td>{data.email}</td>
                <td>{data.phone}</td>
                <td>
                  <div>
                    <Link to="/customer/view">
                      <button className="btn btn-sm ps-0 shadow-none border-none">
                        <FaEye />
                      </button>
                    </Link>
                    <Link to="/customer/edit">
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
  )
}

export default Customers
