import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import DeleteModel from "../../../components/common/DeleteModel";
import api from "../../../config/URL";
import { FaPlus } from "react-icons/fa6";
import toast from "react-hot-toast";
import fetchAllCustomerWithIds from "../../List/CustomerList";

const PaymentReceived = () => {
  const tableRef = useRef(null);
  const [customerData, setCustomerData] = useState(null);
  const [datas, setDatas] = useState();
  const [loading, setLoading] = useState(true);

  const refreshData = async () => {
    destroyDataTable();
    setLoading(true);
    try {
      const response = await api.get("/getAllTxnPaymentsReceived");
      setDatas(response.data);
      initializeDataTable(); // Reinitialize DataTable after successful data update
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };
  const getPaymentData = async () => {
    try {
      const response = await api.get("/getAllTxnPaymentsReceived");
      if (response.status === 200) {
        setDatas(response.data);
        setLoading(false);
      }
    } catch (e) {
      toast.error("Error fetching data: ", e);
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
    getPaymentData();
  }, []);
  const fetchData = async () => {
    try {
      const customerData = await fetchAllCustomerWithIds();
      setCustomerData(customerData);
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const customer =(id)=>{
    const name= customerData?.find((item)=>(item.id === id))
    return name?.contactName
  }
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
                <h1 className="h4 ls-tight headingColor ">Payment Received</h1>
              </div>
            </div>
            <div className="col-auto">
              <div className="hstack gap-2 justify-content-end">
                <Link to="/paymentReceived/add">
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
                  CUSTOMER NAME
                </th>
                <th scope="col" className="text-center">
                  PAYMENT DATE
                </th>
                {/* <th scope="col" className="text-center">
                  PAYMENT NUMBER
                </th> */}
                <th scope="col" className="text-center">
                  REFERENCE NUMBER
                </th>
                
                {/* <th scope="col" className="text-center">
                  INVOICE NUMBER
                </th> */}
                <th scope="col" className="text-center">
                  AMOUNT
                </th>
                {/* <th scope="col" className="text-center">
                  MODE
                </th> */}
                <th scope="col" className="text-center">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {datas?.map((data, index) => (
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{customer(data.customerName)}</td>
                  <td className="text-center">
                    {data?.paymentDate.split('-').reverse().join('-')}
                  </td>

                  {/* <td className="text-center">{data.paymentNumber}</td> */}
                  <td className="text-center">{data.reference}</td>
                  {/* <td className="text-center">{data.invoiceNumber}</td> */}
                  <td className="text-center">{data.amountReceived}</td>
                  {/* <td className="text-center">{data.mode}</td> */}
                  <td className="text-center">
                    <div>
                      <Link
                        to={`/paymentReceived/view/${data.id}`}
                        className="px-2"
                      >
                        <button className="btn btn-light btn-sm  shadow-none border-none">
                          View
                        </button>
                      </Link>
                      <DeleteModel
                        path={`/deleteTxnPaymentsReceived/${data.id}`}
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

export default PaymentReceived;
