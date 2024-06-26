import React from "react";
import { Link } from "react-router-dom";

function VendorView() {
  return (
    <div className="container-fluid px-2 minHeight">
      <div className="card shadow border-0 mb-2 top-header">
        <div className="container-fluid py-4">
          <div className="row align-items-center">
            <div className="row align-items-center">
              <div className="col">
                <div className="d-flex align-items-center gap-4">
                  <h1 className="h4 ls-tight headingColor">View Vendor</h1>
                </div>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-start">
                  <Link to="/vendor">
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
      <div className="container">
          <div className="row mt-2 p-3">
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Contact Name</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: Ecs</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Account Number </b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: keerthick </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Vendor Phone</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: 987656543</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Vendor Email </b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: ragulecs@gmail.com</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Primary Contact</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: 98766</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Bank Name</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: ERTH567</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Bank Account Number</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: ERTH567</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Users Information */}
        <div className="container-fluid fw-bold fs-5 my-2 ms-2">
          Billing Address
         </div>
        <div className="container">
          <div className="row mt-2 p-3">
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Billing Country</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: India</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Billing Address </b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: Indian</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Billing City</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: Trichy</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Billing State</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: Trichy</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Billing Zip Code</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: 600243</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Billing Phone</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: 12345678</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid fw-bold fs-5 my-2 ms-2">
          Shipping Address
         </div>
        <div className="container">
          <div className="row mt-2 p-3">
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Shipping Country</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: India</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Shipping Address </b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: Chennai </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Shipping City</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: Chennai</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b> Shipping State</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: Tamil Nadu</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Shipping Zip Code</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: 600002</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Shipping Phone</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: 9878665544</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorView;
