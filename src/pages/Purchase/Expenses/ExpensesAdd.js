import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import api from "../../../config/URL";

function ExpensesAdd() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    expenseAcc: Yup.string().required("*Expense Account is required"),
    spendAt: Yup.string().required("*Spent At is required"),
    spendOn: Yup.string().required("*Spend On is required"),
    amount: Yup.string().required("*Amount is required"),
    paidThrough: Yup.string().required("*Paid Through is required"),
    // subTotalIncluding: Yup.string().required("*Sub Total Including is required"),
    // subTotalExcluding: Yup.string().required("*Sub Total Excluding is required"),
    total: Yup.string().required("*Total Amount is required"),
  });

  const formik = useFormik({
    initialValues: {
      expenseAcc: "",
      spendAt: "",
      spendOn: "",
      amount: "",
      paidThrough: "",
      vendor: "",
      description: "",
      attachment: "",
      // subTotalIncluding: "",
      // subTotalExcluding: "",
      tax: "",
      total: "",
    },

    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await api.post("/createTxnExpenses", values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 201) {
          console.log(response);
          toast.success(response.data.message);
          navigate("/expenses");
        }
      } catch (error) {
        toast.error("Error fetching data: ", error?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="container-fluid p-2 minHeight m-0">
        <div className="card shadow border-0 mb-2 top-header">
          <div className="container-fluid py-4">
            <div className="row align-items-center">
              <div className="col">
                <div className="d-flex align-items-center gap-4">
                  <h1 className="h4 ls-tight headingColor">Add Expense</h1>
                </div>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-end">
                  <Link to="/expenses">
                    <button type="submit" className="btn btn-sm btn-light">
                      <span>Back</span>
                    </button>
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-sm btn-button"
                    disabled={loading}
                  >
                    {loading ? (
                      <span
                        className="spinner-border spinner-border-sm"
                        aria-hidden="true"
                      ></span>
                    ) : (
                      <span></span>
                    )}
                    &nbsp;<span>Save</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Information */}
        <div className="card shadow border-0 my-2">
          <div className="container fw-bold fs-5 my-4">Expense Information</div>
          <div className="container mb-5">
            <div className="row py-4">
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Expense Account<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="expenseAcc"
                    className={`form-control  ${
                      formik.touched.expenseAcc && formik.errors.expenseAcc
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("expenseAcc")}
                  />
                  {formik.touched.expenseAcc && formik.errors.expenseAcc && (
                    <div className="invalid-feedback">
                      {formik.errors.expenseAcc}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Spent At<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="spendAt"
                    className={`form-control  ${
                      formik.touched.spendAt && formik.errors.spendAt
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("spendAt")}
                  />
                  {formik.touched.spendAt && formik.errors.spendAt && (
                    <div className="invalid-feedback">
                      {formik.errors.spendAt}
                    </div>
                  )}
                </div>
              </div>

              {/* <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Spent At 1<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <select
                    name="selectaccounttype"
                    {...formik.getFieldProps("selectaccounttype")}
                    className={`form-select    ${
                      formik.touched.selectaccounttype &&
                      formik.errors.selectaccounttype
                        ? "is-invalid"
                        : ""
                    }`}
                  >
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
              </div> */}
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Spend On<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="date"
                    name="spendOn"
                    className={`form-control  ${
                      formik.touched.spendOn && formik.errors.spendOn
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("spendOn")}
                  />
                  {formik.touched.spendOn && formik.errors.spendOn && (
                    <div className="invalid-feedback">
                      {formik.errors.spendOn}
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
                    className={`form-control  ${
                      formik.touched.amount && formik.errors.amount
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("amount")}
                  />
                  {formik.touched.amount && formik.errors.amount && (
                    <div className="invalid-feedback">
                      {formik.errors.amount}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Vendor
                </lable>
                <div className="mb-3">
                  <select
                    name="vendor"
                    {...formik.getFieldProps("vendor")}
                    className={`form-select    ${
                      formik.touched.vendor && formik.errors.vendor
                        ? "is-invalid"
                        : ""
                    }`}
                  >
                    <option selected></option>
                    <option value="Vendor 1">Vendor 1</option>
                    <option value="Vendor 2">Vendor 2</option>
                    <option value="Vendor 3">Vendor 3</option>
                    <option value="Vendor 4">Vendor 4</option>
                  </select>
                  {formik.touched.vendor && formik.errors.vendor && (
                    <div className="invalid-feedback">
                      {formik.errors.vendor}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Paid Through<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <select
                    name="paidThrough"
                    {...formik.getFieldProps("paidThrough")}
                    className={`form-select    ${
                      formik.touched.paidThrough && formik.errors.paidThrough
                        ? "is-invalid"
                        : ""
                    }`}
                  >
                    <option selected></option>
                    <option value="Petty Cash">Petty Cash</option>
                    <option value="Credit Card">Cash Account</option>
                    <option value="Advance Tax">Advance Tax</option>
                    <option value="Prepaid Expenses">Prepaid Expenses</option>
                  </select>
                  {formik.touched.paidThrough && formik.errors.paidThrough && (
                    <div className="invalid-feedback">
                      {formik.errors.paidThrough}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                Attachment
                </lable>
                <div className="mb-3">
                  <input
                    type="file"
                    name="attachment"
                    className={`form-control  ${
                      formik.touched.attachment && formik.errors.attachment
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("attachment")}
                  />
                  {formik.touched.attachment && formik.errors.attachment && (
                    <div className="invalid-feedback">
                      {formik.errors.attachment}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Tax
                </lable>
                <div className="mb-3">
                  <select
                    name="tax"
                    {...formik.getFieldProps("tax")}
                    className={`form-select    ${
                      formik.touched.tax && formik.errors.tax
                        ? "is-invalid"
                        : ""
                    }`}
                  >
                    <option selected></option>
                    <option value="Taxable">Taxable</option>
                    <option value="Non-Taxable">Non-Taxable</option>
                  </select>
                  {formik.touched.tax && formik.errors.tax && (
                    <div className="invalid-feedback">
                      {formik.errors.tax}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                Total Amount<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="total"
                    className={`form-control  ${
                      formik.touched.total && formik.errors.total
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("total")}
                  />
                  {formik.touched.total && formik.errors.total && (
                    <div className="invalid-feedback">
                      {formik.errors.total}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Description
                </lable>
                <div className="mb-3">
                  <textarea
                    type="text"
                    name="description"
                    rows="4"
                    className={`form-control  ${
                      formik.touched.description && formik.errors.description
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("description")}
                  />
                  {formik.touched.description && formik.errors.description && (
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

export default ExpensesAdd;
