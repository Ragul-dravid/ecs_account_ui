import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MdDeleteSweep } from "react-icons/md";
import toast from "react-hot-toast";
import api from "../../../config/URL";
import fetchAllCustomerWithIds from "../../List/CustomerList";
import fetchAllItemWithIds from "../../List/ItemList";

const EstimateEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoadIndicator] = useState(false);
  const [customerData, setCustomerData] = useState(null);
  const [itemData, setItemData] = useState(null);
  const [rows, setRows] = useState([{ id: 1 }]);
  const [rowss, setRowss] = useState([]);
  const AddRowContent = () => {
    setRows((prevRows) => [...prevRows, { id: prevRows.length + 1 }]);
  };
  console.log("object", customerData)
  const validationSchema = Yup.object({
    customerId: Yup.string().required("* Customer name is required"),
    issueDate: Yup.string().required("*Date is required"),
  });
  const formik = useFormik({
    initialValues: {
      customerId: "",
      quoteNumber: "",
      reference: "",
      issueDate: "",
      expiryDate: "",
      project: "",
      files: "",
      status: "",
      title: "",
      summery: "",
      tax: "",
      subTotal: "",
      total: "",
      customerNote: "",
      terms: "",
      files: null,
      quotesItemsModels: [
        {
          item: "",
          qty: "",
          price: "",
          discount: "",
          taxRate: "",
          amount: "",
          itemId: "",
        },
      ],
    },
    // validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);

      const formData = new FormData();
      formData.append("customerId", values.customerId);
      formData.append("quoteNumber", values.quoteNumber);
      formData.append("reference", values.reference);
      formData.append("issueDate", values.issueDate);
      formData.append("expiryDate", values.expiryDate);
      formData.append("project", values.project);
      formData.append("status", values.status);
      formData.append("title", values.title);
      formData.append("summery", values.summery);
      formData.append("tax", values.tax);
      formData.append("subTotal", values.subTotal);
      formData.append("total", values.total);
      formData.append("customerNote", "test");
      formData.append("terms", values.terms);

      values.quotesItemsModels.forEach((item) => {
        formData.append("item", item.item);
        formData.append("qty", item.qty);
        formData.append("price", item.price);
        formData.append("description", "test");
        formData.append("account", "test");
        formData.append("disc", item.disc);
        formData.append("amount", item.amount);
        formData.append("taxRate", item.taxRate);
        formData.append("mstrItemsId", item.item);
      });
      setLoadIndicator(true);
      try {

        const response = await api.put(
          `/updateQuoteWithQuoteItems/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/creditNotes");
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
    const getData = async () => {
      try {
        const response = await api.get(`/getTxnQuotesById/${id}`);
        formik.setValues(response.data);
      } catch (e) {
        toast.error("Error fetching data: ", e?.response?.data?.message);
      }
    };

    getData();
  }, [id]);

  useEffect(() => {
    const updateAndCalculate = async () => {
      try {
        let totalRate = 0;
        let totalAmount = 0;
        let totalTax = 0;

        const updatedItems = await Promise.all(
          formik.values.quotesItemsModels.map(async (item, index) => {
            if (item.item) {
              try {
                const response = await api.get(`getMstrItemsById/${item.item}`);
                console.log("object", response.data);
                const updatedItem = { ...item, price: response.data.salesPrice };

                const qty = updatedItem.qty || 1;
                const amount = calculateAmount(qty, updatedItem.taxRate, updatedItem.disc, updatedItem.price);
                const itemTotalRate = qty * updatedItem.price;
                const itemTotalTax = itemTotalRate * (updatedItem.taxRate / 100);

                totalRate += updatedItem.price * qty;
                totalAmount += amount;
                totalTax += itemTotalTax;

                return { ...updatedItem, qty, amount };
              } catch (error) {
                toast.error("Error fetching data: " + (error?.response?.data?.message || error.message));
              }
            }

            const qty = item.qty;
            // Calculate amount if all necessary values are present
            if (item.price !== undefined && item.disc !== undefined && item.taxRate !== undefined) {
              const amount = calculateAmount(qty, item.taxRate, item.disc, item.price);
              const itemTotalRate = qty * item.price;
              const itemTotalTax = itemTotalRate * (item.taxRate / 100);

              totalRate += item.price * qty;
              totalAmount += amount;
              totalTax += itemTotalTax;

              return { ...item, qty, amount };
            }

            return item;
          })
        );

        formik.setValues({ ...formik.values, quotesItemsModels: updatedItems });
        formik.setFieldValue("subTotal", totalRate);
        formik.setFieldValue("total", totalAmount);
        formik.setFieldValue("totalTax", totalTax);
      } catch (error) {
        toast.error("Error updating items: " + error.message);
      }
    };

    updateAndCalculate();
  }, [
    formik.values.quotesItemsModels.map((item) => item.item).join(""),
    formik.values.quotesItemsModels.map((item) => item.qty).join(""),
    formik.values.quotesItemsModels.map((item) => item.price).join(""),
    formik.values.quotesItemsModels.map((item) => item.disc).join(""),
    formik.values.quotesItemsModels.map((item) => item.taxRate).join(""),
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
                      <span>Update</span>
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
                  className={`form-control ${formik.touched.issueDate && formik.errors.issueDate
                    ? "is-invalid"
                    : ""
                    }`}
                  {...formik.getFieldProps("issueDate")}
                />
                {formik.touched.issueDate && formik.errors.issueDate && (
                  <div className="invalid-feedback">
                    {formik.errors.issueDate}
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
                  className={`form-control ${formik.touched.project && formik.errors.project
                    ? "is-invalid"
                    : ""
                    }`}
                  {...formik.getFieldProps("project")}
                />
                {formik.touched.project && formik.errors.project && (
                  <div className="invalid-feedback">
                    {formik.errors.project}
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
              <div className="col-12 mb-3 d-flex align-items-end justify-content-end">
                <label className="col-form-label">
                  Amount Are<span className="text-danger">*</span>&nbsp;&nbsp;
                </label>
                <div className="overflow-x-auto">
                  <select
                    name="tax"
                    className={`form-select  ${formik.touched.tax && formik.errors.tax
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("tax")}
                    style={{ width: "100%" }}
                  >
                    <option></option>
                    <option value="TAX_EXCLUSIVE">Tax Exclusive</option>
                    <option value="TAX_INCLUSIVE">Tax Inclusive</option>
                    <option value="NO_TAX">No Tax</option>
                  </select>
                </div>
                {formik.touched.tax &&
                  formik.errors.tax && (
                    <div className="invalid-feedback">
                      {formik.errors.tax}
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
                            name={`quotesItemsModels[${index}].item`}
                            {...formik.getFieldProps(`quotesItemsModels[${index}].item`)}
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
                            name={`quotesItemsModels[${index}].qty`}
                            className="form-control"
                            {...formik.getFieldProps(`quotesItemsModels[${index}].qty`)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name={`quotesItemsModels[${index}].price`}
                            className="form-control"
                            {...formik.getFieldProps(`quotesItemsModels[${index}].price`)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name={`quotesItemsModels[${index}].disc`}
                            className="form-control"
                            {...formik.getFieldProps(`quotesItemsModels[${index}].disc`)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name={`quotesItemsModels[${index}].taxRate`}
                            className="form-control"
                            {...formik.getFieldProps(`quotesItemsModels[${index}].taxRate`)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name={`quotesItemsModels[${index}].amount`}
                            className="form-control"
                            {...formik.getFieldProps(`quotesItemsModels[${index}].amount`)}
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
};

export default EstimateEdit;
