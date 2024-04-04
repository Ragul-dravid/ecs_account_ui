import React, { useEffect, useRef } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import DeleteModel from "../../../components/common/DeleteModel";


const PaymentReceived = () => {
  const tableRef = useRef(null);

  const datas = [
    {
      id: 1,
      date: "01-03-2004",
      paymentNumber: "B1-018",
      referenceNumber: "500",
      customerNumber: "Harish",
      invoiceNumber: "$5350",
      amount: "$0.00",
      mode: "Cash"
    },
    {
      id: 2,
      date: "19-02-2024",
      paymentNumber: "B1-006",
      referenceNumber: "860",
      customerNumber: "Mani",
      invoiceNumber: "$5050",
      amount: "$0.00",
      mode: "Card"
    },
    {
      id: 3,
      date: "15-02-2024",
      paymentNumber: "B1-002",
      referenceNumber: "100",
      customerNumber: "Sangeetha",
      invoiceNumber: "$5009",
      amount: "$0.00",
      mode: "Bank"
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
                <h1 className="h4 ls-tight headingColor ">Payment Received</h1>
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
                <th scope="col">PAYMENT NUMBER</th>
                <th scope="col">REFERENCE NUMBER</th>
                <th scope="col">CUSTOMER NUMBER</th>
                <th scope="col">INVOICE NUMBER</th>
                <th scope="col">AMOUNT</th>
                <th scope="col">MODE</th>
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
                  <td>{data.paymentNumber}</td>
                  <td>{data.referenceNumber}</td>
                  <td>{data.customerNumber}</td>
                  <td>{data.invoiceNumber}</td>
                  <td>{data.amount}</td>
                  <td>{data.mode}</td>
                  <td>
                    <div>
                      <Link to="/paymentReceived/view">
                        <button className="btn btn-sm ps-0 shadow-none border-none">
                          <FaEye />
                        </button>
                      </Link>
                      <DeleteModel/>
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

export default PaymentReceived;
