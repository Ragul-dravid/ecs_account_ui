import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import fetchAllCustomerWithIds from "../../List/CustomerList";
import fetchAllItemWithIds from "../../List/ItemList";

const validationSchema = Yup.object({
  customerId: Yup.string().required("*Customer name is required"),
  invoiceNumber: Yup.string().required("*Invoice Number is required"),
  issuesDate: Yup.string().required("*Issues Date is required"),
  dueDate: Yup.string().required("*Due Date is required"),
  amountsAre: Yup.string().required("*Amount Are is required"),
  txnInvoiceOrderItemsModels: Yup.array().of(
    Yup.object({
      item: Yup.string().required("item is required"),
      })
  ),
});

function InvoiceEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoadIndicator] = useState(false);
  const [customerData, setCustomerData] = useState(null);
  const [itemData, setItemData] = useState(null);

  const formik = useFormik({
    initialValues: {
      customerId: "",
      issuesDate: "",
      dueDate: "",
      invoiceNumber: "",
      reference: "",
      amountsAre: "",
      subTotal: "",
      totalTax: "",
      totalDiscount: "",
      total: "",
      files: null,
      txnInvoiceOrderItemsModels: [
        {
          item: "",
          qty: "",
          price: "",
          disc:"",
          taxRate:"",
          amount: "",
          itemId: "",
        },
      ],
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      try {
        const formData = new FormData();

        formData.append("invoiceId", id);
        formData.append("customerId", values.customerId);
        formData.append("issuesDate", values.issuesDate);
        formData.append("reference", values.reference);
        formData.append("dueDate", values.dueDate);
        formData.append("invoiceNumber", values.invoiceNumber);
        formData.append("amountsAre", values.amountsAre);
        formData.append("subTotal", values.subTotal);
        formData.append("totalTax", values.totalTax);
        formData.append("total", values.total);
        values.txnInvoiceOrderItemsModels?.forEach((item) => {
          formData.append("item", item.item);
            formData.append("qty", item.qty);
            formData.append("price", item.price);
            formData.append("taxRate", item.taxRate);
            formData.append("disc", item.disc);
            formData.append("amount", item.amount);
            formData.append("taxAmount", 889);
            formData.append("mstrItemsId", item.item);
            if(item.id!== undefined){
              formData.append("itemId", item.id);}
          formData.append("description", "test");
          formData.append("account", "test");
          formData.append("project", "test");
        });
        if (values.files) {
          formData.append("files", values.files);
        }

        const response = await api.put(
          `/updateInvoiceWithInvoiceItems/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/invoice");
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
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getTxnInvoiceById/${id}`);
        console.log(response.data);
        formik.setValues(response.data);
        formik.setFieldValue(
          "txnInvoiceOrderItemsModels",
          response.data.invoiceItemsModels
        );
      } catch (e) {
        toast.error("Error fetching data: ", e?.response?.data?.message);
      }
    };
    getData();
  }, [id]);

  const fetchData = async () => {
    try {
      const customerData = await fetchAllCustomerWithIds();
      const itemData = await fetchAllItemWithIds();
      setCustomerData(customerData);
      setItemData(itemData);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const itemAmt = async (id, index) => {
    try {
      const response = await api.get(`/getMstrItemsById/${id}`);
      formik.setFieldValue(
        `txnInvoiceOrderItemsModels[${index}].price`,
        response.data.salesPrice
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSelectChange = (event, index) => {
    const { value } = event.target;
    formik.setFieldValue(`txnInvoiceOrderItemsModels[${index}].item`, value);
    if (value) {
      itemAmt(value, index);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    formik.values.txnInvoiceOrderItemsModels?.forEach((_, index) => {
      if (
        formik.values.txnInvoiceOrderItemsModels[index].item &&
        !formik.values.txnInvoiceOrderItemsModels[index].qty
      ) {
        itemAmt(formik.values.txnInvoiceOrderItemsModels[index].item, index);
        formik.setFieldValue(`txnInvoiceOrderItemsModels[${index}].qty`, 1);
        formik.setFieldValue(`txnInvoiceOrderItemsModels[${index}].taxRate`, 0);
      }
    });
  }, [
    formik.values.txnInvoiceOrderItemsModels
      ?.map((item) => item.item)
      .join(","),
  ]);

  const calculateAmount = (index) => {
    const qty = formik.values.txnInvoiceOrderItemsModels[index].qty || 0;
    const rate = formik.values.txnInvoiceOrderItemsModels[index].price || 0;
    const tax = formik.values.txnInvoiceOrderItemsModels[index].taxRate || 0;
    const discountPercentage =
      formik.values.txnInvoiceOrderItemsModels[index].disc || 0;

      const itemDiscount = qty * rate * (discountPercentage / 100);
      const taxAmount = (tax / 100) * (qty * rate);
      const amount = (qty * rate) - itemDiscount + taxAmount;
      const roundedAmount = Math.round(amount * 100) / 100;

    formik.setFieldValue(
      `txnInvoiceOrderItemsModels[${index}].amount`,
      amount
    );

    return roundedAmount;
  };

  const calculateTotals = () => {
    let subTotal = 0;
    let totalTax = 0;
    let totalDiscount = 0;

    formik.values.txnInvoiceOrderItemsModels?.forEach((item, index) => {
      const amount = calculateAmount(index); // Calculate and set amount for each item

      const qty = item.qty || 0;
      const rate = item.price || 0;
      const tax = item.taxRate || 0;
      const discountPercentage = item.disc || 0;

      subTotal += qty * rate;
      totalTax += (tax / 100) * (qty * rate);
      totalDiscount += qty * rate * (discountPercentage / 100);
    });

    const totalAmount = subTotal - totalDiscount + totalTax;

    formik.setFieldValue("subTotal", subTotal.toFixed(2));
    formik.setFieldValue("totalTax", totalTax.toFixed(2));
    formik.setFieldValue("totalDiscount", totalDiscount.toFixed(2));
    formik.setFieldValue("total", totalAmount.toFixed(2));
  };

  useEffect(() => {
    calculateTotals();
  }, [
    formik.values.txnInvoiceOrderItemsModels
      ?.map(
        (item) =>
         `${item.qty}-${item.price}-${item.taxRate}-${item.amount}-${item.disc}`
      )
      .join(","),
  ]);

  const AddRowContent = () => {
    const newRow = {
      item: "",
      qty: "",
      price: "",
      disc:"",
      tax: "",
      taxRate: "",
      itemId: "",
    };
    formik.setFieldValue("txnInvoiceOrderItemsModels", [
      ...formik.values.txnInvoiceOrderItemsModels,
      newRow,
    ]);
  };

  const deleteRow = (index) => {
    if (formik.values.txnInvoiceOrderItemsModels.length === 1) {
      return;
    }

    const updatedRows = [...formik.values.txnInvoiceOrderItemsModels];
    updatedRows.pop();
    formik.setFieldValue("txnInvoiceOrderItemsModels", updatedRows);
  };

  return (
    <div className="container-fluid p-2 minHeight m-0">
      <form onSubmit={formik.handleSubmit}>
        <div className="card shadow border-0 mb-2 top-header">
          <div className="container-fluid py-4">
            <div className="row align-items-center">
              <div className="col">
                <div className="d-flex align-items-center gap-4">
                  <h1 className="h4 ls-tight headingColor">Edit Invoice</h1>
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
                    &nbsp;<span>Update</span>
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
              </div>

              {/* <div className="col-md-6 col-12 mb-3">
                <lable className="form-lable">
                  Invoice<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    className={`form-control  ${
                      formik.touched.invoice && formik.errors.invoice
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("invoice")}
                  />
                  {formik.touched.invoice && formik.errors.invoice && (
                    <div className="invalid-feedback">
                      {formik.errors.invoice}
                    </div>
                  )}
                </div>
              </div> */}

              <div className="col-md-6 col-12 mb-3">
                <lable className="form-lable">
                  Invoice Number<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    className={`form-control  ${
                      formik.touched.invoiceNumber &&
                      formik.errors.invoiceNumber
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("invoiceNumber")}
                  />
                  {formik.touched.invoiceNumber &&
                    formik.errors.invoiceNumber && (
                      <div className="invalid-feedback">
                        {formik.errors.invoiceNumber}
                      </div>
                    )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-3">
                <lable className="form-lable">
                  Issues Date<span className="text-danger">*</span>
                </lable>
                <div className="">
                  <input
                    type="date"
                    className={`form-control ${
                      formik.touched.issuesDate && formik.errors.issuesDate
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
              </div>

              <div className="col-md-6 col-12 mb-3">
                <lable className="form-lable">
                  Due Date<span className="text-danger">*</span>
                </lable>
                <div className="">
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
                <label className="form-label">Files</label>
                <div className="">
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

              <div className="col-md-6 col-12 mb-3">
                <lable className="form-lable">
                  Reference
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    className={`form-control  ${
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
              </div>

               <div className="col-md-6 col-12 mb-3">
                <label className="form-label mb-0">
                  Amount Are<span className="text-danger">*</span>&nbsp;&nbsp;
                </label>
                <div className="mb-3">
                  <select
                    name="amountsAre"
                    {...formik.getFieldProps("amountsAre")}
                    className={`form-select ${
                      formik.touched.amountsAre && formik.errors.amountsAre
                        ? "is-invalid"
                        : ""
                    }`}
                    style={{ width: "100%" }}
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
                  <table className="table table-sm table-nowrap">
                    <thead>
                      <tr>
                        <th style={{ width: "25%" }}>Item<span className="text-danger">*</span></th>
                        <th style={{ width: "15%" }}>Quantity</th>
                        <th style={{ width: "15%" }}>Rate</th>
                        <th style={{ width: "15%" }}>Discount(%)</th>
                        <th style={{ width: "15%" }}>Tax (%)</th>
                        <th style={{ width: "15%" }}>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formik.values.txnInvoiceOrderItemsModels?.map(
                        (item, index) => (
                          <tr key={index}>
                            <td>
                              <select
                                className={`form-select ${
                                  formik.touched.txnInvoiceOrderItemsModels &&
                                  formik.touched.txnInvoiceOrderItemsModels[
                                    index
                                  ] &&
                                  formik.errors.txnInvoiceOrderItemsModels &&
                                  formik.errors.txnInvoiceOrderItemsModels[
                                    index
                                  ] &&
                                  formik.errors.txnInvoiceOrderItemsModels[
                                    index
                                  ].item
                                    ? "is-invalid"
                                    : ""
                                }`}
                                onChange={(e) => handleSelectChange(e, index)}
                                value={item.item}
                              >
                                <option value=""></option>
                                {itemData &&
                                  itemData.map((itemId) => (
                                    <option
                                      key={itemId.id}
                                      value={itemId.id}
                                      disabled={formik.values.txnInvoiceOrderItemsModels.some(
                                        (existingItem) =>
                                          existingItem.item === itemId.id
                                      )}
                                    >
                                      {itemId.itemName}
                                    </option>
                                  ))}
                              </select>
                              {formik.touched.txnInvoiceOrderItemsModels &&
                                formik.touched.txnInvoiceOrderItemsModels[
                                  index
                                ] &&
                                formik.errors.txnInvoiceOrderItemsModels &&
                                formik.errors.txnInvoiceOrderItemsModels[
                                  index
                                ] &&
                                formik.errors.txnInvoiceOrderItemsModels[index]
                                  .item && (
                                  <div className="invalid-feedback">
                                    {
                                      formik.errors.txnInvoiceOrderItemsModels[
                                        index
                                      ].item
                                    }
                                  </div>
                                )}
                            </td>
                            <td>
                              <input
                                type="number"
                                min="1"
                                className={`form-control ${
                                  formik.touched.txnInvoiceOrderItemsModels &&
                                  formik.touched.txnInvoiceOrderItemsModels[
                                    index
                                  ] &&
                                  formik.errors.txnInvoiceOrderItemsModels &&
                                  formik.errors.txnInvoiceOrderItemsModels[
                                    index
                                  ] &&
                                  formik.errors.txnInvoiceOrderItemsModels[
                                    index
                                  ].qty
                                    ? "is-invalid"
                                    : ""
                                }`}
                                {...formik.getFieldProps(
                                  `txnInvoiceOrderItemsModels[${index}].qty`
                                )}
                              />
                              {formik.touched.txnInvoiceOrderItemsModels &&
                                formik.touched.txnInvoiceOrderItemsModels[
                                  index
                                ] &&
                                formik.errors.txnInvoiceOrderItemsModels &&
                                formik.errors.txnInvoiceOrderItemsModels[
                                  index
                                ] &&
                                formik.errors.txnInvoiceOrderItemsModels[index]
                                  .qty && (
                                  <div className="invalid-feedback">
                                    {
                                      formik.errors.txnInvoiceOrderItemsModels[
                                        index
                                      ].qty
                                    }
                                  </div>
                                )}
                            </td>
                            <td>
                              <input
                                type="number"
                                min="1"
                                className={`form-control ${
                                  formik.touched.txnInvoiceOrderItemsModels &&
                                  formik.touched.txnInvoiceOrderItemsModels[
                                    index
                                  ] &&
                                  formik.errors.txnInvoiceOrderItemsModels &&
                                  formik.errors.txnInvoiceOrderItemsModels[
                                    index
                                  ] &&
                                  formik.errors.txnInvoiceOrderItemsModels[
                                    index
                                  ].price
                                    ? "is-invalid"
                                    : ""
                                }`}
                                {...formik.getFieldProps(
                                  `txnInvoiceOrderItemsModels[${index}].price`
                                )}
                                readOnly
                              />
                              {formik.touched.txnInvoiceOrderItemsModels &&
                                formik.touched.txnInvoiceOrderItemsModels[
                                  index
                                ] &&
                                formik.errors.txnInvoiceOrderItemsModels &&
                                formik.errors.txnInvoiceOrderItemsModels[
                                  index
                                ] &&
                                formik.errors.txnInvoiceOrderItemsModels[index]
                                  .price && (
                                  <div className="invalid-feedback">
                                    {
                                      formik.errors.txnInvoiceOrderItemsModels[
                                        index
                                      ].price
                                    }
                                  </div>
                                )}
                            </td>
                            <td>
                              <input
                                type="number"
                                min="1"
                                className={`form-control ${
                                  formik.touched.txnInvoiceOrderItemsModels &&
                                  formik.touched.txnInvoiceOrderItemsModels[
                                    index
                                  ] &&
                                  formik.errors.txnInvoiceOrderItemsModels &&
                                  formik.errors.txnInvoiceOrderItemsModels[
                                    index
                                  ] &&
                                  formik.errors.txnInvoiceOrderItemsModels[
                                    index
                                  ].disc
                                    ? "is-invalid"
                                    : ""
                                }`}
                                {...formik.getFieldProps(
                                  `txnInvoiceOrderItemsModels[${index}].disc`
                                )}
                              />
                              {formik.touched.txnInvoiceOrderItemsModels &&
                                formik.touched.txnInvoiceOrderItemsModels[
                                  index
                                ] &&
                                formik.errors.txnInvoiceOrderItemsModels &&
                                formik.errors.txnInvoiceOrderItemsModels[
                                  index
                                ] &&
                                formik.errors.txnInvoiceOrderItemsModels[index]
                                  .disc && (
                                  <div className="invalid-feedback">
                                    {
                                      formik.errors.txnInvoiceOrderItemsModels[
                                        index
                                      ].disc
                                    }
                                  </div>
                                )}
                            </td>
                            <td>
                              <input
                                type="number"
                                max="100"
                                className={`form-control ${
                                  formik.touched.txnInvoiceOrderItemsModels &&
                                  formik.touched.txnInvoiceOrderItemsModels[
                                    index
                                  ] &&
                                  formik.errors.txnInvoiceOrderItemsModels &&
                                  formik.errors.txnInvoiceOrderItemsModels[
                                    index
                                  ] &&
                                  formik.errors.txnInvoiceOrderItemsModels[
                                    index
                                  ].taxRate
                                    ? "is-invalid"
                                    : ""
                                }`}
                                {...formik.getFieldProps(
                                  `txnInvoiceOrderItemsModels[${index}].taxRate`
                                )}
                              />
                              {formik.touched.txnInvoiceOrderItemsModels &&
                                formik.touched.txnInvoiceOrderItemsModels[
                                  index
                                ] &&
                                formik.errors.txnInvoiceOrderItemsModels &&
                                formik.errors.txnInvoiceOrderItemsModels[
                                  index
                                ] &&
                                formik.errors.txnInvoiceOrderItemsModels[index]
                                  .taxRate && (
                                  <div className="invalid-feedback">
                                    {
                                      formik.errors.txnInvoiceOrderItemsModels[
                                        index
                                      ].taxRate
                                    }
                                  </div>
                                )}
                            </td>
                            <td>
                              <input
                                type="number"
                                min="0"
                                className={`form-control ${
                                  formik.touched.txnInvoiceOrderItemsModels &&
                                  formik.touched.txnInvoiceOrderItemsModels[
                                    index
                                  ] &&
                                  formik.errors.txnInvoiceOrderItemsModels &&
                                  formik.errors.txnInvoiceOrderItemsModels[
                                    index
                                  ] &&
                                  formik.errors.txnInvoiceOrderItemsModels[
                                    index
                                  ].amount
                                    ? "is-invalid"
                                    : ""
                                }`}
                                readOnly
                                value={item.amount}
                              />
                              {formik.touched.txnInvoiceOrderItemsModels &&
                                formik.touched.txnInvoiceOrderItemsModels[
                                  index
                                ] &&
                                formik.errors.txnInvoiceOrderItemsModels &&
                                formik.errors.txnInvoiceOrderItemsModels[
                                  index
                                ] &&
                                formik.errors.txnInvoiceOrderItemsModels[index]
                                  .amount && (
                                  <div className="invalid-feedback">
                                    {
                                      formik.errors.txnInvoiceOrderItemsModels[
                                        index
                                      ].amount
                                    }
                                  </div>
                                )}
                            </td>
                          </tr>
                        )
                      )}
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
                {formik.values.txnInvoiceOrderItemsModels?.length > 1 && (
                  <button
                    className="btn btn-sm my-4 mx-1 delete border-danger bg-white text-danger"
                    onClick={deleteRow}
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
                        formik.touched.customerNotes &&
                        formik.errors.customerNotes
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps("customerNotes")}
                    />
                    {formik.touched.customerNotes &&
                      formik.errors.customerNotes && (
                        <div className="invalid-feedback">
                          {formik.errors.customerNotes}
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
                  <div className="row mb-3 mt-2">
                    <label className="col-sm-4 col-form-label">
                      Total Discount
                    </label>
                    <div className="col-sm-4"></div>
                    <div className="col-sm-4">
                      <input
                        type="text"
                        className={`form-control ${
                          formik.touched.totalDiscount &&
                          formik.errors.totalDiscount
                            ? "is-invalid"
                            : ""
                        }`}
                        {...formik.getFieldProps("totalDiscount")}
                      />
                      {formik.touched.totalDiscount &&
                        formik.errors.totalDiscount && (
                          <div className="invalid-feedback">
                            {formik.errors.totalDiscount}
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
                        className={`form-control ${
                          formik.touched.totalTax && formik.errors.totalTax
                            ? "is-invalid"
                            : ""
                        }`}
                        {...formik.getFieldProps("totalTax")}
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
                        className={`form-control ${
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
                </div>

                <div className="col-md-6 col-12 mb-3">
                  <lable className="form-lable">
                    Terms & Conditions
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
}

export default InvoiceEdit;
