import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const CustomerAdd = () => {
  const formik = useFormik({
    initialValues: {
        customerType: "",
        customerName: "",
        companyName: "",
        customerEmail: "",
        customerPhone: "",
        panNumber: "",
        currency: "",
        billingCountry: "",
        shippingCountry: "",
        billingAddress: "",
        shippingAddress: "",
        billingCity: "",
        shippingCity: "",
        billingState: "",
        shippingState: "",
        billingZipCode: "",
        shippingZipCode: "",
        billingPhone: "",
        shippingPhone: "",
        
    },
    // validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("User Datas:", values);
    },
  });
  return (
    <div className="container-fluid minHeight m-0">
      <div className="card shadow border-0 mb-2 top-header">
        <div className="container-fluid py-4">
          <div className="row align-items-center">
            <div className="col">
              <div className="d-flex align-items-center gap-4">
                <h1 className="h4 ls-tight headingColor">Add Customer</h1>
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
                  onClick={formik.handleSubmit}
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
          <div className="container mb-5 mt-5">
            <div className="row py-4">
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">Customer Type</lable>
                <div className="mb-3 ms-2">
                  <label className="mx-3">
                    <input
                      type="radio"
                      name="customerType"
                      value="business"
                      className={`form-check-input mx-2`}
                      {...formik.getFieldProps("customerType")}
                    />
                    Business
                  </label>
                  <label className="mx-3">
                    <input
                      type="radio"
                      name="customerType"
                      value="individual"
                      className={`form-check-input mx-2`}
                      {...formik.getFieldProps("customerType")}
                    />
                    Individual
                  </label>
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">Customer Name</lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="customerName"
                    className={`form-control  ${
                      formik.touched.customerName && formik.errors.customerName
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("customerName")}
                  />
                </div>
              </div>

              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">Company Name</lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="companyName"
                    className={`form-control `}
                    {...formik.getFieldProps("companyName")}
                  />
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">Customer Email ID</lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="customerEmail"
                    className={`form-control `}
                    {...formik.getFieldProps("customerEmail")}
                  />
                </div>
              </div>

              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">Customer Phone</lable>
                <input
                  type="text"
                  name="customerPhone"
                  className={`form-control `}
                  {...formik.getFieldProps("customerPhone")}
                />
              </div>
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">PAN Number</lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="panNumber"
                    className={`form-control `}
                    {...formik.getFieldProps("panNumber")}
                  />
                </div>
              </div>

              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">Currency</lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="currency"
                    className={`form-control  `}
                    {...formik.getFieldProps("currency")}
                  />
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2"></div>
              <div className="container-fluid row mt-3">
                <div className="col-md-6 col-12 mb-2">
                  <h3 className="my-5">Billing Address</h3>
                  <lable className="form-lable">Billing Country</lable>
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
                  <lable className="form-lable">Shipping Country</lable>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="shippingCountry"
                      className={`form-control  `}
                      {...formik.getFieldProps("shippingCountry")}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <lable className="form-lable">Billing Address</lable>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="billingAddress"
                      className={`form-control  `}
                      {...formik.getFieldProps("billingAddress")}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <lable className="form-lable">Shipping Address</lable>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="shippingAddress"
                      className={`form-control  `}
                      {...formik.getFieldProps("shippingAddress")}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <lable className="form-lable">Billing City</lable>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="billingCity"
                      className={`form-control  `}
                      {...formik.getFieldProps("billingCity")}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <lable className="form-lable">Shipping City</lable>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="shippingCity"
                      className={`form-control  `}
                      {...formik.getFieldProps("shippingCity")}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <lable className="form-lable">Billing State</lable>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="billingState"
                      className={`form-control  `}
                      {...formik.getFieldProps("billingState")}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <lable className="form-lable">Shipping State</lable>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="shippingState"
                      className={`form-control  `}
                      {...formik.getFieldProps("shippingState")}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <lable className="form-lable">Billing Zip Code</lable>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="billingZipCode"
                      className={`form-control  `}
                      {...formik.getFieldProps("billingZipCode")}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <lable className="form-lable">Shipping Zip Code</lable>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="shippingZipCode"
                      className={`form-control  `}
                      {...formik.getFieldProps("shippingZipCode")}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <lable className="form-lable">Billing Phone</lable>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="billingPhone"
                      className={`form-control  `}
                      {...formik.getFieldProps("billingPhone")}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <lable className="form-lable">Shipping Phone</lable>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="shippingPhone"
                      className={`form-control  `}
                      {...formik.getFieldProps("shippingPhone")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CustomerAdd;
