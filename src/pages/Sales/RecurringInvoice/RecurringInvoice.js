import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import DeleteModel from "../../../components/common/DeleteModel";
import api from "../../../config/URL"
import toast from "react-hot-toast";

const RecurringInvoice = () => {
    const tableRef = useRef(null);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customerData, setCustomerData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get("/getAllTxnRecurringInvoice");
        setDatas(response.data);
        fetchCustamerData();
        console.log("object",response.data)
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();  
  }, []);
  
  const fetchCustamerData = async () => {
    try {
      const response = await api.get("getAllCustomerWithIds");
      setCustomerData(response.data);
    } catch (error) {
      toast.error("Error fetching tax data:", error);
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

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
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

  const refreshData = async () => {
    destroyDataTable();
    setLoading(true);
    try {
      const response = await api.get("/getAllTxnRecurringInvoice");
      setDatas(response.data);
      initializeDataTable();
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
      setLoading(false);  
  };

  useEffect(() => {
    const table = $(tableRef.current).DataTable();
    return () => {
      table.destroy();
    };
  }, []);

  const customer =(id)=>{
    const name= customerData.find((item)=>(item.id == id))
    return name?.contactName
  }
  
    return (
        <div className="container-fluid px-2 minHeight">
          {loading ? (
            <div className="loader-container">
              <div class="loading">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          ) : (
            <div className="card shadow border-0 my-2">
              <div className="container-fluid py-4">
                <div className="row align-items-center justify-content-between ">
                  <div className="col">
                    <div className="d-flex align-items-center gap-4">
                      <h1 className="h4 ls-tight headingColor ">Invoice</h1>
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="hstack gap-2 justify-content-end">
                      <Link to="/recurringinvoice/add">
                        <button type="submit" className="btn btn-sm btn-button">
                          <span>Add <FaPlus /></span>
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
                      <th scope="col" className="text-center">CUSTOMER NAME</th>
                      <th scope="col" className="text-center">TRANSACTION EVERY </th>
                      <th scope="col" className="text-center">TRANSACTION EVERY N0</th>
                      <th scope="col" className="text-center">INVOICE FORM</th>
                      {/* <th scope="col" className="text-center">INVOICE DATE</th> */}
                      <th scope="col" className="text-center">AMOUNT</th>
                      <th scope="col" className="text-center">STATUS</th>
                      {/* <th scope="col" className="text-center">
                        ACTION
                      </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {datas.map((data, index) => (
                      <tr key={index}>
                        <td className="text-start">{index + 1}</td>
                        <td className="text-start">{customer(data.customerId)}</td>
                        <td className="text-start">{data.transactionEvery}</td>
                        <td className="text-start">{data.transactionEveryNo}</td>
                        <td className="text-start">{data.invoiceFrom}</td>
                        {/* <td className="text-start">{data.invoiceDate}</td> */}
                        <td className="text-start">{data.totalAmount}</td>
                        <td className="text-center">
                          <div className="gap-2">
                            <Link to={`/recurringinvoice/view/${data.id}`}>
                              <button className="btn btn-light btn-sm  shadow-none border-none">
                                View
                              </button>
                            </Link>
                            <Link to={`/recurringinvoice/edit/${data.id}`} className="px-2">
                              <button className="btn btn-light  btn-sm shadow-none border-none">
                                Edit
                              </button>
                            </Link>
                            <DeleteModel
                              onSuccess={refreshData}
                              path={`/deleteTxnRecurringInvoice/${data.id}`}
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
          )}
        </div>
      );
}

export default RecurringInvoice
