import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import DeleteModel from "../../../components/common/DeleteModel";
import api from "../../../config/URL";
import toast from "react-hot-toast";


const Estimates = () => {
  const tableRef = useRef(null);
  // const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customerData, setCustomerData] = useState([]);
  console.log("object",customerData)
  const getData = async () => {
    try {
      const response = await api.get("/getAllTxnQuotes");
      setCustomerData(response.data);
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

  const customer =(id)=>{
    const name= customerData.find((item)=>(item.id === id))
    return name?.customerName
  }

  const refreshData = async () => {
    destroyDataTable();
    setLoading(true);
    try {
      const response = await api.get("/getAllTxnQuotes");
      setDatas(response.data);
      initializeDataTable();
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!loading) {
      initializeDataTable();
    }
    return () => {
      destroyDataTable();
    };
  }, [loading]);

  const contactName =(id)=>{
    const name= customerData.find((item)=>(item.id === id))
    return name?.contactName
  }
  
  useEffect(() => {
    getData();
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
                <h1 className="h4 ls-tight headingColor ">Estimates</h1>
              </div>
            </div>
            <div className="col-auto">
              <div className="hstack gap-2 justify-content-end">
                <Link to="/estimates/add">
                  <button type="submit" className="btn btn-sm btn-button">
                    <span>Add <FaPlus className="pb-1" /></span>
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
                <th scope="col" className="text-center">ESTIMATE DATE</th>
                <th scope="col" className="text-center">EXPIRY DATE</th>
                <th scope="col" className="text-center">QUOTE NUMBER</th>
                <th scope="col" className="text-center">REFERENCE</th>
                <th scope="col" className="text-center">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {datas?.map((data, index) => (
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{customer(data.id)}</td>
                  <td className="text-center">
                    {new Date(data.issueDate).toLocaleDateString('en-GB')}
                  </td>
                  <td className="text-center">
                    {new Date(data.expiryDate).toLocaleDateString('en-GB')}
                  </td>


                  <td className="text-center">{data.quoteNumber}</td>
                  <td className="text-center">{data.reference}</td>
                  <td className="text-center">
                    <div className="gap-2">
                      <Link to={`/estimates/view/${data.id}`}>
                        <button className="btn btn-light btn-sm  shadow-none border-none">
                          View
                        </button>
                      </Link>
                      <Link to={`/estimates/edit/${data.id}`} className="px-2">
                        <button className="btn btn-light  btn-sm shadow-none border-none">
                          Edit
                        </button>
                      </Link>
                      <DeleteModel
                        onSuccess={refreshData}
                        path={`/deleteTxnQuotes/${data.id}`}
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
  )
}

export default Estimates
