import React, { useEffect, useRef } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import DeleteModel from "../components/common/DeleteModel";

const Report = () => {
  const tableRef = useRef(null);

  const datas = [
    {
      id: 1,
      name: "Ragul",
      rate: "9",
      type: "Good",
      usage: "Unit",
    },
    {
      id: 2,
      name: "sakthivel",
      rate: "10",
      type: "Good",
      usage: "Unit",
    },
    {
      id: 3,
      name: "prem",
      rate: "9",
      type: "Good",
      usage: "Unit",
    },
    {
      id: 4,
      name: "keerthick",
      rate: "9",
      type: "Good",
      usage: "Unit",
    },
    {
      id: 5,
      name: "antony",
      rate: "9",
      type: "Good",
      usage: "Unit",
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
                <h1 className="h4 ls-tight headingColor ">Report</h1>
              </div>
            </div>
            <div className="col-auto">
              <div className="hstack gap-2 justify-content-end">
                {/* <Link to="/items/additems"> */}
                  <button type="submit" className="btn btn-sm btn-button">
                    <span>Add +</span>
                  </button>
                {/* </Link> */}
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
                <th scope="col" className="text-center">
                  NAME
                </th>
                <th scope="col" className="text-center">
                  Image
                </th>
                <th scope="col" className="text-center">
                  Description
                </th>
                {/* <th scope="col" className="text-center">
                  Usage
                </th> */}
                <th scope="col" className="text-center">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {datas.map((data, index) => (
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{data.name}</td>
                  <td className="text-center">{data.rate}</td>
                  <td className="text-center">{data.type}</td>
                  {/* <td className="text-center">{data.usage}</td> */}
                  <td className="text-center">
                    <div className="gap-2">
                      <Link to="/items/viewitems">
                        <button className="btn btn-light btn-sm  shadow-none border-none">
                          View
                        </button>
                      </Link>
                      <Link to="/items/edititems" className="px-2">
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
        </div>

        <div className="card-footer border-0 py-5"></div>
      </div>
    </div>
  );
};

export default Report;
