import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/AccountsLogo.png"
import { IoCloudDownloadSharp } from "react-icons/io5";
import { FaTelegramPlane } from "react-icons/fa";

const EstimateView = () => {
  return (
    <div className="container-fluid px-2 minHeight">
      <div className="card shadow border-0 mb-2 top-header">
        <div className="container-fluid py-4">
          <div className="row align-items-center">
            <div className="col">
              <div className="d-flex align-items-center gap-4">
                <h1 className="h4 ls-tight headingColor">View Estimates</h1>
              </div>
            </div>
            <div className="col-auto">
              <div className="hstack gap-2 justify-content-start">
                <Link to="/estimates">
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
                <button type="submit" className="btn btn-button rounded">
                  Save
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
              <div className="">
              </div>
              <p>Cloud ECS Infotech Pte Ltd</p>
              <p>Anna Salai,</p>
              <p>Chennai-600002,</p>
              <p>Tamil Nadu</p></div>

            <div className="col-md-6 col-12 d-flex flex-column align-items-end pt-5">
              <h5>ESTIMATE</h5>
              <p>#EST-018</p>
            </div>
          </div>
          <div className="row mt-2 p-3">
            <div className="mt-5 mb-2">
              <h3>Bill To</h3>
            </div>
            <div className="col-md-6 col-12">
              <p className="text-info">ANTONY</p>
              <p>Purasaiwalkam,</p>
              <p>Chennai-600002</p>
              <p>Tamil Nadu</p>
            </div>
            <div className="col-md-6 col-12 text-end">
              <div className="row my-3">
                <div className="col-6 d-flex justify-content-end align-items-center">
                  <p className="text-sm">
                    <b>Estimate Date</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: 10.10.2023</p>
                </div>
              </div>
              <div className="row my-3">
                <div className="col-6 d-flex justify-content-end align-items-center">
                  <p className="text-sm">
                    <b>reference #</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: RI_231</p>
                </div>
              </div>
              <div className="row my-3">
                <div className="col-6 d-flex justify-content-end align-items-center">
                  <p className="text-sm">
                    <b>Expiry Date</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: 10.10.2023</p>
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
                  <tr>
                    <th scope="row">1</th>
                    <td>Apple</td>
                    <td>1.00</td>
                    <td>3500</td>
                    <td>10</td>
                    <td>Commission</td>
                    <td>3500</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="row mt-5 p-3">
            <div className="col-md-6 col-12">
              <h5 className="fw-bolder my-2">Notes</h5>
              <p className="my-3">Thanks for your business.</p>
              <h5 className="fw-bolder my-2">Terms & Conditions</h5>
              <p className="my-3">
                1. Payment Terms: Payment is due upon receipt of the invoice
                unless otherwise agreed upon in writing. Late payments may be
                subject to a late fee of [X]% per month
              </p>
              <p className="my-3">
                2. Payment Methods: We accept payment by [list acceptable payment
                methods, e.g., cash, check, credit card, bank transfer, etc.].
                Payments should be made in [currency].
              </p>
            </div>
            <div className="col-md-6 col-12 card shadow border-2 h-40 d-flex justify-content-center gap-5 ">
              <div className="row text-center">
                <div className="col-6 ">
                  <p>Sub Total</p>
                </div>
                <div className="col-6">: 3500</div>
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
                <div className="col-6">: 3500</div>
              </div>
            </div>
            <div className="col-12 my-5">
              <p className="fw-bolder">Authorized Signature ___________________</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstimateView;
