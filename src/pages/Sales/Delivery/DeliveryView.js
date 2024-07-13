import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Logo from "../../../assets/AccountsLogo.png"
import { IoCloudDownloadSharp } from "react-icons/io5";
import { FaTelegramPlane } from "react-icons/fa";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import fetchAllCustomerWithIds from "../../List/CustomerList";
import fetchAllItemWithIds from "../../List/ItemList";

const DeliveryView = () => {

  const { id } = useParams();
  const [data, setData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchDelivery = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/getTxnDeliveryChallansById/${id}`);
        setData(response.data);
      } catch (error) {
        toast.error("Error Fetching Data", error);
      }finally{
        setLoading(false);
      }
    };
    fetchDelivery();
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

  const customer = (id) => {
    const name = customerData.find((item) => item.id === id);
    return name?.contactName;
  };
  const itemName = (id) => {
    const name = items.find((item) => item.id == id);
    return name?.itemName;
  };
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
                <h1 className="h4 ls-tight headingColor">View Delivery</h1>
              </div>
            </div>
            <div className="col-auto">
              <div className="hstack gap-2 justify-content-start">
                <Link to="/delivery">
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card shadow border-0 mb-2 minHeight">
        <div className="container-fluid ">
          <div className="row mt-2 p-3">
            <div className="col-md-6 col-12 ">
              <div className=" d-flex align-items-center mb-2">
                <img src={Logo} alt="" className="mt-3" width={130} />
              </div>
              <div className="">
              </div>
              <p>Cloud ECS Infotech Pte Ltd</p>
              <p>Anna Salai,</p>
              <p>Chennai-600002,</p>
              <p>Tamil Nadu</p></div>

            <div className="col-md-6 col-12 d-flex flex-column align-items-end pt-5">
              <h1>DELIVERY</h1>
              <p>#DEL-018</p>
            </div>
          </div>
          <div className="row mt-2 p-3">
            <div className="mt-5 mb-2">
              <h3>Bill To</h3>
            </div>
            <div className="col-md-6 col-12">
              <p className="text-info">{customer(data.customerId)}</p>
              <p>Purasaiwalkam,</p>
              <p>Chennai-600002</p>
              <p>Tamil Nadu</p>
            </div>
            <div className="col-md-6 col-12 text-end">
              <div className="row my-3">
                <div className="col-6 d-flex justify-content-end align-items-center">
                  <p className="text-sm">
                    <b>Challan Date</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">:  {data.challanDate?.split("-").reverse().join("-")}</p>
                </div>
              </div>
              <div className="row my-3">
                <div className="col-6 d-flex justify-content-end align-items-center">
                  <p className="text-sm">
                    <b>reference </b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.reference}</p>
                </div>
              </div>
              <div className="row my-3">
                <div className="col-6 d-flex justify-content-end align-items-center">
                  <p className="text-sm">
                    <b>Payment Terms</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">:  {data.paymentTerms}</p>
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
                    {/* <th scope="col">DISCOUNT</th> */}
                    {/* <th scope="col">TAX</th> */}
                    <th scope="col">AMOUNT</th>
                  </tr>
                </thead>
                <tbody class="table-group">
                {data &&
                    data.challansItemsModels &&
                    data.challansItemsModels.map((item, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{itemName(item.item)}</td>
                        <td>{item.qty}</td>
                        <td>{item.rate}</td>
                        {/* <td>{item.discount}</td> */}
                        {/* <td>{item.tax}</td> */}
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
              <p className="my-3">{data.cusNotes}</p>
              <h5 className="fw-bolder my-2">Terms & Conditions</h5>
              <p className="my-3">
                {data.termsConditions}
              </p>
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
                <div className="col-6">: 0.00</div>
              </div>
              <div className="row text-center">
                <div className="col-6">
                  <p>Total (₹)</p>
                </div>
                <div className="col-6">: {data.total}</div>
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

export default DeliveryView;



