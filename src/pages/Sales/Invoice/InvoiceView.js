import React from "react";
import { Link } from "react-router-dom";
import { LuSend } from "react-icons/lu";
import { MdOutlineFileDownload } from "react-icons/md";
import Logo from "../../../assets/Logo.png";
function InvoiceView() {
  return (
    <div className="container-fluid minHeight">
      <div className="card shadow border-0 mb-2 top-header">
        <div className="container-fluid py-4">
          <div className="row align-items-center">
            <div className="row align-items-center">
              <div className="col">
                <div className="d-flex align-items-center gap-4">
                  <h1 className="h4 ls-tight headingColor">View Invoice</h1>
                </div>
              </div>
              <div className="col-auto">
                <div className="justify-content-start">
                  <Link to="/invoice">
                    <button type="submit" className="btn btn-light btn-sm me-1">
                      <span>Back</span>
                    </button>
                  </Link>
                  <button type="submit" className="btn btn-sm btn-primary me-1" style={{ borderRadius: "30px" }}>
                    <LuSend />
                  </button>
                  <button type="submit" className="btn btn-sm btn-primary me-1" style={{ borderRadius: "30px" }}>
                    <MdOutlineFileDownload />
                  </button>
                  <Link to="/recordpayment">
                    <button type="submit" className="btn btn-sm btn-primary me-1">
                      <span>Record Payment</span>
                    </button>
                  </Link>
                  <button type="submit" className="btn btn-sm btn-primary me-1">
                    <span>Clone</span>
                  </button>
                </div>
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
                <div class="d-flex">
                  <img src={Logo} alt=".." /> <p style={{ color: "#2196f3", fontSize: "25px" }} className="py-5">Cloud ECS InfoTech</p>
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
              <h1>INVOICE</h1>
              <h3>#IN-018</h3>
              <span className="text-muted mt-4">Balance Due</span>
              <h3>₹3000</h3>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-6 col-12">
              <div className="d-flex justify-content-center flex-column align-items-start">
                <h3>Bill To</h3>
                <span style={{ color: "#2196f3" }}>Manikandan</span>
                <p className="fw-small">
                  Purasaiwalkam,<br></br>
                  Chennai - 600002,<br></br>
                  Tamil Nadu
                </p>
              </div>
            </div>
            <div className="col-md-6 col-12 text-end">
              <div className="row mb-2  d-flex justify-content-end align-items-end">
                <div className="col-6">
                  <p className="text-sm">
                    <b>Invoice Date</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: 10.10.2023</p>
                </div>
              </div>
              <div className="row mb-2 d-flex justify-content-end align-items-end">
                <div className="col-6">
                  <p className="text-sm">
                    <b>Terms</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: Due on Receipt</p>
                </div>
              </div>
              <div className="row mb-2 d-flex justify-content-end align-items-end">
                <div className="col-6">
                  <p className="text-sm">
                    <b>Invoice Date</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: 10.10.2023</p>
                </div>
              </div>
            </div>

          </div>
          <div className="row mt-5">
            <div className="col-md-6 col-12">
              <div className="d-flex justify-content-center flex-column align-items-start">
                <h3>Subject</h3>
                <p className="fw-small">
                  Full Stack Developer Training Program
                </p>
              </div>
            </div>
          </div>
          <div className="row mt-5 flex-nowrap">
            <div className="col-12">
              <div className="table-responsive table-bordered">
                <div  style={{ backgroundColor: "#023047" }}><h3 className="p-3" style={{ color: "#ffffff" }}>Item Table</h3></div>
                <table class="table table-light table-nowrap table table-bordered">
                  <thead className="thead-light">
                    <tr>
                      <th>S.NO</th>
                      <th>ITEM DETAILS</th>
                      <th>QUANTITY</th>
                      <th>RATE</th>
                      <th>DISCOUNT</th>
                      <th>TAX</th>
                      <th>AMOUNT</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1
                      </td>
                      <td>
                        Apple
                      </td>
                      <td>
                        1.00
                      </td>
                      <td>
                        3500
                      </td>
                      <td>
                        10
                      </td>
                      <td>
                        Commision
                      </td>
                      <td>
                        3500
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="row mt-5">
            <div className="col-md-6 col-12 mb-3 mt-5">
              <lable className="form-lable">
                Customer Notes
              </lable>
              <div className="mb-3">
                Thanks For Your Bussiness
              </div>
              <lable className="form-lable mt-2">
                Terms & Conditions
              </lable>
              <div className="mb-3">
                <p>1.Payment Terms: Payment is due upon receipt of the invoice unless
                  otherwise agreed upon in writing. Late payments may be subject to
                  a late fee of [X]% per Month</p>
                <p>2.Payment Methods: We accept payment by [list acceptable payment
                  methods, e.g., cash, check, credit card, bank transfer, etc.]. Payments
                  should be made in [currency].</p>
              </div>
            </div>
            <div className="col-md-6 col-12 mt-5 mb-3 rounded" style={{ border: "1px solid lightgrey" }}>
              <div class="row mb-3 mt-2">
                <label class="col-sm-4 col-form-label">Sub Total</label>
                <div class="col-sm-4"></div>
                <div class="col-sm-4 ">
                  3500
                </div>
              </div>
              <div class="row mb-3">
                <label class="col-sm-4 col-form-label">Adjustment</label>
                <div class="col-sm-4">
                  0.00
                </div>
                <div class="col-sm-4 "></div>
              </div>
              <hr></hr>
              <div class="row mb-3">
                <label class="col-sm-4 col-form-label">Total ( ₹ )</label>
                <div class="col-sm-4"></div>
                <div class="col-sm-4 ">
                  3000
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12"></div>
            <div className="col-md-6 col-12 ">
              <div class="row mt-2">
                <label class="col-sm-4 col-form-label">Payment Made</label>
                <div class="col-sm-4"></div>
                <div class="col-sm-4 text-danger">
                  (-)3,500.00
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12"></div>
            <div className="col-md-6 col-12 mb-3">
              <div class="row mt-2">
                <label class="col-sm-4 col-form-label">Balance Due</label>
                <div class="col-sm-4"></div>
                <div class="col-sm-4 ">
                  ₹3000
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12 mb-5">
            Authorized Signature _____________________________
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceView;
