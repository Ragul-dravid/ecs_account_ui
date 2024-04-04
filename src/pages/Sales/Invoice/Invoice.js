import React, { useEffect, useRef } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import DeleteModel from "../../../components/common/DeleteModel";
const Invoice = () => {
  const tableRef = useRef(null);

  const datas = [
    {
      id: 1,
      date: "01-03-2004",
      invoiceNumber: "IN-018",
      orderNumber: "500",
      customerName: "Harish",
      balanceDue: "$5350",
      amount: "$0.00",
      status: "PAID",
    },
    {
      id: 2,
      date: "19-02-2024",
      invoiceNumber: "IN-006",
      orderNumber: "860",
      customerName: "Mani",
      balanceDue: "$5050",
      amount: "$5050",
      status: "PENDING",
    },
    {
      id: 3,
      date: "15-02-2024",
      invoiceNumber: "IN-002",
      orderNumber: "100",
      customerName: "Sangeetha",
      balanceDue: "$5009",
      amount: "$0.00",
      status: "PARTLY PAID",
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
                <h1 className="h4 ls-tight headingColor ">Invoice</h1>
              </div>
            </div>
            <div className="col-auto">
              <div className="hstack gap-2 justify-content-end">
                <Link to="/invoice/add">
                  <button type="submit" className="btn btn-sm btn-button">
                    <span>Add <FaPlus /></span>
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
                <th scope="col">DATE</th>
                <th scope="col">INVOICE NUMBER</th>
                <th scope="col">ORDER NUMBER</th>
                <th scope="col">CUSTOMER NAME</th>
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
                  <td>{data.date}</td>
                  <td>{data.invoiceNumber}</td>
                  <td>{data.orderNumber}</td>
                  <td>{data.customerName}</td>
                  <td>{data.balanceDue}</td>
                  <td>{data.amount}</td>
                  <td>
                    {data.status === "PAID" ? (
                      <span className="badge text-bg-success">PAID</span>
                    ) : data.status === "PENDING" ? (
                      <span className="badge text-bg-danger">PENDING</span>
                    ) : (
                      <span className="badge text-bg-primary">PARTLY PAID</span>
                    )}
                  </td>
                  <td>
                    <div>
                      <Link to="/invoice/view">
                        <button className="btn btn-sm ps-0 shadow-none border-none">
                          <FaEye />
                        </button>
                      </Link>
                      <Link to="/invoice/edit">
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

export default Invoice;
