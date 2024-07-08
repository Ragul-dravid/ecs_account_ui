import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import fetchAllCustomerWithIds from "../../List/CustomerList";
import fetchAllItemWithIds from "../../List/ItemList";

const validationSchema = Yup.object().shape({
  customerName: Yup.string().required("*Customer Name is required"),
  amountReceived: Yup.number()
    .typeError("*Amount must be a number")
    .required("*Amount is required"),
    reference: Yup.string().required("*Reference is required"),
    bankCharges: Yup.string().required("*Bank Charges is required"),
    paymentDate: Yup.date().required("*Payment Date is required"),
    payment:  Yup.number()
    .typeError("*Payment must be a number")
    .required("*Payment is required"),
    depositTo: Yup.string().required("*Amounts Are is required"),
    taxDeducted: Yup.string().required("*Tax Deducted is required"),
    tdsTaxAccount: Yup.string().required("*Tds Tax Account is required"),
    total: Yup.number().typeError("*Total must be a number").required("*Total is required"),
    amtRefunded: Yup.number().typeError("*Amt Refunded must be a number").required("*Amt Refunded is required"),
    amountExcess: Yup.number().typeError("*Amount Excess must be a number").required("*Amount Excess is required"),
});

const PaymentReceivedAdd = () => {
  const navigate = useNavigate();
  const [loading, setLoadIndicator] = useState(false);
  const [items, setItems] = useState([]);
  const [customerData, setCustomerData] = useState([]);

  const formik = useFormik({
    initialValues: {
      customerName: "",
      amountReceived: "",
      reference: "",
      bankCharges: "",
      paymentDate: "",
      payment: "",
      depositTo: "",
      taxDeducted: "",
      tdsTaxAccount: "",
      total: "",
      amtRefunded: "",
      amountExcess: "",
      notes: "",
      attachment: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      console.log("Create Tnx :", values);
      const {attachment,...value}=values
      try {
        const response = await api.post(
          "/createTxnPaymentsReceived",
          value
        );
        if (response.status === 201) {
          toast.success(response.data.message);
          navigate("/paymentReceived");
        }
      } catch (e) {
        toast.error("Error fetching data: ", e?.response?.data?.message);
      } finally {
        setLoadIndicator(false);
      }
    },
  });


  const fetchData = async () => {
    try {
      const customerData = await fetchAllCustomerWithIds();
      const itemData = await fetchAllItemWithIds();
      setCustomerData(customerData);
      setItems(itemData);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="container-fluid p-2 minHeight m-0">
      <form onSubmit={formik.handleSubmit}>
        <div className="card shadow border-0 mb-2 top-header">
          <div className="container-fluid py-4">
            <div className="row align-items-center">
              <div className="col">
                <div className="d-flex align-items-center gap-4">
                  <h1 className="h4 ls-tight headingColor">
                    Add Payment Received
                  </h1>
                </div>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-end">
                  <Link to="/paymentReceived">
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
                    {...formik.getFieldProps("customerName")}
                    className={`form-select    ${
                      formik.touched.customerName && formik.errors.customerName
                        ? "is-invalid"
                        : ""
                    }`}
                  >
                    <option value=""> </option>
                    {customerData &&
                      customerData.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.contactName}
                        </option>
                      ))}
                  </select>
                  {formik.touched.customerName && formik.errors.customerName && (
                    <div className="invalid-feedback">
                      {formik.errors.customerName}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-3">
                <lable className="form-lable">
                Amount Received<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    className={`form-control  ${
                      formik.touched.amountReceived &&
                      formik.errors.amountReceived
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("amountReceived")}
                  />
                  {formik.touched.amountReceived &&
                    formik.errors.amountReceived && (
                      <div className="invalid-feedback">
                        {formik.errors.amountReceived}
                      </div>
                    )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-3">
                <lable className="form-lable">
                Reference<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    className={`form-control  ${
                      formik.touched.reference &&
                      formik.errors.reference
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

              <div className="col-md-6 col-12 mb-3">
                <lable className="form-lable">
                Bank Charges<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    className={`form-control ${
                      formik.touched.bankCharges && formik.errors.bankCharges
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("bankCharges")}
                  />
                  {formik.touched.bankCharges && formik.errors.bankCharges && (
                    <div className="invalid-feedback">
                      {formik.errors.bankCharges}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-3">
                <lable className="form-lable">
                Payment Date<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="date"
                    className={`form-control ${
                      formik.touched.paymentDate && formik.errors.paymentDate
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("paymentDate")}
                  />
                  {formik.touched.paymentDate && formik.errors.paymentDate && (
                    <div className="invalid-feedback">
                      {formik.errors.paymentDate}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-3">
                <lable className="form-lable">
                Payment<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    className={`form-control  ${
                      formik.touched.payment && formik.errors.payment
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("payment")}
                  />
                  {formik.touched.payment && formik.errors.payment && (
                    <div className="invalid-feedback">
                      {formik.errors.payment}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-3">
                <lable className="form-lable">
                Tax Deducted<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <select
                    name="taxDeducted"
                    {...formik.getFieldProps("taxDeducted")}
                    className={`form-select  ${
                      formik.touched.taxDeducted && formik.errors.taxDeducted
                        ? "is-invalid"
                        : ""
                    }`}
                  >
                    <option></option>
                    <option value="NO_TAX_DEDUCTED">NO TAX DEDUCTED</option>
                    {/* <option value="TAX_INCLUSIVE">Tax Inclusive</option>
                    <option value="NO_TAX">No Tax</option> */}
                  </select>
                  {formik.touched.taxDeducted && formik.errors.taxDeducted && (
                    <div className="invalid-feedback">
                      {formik.errors.taxDeducted}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-3">
                <lable className="form-lable">
                Deposit To<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    className={`form-control  ${
                      formik.touched.depositTo && formik.errors.depositTo
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("depositTo")}
                  />
                  {formik.touched.depositTo && formik.errors.depositTo && (
                    <div className="invalid-feedback">
                      {formik.errors.depositTo}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-3">
                <lable className="form-lable">
                  Tds Tax Account<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    className={`form-control  ${
                      formik.touched.tdsTaxAccount && formik.errors.tdsTaxAccount
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("tdsTaxAccount")}
                  />
                  {formik.touched.tdsTaxAccount && formik.errors.tdsTaxAccount && (
                    <div className="invalid-feedback">
                      {formik.errors.tdsTaxAccount}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label mb-0">
                  Upload File
                </label>
                <div className="mb-3">
                  <input
                    type="file"
                    className={`form-control ${
                      formik.touched.attachment && formik.errors.attachment
                        ? "is-invalid"
                        : ""
                    }`}
                    onChange={(event) => {
                      formik.setFieldValue(
                        "attachment",
                        event.currentTarget.files[0]
                      );
                    }}
                  />
                  {formik.touched.attachment && formik.errors.attachment && (
                    <div className="invalid-feedback">{formik.errors.attachment}</div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-3">
                <lable className="form-lable">
                Amount Excess<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    className={`form-control  ${
                      formik.touched.amountExcess && formik.errors.amountExcess
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("amountExcess")}
                  />
                  {formik.touched.amountExcess && formik.errors.amountExcess && (
                    <div className="invalid-feedback">
                      {formik.errors.amountExcess}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-3">
                <lable className="form-lable">
                Amt Refunded<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    className={`form-control  ${
                      formik.touched.amtRefunded && formik.errors.amtRefunded
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("amtRefunded")}
                  />
                  {formik.touched.amtRefunded && formik.errors.amtRefunded && (
                    <div className="invalid-feedback">
                      {formik.errors.amtRefunded}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-3">
                <lable className="form-lable">
                Total
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
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
              <div className="col-md-6 col-12 mb-3">
                <lable className="form-lable">
                Notes
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
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
              
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default PaymentReceivedAdd
