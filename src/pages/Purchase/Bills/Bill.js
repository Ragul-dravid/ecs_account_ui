import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye, FaEdit, FaPlus } from "react-icons/fa";
import DeleteModel from "../../../components/common/DeleteModel";
import api from "../../../config/URL";
import fetchAllVendorNameWithIds from "../../List/VendorList";
import toast from "react-hot-toast";
// import DeleteModel from "../../components/common/DeleteModel";

const Bills = () => {
  const tableRef = useRef(null);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vendorData, setVendorData] = useState([]);
  console.log("datas", datas)

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get("bill");
        setDatas(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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
      const response = await api.get("bill");
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
  const fetchData = async () => {
    try {
      const vendorData = await fetchAllVendorNameWithIds();
      setVendorData(vendorData);
    } catch (error) {
      toast.error(error);
    }
  };

  const vendorName = (id) => {
    const name = vendorData.find((item) => (item.id === id))
    return name?.contactName
  }
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
                    <h1 className="h4 ls-tight headingColor ">Bills</h1>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="hstack gap-2 justify-content-end">
                    <Link to="/bills/add">
                      <button type="submit" className="btn btn-sm btn-button">
                        <span cla>Add <FaPlus className="pb-1" /></span>
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
                    <th scope="col" className="text-center">VENDOR NAME</th>
                    <th scope="col" className="text-center">DATE</th>
                    {/* <th scope="col">BILLS NUMBER</th> */}
                    {/* <th scope="col">REFERENCE NUMBER</th> */}
                    {/* <th scope="col">BALANCE DUE</th> */}
                    <th scope="col" className="text-center">AMOUNT</th>
                    <th scope="col" className="text-center">REFERENCE</th>
                    <th scope="col" className="text-center">
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {datas.map((data, index) => (
                    <tr key={index}>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">{vendorName(data.vendorId)}</td>
                      <td className="text-center">{data.date}</td>
                      {/* <td className="text-center">{data.billsNumber}</td>
                  <td className="text-center">{data.referenceNumber}</td>
                  <td className="text-center">{data.balanceDue}</td> */}
                      <td className="text-center">{data.total}</td>
                      <td className="text-center">{data.reference}</td>
                      {/* <td>
                    {data.status === "Paid" ? (
                      <span className="badge badge-lg badge-dot">
                        <i className="bg-success"></i>Paid
                      </span>
                    ) : data.status === "Pending" ? (
                      <span className="badge badge-lg badge-dot">
                        <i className="bg-warning"></i>Pending
                      </span>
                    ) : data.status === "Off Paid" ? (
                      <span className="badge badge-lg badge-dot">
                        <i className="bg-dark"></i>Off Paid
                      </span>
                    ) : (
                      <span className="badge badge-lg badge-dot">
                        <i className="bg-dark"></i>Due
                      </span>
                    )}
                  </td> */}

                      <td className="text-center">
                        <div>
                          <Link to={`/bills/view/${data.id}`}>
                            <button className="btn btn-light btn-sm  shadow-none border-none">
                              View
                            </button>
                          </Link>
                          <Link to={`/bills/edit/${data.id}`} className="px-2">
                            <button className="btn btn-light  btn-sm shadow-none border-none">
                              Edit
                            </button>
                          </Link>
                          <DeleteModel onSuccess={refreshData} path={`/deleteTxnBill/${data.id}`} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>


              <div className="card-footer border-0 py-5"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bills;
