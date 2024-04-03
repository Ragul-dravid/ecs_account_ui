import React from 'react'
import { Link } from "react-router-dom";

const CustomerView = () => {
  return (
    <div className="container-fluid minHeight">
      <div className="card shadow border-0 mb-2 top-header">
        <div className="container-fluid py-4">
          
            <div className="row align-items-center">
              <div className="col">
                <div className="d-flex align-items-center gap-4">
                  <h1 className="h4 ls-tight headingColor">CUSTOMER VIEW</h1>
                </div>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-start">
                  <Link to="/customer">
                    <button type="submit" className="btn btn-sm btn-light">
                      <span>Back</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          
        </div>
      </div>
      <div className="card shadow border-0 mb-2 minHeight">
        
        <div className="container mt-5">
          <div className="row mt-2 p-3">
            <div className="col-md-6 col-12">
              <div className="row my-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Customer Type</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: Business</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row my-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Customer Name </b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: Kumar </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row my-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Company Name</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: CloudECS info</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row my-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Customer Email ID</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: harish@gmail.com</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row my-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Customer Phone</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: 6385921322</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row my-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>PAN Number</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: GHCB2345H</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row my-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Currency</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: $25000</p>
                </div>
              </div>
            </div>
            <div className='mt-5 mb-2'>
               <h3>Billing Address</h3>
            </div>
            <div className="col-md-6 col-12">
              <div className="row my-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Billing Country</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: INDIA</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row my-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Billing Address</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: flat 14 Anna Nagar 
                    Invoice chennai-10</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row my-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Billing City</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: Chennai</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row my-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Billing State</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: Tamil Nadu</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row my-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Billing Zip Code</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: 600010</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row my-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Billing Phone</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: 25052054</p>
                </div>
              </div>
            </div>
            <div className='mt-5 mb-2'>
            <h3>Shipping Address</h3>
            </div>
            <div className="col-md-6 col-12">
              <div className="row my-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Shipping Country</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: INDIA</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row my-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Shipping Address</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: Flat 14 Anna Nagar chennai-10</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row my-3">
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
              <div className="row my-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Shipping State</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: Tamil Nadu</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row my-3">
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
              <div className="row my-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Shipping Phone</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: 638596256</p>
                </div>
              </div>
            </div>
          
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerView
