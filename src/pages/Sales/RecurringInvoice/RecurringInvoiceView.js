import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import api from "../../../config/URL";
import toast from "react-hot-toast";

import Logo from "../../../assets/AccountsLogo.png";
import fetchAllCustomerWithIds from "../../List/CustomerList";
import fetchAllItemWithIds from "../../List/ItemList";

const RecurringInvoiceView = () => {
    const { id } = useParams();
    const [datas, setData] = useState([]);
    const [items, setItems] = useState([]);
    const [customerData, setCustomerData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const getData = async () => {
        setLoading(true);
        try{
        const response = await api.get(`/getTxnRecurringInvoiceById/${id}`);
        setData(response.data);
        console.log("object",datas);
        }catch(e){
          toast.error("Error fetching data: ", e?.response?.data?.message);
        }finally{
          setLoading(false);
        }
      };
      getData();
      fetchData();
    }, [id]);

    const fetchData = async () => {
      try {
        const customerData = await fetchAllCustomerWithIds();
        const itemData = await fetchAllItemWithIds();
        setCustomerData(customerData);
        setItems(itemData);
      } catch (error) {
        toast.error(error);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, [datas]);

    const customer =(id)=>{
        const name= customerData.find((item)=>(item.id === id))
        return name?.contactName
      }
    const itemName =(id)=>{
        const name= items.find((item)=>(item.id == id))
        return name?.itemName
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
          <div className="card shadow border-0 mb-2 top-header">
            <div className="container-fluid py-4">
              <div className="row align-items-center">
                <div className="col">
                  <div className="d-flex align-items-center gap-4">
                    <h1 className="h4 ls-tight headingColor">View Recurring Invoice</h1>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="hstack gap-2 justify-content-start">
                    <Link to="/recurringinvoice">
                      <button type="button" className="btn btn-light btn-sm me-1">
                        <span>Back</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card shadow border-0 mb-2 minHeight ">
            <div className="container mb-5">
              <div className="row mt-3">
                <div className="col-md-6 col-12">
                  <div className="d-flex justify-content-center flex-column align-items-start">
                    <div className="d-flex my-2">
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
                  {datas && (
                    <>
                      <h1>Recurring Invoice</h1>
                      <h3>{datas.invoiceFrom || "--"}</h3>
                      <span className="text-muted mt-4">Order Date</span>
                      <h3>{datas?.invoiceDate?.split("-").reverse().join("-") || "N/A"}</h3>
                    </>
                  )}
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-md-6 col-12">
                  <div className="d-flex justify-content-center flex-column align-items-start">
                    {datas && (
                      <>
                        <h3>Customer Details</h3>
                        <span style={{ color: "#2196f3" }}>
                          {customer(datas.customerId) || ""}
                        </span>
                        <p className="fw-small">
                          {datas.customerAddress || "Address not available"}
                        </p>
                      </>
                    )}
                  </div>
                </div>
                <div className="col-md-6 col-12 text-end">
                  <div className="row mb-2 d-flex justify-content-end align-items-end">
                    {datas && (
                      <>
                        <div className="col-6">
                          <p className="text-sm">
                            <b>Due Date</b>
                          </p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted text-sm">
                            {datas.dueDate?.split("-").reverse().join("-") || "N/A"}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="row mb-2 d-flex justify-content-end align-items-end">
                    {datas && (
                      <>
                        <div className="col-6">
                          <p className="text-sm">
                            <b>Amounts Are</b>
                          </p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted text-sm">
                            {datas.amountsAre || "N/A"}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="row mb-2 d-flex justify-content-end align-items-end">
                    {datas && (
                      <>
                        <div className="col-6">
                          <p className="text-sm">
                            <b>End Date</b>
                          </p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted text-sm">
                            {datas.endDate?.split("-").reverse().join("-") || "N/A"}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="row mt-5 ">
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
                      {datas &&
                        datas.txnRecurringInvoiceItemsModels &&
                        datas.txnRecurringInvoiceItemsModels.map((item, index) => (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{itemName(item.item)}</td>
                            <td>{item.qty}</td>
                            <td>{item.price}</td>
                            <td>{item.disc}</td>
                            <td>{item.taxRate}</td>
                            <td>{item.amount}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                <div className="col-md-6 col-12"></div>
                <div className="col-md-6 col-12">
                  {datas && (
                    <>
                      <div className="row mb-3 mt-2">
                        <label className="col-sm-6 col-form-label">Sub Total</label>
                        <div className="col-sm-6">
                          ₹{datas.subTotal || "0"}
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-6 col-form-label">Tax</label>
                        <div className="col-sm-6">
                          ₹{datas.tax || "0"}
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-6 col-form-label">Total</label>
                        <div className="col-sm-6">₹{datas.totalAmount || "0"}</div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="row mt-5 mb-5">
                {datas && (
                  <>
                    <div className="col-md-6 col-12">
                      <div className="d-flex justify-content-center flex-column align-items-start">
                        <h3>Terms & Conditions</h3>
                        <p className="fw-small">
                          {datas.termsConditions ||
                            "Payment is due upon receipt of the invoice unless otherwise agreed upon in writing."}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="d-flex justify-content-center flex-column align-items-start">
                        <h3>Customer Notes</h3>
                        <p className="fw-small">{datas.notes || ""}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
      );
}

export default RecurringInvoiceView