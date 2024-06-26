import React, { useEffect, useRef } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye, FaEdit, FaPlus } from "react-icons/fa";
import DeleteModel from "../../../components/common/DeleteModel";
// import DeleteModel from "../../components/common/DeleteModel";

const Bills = () => {
  const tableRef = useRef(null);

  const datas = [
    {
      id: 1,
      date: "01.03.2024",
      billsNumber: "B1-08",
      referenceNumber: "500",
      vendorName: "Harish",
      balanceDue: "$5340",
      amount: "$0.00",
      status: "Paid",
    },
    {
      id: 2,
      date: "01.03.2024",
      billsNumber: "B1-08",
      referenceNumber: "500",
      vendorName: "Harish",
      balanceDue: "$5340",
      amount: "$0.00",
      status: "Pending",
    },
    {
      id: 3,
      date: "01.03.2024",
      billsNumber: "B1-08",
      referenceNumber: "500",
      vendorName: "Harish",
      balanceDue: "$5340",
      amount: "$0.00",
      status: "Pending",
    },
    {
      id: 4,
      date: "01.03.2024",
      billsNumber: "B1-08",
      referenceNumber: "500",
      vendorName: "Harish",
      balanceDue: "$5340",
      amount: "$0.00",
      status: "Off Paid",
    },
    {
      id: 5,
      date: "01.03.2024",
      billsNumber: "B1-08",
      referenceNumber: "500",
      vendorName: "Harish",
      balanceDue: "$5340",
      amount: "$0.00",
      status: "Paid",
    },
  ];

  useEffect(() => {
    const table = $(tableRef.current).DataTable();

    return () => {
      table.destroy();
    };
  }, []);

  return (
    <div className="container-fluid px-2 minHeight">
      <div className="card shadow border-0 my-2">
        <div className="container-fluid py-4">
          <div className="row align-items-center justify-content-between ">
            <div className="col">
              <div className="d-flex align-items-center gap-4">
                <h1 className="h4 ls-tight headingColor ">Bills</h1>
              </div>
            </div>
            <div className="col-auto">
              <div className="hstack gap-2 justify-content-end">
                <Link to="/bills/add">
                  <button type="submit" className="btn btn-sm btn-button">
                  <span cla>Add <FaPlus className="pb-1"/></span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      

      <hr className="removeHrMargin"></hr>
        <div className="table-responsive p-2 minHeight">
          <table ref={tableRef} className="display table ">
            <thead className="thead-light">
              <tr>
                <th scope="col" style={{ whiteSpace: "nowrap" }}>
                  S.NO
                </th>
                <th scope="col">DATE</th>
                <th scope="col">BILLS NUMBER</th>
                <th scope="col">REFERENCE NUMBER</th>
                <th scope="col">VENDOR NAME</th>
                <th scope="col">BALANCE DUE</th>
                <th scope="col">AMOUNT</th>
                <th scope="col">STATUS</th>
                <th scope="col" className="text-center">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {datas.map((data, index) => (
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{data.date}</td>
                  <td className="text-center">{data.billsNumber}</td>
                  <td className="text-center">{data.referenceNumber}</td>
                  <td className="text-center">{data.vendorName}</td>
                  <td className="text-center">{data.balanceDue}</td>
                  <td className="text-center">{data.amount}</td>
                  <td>
                    {data.status === "Paid" ? (
                      <span className="badge text-bg-success">Paid</span>
                    ) : data.status === "Pending" ? (
                      <span className="badge text-bg-danger">Pending</span>
                    ) : (
                      <span className="badge text-bg-primary">
                      Off Paid
                      </span>
                    )}
                  </td>
                  <td>
                    <div>
                      <Link to="/bills/view">
                      <button className="btn btn-light btn-sm  shadow-none border-none">
                          View
                        </button>
                      </Link>
                      <Link to="/bills/edit" className="px-2">
                      <button className="btn btn-light  btn-sm shadow-none border-none">
                          Edit
                        </button>
                      </Link>
                      <DeleteModel />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        

        <div className="card-footer border-0 py-5"></div>
      </div>
    </div>
    </div>
  );
};

export default Bills;
