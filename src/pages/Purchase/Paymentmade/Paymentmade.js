import React, { useEffect, useRef } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import DeleteModel from "../../../components/common/DeleteModel";
// import DeleteModel from "../../components/common/DeleteModel";

const Paymentmade = () => {
  const tableRef = useRef(null);

  const datas = [
    {
      id: 1,
      date: "01.02.2024",
      paymentNumber: "B1-018",
      referenceNumber: "500",
      vendorNumber: "Antony",
      billNumber: "$5340",
      amount: "$0.00",
      mode: "Cash",
    },
    {
      id: 2,
      date: "01.02.2024",
      paymentNumber: "B1-018",
      referenceNumber: "500",
      vendorNumber: "Antony",
      billNumber: "$5340",
      amount: "$0.00",
      mode: "Cash",
    },
    {
      id: 3,
      date: "01.02.2024",
      paymentNumber: "B1-018",
      referenceNumber: "500",
      vendorNumber: "Antony",
      billNumber: "$5340",
      amount: "$0.00",
      mode: "Cash",
    },
    {
      id: 4,
      date: "01.02.2024",
      paymentNumber: "B1-018",
      referenceNumber: "500",
      vendorNumber: "Antony",
      billNumber: "$5340",
      amount: "$0.00",
      mode: "Cash",
    },
    {
      id: 5,
      date: "01.02.2024",
      paymentNumber: "B1-018",
      referenceNumber: "500",
      vendorNumber: "Antony",
      billNumber: "$5340",
      amount: "$0.00",
      mode: "Cash",
    },
  ];

  useEffect(() => {
    const table = $(tableRef.current).DataTable();

    return () => {
      table.destroy();
    };
  }, []);

  return (
    <div className="container-fluid minHeight px-2">
      <div className="card shadow border-0 my-2">
        <div className="container-fluid py-4">
          <div className="row align-items-center justify-content-between ">
            <div className="col">
              <div className="d-flex align-items-center gap-4">
                <h1 className="h4 ls-tight headingColor ">Payment Made</h1>
              </div>
            </div>
            <div className="col-auto">
              <div className="hstack gap-2 justify-content-end">
               
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
                <th scope="col">PAYMENT NUMBER</th>
                <th scope="col">REFERENCE NUMBER</th>
                <th scope="col">VENDOR NUMBER</th>
                <th scope="col">BILL NUMBER</th>
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
                  <td className="text-center">{data.date}</td>
                  <td className="text-center">{data.paymentNumber}</td>
                  <td className="text-center">{data.referenceNumber}</td>
                  <td className="text-center">{data.vendorNumber}</td>
                  <td className="text-center">{data.billNumber}</td>
                  <td className="text-center">{data.amount}</td>
                  <td className="text-center">{data.mode}</td>
                  <td>
                    <div>
                      <Link to="/paymentmade/view" className="px-2">
                      <button className="btn btn-light btn-sm  shadow-none border-none">
                          View
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
        </div>
        <div className="card-footer border-0 py-5"></div>
      </div>
    
  );
};

export default Paymentmade;
