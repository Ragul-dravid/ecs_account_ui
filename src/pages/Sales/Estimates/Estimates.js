import React, { useEffect, useRef } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye, FaEdit,FaPlus } from "react-icons/fa";
import DeleteModel from "../../../components/common/DeleteModel";


const Estimates = () => {
    const tableRef = useRef(null);
    const datas = [
     {
      id:1,
      date:"2020-03-03",
      estimateNumber:"EST-018",
      referenceNumber:"500",
      customerName:"Harish",
      amount:"$5350"
     },
     {
      id:2,
      date:"2020-03-03",
      estimateNumber:"EST-018",
      referenceNumber:"500",
      customerName:"Antony",
      amount:"$5350"
     },
     {
      id:3,
      date:"2020-03-03",
      estimateNumber:"EST-018",
      referenceNumber:"500",
      customerName:"keerthi",
      amount:"$5350"
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
              <h1 className="h4 ls-tight headingColor ">Estimates</h1>
            </div>
          </div>
          <div className="col-auto">
            <div className="hstack gap-2 justify-content-end">
              <Link to="/estimates/add">
                <button type="submit" className="btn btn-sm btn-button">
                  <span>Add <FaPlus className="pb-1"/></span>
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
              <th scope="col"className="text-center">DATE</th>
              <th scope="col"className="text-center">ESTIMATE NUMBER</th>
              <th scope="col"className="text-center">REFERENCE NUMBER</th>
              <th scope="col"className="text-center">CUSTOMER NAME</th>
              <th scope="col"className="text-center">AMOUNT</th>
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
                <td className="text-center">{data.estimateNumber}</td>
                <td className="text-center">{data.referenceNumber}</td>
                <td className="text-center">{data.customerName}</td>
                <td className="text-center">{data.amount}</td>
                <td className="text-center">
                  <div>
                    <Link to="/estimates/view">
                      <button className="btn btn-sm ps-0 shadow-none border-none">
                        <FaEye />
                      </button>
                    </Link>
                    <Link to="/estimates/edit">
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

export default Estimates