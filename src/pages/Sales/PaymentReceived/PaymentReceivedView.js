import React from "react";
import { Link } from "react-router-dom";
import { IoCloudDownloadSharp } from "react-icons/io5";
import { FaTelegramPlane } from "react-icons/fa";

function PaymentReceivedView() {
    return (
        <div className="container-fluid minHeight">
            <div className="card shadow border-0 mb-2 top-header">
                <div className="container-fluid py-4">
                    <div className="row align-items-center">
                        <div className="row align-items-center">
                            <div className="col">
                                <div className="d-flex align-items-center gap-4">
                                    <h1 className="h4 ls-tight headingColor">Payment View</h1>
                                </div>
                            </div>
                            <div className="col-auto">
                                <div className="hstack gap-2 justify-content-start">
                                    <Link to="/paymentReceived">
                                        <button type="submit" className="btn btn-light btn-sm me-1">
                                            <span>Back</span>
                                        </button>
                                    </Link>
                                    <button type="submit" className="btn btn-button rounded-pill p-2">
                                        <FaTelegramPlane size={18}/>
                                    </button>
                                    <button type="submit" className="btn btn-button rounded-pill p-2">
                                        <IoCloudDownloadSharp size={18}/>
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
                        <div className="col-md-6 col-12 mb-5">
                            <div className="d-flex justify-content-center flex-column align-items-start">
                                <b className="fw-small mt-5">
                                    ECS
                                </b>
                                <b className="fw-small mt-5">
                                    Tamil Nadu <br></br>
                                    India<br></br>
                                    6374791760<br></br>
                                    Maniecs0120@Gmail.Com
                                </b>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <hr className="mb-5"></hr>
                        <p className="text-center mt-5">PAYMENT RECEIVED</p>
                    </div>
                    <div className="row mt-5">
                        <div className="col-md-3 col-12">
                            <p className="mb-5">Payment Date</p>
                            <p className="mb-5">Reference Number</p>
                            <p>Payment Mode</p>
                        </div>
                        <div className="col-md-5 col-12">
                            <p>28/04/2024</p>
                            <hr></hr>
                            <p>RI-1232</p>
                            <hr></hr>
                            <p>Cash</p>
                            <hr></hr>
                        </div>
                        <div className="col-md-4 col-12 text-center">
                            <p className="mb-3">Amount Received</p>
                            <h1>₹1,10,000</h1>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-md-6 col-12">
                            <p className="mb-3">Bill To</p>
                            <p>Manikandan</p>
                        </div>
                        <div className="col-md-6 col-12 text-center">
                            Authorized Signature  __________________________
                        </div>
                    </div>
                    <hr className="mt-5 mb-3"></hr>
                    <div class="table-responsive-sm pb-5">
                        <table class="table table-bordered">
                            <thead style={{ backgroundColor: "#023047" }}>
                                <tr>
                                    <th scope="col" style={{ color: "#ffffff" }}>Invoice Number</th>
                                    <th scope="col" style={{ color: "#ffffff" }}>Invoice Date</th>
                                    <th scope="col" style={{ color: "#ffffff" }}>Invoice Amount</th>
                                    <th scope="col" style={{ color: "#ffffff" }}>Payment Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>INV-000007</td>
                                    <td>28/04/2024</td>
                                    <td>₹1,10,000</td>
                                    <td>₹1,10,000</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentReceivedView;
