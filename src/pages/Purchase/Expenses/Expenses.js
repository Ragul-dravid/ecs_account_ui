import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import DeleteModel from "../../../components/common/DeleteModel";
import api from "../../../config/URL";
import toast from "react-hot-toast";

const Expenses = () => {
  const tableRef = useRef(null);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      initializeDataTable();
    }
    return () => {
      destroyDataTable();
    };
  }, [loading]);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      // DataTable already initialized, no need to initialize again
      return;
    }
    $(tableRef.current).DataTable();
  };

  const destroyDataTable = () => {
    const table = $(tableRef.current).DataTable();
    if (table && $.fn.DataTable.isDataTable(tableRef.current)) {
      table.destroy();
    }
  };

  const refreshData = async () => {
    destroyDataTable();
    setLoading(true);
    try {
      const response = await api.get("getAllTxnExpenses");
      setDatas(response.data);
      initializeDataTable();
    } catch (error) {
      toast.error("Error refreshing data:", error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getExpensesData = async () => {
      try {
        const resposnse = await api.get("getAllTxnExpenses");
        setDatas(resposnse.data);
      } catch (error) {
        toast.error("Error fetching data: ", error?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };
    getExpensesData();
  }, []);

  return (
    <div>
    {loading ? (
      <div className="loader-container">
       <div class="Loader-Div">
        <svg id="triangle" width="50px" height="50px" viewBox="-3 -4 39 39">
            <polygon fill="transparent" stroke="blue" stroke-width="1.3" points="16,0 32,32 0,32"></polygon>
        </svg>
    </div>
      </div>
    ) : (
    <div className="container-fluid px-2 minHeight">
      <div className="card shadow border-0 my-2">
        <div className="container-fluid py-4">
          <div className="row align-items-center justify-content-between ">
            <div className="col">
              <div className="d-flex align-items-center gap-4">
                <h1 className="h4 ls-tight headingColor ">Expenses</h1>
              </div>
            </div>
            <div className="col-auto">
              <div className="hstack gap-2 justify-content-end">
                <Link to="/expenses/add">
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
                  <th scope="col" className="text-center">
                    Expense Account
                  </th>
                  <th scope="col" className="text-center">
                    Spend On
                  </th>
                  <th scope="col" className="text-center">
                    Paid Through
                  </th>
                  <th scope="col" className="text-center">
                    Amount
                  </th>
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
                    <td className="text-center">{data.expenseAcc}</td>
                    <td className="text-center">{data.spendOn}</td>
                    <td className="text-center">{data.paidThrough}</td>
                    <td className="text-center">{data.amount}</td>
                    <td className="text-center">
                      <div className="gap-2">
                        <Link to={`/expenses/view/${data.id}`}>
                          <button className="btn btn-light btn-sm  shadow-none border-none">
                            View
                          </button>
                        </Link>
                        <Link to={`/expenses/edit/${data.id}`} className="px-2">
                          <button className="btn btn-light  btn-sm shadow-none border-none">
                            Edit
                          </button>
                        </Link>
                        <DeleteModel
                          path={`/deleteTxnExpenses/${data.id}`}
                          onSuccess={refreshData}
                        />
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
    )}
    </div>
  );
};

export default Expenses;
