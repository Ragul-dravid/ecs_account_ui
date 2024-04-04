import React from "react";
import { Link } from "react-router-dom";
import Profile2 from "../../assets/statement.webp";

function ExpenseView() {
  return (
    <div className="container-fluid minHeight">
      <div className="card shadow border-0 mb-2 top-header">
        <div className="container-fluid py-4">
          <div className="row align-items-center">
            <div className="row align-items-center">
              <div className="col">
                <div className="d-flex align-items-center gap-4">
                  <h1 className="h4 ls-tight headingColor">Expense View</h1>
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
                    <b> Expense Type</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: honey tea</p>
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
                    <b>Invoice</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: 35467676</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Withdrawal</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: 2000</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Customer</b>
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
                    <b>vendor</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: Ragav</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>GST number</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: 12EDSS009779099</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>GST Legal Name</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">:  ECS CLOUD</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>GST Address</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: Meond Street purasawalkam</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Tax</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: commission</p>
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

export default ExpenseView;
