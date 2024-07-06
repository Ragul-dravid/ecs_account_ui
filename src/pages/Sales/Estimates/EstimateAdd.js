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
  const [rowss, setRowss] = useState([]);
  const AddRowContent = () => {
    setRows((prevRows) => [...prevRows, { id: prevRows.length + 1 }]);
  };
console.log("object",customerData)
  const validationSchema = Yup.object({
    customerId: Yup.string().required("* Customer name is required"),
    issuesDate: Yup.string().required("*Date is required"),
  });

  const formik = useFormik({
    initialValues: {
      customerId: "",
      quoteNumber: "",
      reference: "",
      issuesDate: "",
      expiryDate: "",
      projects: "",
      files: "",
      currency: "",
      amountsAre: "",
      subTotal: "",
      total: "",
      customerNote: "",
      terms: "",
      files: null,
      txnQuotesItems: [
        {
          item: "",
          qty: "",
          price: "",
          discount: "",
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
        formData.append("projects", values.projects);
        formData.append("currency", values.currency);
        formData.append("amountsAre", values.amountsAre);
        formData.append("subTotal", values.subTotal);
        formData.append("total", values.total);
        formData.append("customerNote", "test");
        
        values.txnQuotesItems.forEach((item) => {
          formData.append("item", item.item);
          formData.append("qty", item.qty);
          formData.append("price", item.price);
          formData.append("description", "test");
          formData.append("account", "test");
          formData.append("disc", item.disc);
          formData.append("taxAmount", item.taxAmount);
          formData.append("taxRate", item.taxRate);
          formData.append("itemId", item.item);
        });

        formData.append("files", values.files);

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
        formik.setFieldValue("tax", totalTax);
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
                <label className="form-label">Quote Number</label>
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
                <label className="col-form-label">
                  Status<span className="text-danger">*</span>&nbsp;&nbsp;
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
                </div>
                {formik.touched.status &&
                  formik.errors.status && (
                    <div className="invalid-feedback">
                      {formik.errors.status}
                    </div>
                  )}
              </div>
            </div>

            <div className="border-0 mb-5">
              {rowss.map((row, index) => (
                <div className="border-0 mb-5" key={index}>

                  <div className="container-fluid p-0 mb-5">
                    <div className="row py-4">
                      <div className="col-12 mb-4">
                        <div className="text-start">
                          <label htmlFor="" className=" mb-1 fw-medium">
                            <small>Title</small>&nbsp;
                          </label>
                          <br />
                          <input
                            className="form-control mb-2"
                            type="text"
                            placeholder="Title"
                            value={row.title || ""}
                            onChange={(e) => {
                              const newRows = [...rowss];
                              newRows[index].title = e.target.value;
                              setRowss(newRows);
                            }}
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
                            placeholder="summery"
                            value={row.summery || ""}
                            onChange={(e) => {
                              const newRows = [...rowss];
                              newRows[index].summery = e.target.value;
                              setRowss(newRows);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
              <div className="row">
                <div className="col-12 mb-4">
                  {rowss.length === 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        setRowss((prev) => [
                          ...prev,
                          { title: "", summery: "" },
                        ]); // Add a new row with empty title and summary
                      }}
                      className="btn btn-border btn-sm btn-button"
                    >
                      <i className="bx bx-plus"></i> Add Title & Summary
                    </button>
                  )}
                  {rowss.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setRowss((prev) => prev.slice(0, -1))}
                      className="btn btn-danger btn-sm "
                    >
                      <MdDeleteSweep className="mb-1 mx-1" />Delete Title & Summary
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 col-12 mb-3 d-flex align-items-start justify-content-start">
                <label className="col-form-label">
                  Currency<span className="text-danger">*</span>&nbsp;&nbsp;
                </label>
                <div className="overflow-x-auto">
                  <select
                    name="currency"
                    className={`form-select  ${formik.touched.currency && formik.errors.currency
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("currency")}
                    style={{ width: "100%" }}
                  >
                    <option></option>
                    <option value="INR">INR</option>
                    <option value="SGD">SGD</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
                {formik.touched.currency &&
                  formik.errors.currency && (
                    <div className="invalid-feedback">
                      {formik.errors.currency}
                    </div>
                  )}
              </div>

              <div className="col-md-6 col-12 mb-3 d-flex align-items-end justify-content-end">
                <label className="col-form-label">
                  Amount Are<span className="text-danger">*</span>&nbsp;&nbsp;
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
                {formik.touched.amountsAre &&
                  formik.errors.amountsAre && (
                    <div className="invalid-feedback">
                      {formik.errors.amountsAre}
                    </div>
                  )}
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
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">S.NO</th>
                      <th scope="col">ITEM </th>
                      <th scope="col">QUANTITY</th>
                      <th scope="col">PRICE</th>
                      <th scope="col">DISCOUNT</th>
                      <th scope="col">TAX RATE</th>
                      <th scope="col">AMOUNT</th>
                    </tr>
                  </thead>
                  <tbody className="table-group">
                    {rows.map((row, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>
                          <select
                            name={`txnQuotesItems[${index}].item`}
                            {...formik.getFieldProps(`txnQuotesItems[${index}].item`)}
                            className="form-select"
                          >
                            <option selected> </option>
                            {itemData &&
                              itemData.map((itemId) => (
                                <option key={itemId.id} value={itemId.id}>
                                  {itemId.itemName}
                                </option>
                              ))}
                          </select>
                        </td>
                        <td>
                          <input
                            type="number"
                            min={1}
                            name={`txnQuotesItems[${index}].qty`}
                            className="form-control"
                            {...formik.getFieldProps(`txnQuotesItems[${index}].qty`)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name={`txnQuotesItems[${index}].price`}
                            className="form-control"
                            {...formik.getFieldProps(`txnQuotesItems[${index}].price`)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name={`txnQuotesItems[${index}].disc`}
                            className="form-control"
                            {...formik.getFieldProps(`txnQuotesItems[${index}].disc`)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name={`txnQuotesItems[${index}].taxRate`}
                            className="form-control"
                            {...formik.getFieldProps(`txnQuotesItems[${index}].taxRate`)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name={`txnQuotesItems[${index}].taxAmount`}
                            className="form-control"
                            {...formik.getFieldProps(`txnQuotesItems[${index}].taxAmount`)}
                          />
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
                onClick={AddRowContent}
              >
                Add row
              </button>
              {rows.length > 1 && (
                <button
                  className="btn btn-sm my-4 mx-1 delete border-danger bg-white text-danger"
                  onClick={(e) => {
                    e.preventDefault();
                    setRows((prevRows) => prevRows.slice(0, -1));
                  }}
                >
                  Delete
                </button>
              )}
            </div>
            <div className="row mt-5 pt-0">
              <div className="col-md-6 col-12 mb-3 pt-0">
                <lable className="form-lable">
                  Credit Notes<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    className={`form-control  ${formik.touched.customerNote && formik.errors.customerNote
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("customerNote")}
                  />
                  {formik.touched.customerNote && formik.errors.customerNote && (
                    <div className="invalid-feedback">
                      {formik.errors.customerNote}
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
                    Total Tax<span className="text-danger">*</span>
                  </label>
                  <div className="col-sm-4"></div>
                  <div className="col-sm-4">
                    <input
                      type="text"
                      className={`form-control ${formik.touched.tax && formik.errors.tax
                        ? "is-invalid"
                        : ""
                        }`}
                      {...formik.getFieldProps("tax")}
                      readOnly
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
                  Terms & Conditions<span className="text-danger">*</span>
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
