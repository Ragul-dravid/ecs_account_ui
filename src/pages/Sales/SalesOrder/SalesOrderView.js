import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Logo from "../../../assets/AccountsLogo.png";
import toast from "react-hot-toast";
import api from "../../../config/URL";

function SalesOrderView() {
  const { id } = useParams();
  const [salesOrder, setSalesOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalesOrder = async () => {
      try {
        const response = await api.get(`/getTxnSalesOrderById/${id}`);
        setSalesOrder(response.data);
      } catch (error) {
        setError(error.message || "Failed to fetch data");
        toast.error("Error fetching data: " + error.message);
      }
    };

    fetchSalesOrder();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container-fluid px-2 minHeight">
      <div className="card shadow border-0 mb-2 top-header">
        <div className="container-fluid py-4">
          <div className="row align-items-center">
            <div className="col">
              <div className="d-flex align-items-center gap-4">
                <h1 className="h4 ls-tight headingColor">View Sales Order</h1>
              </div>
            </div>
            <div className="col-auto">
              <div className="hstack gap-2 justify-content-start">
                <Link to="/salesorder">
                  <button type="button" className="btn btn-light btn-sm me-1">
                    <span>Back</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card shadow border-0 mb-2 minHeight">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-12">
              <div className="d-flex justify-content-center flex-column align-items-start">
                <div className="d-flex">
                  <img
                    src={Logo}
                    alt="Company Logo"
                    className="mt-3"
                    width={130}
                  />
                </div>
                <p className="fw-small mt-2">
                  Cloud ECS Infotech Pte Ltd
                  <br />
                  Anna Salai
                  <br />
                  Chennai - 600002,
                  <br />
                  Tamil Nadu
                </p>
              </div>
            </div>
            <div className="col-md-6 col-12 d-flex justify-end flex-column align-items-end mt-2">
              {salesOrder && (
                <>
                  <h1>SALES ORDER</h1>
                  <h3>{salesOrder.salesOrder || "--"}</h3>
                  <span className="text-muted mt-4">Order Date</span>
                  <h3>{salesOrder.orderDate || "N/A"}</h3>
                </>
              )}
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-6 col-12">
              <div className="d-flex justify-content-center flex-column align-items-start">
                {salesOrder && (
                  <>
                    <h3>Customer Details</h3>
                    <span style={{ color: "#2196f3" }}>
                      {salesOrder.customerName || ""}
                    </span>
                    <p className="fw-small">
                      {salesOrder.customerAddress || "Address not available"}
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="col-md-6 col-12 text-end">
              <div className="row mb-2 d-flex justify-content-end align-items-end">
                {salesOrder && (
                  <>
                    <div className="col-6">
                      <p className="text-sm">
                        <b>Shipment Date</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        {salesOrder.shipmentDate || "N/A"}
                      </p>
                    </div>
                  </>
                )}
              </div>
              <div className="row mb-2 d-flex justify-content-end align-items-end">
                {salesOrder && (
                  <>
                    <div className="col-6">
                      <p className="text-sm">
                        <b>Payment Terms</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        {salesOrder.paymentTerms || "N/A"}
                      </p>
                    </div>
                  </>
                )}
              </div>
              <div className="row mb-2 d-flex justify-content-end align-items-end">
                {salesOrder && (
                  <>
                    <div className="col-6">
                      <p className="text-sm">
                        <b>Reference</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        {salesOrder.reference || "N/A"}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <h3 style={{ background: "#4066D5" }} className="text-light p-2">
              Item Table
            </h3>

            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">S.NO</th>
                    <th scope="col">ITEM </th>
                    <th scope="col">QUANTITY</th>
                    <th scope="col">RATE</th>
                    <th scope="col">DISCOUNT</th>
                    <th scope="col">TAX</th>
                    <th scope="col">AMOUNT</th>
                  </tr>
                </thead>
                <tbody className="table-group">
                  {salesOrder &&
                    salesOrder.txnSalesOrderItemsModels &&
                    salesOrder.txnSalesOrderItemsModels.map((item, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.item}</td>
                        <td>{item.qty}</td>
                        <td>{item.rate}</td>
                        <td>{item.discount}</td>
                        <td>{item.tax}</td>
                        <td>{item.amount}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="col-md-6 col-12"></div>
            <div className="col-md-6 col-12">
              {salesOrder && (
                <>
                  <div className="row mb-3 mt-2">
                    <label className="col-sm-6 col-form-label">Sub Total</label>
                    <div className="col-sm-6">
                      ₹{salesOrder.subTotal || "0"}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-sm-6 col-form-label">Discount</label>
                    <div className="col-sm-6">
                      ₹{salesOrder.discount || "0"}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-sm-6 col-form-label">Total</label>
                    <div className="col-sm-6">₹{salesOrder.total || "0"}</div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="row mt-5">
            {salesOrder && (
              <>
                <div className="col-md-6 col-12">
                  <div className="d-flex justify-content-center flex-column align-items-start">
                    <h3>Terms & Conditions</h3>
                    <p className="fw-small">
                      {salesOrder.termsConditions ||
                        "Payment is due upon receipt of the invoice unless otherwise agreed upon in writing."}
                    </p>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="d-flex justify-content-center flex-column align-items-start">
                    <h3>Customer Notes</h3>
                    <p className="fw-small">{salesOrder.cusNotes || ""}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesOrderView;