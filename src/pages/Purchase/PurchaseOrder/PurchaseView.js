import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Logo from "../../../assets/AccountsLogo.png";
import { IoCloudDownloadSharp } from "react-icons/io5";
import { FaTelegramPlane } from "react-icons/fa";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import fetchAllItemWithIds from "../../List/ItemList";
import fetchAllVendorNameWithIds from "../../List/VendorList";
import 'jspdf-autotable'
import GeneratePdf from "../../GeneratePdf";

const PurchaseView = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [vendorData, setVendorData] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("invoice", data)
  useEffect(() => {
    const fetchPurchase = async () => {
      setLoading(true);
      try {
        const response = await api.get(`purchase-order/${id}`);
        setData(response.data);
      } catch (error) {
        toast.error("Error Fetching Data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    fetchPurchase();
  }, [id]);

  const fetchData = async () => {
    try {
      const vendorData = await fetchAllVendorNameWithIds();
      const itemData = await fetchAllItemWithIds();
      setVendorData(vendorData);
      setItems(itemData);
    } catch (error) {
      toast.error(error);
    }
  };

  const vendorName = (id) => {
    const name = vendorData.find((item) => (item.id === id))
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
          <div class="Loader-Div">
            <svg id="triangle" width="50px" height="50px" viewBox="-3 -4 39 39">
              <polygon fill="transparent" stroke="blue" stroke-width="1.3" points="16,0 32,32 0,32"></polygon>
            </svg>
          </div>
        </div>
      ) : (
        <div className="container-fluid px-2 minHeight">
          <div className="card shadow border-0 mb-2 top-header">
            <div className="container-fluid py-4">
              <div className="row align-items-center">
                <div className="col">
                  <div className="d-flex align-items-center gap-4">
                    <h1 className="h4 ls-tight headingColor">View Purchase</h1>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="hstack gap-2 justify-content-start">
                    <Link to="/purchase">
                      <button type="submit" className="btn btn-sm btn-light">
                        <span>Back</span>
                      </button>
                    </Link>
                    <button
                      type="submit"
                      className="btn btn-button rounded-pill p-2"
                    >
                      <FaTelegramPlane size={18} />
                    </button>
                    <button
                      className="btn btn-button rounded-pill p-2"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <IoCloudDownloadSharp size={18} className="mx-1 text-white fs-5" />
                    </button>
                    <ul className="dropdown-menu">
                      <li
                        className="dropdown-item"
                        onClick={() => GeneratePdf("download", data, { name: "PURCHASE" })}
                      >
                        Download PDF
                      </li>
                      <li className="dropdown-item" onClick={() => GeneratePdf("open", data, { name: "PURCHASE" })}>
                        Open PDF
                      </li>
                      <li
                        className="dropdown-item"
                        onClick={() => GeneratePdf("print", data, { name: "PURCHASE" })}
                      >
                        Print PDF
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card shadow border-0 mb-2 minHeight">
            <div className="container-fluid">
              <div className="row p-3">
                <div className="col-md-6 col-12 ">
                  <div className=" d-flex align-items-center my-2">
                    <img src={Logo} alt="" className="" width={130} />
                  </div>
                  <div className=""></div>
                  <p>Cloud ECS Infotech Pte Ltd</p>
                  <p>Anna Salai,</p>
                  <p>Chennai-600002,</p>
                  <p>Tamil Nadu</p>
                </div>

                <div className="col-md-6 col-12 d-flex flex-column align-items-end pt-5">
                  {data && (
                    <>
                      <h1>Purchase</h1>
                      <h3>{data.invoiceFrom || "--"}</h3>
                      {/* <span className="text-muted mt-4">Order Date</span>
                      <h3>{data?.invoiceDate?.split("-").reverse().join("-") || "N/A"}</h3> */}
                    </>
                  )}
                </div>
              </div>
              <div className="row mt-2 p-3">
                <div className="mt-5 mb-2">
                  <h3>Bill To</h3>
                </div>
                <div className="col-md-6 col-12">
                  <p className="text-info">{vendorName(data.vendorId)}</p>
                  <p>{data.street}</p>
                  <p>
                    {data.city}-{data.zipCode}
                  </p>
                  <p>{data.country}</p>
                </div>
                <div className="col-md-6 col-12 text-end">
                  <div className="row my-3">
                    <div className="col-6 d-flex justify-content-end align-items-center">
                      <p className="text-sm">
                        <b>Date</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data.date?.split("-").reverse().join("-")}
                      </p>
                    </div>
                  </div>
                  <div className="row my-3">
                    <div className="col-6 d-flex justify-content-end align-items-center">
                      <p className="text-sm">
                        <b>Reference</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">: {data.reference}</p>
                    </div>
                  </div>
                  <div className="row my-3">
                    <div className="col-6 d-flex justify-content-end align-items-center">
                      <p className="text-sm">
                        <b>Delivery Date</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">: {data.deliveryDate?.split("-").reverse().join("-")}</p>
                    </div>
                  </div>
                  <div className="row my-3">
                    <div className="col-6 d-flex justify-content-end align-items-center">
                      <p className="text-sm">
                        <b>Phone</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">: {data.phone}</p>
                    </div>
                  </div>
                </div>
                {/* <div className="mt-5 mb-2">
              <h3>subject :</h3>
            </div>
            <div className="col-md-6 col-12 my-2">
              <p>Full Stack Developer Training program</p>
            </div> */}
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
                        <th scope="col">ITEM</th>
                        {/* <th scope="col">Description</th> */}
                        <th scope="col">Quantity</th>
                        <th scope="col">Unit Price</th>
                        <th scope="col">Disc %</th>
                        {/* <th scope="col">Account</th> */}
                        <th scope="col">Tax Rate</th>
                        <th scope="col">AMOUNT</th>
                      </tr>
                    </thead>
                    <tbody class="table-group">
                      {data &&
                        data.purchaseOrderItemModels &&
                        data.purchaseOrderItemModels.map((item, index) => (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{itemName(item.item)}</td>
                            {/* <td>{item.description}</td> */}
                            <td>{item.qty}</td>
                            <td>{item.unitPrice}</td>
                            <td>{item.disc}</td>
                            {/* <td>{item.account}</td> */}
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
                  <h5 className="fw-bolder my-2">Attachment</h5>
                  <p className="my-3 mb-5">{data.file}</p>
                  <h5 className="fw-bolder my-2 mt-5">Delivery Instructions</h5>
                  <p className="my-3">{data.instructions}</p>
                </div>
                <div className="col-md-6 col-12 card shadow border-2 h-40 d-flex justify-content-center gap-5 ">
                  <div className="row text-center">
                    <div className="col-6 ">
                      <p>Sub Total</p>
                    </div>
                    <div className="col-6">: {data.subTotal}</div>
                  </div>
                  <div className="row text-center">
                    <div className="col-6">
                      <p>Total Tax</p>
                    </div>
                    <div className="col-6">: {data.taxTotal}</div>
                  </div>
                  <div className="row text-center">
                    <div className="col-6">
                      <p>Total (₹)</p>
                    </div>
                    <div className="col-6">: {data.total}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseView;
