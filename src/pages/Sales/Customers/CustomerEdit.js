import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const CustomerEdit = () => {
    const formik = useFormik({
        initialValues: {
            customerType: "Business",
            customerName: "Mani",
            companyName: "ECS Cloud",
            customerEmail: "ecscloud@gmail.com",
            customerPhone: "6982345082",
            panNumber: "PH639GS",
            currency: "₹2000",
            billingCountry: "India",
            shippingCountry: "India",
            billingAddress: "India",
            shippingAddress: "India",
            billingCity: "India",
            shippingCity: "India",
            billingState: "TamilNadu",
            shippingState: "India",
            billingZipCode: "600012",
            shippingZipCode: "India",
            billingPhone: "6789018923",
            shippingPhone: "India ",
            
        },
        // validationSchema: validationSchema,
        onSubmit: async (values) => {
          console.log("User Datas:", values);
        },
      });
  return (
    <div className="container-fluid p-2 minHeight m-0">
    <div className="card shadow border-0 mb-2 top-header">
      <div className="container-fluid py-4">
        <div className="row align-items-center">
          <div className="col">
            <div className="d-flex align-items-center gap-4">
              <h1 className="h4 ls-tight headingColor">Edit Customer</h1>
            </div>
          </div>
          <div className="col-auto">
            <div className="hstack gap-2 justify-content-end">
              <Link to="/customer">
                <button type="submit" className="btn btn-sm btn-light">
                  <span>Back</span>
                </button>
              </Link>
              <button
                type="submit"
                className="btn btn-button"
              >
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
                 Contact Name
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
                Account Number
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
                   Primary Contact
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
                Customer Email
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
                Customer Phone
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
                    Website
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
                 Bank Name
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
                   Bank Account Number
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

              <div className="col-12 mb-2 d-flex justify-content-end align-items-end">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="copyAddress"
                    onChange={(e) => {
                      if (e.target.checked) {
                        formik.setFieldValue("billingCountry", formik.values.shippingCountry);
                        formik.setFieldValue("billingAddress", formik.values.shippingAddress);
                        formik.setFieldValue("billingCity", formik.values.shippingCity);
                        formik.setFieldValue("billingState", formik.values.shippingState);
                        formik.setFieldValue("billingZipCode", formik.values.shippingZipCode);
                        formik.setFieldValue("billingAttention", formik.values.shippingAttention);
                      }
                    }}
                  />
                  <label className="form-check-label" htmlFor="copyAddress">
                    Same as Shipping Address
                  </label>
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <h3 className="my-5">Shipping Address</h3>
                <label className="form-label">
                  Shipping Country
                </label>
                <div className="mb-3">
                  <input
                    type="text"
                    name="shippingCountry"
                    className={`form-control`}
                    {...formik.getFieldProps("shippingCountry")}
                  />
                </div>
              </div>

              <div className="col-md-6 col-12 mb-2">
                <h3 className="my-5">Billing Address</h3>
                <label className="form-label">
                  Billing Country
                </label>
                <div className="mb-3">
                  <input
                    type="text"
                    name="billingCountry"
                    className={`form-control`}
                    {...formik.getFieldProps("billingCountry")}
                  />
                </div>
              </div>

             

              <div className="container mb-5">
                <div className="row py-4">
                  <div className="col-md-6 col-12 mb-2">
                    <label className="form-label">
                      Shipping Address
                    </label>
                    <div className="mb-3">
                      <input
                        type="text"
                        name="shippingAddress"
                        className={`form-control ${formik.touched.shippingAddress && formik.errors.shippingAddress ? "is-invalid" : ""
                          }`}
                        {...formik.getFieldProps("shippingAddress")}
                      />
                      {formik.touched.shippingAddress && formik.errors.shippingAddress && (
                        <div className="invalid-feedback">
                          {formik.errors.shippingAddress}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6 col-12 mb-2">
                    <label className="form-label">
                      Billing Address
                    </label>
                    <div className="mb-3">
                      <input
                        type="text"
                        name="billingAddress"
                        className={`form-control ${formik.touched.billingAddress && formik.errors.billingAddress ? "is-invalid" : ""
                          }`}
                        {...formik.getFieldProps("billingAddress")}
                      />
                      {formik.touched.billingAddress && formik.errors.billingAddress && (
                        <div className="invalid-feedback">
                          {formik.errors.billingAddress}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6 col-12 mb-2">
                    <label className="form-label">
                      Shipping City
                    </label>
                    <div className="mb-3">
                      <input
                        type="text"
                        name="shippingCity"
                        className={`form-control ${formik.touched.shippingCity && formik.errors.shippingCity ? "is-invalid" : ""
                          }`}
                        {...formik.getFieldProps("shippingCity")}
                      />
                      {formik.touched.shippingCity && formik.errors.shippingCity && (
                        <div className="invalid-feedback">
                          {formik.errors.shippingCity}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6 col-12 mb-2">
                    <label className="form-label">
                      Billing City
                    </label>
                    <div className="mb-3">
                      <input
                        type="text"
                        name="billingCity"
                        className={`form-control ${formik.touched.billingCity && formik.errors.billingCity ? "is-invalid" : ""
                          }`}
                        {...formik.getFieldProps("billingCity")}
                      />
                      {formik.touched.billingCity && formik.errors.billingCity && (
                        <div className="invalid-feedback">
                          {formik.errors.billingCity}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6 col-12 mb-2">
                    <label className="form-label">
                      Shipping State
                    </label>
                    <div className="mb-3">
                      <input
                        type="text"
                        name="shippingState"
                        className={`form-control ${formik.touched.shippingState && formik.errors.shippingState ? "is-invalid" : ""
                          }`}
                        {...formik.getFieldProps("shippingState")}
                      />
                      {formik.touched.shippingState && formik.errors.shippingState && (
                        <div className="invalid-feedback">
                          {formik.errors.shippingState}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6 col-12 mb-2">
                    <label className="form-label">
                      Billing State
                    </label>
                    <div className="mb-3">
                      <input
                        type="text"
                        name="billingState"
                        className={`form-control ${formik.touched.billingState && formik.errors.billingState ? "is-invalid" : ""
                          }`}
                        {...formik.getFieldProps("billingState")}
                      />
                      {formik.touched.billingState && formik.errors.billingState && (
                        <div className="invalid-feedback">
                          {formik.errors.billingState}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6 col-12 mb-2">
                    <label className="form-label">
                      Shipping Zip Code
                    </label>
                    <div className="mb-3">
                      <input
                        type="text"
                        name="shippingZipCode"
                        className={`form-control ${formik.touched.shippingZipCode && formik.errors.shippingZipCode ? "is-invalid" : ""
                          }`}
                        {...formik.getFieldProps("shippingZipCode")}
                      />
                      {formik.touched.shippingZipCode && formik.errors.shippingZipCode && (
                        <div className="invalid-feedback">
                          {formik.errors.shippingZipCode}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6 col-12 mb-2">
                    <label className="form-label">
                      Billing Zip Code
                    </label>
                    <div className="mb-3">
                      <input
                        type="text"
                        name="billingZipCode"
                        className={`form-control ${formik.touched.billingZipCode && formik.errors.billingZipCode ? "is-invalid" : ""
                          }`}
                        {...formik.getFieldProps("billingZipCode")}
                      />
                      {formik.touched.billingZipCode && formik.errors.billingZipCode && (
                        <div className="invalid-feedback">
                          {formik.errors.billingZipCode}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6 col-12 mb-2">
                    <label className="form-label">
                      Shipping Attention
                    </label>
                    <div className="mb-3">
                      <input
                        type="text"
                        name="shippingAttention"
                        className={`form-control ${formik.touched.shippingAttention && formik.errors.shippingAttention ? "is-invalid" : ""
                          }`}
                        {...formik.getFieldProps("shippingAttention")}
                      />
                      {formik.touched.shippingAttention && formik.errors.shippingAttention && (
                        <div className="invalid-feedback">
                          {formik.errors.shippingAttention}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6 col-12 mb-2">
                    <label className="form-label">
                      Billing Attention
                    </label>
                    <div className="mb-3">
                      <input
                        type="text"
                        name="billingAttention"
                        className={`form-control ${formik.touched.billingAttention && formik.errors.billingAttention ? "is-invalid" : ""
                          }`}
                        {...formik.getFieldProps("billingAttention")}
                      />
                      {formik.touched.billingAttention && formik.errors.billingAttention && (
                        <div className="invalid-feedback">
                          {formik.errors.billingAttention}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="exampleFormControlInput1" className="form-label">
                      Remarks
                    </label>
                    <div className="input-group mb-3">
                      <textarea
                        className="form-control"
                        {...formik.getFieldProps("invoiceNotes")}
                        id="exampleFormControlTextarea1"
                        rows="5"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>

          
            </div>
          </div>
        </div>
    </form>
  </div>
  )
}

export default CustomerEdit
