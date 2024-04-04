
import React, { useEffect, useRef } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import DeleteModel from "../../components/common/DeleteModel";


const Bank = () => {
  const tableRef = useRef(null);

  const datas = [
    {
      id: 1,
      accounttype: "Bank",
      accountName: "Ragul",
      runningbalance: " ₹-1,24,51,483.00",
      
    },
    {
      id: 2,
      accounttype: "Credit Card",
      accountName: "Chandru",
      runningbalance: " ₹+1,24,35,483.00",
     
    },
    {
      id: 3,
      accounttype: "Pretty Cash",
      accountName: "Surya",
      runningbalance: " ₹-1,24,35,483.00",
      
    },
    {
      id: 4,
      accounttype: "undeposited Fund",
      accountName: "Antony",
      runningbalance: " ₹-1,24,66,483.00",
      
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
                <h1 className="h4 ls-tight headingColor ">Bank Overview</h1>
              </div>
            </div>
            <div className="col-auto">
              <div className="hstack gap-2 justify-content-end">
                <Link to="/bank/add">
                  <button type="submit" className="btn btn-sm btn-button">
                    <span>Add New Users</span>
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
                <th scope="col">ACCOUNT TYPE</th>
                <th scope="col">ACCOUNT NAME</th>
                <th scope="col">RUNNING BALANCE</th>
                {/* <th scope="col">DEPARTMENT NAME</th>
                <th scope="col">WORK LOCATION</th> */}
                <th scope="col" className="text-center">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {datas.map((data, index) => (
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td>{data.accounttype}</td>
                  <td>{data.accountName}</td>
                  <td>{data.runningbalance}</td>
                  <td>
                    <div>
                      <Link to="/bank/view">
                        <button className="btn btn-sm ps-0 shadow-none border-none">
                          <FaEye />
                        </button>
                      </Link>
                      <Link to="/bank/edit">
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

export default Bank;