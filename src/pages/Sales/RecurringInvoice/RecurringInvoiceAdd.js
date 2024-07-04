import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import Items from "../../Items/Items";

const validationSchema = Yup.object().shape({
  customerId: Yup.string().required("*Customer Name is required"),
  transactionEveryNo: Yup.number()
    .typeError("*Transaction Every No must be a number")
    .required("*Transaction Every No is required"),
  transactionEvery: Yup.string().required("*Transaction Every is required"),
  invoiceDate: Yup.date().required("*Invoice Date is required"),
  dueDate: Yup.date().required("*Due Date is required"),
  endDate: Yup.date().required("*End Date is required"),
  amountsAre: Yup.string().required("*Amounts Are is required"),
  invoiceFrom: Yup.string().required("*Invoice From is required"),
  currency: Yup.string().required("*Currency is required"),
  total: Yup.number()
    .typeError("*Total must be a number")
    .required("*Total is required"),
  items: Yup.array().of(
    Yup.object().shape({
      item: Yup.string().required("*Item Details is required"),
      qty: Yup.number()
        .typeError("*Quantity must be a number")
        .required("*Quantity is required"),
      taxRate: Yup.number()
        .typeError("*Rate must be a number")
        .required("*Rate is required"),
      disc: Yup.number()
        .typeError("*Discount must be a number")
        .required("*Discount is required"),
      tax: Yup.string().required("*Tax is required"),
      amount: Yup.number()
        .typeError("*Amount must be a number")
        .required("*Amount is required"),
    })
  ),
  notes: Yup.string().required("*Notes is required"),
  subTotal: Yup.number()
    .typeError("*Sub Total must be a number")
    .required("*Sub Total is required"),
  tax: Yup.number()
    .typeError("*Tax must be a number")
    .required("*Tax is required"),
  totalAmount: Yup.number()
    .typeError("*Total Amount must be a number")
    .required("*Total Amount is required"),
  file: Yup.mixed().required("*A file is required"),
});

const RecurringInvoiceAdd = () => {
  const navigate = useNavigate();
  const [loading, setLoadIndicator] = useState(false);

  const formik = useFormik({
    initialValues: {
      customerId: "",
      transactionEveryNo: "",
      transactionEvery: "",
      invoiceDate: "",
      dueDate: "",
      endDate: "",
      amountsAre: "",
      invoiceFrom: "",
      currency: "",
      total: "",
      items: [
        {
          item: "",
          qty: "",
          taxRate: "",
          disc: "",
          tax: "",
          amount: "",
        },
      ],
      notes: "",
      subTotal: "",
      tax: "",
      totalAmount: "",
      termsAndconditions: "",
      file: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      console.log("Create Tnx :", values);
      const { items, file,invoiceDate,endDate,dueDate, ...value } = values;
      const formData = new FormData();   
      
      Object.entries(value).forEach(([key, value]) => {
        if (value !== undefined) {
            formData.append(key, value);
        }
      });
       items.forEach((item)=>{
        formData.append("item",item.item)
        formData.append("qty",item.qty)
        formData.append("disc",item.disc)
        formData.append("amount",item.amount)
       })
      if (file) {
        formData.append("files", file);
      }
      
      try {
        const response = await api.post(
          "/createRecurringInvoiceAndRecurringInvoiceItems",
          formData
        );
        if (response.status === 201) {
          toast.success(response.data.message);
          navigate("/invoice");
        }
      } catch (e) {
        toast.error("Error fetching data: ", e?.response?.data?.message);
      } finally {
        setLoadIndicator(false);
      }
    },
  });
  const addRow = () => {
    formik.setFieldValue("items", [
      ...formik.values.items,
      { item: "", qty: "", taxRate: "", disc: "", tax: "", amount: "" },
    ]);
  };

  const removeRow = () => {
    const items = [...formik.values.items];
    if (items.length > 1) {
      items.pop();
      formik.setFieldValue("items", items);
    }
  };

  return (
    <div className="container-fluid p-2 minHeight m-0">
      <form onSubmit={formik.handleSubmit}>
        <div className="card shadow border-0 mb-2 top-header">
          <div className="container-fluid py-4">
            <div className="row align-items-center">
              <div className="col">
                <div className="d-flex align-items-center gap-4">
                  <h1 className="h4 ls-tight headingColor">
                    Add Recurring Invoice
                  </h1>
                </div>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-end">
                  <Link to="/invoice">
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
        <div className="card shadow border-0 my-2">
          <div className="container mb-5 mt-5">
            <div className="row py-4">
              <div className="col-md-6 col-12 mb-3">
                <lable className="form-lable">
                  Customer Name<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <select
                    {...formik.getFieldProps("customerId")}
                    className={`form-select    ${
                      formik.touched.customerId && formik.errors.customerId
                        ? "is-invalid"
                        : ""
                    }`}
                  >
                    <option></option>
                    <option value="1">Manikandan</option>
                    <option value="3">Rahul</option>
                  </select>
                  {formik.touched.customerId && formik.errors.customerId && (
                    <div className="invalid-feedback">
                      {formik.errors.customerId}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-3">
                <lable className="form-lable">
                  Transaction Every No<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    className={`form-control  ${
                      formik.touched.transactionEveryNo &&
                      formik.errors.transactionEveryNo
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("transactionEveryNo")}
                  />
                  {formik.touched.transactionEveryNo &&
                    formik.errors.transactionEveryNo && (
                      <div className="invalid-feedback">
                        {formik.errors.transactionEveryNo}
                      </div>
                    )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-3">
                <lable className="form-lable">
                  Transaction Every<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    className={`form-control  ${
                      formik.touched.transactionEvery &&
                      formik.errors.transactionEvery
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("transactionEvery")}
                  />
                  {formik.touched.transactionEvery &&
                    formik.errors.transactionEvery && (
                      <div className="invalid-feedback">
                        {formik.errors.transactionEvery}
                      </div>
                    )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-3">
                <lable className="form-lable">
                  Invoice Date<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="date"
                    className={`form-control ${
                      formik.touched.invoiceDate && formik.errors.invoiceDate
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("invoiceDate")}
                  />
                  {formik.touched.invoiceDate && formik.errors.invoiceDate && (
                    <div className="invalid-feedback">
                      {formik.errors.invoiceDate}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-3">
                <lable className="form-lable">
                  Due Date<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="date"
                    className={`form-control ${
                      formik.touched.dueDate && formik.errors.dueDate
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("dueDate")}
                  />
                  {formik.touched.dueDate && formik.errors.dueDate && (
                    <div className="invalid-feedback">
                      {formik.errors.dueDate}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-3">
                <lable className="form-lable">
                  End Date<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="date"
                    className={`form-control  ${
                      formik.touched.endDate && formik.errors.endDate
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("endDate")}
                  />
                  {formik.touched.endDate && formik.errors.endDate && (
                    <div className="invalid-feedback">
                      {formik.errors.endDate}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-3">
                <lable className="form-lable">
                  Amounts Are<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <select
                    name="amountsAre"
                    {...formik.getFieldProps("amountsAre")}
                    className={`form-control  ${
                      formik.touched.amountsAre && formik.errors.amountsAre
                        ? "is-invalid"
                        : ""
                    }`}
                  >
                    <option></option>
                    <option value="TAX_EXCLUSIVE">Tax Exclusive</option>
                    <option value="TAX_INCLUSIVE">Tax Inclusive</option>
                    <option value="NO_TAX">No Tax</option>
                  </select>
                  {formik.touched.amountsAre && formik.errors.amountsAre && (
                    <div className="invalid-feedback">
                      {formik.errors.amountsAre}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-3">
                <lable className="form-lable">
                  Invoice From<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    className={`form-control  ${
                      formik.touched.invoiceFrom && formik.errors.invoiceFrom
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("invoiceFrom")}
                  />
                  {formik.touched.invoiceFrom && formik.errors.invoiceFrom && (
                    <div className="invalid-feedback">
                      {formik.errors.invoiceFrom}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-3">
                <lable className="form-lable">
                  Currency<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    className={`form-control  ${
                      formik.touched.currency && formik.errors.currency
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("currency")}
                  />
                  {formik.touched.currency && formik.errors.currency && (
                    <div className="invalid-feedback">
                      {formik.errors.currency}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Upload File<span className="text-danger">*</span>
                </label>
                <div className="mb-3">
                  <input
                    type="file"
                    className={`form-control ${
                      formik.touched.file && formik.errors.file
                        ? "is-invalid"
                        : ""
                    }`}
                    onChange={(event) => {
                      formik.setFieldValue(
                        "file",
                        event.currentTarget.files[0]
                      );
                    }}
                  />
                  {formik.touched.file && formik.errors.file && (
                    <div className="invalid-feedback">{formik.errors.file}</div>
                  )}
                </div>
              </div>

              <div className="col-12 mb-3 ">
                <div className="d-flex align-items-end justify-content-end">
                  <label className="col-form-label">
                    Total<span className="text-danger">*</span>&nbsp;&nbsp;
                  </label>
                  <div className="overflow-x-auto" >
                    <input
                      name="total"
                      {...formik.getFieldProps("total")}
                      className={`form-control  ${
                        formik.touched.total && formik.errors.total
                          ? "is-invalid"
                          : ""
                      }`}
                      style={{ width: "100%" }}
                    ></input>
                  </div>
                {/* {formik.touched.total && formik.errors.total && (
                  <div className="">
                    <small className="text-danger" >{formik.errors.total}</small>
                  </div>
                )} */}
                </div>
              </div>

              <div className="row">
                <div className="">
                  <h3
                    style={{ background: "#4066D5" }}
                    className="text-light p-2"
                  >
                    Item Table
                  </h3>
                </div>
                <div className="table-responsive">
                  <table class="table ">
                    <thead>
                      <tr>
                        <th scope="col">S.NO</th>
                        <th scope="col">ITEM DETAILS</th>
                        <th scope="col">QUANTITY</th>
                        <th scope="col">RATE</th>
                        <th scope="col">DISCOUNT</th>
                        <th scope="col">TAX</th>
                        <th scope="col">AMOUNT</th>
                      </tr>
                    </thead>
                    <tbody className="table-group">
                      {formik.values.items.map((item, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>
                            <select
                              {...formik.getFieldProps(`items[${index}].item`)}
                              className={`form-select ${
                                formik.touched.items?.[index]?.item &&
                                formik.errors.items?.[index]?.item
                                  ? "is-invalid"
                                  : ""
                              }`}
                            >
                              <option value=""></option>
                              <option value="Apple">Apple</option>
                              <option value="Orange">Orange</option>
                            </select>
                            {formik.touched.items?.[index]?.item &&
                              formik.errors.items?.[index]?.item && (
                                <div className="invalid-feedback">
                                  {formik.errors.items[index].item}
                                </div>
                              )}
                          </td>
                          <td>
                            <input
                              type="text"
                              className={`form-control ${
                                formik.touched.items?.[index]?.qty &&
                                formik.errors.items?.[index]?.qty
                                  ? "is-invalid"
                                  : ""
                              }`}
                              {...formik.getFieldProps(`items[${index}].qty`)}
                            />
                            {formik.touched.items?.[index]?.qty &&
                              formik.errors.items?.[index]?.qty && (
                                <div className="invalid-feedback">
                                  {formik.errors.items[index].qty}
                                </div>
                              )}
                          </td>
                          <td>
                            <input
                              type="text"
                              className={`form-control ${
                                formik.touched.items?.[index]?.taxRate &&
                                formik.errors.items?.[index]?.taxRate
                                  ? "is-invalid"
                                  : ""
                              }`}
                              {...formik.getFieldProps(
                                `items[${index}].taxRate`
                              )}
                            />
                            {formik.touched.items?.[index]?.taxRate &&
                              formik.errors.items?.[index]?.taxRate && (
                                <div className="invalid-feedback">
                                  {formik.errors.items[index].taxRate}
                                </div>
                              )}
                          </td>
                          <td>
                            <input
                              type="text"
                              className={`form-control ${
                                formik.touched.items?.[index]?.disc &&
                                formik.errors.items?.[index]?.disc
                                  ? "is-invalid"
                                  : ""
                              }`}
                              {...formik.getFieldProps(`items[${index}].disc`)}
                            />
                            {formik.touched.items?.[index]?.disc &&
                              formik.errors.items?.[index]?.disc && (
                                <div className="invalid-feedback">
                                  {formik.errors.items[index].disc}
                                </div>
                              )}
                          </td>
                          <td>
                            <select
                              {...formik.getFieldProps(`items[${index}].tax`)}
                              className={`form-select ${
                                formik.touched.items?.[index]?.tax &&
                                formik.errors.items?.[index]?.tax
                                  ? "is-invalid"
                                  : ""
                              }`}
                            >
                              <option value=""></option>
                              <option value="Commission">Commission</option>
                              <option value="Brokerage">Brokerage</option>
                            </select>
                            {formik.touched.items?.[index]?.tax &&
                              formik.errors.items?.[index]?.tax && (
                                <div className="invalid-feedback">
                                  {formik.errors.items[index].tax}
                                </div>
                              )}
                          </td>
                          <td>
                            <input
                              type="text"
                              className={`form-control ${
                                formik.touched.items?.[index]?.amount &&
                                formik.errors.items?.[index]?.amount
                                  ? "is-invalid"
                                  : ""
                              }`}
                              {...formik.getFieldProps(
                                `items[${index}].amount`
                              )}
                            />
                            {formik.touched.items?.[index]?.amount &&
                              formik.errors.items?.[index]?.amount && (
                                <div className="invalid-feedback">
                                  {formik.errors.items[index].amount}
                                </div>
                              )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <button
                  className="btn btn-button btn-sm my-4 mx-1"
                  type="button"
                  onClick={addRow}
                >
                  Add row
                </button>
                {formik.values.items.length > 1 && (
                  <button
                    className="btn btn-sm my-4 mx-1 delete border-danger bg-white text-danger"
                    onClick={removeRow}
                  >
                    Delete
                  </button>
                )}
              </div>
              <div className="row mt-5 pt-0">
                <div className="col-md-6 col-12 mb-3 pt-0">
                  <lable className="form-lable">
                    Customer Notes<span className="text-danger">*</span>
                  </lable>
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="Will be display on the Invoice"
                      className={`form-control  ${
                        formik.touched.notes && formik.errors.notes
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps("notes")}
                    />
                    {formik.touched.notes && formik.errors.notes && (
                      <div className="invalid-feedback">
                        {formik.errors.notes}
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className="col-md-6 col-12 mt-5 rounded"
                  style={{ border: "1px solid lightgrey" }}
                >
                  <div className="row mb-3 mt-2">
                    <label className="col-sm-4 col-form-label">
                      Sub Total<span className="text-danger">*</span>
                    </label>
                    <div className="col-sm-4"></div>
                    <div className="col-sm-4">
                      <input
                        type="text"
                        className={`form-control ${
                          formik.touched.subTotal && formik.errors.subTotal
                            ? "is-invalid"
                            : ""
                        }`}
                        {...formik.getFieldProps("subTotal")}
                      />
                      {formik.touched.subTotal && formik.errors.subTotal && (
                        <div className="invalid-feedback">
                          {formik.errors.subTotal}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-sm-4 col-form-label">
                      Total Tax<span className="text-danger">*</span>
                    </label>
                    <div className="col-sm-4"></div>
                    <div className="col-sm-4">
                      <input
                        type="text"
                        className={`form-control ${
                          formik.touched.tax && formik.errors.tax
                            ? "is-invalid"
                            : ""
                        }`}
                        {...formik.getFieldProps("tax")}
                      />
                      {formik.touched.tax && formik.errors.tax && (
                        <div className="invalid-feedback">
                          {formik.errors.tax}
                        </div>
                      )}
                    </div>
                  </div>

                  <hr />
                  <div className="row mb-3 mt-2">
                    <label className="col-sm-4 col-form-label">Total</label>
                    <div className="col-sm-4"></div>
                    <div className="col-sm-4">
                      <input
                        type="text"
                        className={`form-control ${
                          formik.touched.totalAmount &&
                          formik.errors.totalAmount
                            ? "is-invalid"
                            : ""
                        }`}
                        {...formik.getFieldProps("totalAmount")}
                      />
                      {formik.touched.totalAmount &&
                        formik.errors.totalAmount && (
                          <div className="invalid-feedback">
                            {formik.errors.totalAmount}
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-12 mb-3">
                  <lable className="form-lable">
                    Terms & Conditions<span className="text-danger">*</span>
                  </lable>
                  <div className="mb-3">
                    <textarea
                      className={`form-control  ${
                        formik.touched.termsAndconditions &&
                        formik.errors.termsAndconditions
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps("termsAndconditions")}
                    />
                    {formik.touched.termsAndconditions &&
                      formik.errors.termsAndconditions && (
                        <div className="invalid-feedback">
                          {formik.errors.termsAndconditions}
                        </div>
                      )}
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

export default RecurringInvoiceAdd;
