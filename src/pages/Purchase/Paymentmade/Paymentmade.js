import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";

import DeleteModel from "../../../components/common/DeleteModel";
import api from "../../../config/URL";
import toast from "react-hot-toast";
// import DeleteModel from "../../components/common/DeleteModel";

const Paymentmade = () => {
  const tableRef = useRef(null);
  const [datas, setDatas] = useState();
  const [loading, setLoading] = useState(true);

  const refreshData = async () => {
    destroyDataTable();
    setLoading(true);
    try {
      const response = await api.get("bill-payment-made");
      setDatas(response.data);
      initializeDataTable(); // Reinitialize DataTable after successful data update
    } catch (error) {
      console.error("Error refreshing data:", error.message);
    }
    setLoading(false);
  };

  const getData = async () => {
    try {
      const response = await api.get("bill-payment-made");
      if (response.status === 200) {
        setDatas(response.data);
        setLoading(false);
      }
    } catch (e) {
      toast.error("Error fetching data: ", e?.response?.data?.message);
    }
  };

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
    <div className="container-fluid minHeight px-2">
      <div className="card shadow border-0 my-2">
        <div className="container-fluid py-4">
          <div className="row align-items-center justify-content-between ">
            <div className="col">
              <div className="d-flex align-items-center gap-4">
                <h1 className="h4 ls-tight headingColor ">Payment Made</h1>
              </div>
            </div>
            <div className="col-auto">
              <div className="hstack gap-2 justify-content-end">
               
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
                <th scope="col">DATE</th>
                <th scope="col">PAYMENT NUMBER</th>
                <th scope="col">REFERENCE NUMBER</th>
                <th scope="col">VENDOR NUMBER</th>
                {/* <th scope="col">BILL NUMBER</th>
                <th scope="col">AMOUNT</th>
                <th scope="col">MODE</th> */}
                <th scope="col" className="text-center">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {datas?.map((data, index) => (
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{data.paymentDate}</td>
                  <td className="text-center">{data.paymentNumber}</td>
                  <td className="text-center">{data.reference}</td>
                  <td className="text-center">{data.paymentNumber}</td>
                  {/* <td className="text-center">{data.billNumber}</td>
                  <td className="text-center">{data.amount}</td>
                  <td className="text-center">{data.mode}</td> */}
                  <td>
                    <div>
                      <Link to="/paymentmade/view" className="px-2">
                      <button className="btn btn-light btn-sm  shadow-none border-none">
                          View
                        </button>
                      </Link>
                     
                      <DeleteModel
                       path={`/deleteTxnBillPaymentMade/${data.id}`}
                       onSuccess={refreshData}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
        <div className="card-footer border-0 py-5"></div>
      </div>
    )}
    </div>
    
  );
};

export default Paymentmade;
