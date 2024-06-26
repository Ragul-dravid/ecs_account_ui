import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function ExpenseAdd() {
  const validationSchema = Yup.object({
    expenseAcc: Yup.string().required("*Expense Account is required"),
    date: Yup.date().required("* Date is required"),
    amount: Yup.string().required("*Ammount is required"),
    invoice: Yup.string().required("*Invoice is required"),
    customerName: Yup.string().required("*Customer Name is required"),
    vendor: Yup.string().required("*vendorendor is required"),
    // GSTlegalname: Yup.string().required("* GST legal Name is required"),
    // GSTnumber: Yup.string().required("*GST Number is required"),
    // tax: Yup.string().required("*Tax is required"),
    // GSTaddress: Yup.string().required("* GST Address is required"),
    attachment: Yup.string().required("*GST Number is required"),
    notes: Yup.string().required("*Notes is required"),
    // empEmail: Yup.string()
    // .matches(
    //   /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    //   "*Enter a valid email address"
    // )
    // .required("*Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      expenseAcc: "",
      date: "",
      amount: "",
      invoice: "",
      customerName: "",
      vendor: "",
      // GSTlegalname: "",
      // GSTnumber: "",
      // tax: "",
      // GSTaddress: "",
      attachment: "",
      notes: ""
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
                  <h1 className="h4 ls-tight headingColor">Add Expense</h1>
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
                  Expense Account<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <select
                    name="expenseAcc"
                    {...formik.getFieldProps("expenseAcc")}
                    className={`form-select    ${formik.touched.expenseAcc && formik.errors.expenseAcc
                      ? "is-invalid"
                      : ""
                      }`}>
                    <option selected>None</option>
                    <option value="Labour">Labour</option>
                    <option value=" Internet Expenses">Internet Expenses</option>
                    <option value=" Add Expenses">Add Expenses</option>
                  </select>
                  {formik.touched.expenseAcc &&
                    formik.errors.expenseAcc && (
                      <div className="invalid-feedback">
                        {formik.errors.expenseAcc}
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
                  <input
                    type="text"
                    name="amount"
                    className={`form-control  ${formik.touched.amount && formik.errors.amount
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("amount")}
                  />
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
                  Vendor<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <select
                    name="vendor"
                    {...formik.getFieldProps("vendor")}
                    className={`form-select    ${formik.touched.vendor && formik.errors.vendor
                      ? "is-invalid"
                      : ""
                      }`}>
                    <option selected>None</option>
                    <option value="INR">Harish</option>
                    <option value="USD">Ragav</option>
                    <option value="EUR">Add Vendor</option>
                  </select>
                  {formik.touched.vendor &&
                    formik.errors.vendor && (
                      <div className="invalid-feedback">
                        {formik.errors.vendor}
                      </div>
                    )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Invoice#<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="invoice"
                    className={`form-control  ${formik.touched.invoice && formik.errors.invoice
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("invoice")}
                  />
                  {formik.touched.invoice &&
                    formik.errors.invoice && (
                      <div className="invalid-feedback">
                        {formik.errors.invoice}
                      </div>
                    )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Customer Name<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <select
                    name="customerName"
                    {...formik.getFieldProps("customerName")}
                    className={`form-select    ${formik.touched.customerName && formik.errors.customerName
                      ? "is-invalid"
                      : ""
                      }`}>
                    <option selected>None</option>
                    <option value="INR">Harish</option>
                    <option value="USD">Ragav</option>
                    <option value="EUR">Add Customer</option>
                  </select>
                  {formik.touched.customerName &&
                    formik.errors.customerName && (
                      <div className="invalid-feedback">
                        {formik.errors.customerName}
                      </div>
                    )}
                </div>
              </div>

              {/* <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  GST legal Name<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="GSTlegalname"
                    className={`form-control  ${formik.touched.GSTlegalname && formik.errors.GSTlegalname
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("GSTlegalname")}
                  />
                  {formik.touched.GSTlegalname &&
                    formik.errors.GSTlegalname && (
                      <div className="invalid-feedback">
                        {formik.errors.GSTlegalname}
                      </div>
                    )}
                </div>
              </div> */}

              {/* <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  GST Number<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="GSTnumber"
                    className={`form-control  ${formik.touched.GSTnumber && formik.errors.GSTnumber
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("GSTnumber")}
                  />
                  {formik.touched.GSTnumber &&
                    formik.errors.GSTnumber && (
                      <div className="invalid-feedback">
                        {formik.errors.GSTnumber}
                      </div>
                    )}
                </div>
              </div> */}

              {/* <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Tax<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="tax"
                    className={`form-control  ${formik.touched.tax && formik.errors.tax
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("tax")}
                  />
                  {formik.touched.tax &&
                    formik.errors.tax && (
                      <div className="invalid-feedback">
                        {formik.errors.tax}
                      </div>
                    )}
                </div>
              </div> */}

              {/* <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  GST address<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="GSTaddress"
                    className={`form-control  ${formik.touched.GSTaddress && formik.errors.GSTaddress
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("GSTaddress")}
                  />
                  {formik.touched.GSTaddress &&
                    formik.errors.GSTaddress && (
                      <div className="invalid-feedback">
                        {formik.errors.GSTaddress}
                      </div>
                    )}
                </div>
              </div> */}

              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Attach Receipt<span className="text-danger">*</span>
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

              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Notes<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="notes"
                    className={`form-control  ${formik.touched.notes && formik.errors.notes
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("notes")}
                  />
                  {formik.touched.notes &&
                    formik.errors.notes && (
                      <div className="invalid-feedback">
                        {formik.errors.notes}
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

export default ExpenseAdd