import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function VendorEdit() {
  const validationSchema = Yup.object({});


  const formik = useFormik({
    initialValues: {
      vendorName: "keerthick",
      companyName:"ecs",
      vendorPhone:"98753223455",
      vendorEmail:"abc@gmail.com",
      currency:"9876",
      panNumber:"EBCF234",
      billingCountry:"India",
      shipingCountry:"India",
      billingAddress:"Indian",
      shipingAddress:"Indian",
      billingCity:"Trichy",
      shipingCity:"Chennai",
      billingState:"Tamilnadu",
      shipingState:"Kerala",
      billingZipCode:"600003",
      shipingZipCode:"600002",
      billingPhone:"57846735",
      shipingPhone:"23454677",

    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Vendor Datas:", values);
    },
  });

  return (
    <div className="container-fluid minHeight m-0">
      <div
        className="card shadow border-0 mb-2 top-header">
        <div className="container-fluid py-4">
          <div className="row align-items-center">
            <div className="col">
              <div className="d-flex align-items-center gap-4">
                <h1 className="h4 ls-tight headingColor">Edit Vendor</h1>
              </div>
            </div>
            <div className="col-auto">
              <div className="hstack gap-2 justify-content-end">
                <Link to="/vendor">
                  <button type="button" className="btn btn-sm btn-light">
                    <span>Back</span>
                  </button>
                  
                </Link>
                <button type="submit" className="btn btn-button btn-sm">
                Save
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="card shadow border-0 my-2">
          <div className="row mt-3 me-2">
            <div className="col-12 text-end">
             
            </div>
          </div>

          {/* User Information */}
          {/* <div className="container fw-bold fs-5 my-4">
            User Information
          </div> */}
          <div className="container mb-5">
            <div className="row py-4">
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                 Vendor Name
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="vendorName"
                    className={`form-control ${
                      formik.touched.firstName && formik.errors.firstName
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("vendorName")}
                  />
                  {formik.touched.firstName &&
                    formik.errors.firstName && (
                      <div className="invalid-feedback">
                        {formik.errors.firstName}
                      </div>
                    )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                 Company Name
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="companyName"
                    className={`form-control  ${
                      formik.touched.lastName && formik.errors.lastName
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("companyName")}
                  />
                  {formik.touched.lastName &&
                    formik.errors.lastName && (
                      <div className="invalid-feedback">
                        {formik.errors.lastName}
                      </div>
                    )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                    Vendor Phone 
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="vendorPhone"
                    className={`form-control ${
                      formik.touched.empID && formik.errors.empID
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("vendorPhone")}
                  />
                  {formik.touched.empID &&
                    formik.errors.empID && (
                      <div className="invalid-feedback">
                        {formik.errors.empID}
                      </div>
                    )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                 Vendor Email
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="vendorEmail"
                    className={`form-control  ${
                      formik.touched.empEmail && formik.errors.empEmail
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("vendorEmail")}
                  />
                  {formik.touched.empEmail &&
                    formik.errors.empEmail && (
                      <div className="invalid-feedback">
                        {formik.errors.empEmail}
                      </div>
                    )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                 Currency
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="currency"
                    className={`form-control  ${
                      formik.touched.empEmail && formik.errors.empEmail
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("currency")}
                  />
                  {formik.touched.empEmail &&
                    formik.errors.empEmail && (
                      <div className="invalid-feedback">
                        {formik.errors.empEmail}
                      </div>
                    )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                    PAN Number
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="panNumber"
                    className={`form-control  ${
                      formik.touched.workLocation && formik.errors.workLocation
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("panNumber")}
                  />
                  {formik.touched.workLocation &&
                    formik.errors.workLocation && (
                      <div className="invalid-feedback">
                        {formik.errors.workLocation}
                      </div>
                    )}
                </div>
              </div>

             <div className="col-md-6 col-12 mb-2">
                  <h3 className="my-5">Billing Address</h3>
                  <lable className="form-lable">
                  Billing Country 
                  </lable>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="billingCountry"
                      className={`form-control  `}
                      {...formik.getFieldProps("billingCountry")}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <h3 className="my-5">Shipping Address</h3>
                  <lable className="form-lable">
                  Shipping Country
                  </lable>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="shipingCountry"
                      className={`form-control  `}
                      {...formik.getFieldProps("shipingCountry")}
                    />
                  </div>
                </div>
          <div className="container mb-5">
            <div className="row py-4">

           
              
              
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                 Billing Address
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="billingAddress"
                    className={`form-control ${
                      formik.touched.firstName && formik.errors.firstName
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("billingAddress")}
                  />
                  {formik.touched.firstName &&
                    formik.errors.firstName && (
                      <div className="invalid-feedback">
                        {formik.errors.firstName}
                      </div>
                    )}
                </div>
              </div>
              
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                Shipping Address
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="shipingAddress"
                    className={`form-control  ${
                      formik.touched.lastName && formik.errors.lastName
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("shipingAddress")}
                  />
                  {formik.touched.lastName &&
                    formik.errors.lastName && (
                      <div className="invalid-feedback">
                        {formik.errors.lastName}
                      </div>
                    )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                    Billing City
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="billingCity"
                    className={`form-control ${
                      formik.touched.empID && formik.errors.empID
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("billingCity")}
                  />
                  {formik.touched.empID &&
                    formik.errors.empID && (
                      <div className="invalid-feedback">
                        {formik.errors.empID}
                      </div>
                    )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                 Shipping City
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="shipingCity"
                    className={`form-control  ${
                      formik.touched.empEmail && formik.errors.empEmail
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("shipingCity")}
                  />
                  {formik.touched.empEmail &&
                    formik.errors.empEmail && (
                      <div className="invalid-feedback">
                        {formik.errors.empEmail}
                      </div>
                    )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                    Billing State 
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="billingState"
                    className={`form-control ${
                      formik.touched.empID && formik.errors.empID
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("billingState")}
                  />
                  {formik.touched.empID &&
                    formik.errors.empID && (
                      <div className="invalid-feedback">
                        {formik.errors.empID}
                      </div>
                    )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                 Shipping State
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="shipingState"
                    className={`form-control  ${
                      formik.touched.empEmail && formik.errors.empEmail
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("shipingState")}
                  />
                  {formik.touched.empEmail &&
                    formik.errors.empEmail && (
                      <div className="invalid-feedback">
                        {formik.errors.empEmail}
                      </div>
                    )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                    Billing Zip Code
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="billingZipCode"
                    className={`form-control ${
                      formik.touched.empID && formik.errors.empID
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("billingZipCode")}
                  />
                  {formik.touched.empID &&
                    formik.errors.empID && (
                      <div className="invalid-feedback">
                        {formik.errors.empID}
                      </div>
                    )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                 Shipping Zip Code
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="shipingZipCode"
                    className={`form-control  ${
                      formik.touched.empEmail && formik.errors.empEmail
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("shipingZipCode")}
                  />
                  {formik.touched.empEmail &&
                    formik.errors.empEmail && (
                      <div className="invalid-feedback">
                        {formik.errors.empEmail}
                      </div>
                    )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                    Billing Phone
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="billingPhone"
                    className={`form-control ${
                      formik.touched.empID && formik.errors.empID
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("billingPhone")}
                  />
                  {formik.touched.empID &&
                    formik.errors.empID && (
                      <div className="invalid-feedback">
                        {formik.errors.empID}
                      </div>
                    )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                 Shipping Phone
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="shipingPhone"
                    className={`form-control  ${
                      formik.touched.empEmail && formik.errors.empEmail
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("shipingPhone")}
                  />
                  {formik.touched.empEmail &&
                    formik.errors.empEmail && (
                      <div className="invalid-feedback">
                        {formik.errors.empEmail}
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
          
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default VendorEdit;
