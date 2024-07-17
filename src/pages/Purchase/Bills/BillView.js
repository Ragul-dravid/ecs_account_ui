import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Logo from "../../../assets/AccountsLogo.png"
import { IoCloudDownloadSharp } from "react-icons/io5";
import { FaTelegramPlane } from "react-icons/fa";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import fetchAllVendorNameWithIds from "../../List/VendorList";
import fetchAllItemWithIds from "../../List/ItemList";

const BillView = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [datas, setDatas] = useState(null);

  useEffect(() => {
    const fetchBill = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/getTxnBillById/${id}`);
        setDatas(response.data);
      } catch (error) {

        toast.error("Error fetching data: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBill();
  }, [id]);

  const fetchData = async () => {
    try {
      const customerData = await fetchAllVendorNameWithIds();
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

  const customer = (id) => {
    const name = customerData.find((item) => (item.id === id))
    return name?.contactName
  }
  const itemName = (id) => {
    const name = items.find((item) => (item.id == id))
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
                    <h1 className="h4 ls-tight headingColor">View Bill</h1>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="hstack gap-2 justify-content-start">
                    <Link to="/bills">
                      <button type="submit" className="btn btn-sm btn-light">
                        <span>Back</span>
                      </button>
                    </Link>
                    <button type="submit" className="btn btn-button rounded-pill p-2">
                      <FaTelegramPlane size={18} />
                    </button>
                    <button type="submit" className="btn btn-button rounded-pill p-2">
                      <IoCloudDownloadSharp size={18} />
                    </button>
                    <Link to="/bills/view/recordpaymentmade">
                      <button type="submit" className="btn btn-button rounded">
                        Record Payment
                      </button>
                    </Link>
                    <button type="submit" className="btn btn-button rounded">
                      Clone
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card shadow border-0 mb-2 minHeight">
            <div className="container-fluid mt-5">
              <div className="row mt-4 p-3">
                <div className="col-md-6 col-12 ">
                  <div className=" d-flex align-items-center">
                    <img src={Logo} alt="" width={130} />

                  </div>
                  <div className="">
                  </div>
                  <p>Cloud ECS Infotech Pte Ltd</p>
                  <p>Anna Salai,</p>
                  <p>Chennai-600002,</p>
                  <p>Tamil Nadu</p></div>

                <div className="col-md-6 col-12 d-flex flex-column align-items-end pt-5">
                  <h5>BILL</h5>
                  <p>#BI-018</p>
                </div>
              </div>
              <div className="row mt-2 p-3">
                <div className="mt-5 mb-2">
                  <h3>Bill To</h3>
                </div>
                <div className="col-md-6 col-12">
                  <p className="text-info">
                  {customer(datas.vendorId) || ""}
                  </p>
                  <p>Purasaiwalkam,</p>
                  <p>Chennai-600002</p>
                  <p>Tamil Nadu</p>
                </div>
                <div className="col-md-6 col-12 text-end">
                  <div className="row my-3">
                    <div className="col-6 d-flex justify-content-end align-items-center">
                      <p className="text-sm">
                        <b>Bill Date</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">: {datas.date?.split("-").reverse().join("-")}</p>
                    </div>
                  </div>
                  <div className="row my-3">
                    <div className="col-6 d-flex justify-content-end align-items-center">
                      <p className="text-sm">
                        <b>reference #</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">: {datas.reference}</p>
                    </div>
                  </div>
                  <div className="row my-3">
                    <div className="col-6 d-flex justify-content-end align-items-center">
                      <p className="text-sm">
                        <b>Due Date</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">: {datas.dueDate?.split("-").reverse().join("-")}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 mb-2">
                  <h3>subject :</h3>
                </div>
                <div className="col-md-6 col-12 my-2">
                  <p>Full Stack Developer Training program</p>
                </div>
                <div className="">
                  <h3 style={{ background: "#4066D5" }} className="text-light p-2">
                    Item Table
                  </h3>
                </div>
                <div className="table-responsive">
                  <table class="table  ">
                    <thead>
                      <tr>
                        <th scope="col">S.NO</th>
                        <th scope="col">ITEM DETAILS</th>
                        <th scope="col">QUANTITY</th>
                        <th scope="col">RATE</th>
                        <th scope="col">DISCOUNT</th>
                        <th scope="col">TAX</th>
                        <th scope="col">AMOUNT</th>
                      </tr>
                    </thead>
                    <tbody class="table-group">
                      {datas &&
                        datas.billItemsModels &&
                        datas.billItemsModels.map((item, index) => (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{itemName(item.item)}</td>
                            <td>{item.qty}</td>
                            <td>{item.price}</td>
                            <td>{item.discount}</td>
                            <td>{item.taxRate}</td>
                            <td>{item.amount}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="row mt-5 p-3">
                <div className="col-md-6 col-12">
                  <h5 className="fw-bolder my-2">Notes</h5>
                  <p className="my-3"></p>
                  <h5 className="fw-bolder my-2">{datas.notes || "Terms & Conditions."}</h5>
                  <h3>Terms & Conditions</h3>
                  <p className="fw-small">
                    {datas.termsConditions ||
                      "Payment is due upon receipt of the invoice unless otherwise agreed upon in writing."}
                  </p>
                </div>
                <div className="col-md-6 col-12 card shadow border-2 h-40 d-flex justify-content-center gap-5 ">
                  <div className="row text-center">
                    <div className="col-6 ">
                      <p>Sub Total</p>
                    </div>
                    <div className="col-6">: {datas.subTotal}</div>
                  </div>
                  <div className="row text-center">
                    <div className="col-6">
                      <p>Total Tax</p>
                    </div>
                    <div className="col-6">: {datas.tax}</div>
                  </div>
                  <div className="row text-center">
                    <div className="col-6">
                      <p>Total (₹)</p>
                    </div>
                    <div className="col-6">: {datas.total}</div>
                  </div>
                </div>
                <div className="col-12 my-5">
                  <p className="fw-bolder">Authorized Signature ___________________</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillView;
