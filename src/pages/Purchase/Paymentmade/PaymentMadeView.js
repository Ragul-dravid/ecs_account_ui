import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoCloudDownloadSharp } from "react-icons/io5";
import { FaTelegramPlane } from "react-icons/fa";
import Logo from "../../../assets/AccountsLogo.png";
import api from "../../../config/URL";
import toast from "react-hot-toast";


const PaymentMadeView = () => {

  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getItemData = async () => {
      try {
        const response = await api.get(
          `getTxnBillPaymentMadeById/${id}`
        );
        setData(response.data);
      } catch (error) {
        toast.error("Error fetching data: ", error?.response?.data?.message);
      }
    };
    getItemData();
  }, [id]);
  return (
    <div className="container-fluid px-2 minHeight">
      <div className="card shadow border-0 mb-2 top-header">
        <div className="container-fluid py-4">
          <div className="row align-items-center">
            <div className="col">
              <div className="d-flex align-items-center gap-4">
                <h1 className="h4 ls-tight headingColor">View Payment</h1>
              </div>
            </div>
            <div className="col-auto">
              <div className="hstack gap-2 justify-content-start">
                <Link to="/paymentmade">
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
        <div className="container-fluid mt-5">
          <div className="row mt-4 p-3">
            <div className="col-md-6 col-12">
              <div className="d-flex justify-content-center flex-column align-items-start">
                <div class="d-flex">
                  <img src={Logo} alt=".." className="mt-3" width={130} />
                </div>
                <p className="fw-small mt-2">
                  Cloud ECS Infotech Pte Ltd<br></br>
                  Anna Salai<br></br>
                  Chennai - 600002,<br></br>
                  Tamil Nadu
                </p>
              </div>
            </div>
            <div className="col-md-6 col-12 d-flex justify-end flex-column align-items-end mt-2">
              <h1>PAYMENT MADE</h1>
              <h3>#PM-018</h3>
              <span className="text-muted mt-4">Balance Due</span>
              <h3>₹3000</h3>
            </div>

          </div>
          <div className="row">
            <h5 style={{textAlign: 'center'}}>PAYMENT RECEIPT</h5>


            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Payment Date</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm border-bottom"> 28/04/2024</p>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Reference Number</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm border-bottom"> Ri-132</p>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>payment Mode</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm border-bottom"> Cash</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12 text-center">
              <p>Amount Received</p>
              <h3>₹1,10,000</h3>
            </div>

          </div>

          <div className="row mt-2 p-3">
            <div className="col-md-6 col-12">

              <p>Manikandan</p>

            </div>
            <div className="col-md-6 col-12 text-end">

              <div className="row my-3">
                <div className="col-12 my-5">
                  <p className="fw-bolder">Authorized Signature ___________________</p>
                </div>

              </div>

            </div>

            <div className="table-responsive">
              <table class="table">
                <thead>
                  <tr  style={{ background: "#4066D5" }} >

                    <th scope="col"  className="text-white">Bill Number</th>
                    <th scope="col" className="text-white">Bill Date</th>
                    <th scope="col" className="text-white">Bill Amount</th>
                    <th scope="col" className="text-white">Payment Amount</th>

                  </tr>
                </thead>
                <tbody class="table-group">
                  <tr>

                    <th scope="row">BI-567</th>
                    <td>28/05/2024</td>
                    <td>₹1,10,000</td>
                    <td>₹1,10,000</td>

                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="row mt-5 p-3">



          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMadeView;
