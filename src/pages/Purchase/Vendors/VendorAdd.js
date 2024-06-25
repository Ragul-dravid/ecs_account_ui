import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function VendorAdd() {
  const validationSchema = Yup.object({});

  const formik = useFormik({
    initialValues: {
      vendorName: "",
      companyName:"",
      vendorPhone:"",
      vendorEmail:"",
      currency:"",
      panNumber:"",
      billingCountry:"",
      shipingCountry:"",
      billingAddress:"",
      shipingAddress:"",
      billingCity:"",
      shipingCity:"",
      billingState:"",
      shipingState:"",
      billingZipCode:"",
      shipingZipCode:"",
      billingPhone:"",
      shipingPhone:"",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Vendor Datas:", values);
    },
  });

  return (
    <div className="container-fluid minHeight m-0">
      <form onSubmit={formik.handleSubmit}>
      <div
        className="card shadow border-0 mb-2 top-header">
        <div className="container-fluid py-4">
          <div className="row align-items-center">
            <div className="col">
              <div className="d-flex align-items-center gap-4">
                <h1 className="h4 ls-tight headingColor">Add Vendor</h1>
              </div>
            </div>
            <div className="col-auto">
              <div className="hstack gap-2 justify-content-end">
                <Link to="/vendor">
                  <button type="button" className="btn btn-sm btn-light mx-2">
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
                    name="firstName"
                    className={`form-control ${
                      formik.touched.firstName && formik.errors.firstName
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("firstName")}
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
                    name="lastName"
                    className={`form-control  ${
                      formik.touched.lastName && formik.errors.lastName
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("lastName")}
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
                    name="empID"
                    className={`form-control ${
                      formik.touched.empID && formik.errors.empID
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("empID")}
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
                    name="empEmail"
                    className={`form-control  ${
                      formik.touched.empEmail && formik.errors.empEmail
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("empEmail")}
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
                    name="empEmail"
                    className={`form-control  ${
                      formik.touched.empEmail && formik.errors.empEmail
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("empEmail")}
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
                    name="workLocation"
                    className={`form-control  ${
                      formik.touched.workLocation && formik.errors.workLocation
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("workLocation")}
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
                      name="currency"
                      className={`form-control  `}
                      {...formik.getFieldProps("currency")}
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
                      name="currency"
                      className={`form-control  `}
                      {...formik.getFieldProps("currency")}
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
                    name="firstName"
                    className={`form-control ${
                      formik.touched.firstName && formik.errors.firstName
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("firstName")}
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
                    name="lastName"
                    className={`form-control  ${
                      formik.touched.lastName && formik.errors.lastName
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("lastName")}
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
                    name="empID"
                    className={`form-control ${
                      formik.touched.empID && formik.errors.empID
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("empID")}
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
                    name="empEmail"
                    className={`form-control  ${
                      formik.touched.empEmail && formik.errors.empEmail
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("empEmail")}
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
                    name="empID"
                    className={`form-control ${
                      formik.touched.empID && formik.errors.empID
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("empID")}
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
                    name="empEmail"
                    className={`form-control  ${
                      formik.touched.empEmail && formik.errors.empEmail
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("empEmail")}
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
                    name="empID"
                    className={`form-control ${
                      formik.touched.empID && formik.errors.empID
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("empID")}
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
                    name="empEmail"
                    className={`form-control  ${
                      formik.touched.empEmail && formik.errors.empEmail
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("empEmail")}
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
                    name="empID"
                    className={`form-control ${
                      formik.touched.empID && formik.errors.empID
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("empID")}
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
                    name="empEmail"
                    className={`form-control  ${
                      formik.touched.empEmail && formik.errors.empEmail
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("empEmail")}
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

export default VendorAdd;
