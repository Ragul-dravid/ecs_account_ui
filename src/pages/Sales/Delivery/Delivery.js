import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import DeleteModel from "../../../components/common/DeleteModel";
import api from "../../../config/URL";
import toast from "react-hot-toast";

const Delivery = () => {
  const [datas, setDatas] = useState();
  const [loading, setLoading] = useState(true);
  const [customerData, setCustomerData] = useState([]);
  const tableRef = useRef(null);

  const getData = async () => {
    try {
      const response = await api.get("/getAllTxnDeliveryChallans");
      if (response.status === 200) {
        setDatas(response.data);
        setLoading(false);
      }
    } catch (e) {
      toast.error("Error fetching dat: ", e?.response?.data?.message);
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
  const refreshData = async () => {
    destroyDataTable();
    setLoading(true);
    try {
      const response = await api.get("/getAllTxnDeliveryChallans");
      setDatas(response.data);
      initializeDataTable(); // Reinitialize DataTable after successful data update
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
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

  const fetchCustamerData = async () => {
    try {
      const response = await api.get("getAllCustomerWithIds");
      setCustomerData(response.data);
    } catch (error) {
      toast.error("Error fetching tax data:", error);
    }
  };

  useEffect(() => {
    getData();
    fetchCustamerData();
  }, []);

  const customer = (id) => {
    const name = customerData.find((item) => item.id === id);
    return name?.contactName;
  };
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
                    <h1 className="h4 ls-tight headingColor ">
                      Delivery Challans
                    </h1>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="hstack gap-2 justify-content-end">
                    <Link to="/delivery/add">
                      <button type="submit" className="btn btn-sm btn-button">
                        <span>
                          Add <FaPlus className="pb-1" />
                        </span>
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
                    <th scope="col" className="text-center">
                      CUSTOMER NAME
                    </th>
                    <th scope="col" className="text-center">
                      REFERENCE
                    </th>
                    <th scope="col" className="text-center">
                      Challan Type
                    </th>
                    <th scope="col" className="text-center">
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {datas?.map((data, index) => (
                    <tr key={index}>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">{customer(data.customerId)}</td>

                      <td className="text-center">{data.reference}</td>
                      <td className="text-center">{data.challanType}</td>
                      <td className="text-center">
                        <div className="gap-2">
                          <Link to={`/delivery/view/${data.id}`}>
                            <button className="btn btn-light btn-sm  shadow-none border-none">
                              View
                            </button>
                          </Link>
                          <Link
                            to={`/delivery/edit/${data.id}`}
                            className="px-2"
                          >
                            <button className="btn btn-light  btn-sm shadow-none border-none">
                              Edit
                            </button>
                          </Link>
                          <DeleteModel onSuccess={refreshData}
                            path={`/deleteTxnDeliveryChallans/${data.id}` }
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

export default Delivery;
