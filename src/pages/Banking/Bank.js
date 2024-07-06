
import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import DeleteModel from "../../components/common/DeleteModel";
import api from "../../config/URL";
import toast from "react-hot-toast";



const Bank = () => {
  const tableRef = useRef(null);
  const [datas, setDatas] = useState();
  const [loading, setLoading] = useState(true);

  const refreshData = async () => {
    destroyDataTable();
    setLoading(true);
    try {
      const response = await api.get("/getAllTxnBank");
      setDatas(response.data);
      initializeDataTable(); // Reinitialize DataTable after successful data update
    } catch (error) {
      console.error("Error refreshing data:", error.message);
    }
    setLoading(false);
  };
  const getData = async () => {
  
    try {
      const response = await api.get("/getAllTxnBank");
      if (response.status === 200) {
        setDatas(response.data)
        setLoading(false);
      }
    }
    catch (e) {
      toast.error("Error fetching data: ", e?.response?.data?.message);

    }
  }
  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      // DataTable already initialized, no need to initialize again
      return;
    }
    $(tableRef.current).DataTable({
      responsive: true,
    });
  };

  const destroyDataTable = () => {
    const table = $(tableRef.current).DataTable();
    if (table && $.fn.DataTable.isDataTable(tableRef.current)) {
      table.destroy();
    }
  };
  useEffect(() => {
    if (!loading) {
      initializeDataTable();
    }
    return () => {
      destroyDataTable();
    };
  }, [loading]);



  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container-fluid px-2 minHeight">
      <div className="card shadow border-0 my-2">
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
                    <span>Add +</span>
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
                <th scope="col" className="text-center">ACCOUNT NUMBER</th>
                <th scope="col" className="text-center">BANK NAME</th>
                <th scope="col" className="text-center">BANK TYPE</th>
                <th scope="col" className="text-center">CURRENCY</th>
                {/* <th scope="col">DEPARTMENT NAME</th>
                <th scope="col">WORK LOCATION</th> */}
                <th scope="col" className="text-center">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {datas?.map((data, index) => (
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{data.accountNumber}</td>
                  <td className="text-center">{data.bankName}</td>
                  <td className="text-center">{data.bankType}</td>
                  <td className="text-center">{data.currency}</td>
                  <td className="text-center">
                    <div className="gap-2">
                      <Link to={`/bank/view/${data.id}`} >
                        <button className="btn btn-light btn-sm  shadow-none border-none">
                          View
                        </button>
                      </Link>
                      <Link to={`/bank/edit/${data.id}`} className="px-2">
                        <button className="btn btn-light  btn-sm shadow-none border-none">
                          Edit
                        </button>
                      </Link>
                      <DeleteModel  
                      path={`/deleteTxnBank/${data.id}`} onSuccess={refreshData}/>
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