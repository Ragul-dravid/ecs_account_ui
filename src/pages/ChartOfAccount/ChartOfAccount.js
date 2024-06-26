import React, { useEffect, useRef } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import DeleteModel from "../../components/common/DeleteModel";
import ChartofAccountAdd from "./ChartofAccountAdd";
import ChartOfAccountEdit from "./ChartOfAccountEdit";
import ChartOfAccountView from "./ChartOfAccountView";

const ChartOfAccount = () => {
  const tableRef = useRef(null);

  const datas = [
    {
      id: 1,
      accountName: "Sakthivel",
      accountType: "Income",
      description: "Your Feed Back",
    },
    {
      id: 2,
      accountName: "Antony",
      accountType: "Expence",
      description: "Your Feed Back",
    },
    {
      id: 3,
      accountName: "prem",
      accountType: "Income",
      description: "Your Feed Back",
    },
    {
      id: 4,
      accountName: "Keerthick",
      accountType: "Income",
      description: "Your Feed Back",
    },
    {
      id: 5,
      accountName: "Harish",
      accountType: "Expence",
      description: "Your Feed Back",
    },
    {
      id: 6,
      accountName: "Rahul",
      accountType: "Income",
      description: "Your Feed Back",
    },
  ];

  useEffect(() => {
    const table = $(tableRef.current).DataTable({
      responsive: true,
    });

    return () => {
      table.destroy();
    };
  }, []);

  return (
    <div className="container-fluid px-2 minHeight">
      <div className="card shadow border-0  my-2">
        <div className="container-fluid py-4">
          <div className="row align-items-center justify-content-between ">
            <div className="col">
              <div className="d-flex align-items-center gap-4">
                <h1 className="h4 ls-tight headingColor ">Accounts</h1>
              </div>
            </div>
            <div className="col-auto">
              <div className="hstack gap-2 justify-content-end">
                <ChartofAccountAdd />
              </div>
            </div>
          </div>
        </div>
        <hr className="removeHrMargin"></hr>
      
        <div className="table-responsive p-2 minHeight">
          <table
            ref={tableRef}
            className="display table table-hover table-nowrap"
          >
            <thead className="thead-light">
              <tr>
                <th scope="col" style={{ whiteSpace: "nowrap" }}>
                  S.NO
                </th>
                <th scope="col">AccountName</th>
                <th scope="col">AccountType</th>
                <th scope="col">Description</th>
                <th scope="col" className="text-center">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {datas.map((data, index) => (
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td>{data.accountName}</td>
                  <td>{data.accountType}</td>
                  <td>{data.description}</td>
                  <td className="text-center">
                    <ChartOfAccountView />
                    <ChartOfAccountEdit />
                    <DeleteModel />
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

export default ChartOfAccount;
