import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Logo from "../../../assets/AccountsLogo.png";
import { IoCloudDownloadSharp } from "react-icons/io5";
import { FaTelegramPlane } from "react-icons/fa";
import api from "../../../config/URL";
import toast from "react-hot-toast";

const PurchaseView = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPurchase = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/getTxnPurchaseOrderById/${id}`);
        setData(response.data);
      } catch (error) {
        toast.error("Error Fetching Data", error);
      }finally{
        setLoading(false);
      }
    };
    fetchPurchase();
  }, [id]);

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
                  type="submit"
                  className="btn btn-button rounded-pill p-2"
                >
                  <IoCloudDownloadSharp size={18} />
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
                <img src={Logo} alt="" className="mt-3" width={130} />
              </div>
              <div className=""></div>
              <p>Cloud ECS Infotech Pte Ltd</p>
              <p>Anna Salai,</p>
              <p>Chennai-600002,</p>
              <p>Tamil Nadu</p>
            </div>

            <div className="col-md-6 col-12 d-flex flex-column align-items-end pt-5">
              <h5>Order Number</h5>
              <p>{data.orderNumber}</p>
            </div>
          </div>
          <div className="row mt-2 p-3">
            <div className="mt-5 mb-2">
              <h3>Bill To</h3>
            </div>
            <div className="col-md-6 col-12">
              <p className="text-info">{data.vendorName}</p>
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
                    : {data.date}
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
                  <p className="text-muted text-sm">: {data.deliveryDate}</p>
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
                    <th scope="col">Description</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Unit Price</th>
                    <th scope="col">Disc %</th>
                    <th scope="col">Account</th>
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
                        <td>{item.item}</td>
                        <td>{item.description}</td>
                        <td>{item.qty}</td>
                        <td>{item.unitPrice}</td>
                        <td>{item.disc}</td>
                        <td>{item.account}</td>
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
                <div className="col-6">: </div>
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
