import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function RecordPaymentMade() {
  const validationSchema = Yup.object({});
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName:"",
      empID:"",
      empEmail:"",
      dptName:"",
      workLocation:"",
      designation:""
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("paymentmade Datas:", values);
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
                <h1 className="h4 ls-tight headingColor">Payment Made</h1>
              </div>
            </div>
            <div className="col-auto">
              <div className="hstack gap-2 justify-content-end">
                <Link to="/bills">
                  <button type="submit" className="btn btn-sm btn-light">
                    <span>Back</span>
                  </button>
                </Link>
                <button type="submit" className="btn btn-button">
                Record payment
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
        
          <div className="container mb-5">
            <div className="row py-4">
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                 Payment Made(INR)
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
                 Payment#
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
                  Paid Through
                </lable>
                <select
                  name="dptName"
                  {...formik.getFieldProps("dptName")}
                  className={`form-select    ${
                    formik.touched.dptName && formik.errors.dptName
                      ? "is-invalid"
                      : ""
                  }`}>
                  <option selected></option>
                  <option value="React Js">Manikandan</option>
                  <option value="Angular">Harish</option>
                 
                
                </select>
                {formik.touched.dptName && formik.errors.dptName && (
                <div className="invalid-feedback">
                  {formik.errors.dptName}
                </div>
              )}
              </div>
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                 Payment Date<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="date"
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
                  Payment Mode
                </lable>
                <select
                  name="dptName"
                  {...formik.getFieldProps("dptName")}
                  className={`form-select    ${
                    formik.touched.dptName && formik.errors.dptName
                      ? "is-invalid"
                      : ""
                  }`}>
                  <option selected></option>
                  <option value="React Js">Cash</option>
                  <option value="Angular">Bank tranfer</option>
                  <option value="Java">Credit Card</option>
                
                </select>
                {formik.touched.dptName && formik.errors.dptName && (
                <div className="invalid-feedback">
                  {formik.errors.dptName}
                </div>
              )}
              </div>
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                    Reference#
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
                <lable className="form-lable">
                    Notes
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="designation"
                    className={`form-control  ${
                      formik.touched.designation && formik.errors.designation
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("designation")}
                  />
                  {formik.touched.designation &&
                    formik.errors.designation && (
                      <div className="invalid-feedback">
                        {formik.errors.designation}
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RecordPaymentMade;
