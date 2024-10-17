import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import DeleteModel from "../../../components/common/DeleteModel";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import fetchAllVendorNameWithIds from "../../List/VendorList";

const RecurringBill = () => {
  const tableRef = useRef(null);
  const [datas, setDatas] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const [vendorData, setVendorData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await api.get("recurring-bill");
        setDatas(response.data);
      } catch (error) {
        toast.error("Error fetching data: ", error?.response?.data?.message);
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
      const response = await api.get("recurring-bill");
      setDatas(response.data);
      initializeDataTable();
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setLoading(false);
    }
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

  const vendorName =(id)=>{
    const name= vendorData.find((item)=>(item.id === id))
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
                  <h1 className="h4 ls-tight headingColor ">Recurring Bill</h1>
                </div>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-end">
                  <Link to="/recurringbill/add">
                    <button type="submit" className="btn btn-sm btn-button">
                      <span>
                        Add <FaPlus />
                      </span>
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
                    Vendor NAME
                  </th>
                  <th scope="col" className="text-center">
                    TRANSACTION EVERY{" "}
                  </th>
                  <th scope="col" className="text-center">
                    TRANSACTION EVERY N0
                  </th>
                  <th scope="col" className="text-center">
                    Bill Date
                  </th>
                  {/* <th scope="col" className="text-center">INVOICE DATE</th> */}
                  <th scope="col" className="text-center">
                    AMOUNT
                  </th>
                  <th scope="col" className="text-center">
                    STATUS
                  </th>
                  {/* <th scope="col" className="text-center">
                        ACTION
                      </th> */}
                </tr>
              </thead>
              <tbody>
                {datas?.map((data, index) => (
                  <tr key={index}>
                    <td className="text-start">{index + 1}</td>
                    <td className="text-start">
                      {vendorName(data.vendorId)}
                    </td>
                    <td className="text-start">{data.transactionEvery}</td>
                    <td className="text-start">{data.transactionEveryNo}</td>
                    <td className="text-start">
                      {data?.billDate?.split("-").reverse().join("-")}
                    </td>
                    {/* <td className="text-start">{data.invoiceDate}</td> */}
                    <td className="text-start">{data.totalAmount}</td>
                    <td className="text-center">
                      <div className="gap-2">
                        <Link to={`/recurringbill/view/${data.id}`}>
                          <button className="btn btn-light btn-sm  shadow-none border-none">
                            View
                          </button>
                        </Link>
                        <Link
                          to={`/recurringbill/edit/${data.id}`}
                          className="px-2"
                        >
                          <button className="btn btn-light  btn-sm shadow-none border-none">
                            Edit
                          </button>
                        </Link>
                        <DeleteModel
                          onSuccess={refreshData}
                          path={`/deleteTxnRecurringBill/${data.id}`}
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

export default RecurringBill;
