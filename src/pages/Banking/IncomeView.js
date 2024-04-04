import React from "react";
import { Link } from "react-router-dom";
import Profile2 from "../../assets/cheque.jpg";

function IncomeView() {
  return (
    <div className="container-fluid minHeight">
      <div className="card shadow border-0 mb-2 top-header">
        <div className="container-fluid py-4">
          <div className="row align-items-center">
            <div className="row align-items-center">
              <div className="col">
                <div className="d-flex align-items-center gap-4">
                  <h1 className="h4 ls-tight headingColor">Income View</h1>
                </div>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-start">
                  <Link to="/bank/view">
                    <button type="submit" className="btn btn-sm btn-light">
                      <span>Back</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card shadow border-0 mb-2 minHeight">
        {/* Users Information */}

        <div className="container">
          <div className="row mt-2 p-3">
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Income Type</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: general incom</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Date</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: 27-03-2024</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Received Via</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: RF-2345</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Deposits</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">:  ₹200</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Reference#</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: kishore</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>description</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: Good</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-3">
                <div className="col-6  ">
                <p className="text-sm">
                    <b>Attach Receipt</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    <b className="mx-2">:</b>
                    <img
                      src={Profile2}
                      className="img-fluid ms-2 w-100"
                      alt="234"
                    ></img>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IncomeView;
