import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function BankEdit() {
  const validationSchema = Yup.object({
    selectaccounttype: Yup.string().required("*Select Account Type is required"),
    accountName: Yup.string().required("*Account Name is required"),
    currency: Yup.string().required("*Currency is required"),
    accountNumber: Yup.string().required("*Account Number is required"),
    ifsc: Yup.string().required("*IFSC code is required"),
    bankName: Yup.string().required("*Bank Name is required"),
    description: Yup.string().required("*Description is required"),
    // empEmail: Yup.string()
    // .matches(
    //   /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    //   "*Enter a valid email address"
    // )
    // .required("*Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      selectaccounttype: "Bank",
      accountName: "Harishragavendhar",
      currency: "EUR",
      accountNumber: "6385921329",
      ifsc: "IDIB0000E032",
      bankName: "INDIAN BANK",
      description: "Nothing"
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Bank Datas:", values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="container-fluid minHeight m-0">
        <div
          className="card shadow border-0 mb-2 top-header">
          <div className="container-fluid py-4">
            <div className="row align-items-center">
              <div className="col">
                <div className="d-flex align-items-center gap-4">
                  <h1 className="h4 ls-tight headingColor">Add Bank</h1>
                </div>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-end">
                  <Link to="/bank">
                    <button type="submit" className="btn btn-sm btn-light">
                      <span>Back</span>
                    </button>
                  </Link>
                  <button type="submit" className="btn btn-button">
                    <span>Save</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>



        {/* User Information */}
        <div className="card shadow border-0 my-2">
          <div className="container fw-bold fs-5 my-4">
            Bank Information
          </div>
          <div className="container mb-5">
            <div className="row py-4">
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Select Account Type<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <select
                    name="selectaccounttype"
                    {...formik.getFieldProps("selectaccounttype")}
                    className={`form-select    ${formik.touched.selectaccounttype && formik.errors.selectaccounttype
                        ? "is-invalid"
                        : ""
                      }`}>
                    <option selected>None</option>
                    <option value="Bank">Bank</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="pretty cash"> pretty cash</option>
                    <option value="Undeposited Fund">Undeposited Fund</option>
                  </select>
                  {formik.touched.selectaccounttype &&
                    formik.errors.selectaccounttype && (
                      <div className="invalid-feedback">
                        {formik.errors.selectaccounttype}
                      </div>
                    )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Account Name<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="accountName"
                    className={`form-control  ${formik.touched.accountName && formik.errors.accountName
                        ? "is-invalid"
                        : ""
                      }`}
                    {...formik.getFieldProps("accountName")}
                  />
                  {formik.touched.accountName &&
                    formik.errors.accountName && (
                      <div className="invalid-feedback">
                        {formik.errors.accountName}
                      </div>
                    )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Currency<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <select
                    name="currency"
                    {...formik.getFieldProps("currency")}
                    className={`form-select    ${formik.touched.currency && formik.errors.currency
                        ? "is-invalid"
                        : ""
                      }`}>
                    <option selected>None</option>
                    <option value="INR">INR</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="UAD">UAD</option>
                  </select>
                  {formik.touched.currency &&
                    formik.errors.currency && (
                      <div className="invalid-feedback">
                        {formik.errors.currency}
                      </div>
                    )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Account Number<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="accountNumber"
                    className={`form-control  ${formik.touched.accountNumber && formik.errors.accountNumber
                        ? "is-invalid"
                        : ""
                      }`}
                    {...formik.getFieldProps("accountNumber")}
                  />
                  {formik.touched.accountNumber &&
                    formik.errors.accountNumber && (
                      <div className="invalid-feedback">
                        {formik.errors.accountNumber}
                      </div>
                    )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  IFSC<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="ifsc"
                    className={`form-control  ${formik.touched.ifsc && formik.errors.ifsc
                        ? "is-invalid"
                        : ""
                      }`}
                    {...formik.getFieldProps("ifsc")}
                  />
                  {formik.touched.ifsc &&
                    formik.errors.ifsc && (
                      <div className="invalid-feedback">
                        {formik.errors.ifsc}
                      </div>
                    )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Bank Name<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="bankName"
                    className={`form-control  ${formik.touched.bankName && formik.errors.bankName
                        ? "is-invalid"
                        : ""
                      }`}
                    {...formik.getFieldProps("bankName")}
                  />
                  {formik.touched.bankName &&
                    formik.errors.bankName && (
                      <div className="invalid-feedback">
                        {formik.errors.bankName}
                      </div>
                    )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Description<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="description"
                    className={`form-control  ${formik.touched.description && formik.errors.description
                        ? "is-invalid"
                        : ""
                      }`}
                    {...formik.getFieldProps("description")}
                  />
                  {formik.touched.description &&
                    formik.errors.description && (
                      <div className="invalid-feedback">
                        {formik.errors.description}
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default BankEdit