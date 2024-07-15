import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import fetchAllCustomerWithIds from "../../List/CustomerList";
import fetchAllItemWithIds from "../../List/ItemList";
import { MdDeleteSweep } from "react-icons/md";

function EstimateAdd() {
  const navigate = useNavigate();
  const [loading, setLoadIndicator] = useState(false);
  const [customerData, setCustomerData] = useState(null);
  const [itemData, setItemData] = useState(null);
  const [rows, setRows] = useState([{}]);
  const [rowss, setRowss] = useState(false);
  const addRow = () => {
    formik.setFieldValue("txnQuotesItems", [
      ...formik.values.txnQuotesItems,
      { item: "", qty: "", price: "", disc: "", taxRate: "", taxAmount: "" },
    ]);
  };

  const removeRow = () => {
    const txnQuotesItems = [...formik.values.txnQuotesItems];
    if (txnQuotesItems.length > 1) {
      txnQuotesItems.pop();
      formik.setFieldValue("txnQuotesItems", txnQuotesItems);
    }
  };

  console.log("object", customerData)
  const validationSchema = Yup.object({
    customerId: Yup.string().required("* Customer name is required"),
    issuesDate: Yup.date().required("*Date is required"),
    quoteNumber: Yup.string().required("*Quote Number is required"),
    amountsAre: Yup.string().required("*Amounts Are is required"),
    expiryDate: Yup.date().required("*Expiry Date is required"),
    status: Yup.string().required("*status is required"),
    txnQuotesItems: Yup.array().of(
      Yup.object().shape({
        item: Yup.string().required("*Item Details is required"),
        qty: Yup.number()
          .min(1, "*Quantity must be a min 1")
          .typeError("*Quantity must be a number")
          .required("*Quantity is required"),
        price: Yup.number().typeError("*Rate must be a number").notRequired(),
        disc: Yup.number()
          .typeError("*Discount must be a number")
          .required("*Discount is required"),
        taxRate: Yup.string().required("*Tax is required"),
        taxAmount: Yup.number()
          .typeError("*Amount must be a number")
          .notRequired(),
      })
    ),
  });

  const formik = useFormik({
    initialValues: {
      customerId: "",
      quoteNumber: "",
      reference: "",
      issuesDate: "",
      expiryDate: "",
      projects: "",
      status: "",
      title: "",
      summery: "",
      amountsAre: "",
      subTotal: "",
      total: "",
      cusNotes: "",
      terms: "",
      files: null,
      txnQuotesItems: [
        {
          item: "",
          qty: "",
          price: "",
          disc: "",
          taxRate: "",
          taxAmount: "",
          itemId: "",
        },
      ],
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      try {
        const formData = new FormData();
        formData.append("customerId", values.customerId);
        formData.append("quoteNumber", values.quoteNumber);
        formData.append("reference", values.reference);
        formData.append("issuesDate", values.issuesDate);
        formData.append("expiryDate", values.expiryDate);
        formData.append("projects", values.projects);;
        formData.append("status", values.status);
        formData.append("title", values.title);
        formData.append("summery", values.summery);
        formData.append("amountsAre", values.amountsAre);
        formData.append("subTotal", values.subTotal);
        formData.append("total", values.total);
        formData.append("cusNotes", values.cusNotes);
        formData.append("terms", values.terms);

        values.txnQuotesItems.forEach((item) => {
          formData.append("item", item.item);
          formData.append("qty", item.qty);
          formData.append("price", item.price);
          formData.append("description", "test");
          formData.append("account", "test");
          formData.append("disc", item.disc);
          formData.append("taxAmount", item.taxAmount);
          formData.append("taxRate", item.taxRate);
          formData.append("mstrItemsId", item.item);
        });
        if (values.files) (
          formData.append("files", values.files)
        )

        const response = await api.post(
          "/createQuoteWithQuoteItems",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 201) {
          toast.success(response.data.message);
          navigate("/estimates");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Error: Unable to save sales order.");
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
      setItemData(itemData);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const updateAndCalculate = async () => {
      try {
        let totalRate = 0;
        let totalAmount = 0;
        let totalTax = 0;

        const updatedItems = await Promise.all(
          formik.values.txnQuotesItems.map(async (item, index) => {
            if (item.item) {
              try {
                const response = await api.get(`getMstrItemsById/${item.item}`);
                console.log("object", response.data);
                const updatedItem = { ...item, price: response.data.salesPrice };

                const qty = updatedItem.qty || 1;
                const taxAmount = calculateAmount(qty, updatedItem.taxRate, updatedItem.disc, updatedItem.price);
                const itemTotalRate = qty * updatedItem.price;
                const itemTotalTax = itemTotalRate * (updatedItem.taxRate / 100);

                totalRate += updatedItem.price * qty;
                totalAmount += taxAmount;
                totalTax += itemTotalTax;

                return { ...updatedItem, qty, taxAmount };
              } catch (error) {
                toast.error("Error fetching data: " + (error?.response?.data?.message || error.message));
              }
            }

            const qty = item.qty;
            // Calculate amount if all necessary values are present
            if (item.price !== undefined && item.disc !== undefined && item.taxRate !== undefined) {
              const taxAmount = calculateAmount(qty, item.taxRate, item.disc, item.price);
              const itemTotalRate = qty * item.price;
              const itemTotalTax = itemTotalRate * (item.taxRate / 100);

              totalRate += item.price * qty;
              totalAmount += taxAmount;
              totalTax += itemTotalTax;

              return { ...item, qty, taxAmount };
            }

            return item;
          })
        );

        formik.setValues({ ...formik.values, txnQuotesItems: updatedItems });
        formik.setFieldValue("subTotal", totalRate);
        formik.setFieldValue("total", totalAmount);
        formik.setFieldValue("totalTax", totalTax);
      } catch (error) {
        toast.error("Error updating items: " + error.message);
      }
    };

    updateAndCalculate();
  }, [
    formik.values.txnQuotesItems.map((item) => item.item).join(""),
    formik.values.txnQuotesItems.map((item) => item.qty).join(""),
    formik.values.txnQuotesItems.map((item) => item.price).join(""),
    formik.values.txnQuotesItems.map((item) => item.disc).join(""),
    formik.values.txnQuotesItems.map((item) => item.taxRate).join(""),
  ]);

  const calculateAmount = (qty, taxRate, disc, price) => {
    const totalRate = qty * price;
    const discountAmount = totalRate * (disc / 100);
    const taxableAmount = totalRate * (taxRate / 100);
    const totalAmount = totalRate + taxableAmount - discountAmount;
    return totalAmount;
  };

  return (
    <div className="container-fluid p-2 minHeight m-0">
      <form onSubmit={formik.handleSubmit}>
        <div className="card shadow border-0 mb-2 top-header">
          <div className="container-fluid py-4">
            <div className="row align-items-center">
              <div className="col">
                <div className="d-flex align-items-center gap-4">
                  <h1 className="h4 ls-tight headingColor">Add Estimates</h1>
                </div>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-end">
                  <Link to="/estimates">
                    <button type="button" className="btn btn-sm btn-light">
                      Back
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
                        role="status"
                        aria-hidden="true"
                      ></span>
                    ) : (
                      <span>Save</span>
                    )}
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
                <label className="form-label">
                  Customer Name<span className="text-danger">*</span>
                </label>
                <select
                  className={`form-select ${formik.touched.customerId && formik.errors.customerId
                    ? "is-invalid"
                    : ""
                    }`}
                  {...formik.getFieldProps("customerId")}
                >
                  <option selected></option>
                  {customerData &&
                    customerData.map((customerId) => (
                      <option key={customerId.id} value={customerId.id}>
                        {customerId.contactName}
                      </option>
                    ))}
                </select>
                {formik.touched.customerId && formik.errors.customerId && (
                  <div className="invalid-feedback">
                    {formik.errors.customerId}
                  </div>
                )}
              </div>

              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">Quote Number</label><span className="text-danger">*</span>
                <input
                  type="text"
                  className={`form-control ${formik.touched.quoteNumber && formik.errors.quoteNumber
                    ? "is-invalid"
                    : ""
                    }`}
                  {...formik.getFieldProps("quoteNumber")}
                />
                {formik.touched.quoteNumber && formik.errors.quoteNumber && (
                  <div className="invalid-feedback">
                    {formik.errors.quoteNumber}
                  </div>
                )}
              </div>

              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">Reference</label>
                <input
                  type="text"
                  className={`form-control ${formik.touched.reference && formik.errors.reference
                    ? "is-invalid"
                    : ""
                    }`}
                  {...formik.getFieldProps("reference")}
                />
                {formik.touched.reference && formik.errors.reference && (
                  <div className="invalid-feedback">
                    {formik.errors.reference}
                  </div>
                )}
              </div>

              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Estimate Date<span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  className={`form-control ${formik.touched.issuesDate && formik.errors.issuesDate
                    ? "is-invalid"
                    : ""
                    }`}
                  {...formik.getFieldProps("issuesDate")}
                />
                {formik.touched.issuesDate && formik.errors.issuesDate && (
                  <div className="invalid-feedback">
                    {formik.errors.issuesDate}
                  </div>
                )}
              </div>

              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Expriy Date<span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  className={`form-control ${formik.touched.expiryDate && formik.errors.expiryDate
                    ? "is-invalid"
                    : ""
                    }`}
                  {...formik.getFieldProps("expiryDate")}
                />
                {formik.touched.expiryDate && formik.errors.expiryDate && (
                  <div className="invalid-feedback">
                    {formik.errors.expiryDate}
                  </div>
                )}
              </div>

              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">Project</label>
                <input
                  type="text"
                  className={`form-control ${formik.touched.projects && formik.errors.projects
                    ? "is-invalid"
                    : ""
                    }`}
                  {...formik.getFieldProps("projects")}
                />
                {formik.touched.projects && formik.errors.projects && (
                  <div className="invalid-feedback">
                    {formik.errors.projects}
                  </div>
                )}
              </div>

              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">Files</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(event) => {
                    formik.setFieldValue("files", event.target.files[0]);
                  }}
                  onBlur={formik.handleBlur}
                />
              </div>

              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Status<span className="text-danger">*</span>
                </label>
                <div className="overflow-x-auto">
                  <select
                    name="status"
                    className={`form-select  ${formik.touched.status && formik.errors.status
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("status")}
                    style={{ width: "100%" }}
                  >
                    <option></option>
                    <option value="SEND">Send</option>
                    <option value="APPROVED">Approved</option>
                    <option value="PENDING">Pending</option>
                  </select>
                {formik.touched.status &&
                  formik.errors.status && (
                    <div className="invalid-feedback">
                      {formik.errors.status}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="border-0 mb-5">
              {rowss && (
                <div className="border-0 mb-5">
                  <div className="container-fluid p-0 mb-5">
                    <div className="row py-4">
                      <div className="col-12 mb-4">
                        <div className="text-start">
                          <label htmlFor="" className="mb-1 fw-medium">
                            <small>Title</small>&nbsp;
                          </label>
                          <br />
                          <input
                            className="form-control mb-2"
                            type="text"
                            placeholder="Title"
                            {...formik.getFieldProps(`title`)}
                          />
                        </div>
                        <div className="text-start">
                          <label htmlFor="" className="mb-1 fw-medium">
                            <small>Summary</small>&nbsp;
                          </label>
                          <br />
                          <input
                            className="form-control mb-4"
                            type="text"
                            placeholder="Summary"
                            {...formik.getFieldProps(`summery`)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="row">
                <div className="col-12 mb-4">
                  {rowss ? (
                    <button
                      type="button"
                      onClick={() => (setRowss(false))}
                      className="btn btn-danger btn-sm"
                    >
                      <MdDeleteSweep className="mb-1 mx-1" /> Delete Title & Summary
                    </button>

                  ) : (
                    <button
                      type="button"
                      onClick={() => (setRowss(true))}
                      className="btn btn-border btn-sm btn-button"
                    >
                      <i className="bx bx-plus"></i> Add Title & Summary
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-12 d-flex align-items-end justify-content-end">
                <label className="col-form-label me-1">
                  Amount Are<span className="text-danger">*</span>
                </label>
                <div className="overflow-x-auto">
                  <select
                    name="amountsAre"
                    className={`form-select  ${formik.touched.amountsAre && formik.errors.amountsAre
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("amountsAre")}
                    style={{ width: "100%" }}
                  >
                    <option></option>
                    <option value="TAX_EXCLUSIVE">Tax Exclusive</option>
                    <option value="TAX_INCLUSIVE">Tax Inclusive</option>
                    <option value="NO_TAX">No Tax</option>
                  </select>
                </div>
              </div>
              <div className="d-flex justify-content-end pe-5">{formik.touched.amountsAre && formik.errors.amountsAre && (
              <div className="text-danger   " style={{fontSize: "0.875em"}}>
                {formik.errors.amountsAre}
              </div>
            )}</div>
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
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">S.NO</th>
                      <th scope="col">ITEM <span className="text-danger">*</span></th>
                      <th scope="col">QUANTITY<span className="text-danger">*</span></th>
                      <th scope="col">PRICE</th>
                      <th scope="col">DISCOUNT</th>
                      <th scope="col">TAX RATE<span className="text-danger">*</span></th>
                      <th scope="col">AMOUNT</th>
                    </tr>
                  </thead>
                  <tbody className="table-group">
                    {formik.values.txnQuotesItems.map((item, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>
                          <select
                            name={`txnQuotesItems[${index}].item`}
                            {...formik.getFieldProps(
                              `txnQuotesItems[${index}].item`
                            )}
                            className={`form-select ${formik.touched.txnQuotesItems?.[index]?.item &&
                              formik.errors.txnQuotesItems?.[index]?.item
                              ? "is-invalid"
                              : ""
                              }`}
                          >
                            <option selected> </option>
                            {itemData &&
                              itemData.map((itemId) => (
                                <option key={itemId.id} value={itemId.id}>
                                  {itemId.itemName}
                                </option>
                              ))}
                          </select>
                          {formik.touched.txnQuotesItems?.[index]?.item &&
                            formik.errors.txnQuotesItems?.[index]?.item && (
                              <div className="invalid-feedback">
                                {formik.errors.txnQuotesItems[index].item}
                              </div>
                            )}
                        </td>
                        <td>
                          <input
                            type="number"
                            min={1}
                            name={`txnQuotesItems[${index}].qty`}
                            className={`form-control ${formik.touched.txnQuotesItems?.[index]?.qty &&
                              formik.errors.txnQuotesItems?.[index]?.qty
                              ? "is-invalid"
                              : ""
                              }`}
                            {...formik.getFieldProps(
                              `txnQuotesItems[${index}].qty`
                            )}
                          />
                          {formik.touched.txnQuotesItems?.[index]?.qty &&
                            formik.errors.txnQuotesItems?.[index]?.qty && (
                              <div className="invalid-feedback">
                                {formik.errors.txnQuotesItems[index].qty}
                              </div>
                            )}
                        </td>
                        <td>
                          <input
                            type="text"
                            name={`txnQuotesItems[${index}].price`}
                            className={`form-control ${formik.touched.txnQuotesItems?.[index]?.price &&
                              formik.errors.txnQuotesItems?.[index]?.price
                              ? "is-invalid"
                              : ""
                              }`}
                            {...formik.getFieldProps(
                              `txnQuotesItems[${index}].price`
                            )}
                          />
                          {formik.touched.items?.[index]?.price &&
                            formik.errors.items?.[index]?.price && (
                              <div className="invalid-feedback">
                                {formik.errors.items[index].price}
                              </div>
                            )}
                        </td>
                        <td>
                          <input
                            type="text"
                            name={`txnQuotesItems[${index}].disc`}
                            className={`form-control ${formik.touched.txnQuotesItems?.[index]?.disc &&
                              formik.errors.txnQuotesItems?.[index]?.disc
                              ? "is-invalid"
                              : ""
                              }`}
                            {...formik.getFieldProps(
                              `txnQuotesItems[${index}].disc`
                            )}
                          />
                          {formik.touched.txnQuotesItems?.[index]?.disc &&
                            formik.errors.txnQuotesItems?.[index]?.disc && (
                              <div className="invalid-feedback">
                                {formik.errors.txnQuotesItems[index].disc}
                              </div>
                            )}
                        </td>
                        <td>
                          <input
                            type="text"
                            name={`txnQuotesItems[${index}].taxRate`}
                            className={`form-control ${formik.touched.txnQuotesItems?.[index]?.taxRate &&
                              formik.errors.txnQuotesItems?.[index]?.taxRate
                              ? "is-invalid"
                              : ""
                              }`}
                            {...formik.getFieldProps(
                              `txnQuotesItems[${index}].taxRate`
                            )}
                          />
                          {formik.touched.txnQuotesItems?.[index]?.taxRate &&
                            formik.errors.txnQuotesItems?.[index]?.taxRate && (
                              <div className="invalid-feedback">
                                {formik.errors.txnQuotesItems[index].taxRate}
                              </div>
                            )}
                        </td>
                        <td>
                          <input
                            type="text"
                            name={`txnQuotesItems[${index}].taxAmount`}
                            className={`form-control ${formik.touched.txnQuotesItems?.[index]?.taxAmount &&
                              formik.errors.txnQuotesItems?.[index]?.taxAmount
                              ? "is-invalid"
                              : ""
                              }`}
                            {...formik.getFieldProps(
                              `txnQuotesItems[${index}].taxAmount`
                            )}
                          />
                          {formik.touched.txnQuotesItems?.[index]?.taxAmount &&
                            formik.errors.txnQuotesItems?.[index]?.taxAmount && (
                              <div className="invalid-feedback">
                                {formik.errors.txnQuotesItems[index].taxAmount}
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
              {formik.values.txnQuotesItems.length > 1 && (
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
                  Credit Notes
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    className={`form-control  ${formik.touched.cusNotes && formik.errors.cusNotes
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("cusNotes")}
                  />
                  {formik.touched.cusNotes && formik.errors.cusNotes && (
                    <div className="invalid-feedback">
                      {formik.errors.cusNotes}
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
                    Sub Total
                  </label>
                  <div className="col-sm-4"></div>
                  <div className="col-sm-4">
                    <input
                      type="text"
                      className={`form-control ${formik.touched.subTotal && formik.errors.subTotal
                        ? "is-invalid"
                        : ""
                        }`}
                      {...formik.getFieldProps("subTotal")}
                      readOnly
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
                    Total Tax
                  </label>
                  <div className="col-sm-4"></div>
                  <div className="col-sm-4">
                    <input
                      type="text"
                      className={`form-control ${formik.touched.totalTax && formik.errors.totalTax
                        ? "is-invalid"
                        : ""
                        }`}
                      {...formik.getFieldProps("totalTax")}
                      readOnly
                    />
                    {formik.touched.totalTax && formik.errors.totalTax && (
                      <div className="invalid-feedback">
                        {formik.errors.totalTax}
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
                      className={`form-control ${formik.touched.total && formik.errors.total
                        ? "is-invalid"
                        : ""
                        }`}
                      {...formik.getFieldProps("total")}
                      readOnly
                    />
                    {formik.touched.total && formik.errors.total && (
                      <div className="invalid-feedback">
                        {formik.errors.total}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 mb-3">
                <lable className="form-lable">
                  Terms & Conditions
                </lable>
                <div className="mb-3">
                  <textarea
                    className={`form-control  ${formik.touched.terms && formik.errors.terms
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("terms")}
                  />
                  {formik.touched.terms &&
                    formik.errors.terms && (
                      <div className="invalid-feedback">
                        {formik.errors.terms}
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

export default EstimateAdd;
