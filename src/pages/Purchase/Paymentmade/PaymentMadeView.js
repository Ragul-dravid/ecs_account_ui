import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/Logo.png"
import { MdOutlineDownloadForOffline } from "react-icons/md";
import { FaTelegramPlane } from "react-icons/fa";
import { colors } from "@mui/material";

const PaymentMadeView = () => {
  return (
    <div className="container-fluid minHeight">
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
                <Link to="/bills">
                  <button type="submit" className="btn btn-sm btn-light">
                    <span>Back</span>
                  </button>
                </Link>
                <button type="submit" className="btn btn-button rounded-pill p-1">
                  <FaTelegramPlane size={25}/>
                </button>
                <button type="submit" className="btn btn-button rounded-pill p-1">
                  <MdOutlineDownloadForOffline size={25}/>
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
                {/* <div className=" d-flex align-items-center">
                    <img src={Logo} alt="" />
                    <h2 className="text-info">Cloud ECS Infotech</h2>
                </div> */}
              <div className="">
              </div>   
              <p>Cloud ECS Infotech Pte Ltd</p>
              <p>Anna Salai,</p>
              <p>Chennai-600002,</p>
              <p>Tamil Nadu</p></div>
              
            
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
                {/* <div className="col-6 d-flex justify-content-end align-items-center">
                  <p className="text-sm">
                    <b>Bill Date</b>
                  </p>
                </div> */}
                {/* <div className="col-6">
                  <p className="text-muted text-sm">: 10.10.2023</p>
                </div> */}
              </div>
              {/* <div className="row my-3">
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
                    <b>Due Date</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: 10.10.2023</p>
                </div>
              </div> */}
            </div>
            {/* <div className="mt-5 mb-2">
              <h3>subject :</h3>
            </div>
            <div className="col-md-6 col-12 my-2">
              <p>Full Stack Developer Training program</p>
            </div> */}
            {/* <div className="">
              <h3 style={{ background: "#1a516b" }} className="text-light p-2">
                Item Table
              </h3>
            </div> */}
            <div className="table-responsive">
              <table class="table">
                <thead>
                  <tr className="background-color" >
                  
                    <th scope="col"  className="text-white">Bill Number</th>
                    <th scope="col" className="text-white">Bill Date</th>
                    <th scope="col" className="text-white">Bill Amount</th>
                    <th scope="col" className="text-white">Payment Amount</th>
                    {/* <th scope="col">DISCOUNT</th>
                    <th scope="col">TAX</th>
                    <th scope="col">AMOUNT</th> */}
                  </tr>
                </thead>
                <tbody class="table-group">
                  <tr>
                    
                    <th scope="row">BI-567</th>
                    <td>28/05/2024</td>
                    <td>₹1,10,000</td>
                    <td>₹1,10,000</td>
                    {/* <td>10</td>
                    <td>Commission</td>
                    <td>3500</td> */}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="row mt-5 p-3">
            {/* <div className="col-md-6 col-12">
              <h5 className="fw-bolder my-2">Notes</h5>
              <p className="my-3">Thanks for your business.</p>
              <h5 className="fw-bolder my-2">Terms & Conditions</h5>
              <p className="my-3">
                1. Payment Terms: Payment is due upon receipt of the invoice
                unless otherwise agreed upon in writing. Late payments may be
                subject to a late fee of [X]% per month
              </p>
              <p className="my-3">
                2. Payment Methods: We accept payment by [list acceptable payment
                methods, e.g., cash, check, credit card, bank transfer, etc.].
                Payments should be made in [currency].
              </p>
            </div> */}
            {/* <div className="col-md-6 col-12 card shadow border-2 h-40 d-flex justify-content-center gap-5 ">
                  <div className="row text-center">
                    <div className="col-6 ">
                        <p>Sub Total</p>
                    </div>
                    <div className="col-6">: 3500</div>
                  </div>
                  <div className="row text-center">
                    <div className="col-6">
                        <p>Adjustment</p>
                    </div>
                    <div className="col-6">: 0.00</div>
                  </div>
                  <div className="row text-center">
                    <div className="col-6">
                        <p>Total (₹)</p>
                    </div>
                    <div className="col-6">: 3500</div>
                  </div>
            </div> */}
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMadeView;
