import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function IncomeAdd() {
  const validationSchema = Yup.object({
    incometype: Yup.string().required("*Income Type is required"),
    reference: Yup.string().required("*Reference is required"),
    receivedvia: Yup.string().required("*Received Via is required"),
    date: Yup.date().required("* Date is required"),
    amount: Yup.string().required("*Amount is required"),
    description: Yup.string().required("*Description is required"),
    attachment: Yup.string().required("*Attachment is required"),
    // empEmail: Yup.string()
    // .matches(
    //   /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    //   "*Enter a valid email address"
    // )
    // .required("*Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      incometype: "",
      reference: "",
      receivedvia: "",
      date: "",
      amount: "",
      description: "",
      attachment: "",
  
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
                  <h1 className="h4 ls-tight headingColor">Add Income</h1>
                </div>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-end">
                  <Link to="/bank/view">
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
          <div className="container mb-5">
            <div className="row py-4">
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Income Type<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <select
                    name="incometype"
                    {...formik.getFieldProps("incometype")}
                    className={`form-select    ${formik.touched.incometype && formik.errors.incometype
                      ? "is-invalid"
                      : ""
                      }`}>
                    <option selected>None</option>
                    <option value="Labour">General Income</option>
                    <option value=" Internet Expenses">Discount</option>
                    <option value=" Add Expenses">Invoice</option>
                  </select>
                  {formik.touched.incometype &&
                    formik.errors.incometype && (
                      <div className="invalid-feedback">
                        {formik.errors.incometype}
                      </div>
                    )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                Reference#<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="reference"
                    className={`form-control  ${formik.touched.reference && formik.errors.reference
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("reference")}
                  />
                  {formik.touched.reference &&
                    formik.errors.reference && (
                      <div className="invalid-feedback">
                        {formik.errors.reference}
                      </div>
                    )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                Received Via<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="receivedvia"
                    className={`form-control  ${formik.touched.receivedvia && formik.errors.receivedvia
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("receivedvia")}
                  />
                  {formik.touched.receivedvia &&
                    formik.errors.receivedvia && (
                      <div className="invalid-feedback">
                        {formik.errors.receivedvia}
                      </div>
                    )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Date<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="date"
                    name="date"
                    className={`form-control  ${formik.touched.date && formik.errors.date
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("date")}
                  />
                  {formik.touched.date &&
                    formik.errors.date && (
                      <div className="invalid-feedback">
                        {formik.errors.date}
                      </div>
                    )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                Amount<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <select
                    name="amount"
                    {...formik.getFieldProps("amount")}
                    className={`form-select    ${formik.touched.amount && formik.errors.amount
                        ? "is-invalid"
                        : ""
                      }`}>
                    <option selected>None</option>
                    <option value="Cash">Cash</option>
                    <option value=" Credit card"> Credit card</option>
                    <option value="bank">Bank</option>
                  </select>
                  {formik.touched.amount &&
                    formik.errors.amount && (
                      <div className="invalid-feedback">
                        {formik.errors.amount}
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

              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                Attachment<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="file"
                    name="attachment"
                    className={`form-control  ${formik.touched.attachment && formik.errors.attachment
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("attachment")}
                  />
                  {formik.touched.attachment &&
                    formik.errors.attachment && (
                      <div className="invalid-feedback">
                        {formik.errors.attachment}
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

export default IncomeAdd