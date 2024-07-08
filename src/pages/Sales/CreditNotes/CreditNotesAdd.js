import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import fetchAllCustomerWithIds from "../../List/CustomerList";
import fetchAllItemWithIds from "../../List/ItemList";

function CreditNotesAdd() {
  const navigate = useNavigate();
  const [loading, setLoadIndicator] = useState(false);
  const [customerData, setCustomerData] = useState(null);
  const [itemData, setItemData] = useState(null);
  const [rows, setRows] = useState([{}]);

  
  const addRow = () => {
    formik.setFieldValue("txnCreditNoteItems", [
      ...formik.values.txnCreditNoteItems,
      { item: "", qty: "", price: "", discount: "", taxRate: "", amount: "" },
    ]);
  };

  const removeRow = () => {
    const txnCreditNoteItems = [...formik.values.txnCreditNoteItems];
    if (txnCreditNoteItems.length > 1) {
        txnCreditNoteItems.pop();
      formik.setFieldValue("txnCreditNoteItems", txnCreditNoteItems);
    }
  };
  const validationSchema = Yup.object({
    customerId: Yup.string().required("* Customer name is required"),
    date: Yup.string().required("*Date is required"),
    txnCreditNoteItems: Yup.array().of(
        Yup.object().shape({
          item: Yup.string().required("*Item Details is required"),
          qty: Yup.number()
            .min(1, "*Quantity must be a min 1")
            .typeError("*Quantity must be a number")
            .required("*Quantity is required"),
            price: Yup.number()
            .typeError("*Rate must be a number")
            .notRequired(),
        discount: Yup.number()
            .typeError("*Discount must be a number")
            .required("*Discount is required"),
            taxRate: Yup.string().required("*Tax is required"),
          amount: Yup.number()
            .typeError("*Amount must be a number")
            .notRequired(),
        })
      ),
  });

  const formik = useFormik({
    initialValues: {
      customerId: "",
      reference: "",
      date: "",
      currency: "",
      amountsAre: "",
      subTotal: "",
      total: "",
      creditNote: "",
      files: null,
      txnCreditNoteItems: [
        {
          item: "",
          qty: "",
          price: "",
          discount: "",
          taxRate: "",
          amount: "",
        },
      ],
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      try {
        const formData = new FormData();
        formData.append("customerId", values.customerId);
        formData.append("date", values.date);
        formData.append("reference", values.reference);
        formData.append("currency", values.currency);
        formData.append("amountsAre", values.amountsAre);
        formData.append("subTotal", values.subTotal);
        formData.append("total", values.total);
        formData.append("creditNote", values.creditNote);
        values.txnCreditNoteItems.forEach((item) => {
          formData.append("itemId", item.item);
          formData.append("item", item.item);
          formData.append("qty", item.qty);
          formData.append("price", item.price);
          formData.append("description", "test");
          formData.append("account", "test");
          formData.append("amount", item.amount);
          formData.append("taxRate", item.taxRate);
        });
        if (values.files) {
          formData.append("files", values.files);
        }
        const response = await api.post(
          "/createCreditAndCreditItems",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 201) {
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
    const updateAndCalculate = async () => {
      try {
        let totalRate = 0;
        let totalAmount = 0;
        let totalTax = 0;

        const updatedItems = await Promise.all(
          formik.values.txnCreditNoteItems.map(async (item, index) => {
            if (item.item) {
              try {
                const response = await api.get(`getMstrItemsById/${item.item}`);
                console.log("object", response.data);
                const updatedItem = {
                  ...item,
                  price: response.data.salesPrice,
                };

                const qty = updatedItem.qty || 1;
                const amount = calculateAmount(
                  qty,
                  updatedItem.taxRate,
                  updatedItem.discount,
                  updatedItem.price
                );
                const itemTotalRate = qty * updatedItem.price;
                const itemTotalTax =
                  itemTotalRate * (updatedItem.taxRate / 100);

                totalRate += updatedItem.price * qty;
                totalAmount += amount;
                totalTax += itemTotalTax;

                return { ...updatedItem, qty, amount };
              } catch (error) {
                toast.error(
                  "Error fetching data: " +
                    (error?.response?.data?.message || error.message)
                );
              }
            }

            const qty = item.qty;
            // Calculate amount if all necessary values are present
            if (item.price !== undefined &&item.discount !== undefined &&item.taxRate !== undefined) {
              const amount = calculateAmount(
                qty,
                item.taxRate,
                item.discount,
                item.price
              );
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

        formik.setValues({
          ...formik.values,
          txnCreditNoteItems: updatedItems,
        });
        formik.setFieldValue("subTotal", totalRate);
        formik.setFieldValue("total", totalAmount);
        formik.setFieldValue("tax", totalTax);
      } catch (error) {
        toast.error("Error updating items: " + error.message);
      }
    };

    updateAndCalculate();
  }, [
    formik.values.txnCreditNoteItems.map((item) => item.item).join(""),
    formik.values.txnCreditNoteItems.map((item) => item.qty).join(""),
    formik.values.txnCreditNoteItems.map((item) => item.price).join(""),
    formik.values.txnCreditNoteItems.map((item) => item.discount).join(""),
    formik.values.txnCreditNoteItems.map((item) => item.taxRate).join(""),
  ]);

  const calculateAmount = (qty, taxRate, discount, price) => {
    const totalRate = qty * price;
    const discountAmount = totalRate * (discount / 100);
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
                  <h1 className="h4 ls-tight headingColor">Add Sales Order</h1>
                </div>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-end">
                  <Link to="/creditNotes">
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
                  className={`form-select ${
                    formik.touched.customerId && formik.errors.customerId
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
                <label className="form-label">
                  Date<span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  className={`form-control ${
                    formik.touched.date && formik.errors.date
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("date")}
                />
                {formik.touched.date && formik.errors.date && (
                  <div className="invalid-feedback">{formik.errors.date}</div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">Reference</label>
                <input
                  type="text"
                  className={`form-control ${
                    formik.touched.reference && formik.errors.reference
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
            </div>

            <div className="row">
              <div className="col-md-6 col-12 mb-3 d-flex align-items-start justify-content-start">
                <label className="col-form-label">
                  Currency<span className="text-danger">*</span>&nbsp;&nbsp;
                </label>
                <div className="overflow-x-auto">
                  <select
                    name="currency"
                    className={`form-select  ${
                      formik.touched.currency && formik.errors.currency
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
                {formik.touched.currency && formik.errors.currency && (
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
                    className={`form-select  ${
                      formik.touched.amountsAre && formik.errors.amountsAre
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
                {formik.touched.amountsAre && formik.errors.amountsAre && (
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
                      <th scope="col">ITEM <span className="text-danger">*</span></th>
                      <th scope="col">QUANTITY<span className="text-danger">*</span></th>
                      <th scope="col">PRICE</th>
                      <th scope="col">DISCOUNT</th>
                      <th scope="col">TAX RATE<span className="text-danger">*</span></th>
                      <th scope="col">AMOUNT</th>
                    </tr>
                  </thead>
                  <tbody className="table-group">
                  {formik.values.txnCreditNoteItems.map((item, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>
                          <select
                            name={`txnCreditNoteItems[${index}].item`}
                            {...formik.getFieldProps(
                              `txnCreditNoteItems[${index}].item`
                            )}
                            className={`form-select ${
                                formik.touched.txnCreditNoteItems?.[index]?.item &&
                                formik.errors.txnCreditNoteItems?.[index]?.item
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
                          {formik.touched.txnCreditNoteItems?.[index]?.item &&
                              formik.errors.txnCreditNoteItems?.[index]?.item && (
                                <div className="invalid-feedback">
                                  {formik.errors.txnCreditNoteItems[index].item}
                                </div>
                              )}
                        </td>
                        <td>
                          <input
                            type="number"
                            min={1}
                            name={`txnCreditNoteItems[${index}].qty`}
                            className={`form-control ${
                                formik.touched.txnCreditNoteItems?.[index]?.qty &&
                                formik.errors.txnCreditNoteItems?.[index]?.qty
                                  ? "is-invalid"
                                  : ""
                              }`}
                            {...formik.getFieldProps(
                              `txnCreditNoteItems[${index}].qty`
                            )}
                          />
                          {formik.touched.txnCreditNoteItems?.[index]?.qty &&
                              formik.errors.txnCreditNoteItems?.[index]?.qty && (
                                <div className="invalid-feedback">
                                  {formik.errors.txnCreditNoteItems[index].qty}
                                </div>
                              )}
                        </td>
                        <td>
                          <input
                            type="text"
                            name={`txnCreditNoteItems[${index}].price`}
                            className={`form-control ${
                                formik.touched.txnCreditNoteItems?.[index]?.price &&
                                formik.errors.txnCreditNoteItems?.[index]?.price
                                  ? "is-invalid"
                                  : ""
                              }`}
                            {...formik.getFieldProps(
                              `txnCreditNoteItems[${index}].price`
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
                            name={`txnCreditNoteItems[${index}].discount`}
                            className={`form-control ${
                                formik.touched.txnCreditNoteItems?.[index]?.discount &&
                                formik.errors.txnCreditNoteItems?.[index]?.discount
                                  ? "is-invalid"
                                  : ""
                              }`}
                            {...formik.getFieldProps(
                              `txnCreditNoteItems[${index}].discount`
                            )}
                          />
                          {formik.touched.txnCreditNoteItems?.[index]?.disc &&
                              formik.errors.txnCreditNoteItems?.[index]?.disc && (
                                <div className="invalid-feedback">
                                  {formik.errors.txnCreditNoteItems[index].disc}
                                </div>
                              )}
                        </td>
                        <td>
                          <input
                            type="text"
                            name={`txnCreditNoteItems[${index}].taxRate`}
                            className={`form-control ${
                                formik.touched.txnCreditNoteItems?.[index]?.taxRate &&
                                formik.errors.txnCreditNoteItems?.[index]?.taxRate
                                  ? "is-invalid"
                                  : ""
                              }`}
                            {...formik.getFieldProps(
                              `txnCreditNoteItems[${index}].taxRate`
                            )}
                          />
                          {formik.touched.txnCreditNoteItems?.[index]?.taxRate &&
                              formik.errors.txnCreditNoteItems?.[index]?.taxRate && (
                                <div className="invalid-feedback">
                                  {formik.errors.txnCreditNoteItems[index].taxRate}
                                </div>
                              )}
                        </td>
                        <td>
                          <input
                            type="text"
                            name={`txnCreditNoteItems[${index}].amount`}
                            className={`form-control ${
                                formik.touched.txnCreditNoteItems?.[index]?.amount &&
                                formik.errors.txnCreditNoteItems?.[index]?.amount
                                  ? "is-invalid"
                                  : ""
                              }`}
                            {...formik.getFieldProps(
                              `txnCreditNoteItems[${index}].amount`
                            )}
                          />
                          {formik.touched.txnCreditNoteItems?.[index]?.amount &&
                              formik.errors.txnCreditNoteItems?.[index]?.amount && (
                                <div className="invalid-feedback">
                                  {formik.errors.txnCreditNoteItems[index].amount}
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
              {formik.values.txnCreditNoteItems.length > 1 && (
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
                  Credit Notes<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    className={`form-control  ${
                      formik.touched.creditNote && formik.errors.creditNote
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("creditNote")}
                  />
                  {formik.touched.creditNote && formik.errors.creditNote && (
                    <div className="invalid-feedback">
                      {formik.errors.creditNote}
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
                      className={`form-control ${
                        formik.touched.tax && formik.errors.tax
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
                      className={`form-control ${
                        formik.touched.total && formik.errors.total
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
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreditNotesAdd;
