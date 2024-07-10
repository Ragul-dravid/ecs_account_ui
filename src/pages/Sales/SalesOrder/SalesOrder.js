import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import DeleteModel from "../../../components/common/DeleteModel";
import api from "../../../config/URL"

const SalesOrder = () => {
  const tableRef = useRef(null);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("datas",datas)

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get("/getAllTxnSalesOrder");
        setDatas(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

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
      const response = await api.get("/getAllTxnSalesOrder");
      setDatas(response.data);
      initializeDataTable(); // Reinitialize DataTable after successful data update
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
  return (
    <div>
      {loading ? (
        <div className="loader-container">
          <div class="loader">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      ) : (
        <div className="container-fluid px-2 minHeight">
        <div className="card shadow border-0 my-2">
          <div className="container-fluid py-4">
            <div className="row align-items-center justify-content-between ">
              <div className="col">
                <div className="d-flex align-items-center gap-4">
                  <h1 className="h4 ls-tight headingColor ">Sales Order</h1>
                </div>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-end">
                  <Link to="/salesorder/add">
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
            <table ref={tableRef} className="display">
              <thead className="thead-light">
                <tr>
                  <th scope="col" style={{ whiteSpace: "nowrap" }}>
                    S.NO
                  </th>
                  <th scope="col" className="text-center">Sales Person</th>
                  <th scope="col" className="text-center">Sales Order</th>
                  <th scope="col" className="text-center">CusNotes</th>
                  {/* <th scope="col" className="text-center">Reference</th>
                  <th scope="col" className="text-center">PaymentTerms</th>
                  <th scope="col" className="text-center">TermsConditions</th> */}
                  <th scope="col" className="text-center">STATUS</th>
                  <th scope="col" className="text-center">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody>
                {datas.map((data, index) => (
                  <tr key={index}>
                    <td className="text-start">{index + 1}</td>
                    <td className="text-start">{data.salesPerson}</td>
                    <td className="text-start">{data.salesOrder}</td>
                    <td className="text-start">{data.cusNotes}</td>
                    {/* <td className="text-start">{data.reference}</td>
                    <td className="text-start">{data.paymentTerms}</td>
                    <td className="text-start">{data.termsConditions}</td> */}
                    <td className="text-start">
                      {data.status === "PAID" ? (
                        <span className="badge badge-lg badge-dot">
                          <i className="bg-success"></i>Paid
                        </span>
                      ) : data.status === "PENDING" ? (
                        <span className="badge badge-lg badge-dot">
                          <i className="bg-warning"></i>PENDING</span>
                      ) : (
                        <span className="badge badge-lg badge-dot">
                          <i className="bg-dark"></i>PARTLY PAID</span>
                      )}
                    </td>
                    <td className="text-center">
                      <div className="gap-2">
                        <Link to={`/salesorder/view/${data.id}`}>
                          <button className="btn btn-light btn-sm  shadow-none border-none">
                            View
                          </button>
                        </Link>
                        <Link to={`/salesorder/edit/${data.id}`} className="px-2">
                          <button className="btn btn-light  btn-sm shadow-none border-none">
                            Edit
                          </button>
                        </Link>
                        <DeleteModel
                          onSuccess={refreshData}
                          path={`/deleteTxnSalesOrder/${data.id}`}
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

export default SalesOrder;
