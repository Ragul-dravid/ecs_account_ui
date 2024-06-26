
import React, { useEffect, useRef } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import DeleteModel from "../../components/common/DeleteModel";


const BankView = () => {
  const tableRef = useRef(null);

  const datas = [
    {
      id: 1,
      date: " 26/08/24",
      type: " internet",
      description: " ",
      deposits: " ",
      withdrawals: "₹+1,44,678.00",
      runningbalance: " ₹-1,24,51,483.00",

    },
    {
      id: 2,
      date: " 01/08/24",
      type: " mous",
      description: "",
      deposits: "",
      withdrawals: "",
      runningbalance: " ₹-1,24,51,483.00",
    },
    {
      id: 3,
      date: "20/02/24",
      type: " general incom",
      description: "",
      deposits: " ₹+1,44,678.00",
      withdrawals: "₹+1,44,678.00",
      runningbalance: " ₹-1,24,51,483.00",
    },
    {
      id: 4,
      date: "26/08/24",
      type: "other changer",
      description: "",
      deposits: "",
      withdrawals: "₹+1,44,678.00",
      runningbalance: "",

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
                <h1 className="h4 ls-tight headingColor "> Manikandan Account Number: xxxx1009</h1>
              </div>
            </div>
            <div className="col-auto">
              <div className="hstack gap-2 justify-content-end">
                <Link to="/bank/view/expense">
                  <button type="submit" className="btn btn-sm btn-button">
                    <span>Expense</span>
                  </button>
                </Link>
                <Link to="/bank/view/income">
                  <button type="submit" className="btn btn-sm btn-button">
                    <span>Income</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <hr className="removeHrMargin"></hr>
        <div className="container fw-bold fs-5 my-4">
          <span>All transactions</span>
        </div>
        <div className="table-responsive p-2 minHeight">
          <table ref={tableRef} className="display table ">
            <thead className="thead-light">
              <tr>
                <th scope="col" style={{ whiteSpace: "nowrap" }}>
                  S.NO
                </th>
                <th scope="col" className="text-center">DATE</th>
                <th scope="col" className="text-center">TYPE</th>
                <th scope="col" className="text-center">DESCRIPTION</th>
                <th scope="col" className="text-center">DEPOSITS</th>
                <th scope="col" className="text-center">WITHDRAWALS</th>
                <th scope="col" className="text-center">RUNNING BALANCE</th>
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
                  <td className="text-center">{data.type}</td>
                  <td className="text-center">{data.description}</td>
                  <td className="text-center">{data.deposits}</td>
                  <td className="text-center">{data.withdrawals}</td>
                  <td className="text-center">{data.runningbalance}</td>
                  <td className="text-center">
                    <div>
                      <Link to={`/expense/view/${data.id}`}>
                        <button className="btn btn-light btn-sm  shadow-none border-none">
                          View
                        </button>
                      </Link>
                      <Link to={`/expense/edit/${data.id}`}  className="px-2">
                        <button className="btn btn-light btn-sm  shadow-none border-none">
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
        </div>

        <div className="card-footer border-0 py-5"></div>
      </div>
    </div>
  );
};

export default BankView;