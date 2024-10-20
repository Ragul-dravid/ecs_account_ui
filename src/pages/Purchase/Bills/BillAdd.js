import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import api from "../../../config/URL";
import fetchAllVendorNameWithIds from "../../List/VendorList";
import fetchAllItemWithIds from "../../List/ItemList";

function BillsAdd() {
  const validationSchema = Yup.object().shape({
    vendorId: Yup.string().required("*Customer Name is required"),

    status: Yup.string().required("*Status is required"),
    // invoiceDate: Yup.date().required("*Invoice Date is required"),
    dueDate: Yup.date().required("*Due Date is required"),
    date: Yup.date().required("*Bill Date is required"),
    amountsAre: Yup.string().required("*Amounts Are is required"),
    permitNumber: Yup.number().typeError("*Permit number must ba number").notRequired(),
    currency: Yup.string().required("*Currency is required"),
    billItemsModels: Yup.array().of(
      Yup.object().shape({
        item: Yup.string().required("*Item Details is required"),
        qty: Yup.number().min(1, "*Quantity must be a min 1").notRequired(),
        price: Yup.number().typeError("*Rate must be a number").notRequired(),
        // discount: Yup.number()
        //   .typeError("*Discount must be a number")
        //   .required("*Discount is required"),
        taxRate: Yup.string().required("*Tax is required"),
        amount: Yup.number()
          .typeError("*Amount must be a number")
          .notRequired(),
      })
    ),
    // notes: Yup.string().required("*Notes is required"),
    // subTotal: Yup.number()
    //   .typeError("*Sub Total must be a number")
    //   .required("*Sub Total is required"),
    // tax: Yup.number()
    //   .typeError("*Tax must be a number")
    //   .required("*Tax is required"),
    // totalAmount: Yup.number()
    //   .typeError("*Total Amount must be a number")
    //   .required("*Total Amount is required"),
    // file: Yup.mixed().required("*A file is required"),
  });
  const navigate = useNavigate();
  const [loading, setLoadIndicator] = useState(false);
  const [items, setItems] = useState([]);
  const [vendorData, setVendorData] = useState([]);

  const formik = useFormik({
    initialValues: {
      vendorId: "",
      currency: "",
      reference: "",
      date: "",
      dueDate: "",
      permitNumber: "",
      status: "",
      cusNotes: "",
      termsCondition: "",
      total: "",
      subTotal: "",
      tax: "",
      amountsAre: "",
      billItemsModels: [
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
      console.log("Bill Datas:", values);
      const formData = new FormData();

      formData.append("vendorId", values.vendorId);
      formData.append("date", values.date);
      formData.append("dueDate", values.dueDate);
      formData.append("reference", values.reference);
      formData.append("permitNumber", values.permitNumber);
      formData.append("total", values.total);
      formData.append("status", values.status);
      formData.append("currency", values.currency);
      formData.append("amountsAre", values.amountsAre);
      formData.append("tax", values.tax);
      formData.append("subTotal", values.subTotal);
      formData.append("cusNotes", values.cusNotes);
      formData.append("termsCondition", values.termsCondition);
      formData.append("status", values.status);

      values.billItemsModels.forEach((item) => {
        formData.append("item", item.item);
        formData.append("qty", item.qty);
        formData.append("price", item.price);
        formData.append("taxRate", item.taxRate);
        formData.append("amount", item.amount);
        formData.append("mstrItemsId", item.item);
        formData.append("discount", item.discount);
        formData.append("account", "item");
        formData.append("description", "test");
      });
      if (values.file) {
        formData.append("files", values.file);
      }

      try {
        const response = await api.post("bill", formData);
        if (response.status === 201) {
          toast.success(response.data.message);
          navigate("/bills");
        }
      } catch (e) {
        toast.error("Error fetching data: ", e?.response?.data?.message);
      } finally {
        setLoadIndicator(false);
      }
    },
  });
  const addRow = () => {
    formik.setFieldValue("billItemsModels", [
      ...formik.values.billItemsModels,
      { item: "", qty: "", price: "",discount:"", taxRate: "", amount: "" },
    ]);
  };

  const removeRow = () => {
    const items = [...formik.values.billItemsModels];
    if (items.length > 1) {
      items.pop();
      formik.setFieldValue("billItemsModels", items);
    }
  };

  const fetchItemsData = async () => {
    try {
      const response = await fetchAllItemWithIds();
      setItems(response.data);
    } catch (error) {
      toast.error("Error fetching tax data:", error);
    }
  };
  const fetchCustamerData = async () => {
    try {
      const response = await fetchAllVendorNameWithIds();;
      setVendorData(response.data);
    } catch (error) {
      toast.error("Error fetching tax data:", error);
    }
  };

  useEffect(() => {
    fetchItemsData();
    fetchCustamerData();
  }, []);

  useEffect(() => {
    const updateAndCalculate = async () => {
      try {
        let totalRate = 0;
        let totalAmount = 0;
        let totalTax = 0;
        let totalDisc = 0;
        const updatedItems = await Promise.all(
          formik.values.billItemsModels.map(async (item, index) => {
            if (item.item) {
              try {
                const response = await api.get(`itemsById/${item.item}`);
                const updatedItem = {
                  ...item,
                  price: response.data.costPrice,
                  qty: 1,
                };
                const amount = calculateAmount(
                  updatedItem.qty,
                  updatedItem.price,
                  updatedItem.discount,
                  updatedItem.taxRate
                );
                const itemTotalRate = updatedItem.qty * updatedItem.price;
                const itemTotalTax =
                  itemTotalRate * (updatedItem.taxRate / 100);
                const itemTotalDisc = itemTotalRate * (updatedItem.discount / 100);
                totalDisc += itemTotalDisc;
                totalRate += updatedItem.price;
                totalAmount += amount;
                totalTax += itemTotalTax;
                return { ...updatedItem, amount };
              } catch (error) {
                toast.error(
                  "Error fetching data: ",
                  error?.response?.data?.message
                );
              }
            }
            return item;
          })
        );
        formik.setValues({ ...formik.values, billItemsModels: updatedItems });
        formik.setFieldValue("subTotal", totalRate);
        formik.setFieldValue("total", totalAmount);
        formik.setFieldValue("discount", totalDisc);
        formik.setFieldValue("tax", totalTax);
      } catch (error) {
        toast.error("Error updating items: ", error.message);
      }
    };

    updateAndCalculate();
  }, [formik.values.billItemsModels.map((item) => item.item).join("")]);

  useEffect(() => {
    const updateAndCalculate = async () => {
      try {
        let totalRate = 0;
        let totalAmount = 0;
        let totalTax = 0;
        let totalDisc = 0;
        const updatedItems = await Promise.all(
          formik.values.billItemsModels.map(async (item, index) => {
            if (
              item.qty &&
              item.price &&
              item.discount !== undefined &&
              item.taxRate !== undefined
            ) {
              const amount = calculateAmount(
                item.qty,
                item.price,
                item.discount,
                item.taxRate
              );
              const itemTotalRate = item.qty * item.price;
              const itemTotalTax = itemTotalRate * (item.taxRate / 100);
              const itemTotalDisc = itemTotalRate * (item.discount / 100);
              totalDisc += itemTotalDisc;
              totalRate += item.price;
              totalAmount += amount;
              totalTax += itemTotalTax;
              return { ...item, amount };
            }
            return item;
          })
        );
        formik.setValues({ ...formik.values, billItemsModels: updatedItems });
        formik.setFieldValue("subTotal", totalRate);
        formik.setFieldValue("total", totalAmount);
        formik.setFieldValue("discount", totalDisc);
        formik.setFieldValue("tax", totalTax);
      } catch (error) {
        toast.error("Error updating items: ", error.message);
      }
    };

    updateAndCalculate();
  }, [
    formik.values.billItemsModels.map((item) => item.qty).join(","),
    formik.values.billItemsModels.map((item) => item.price).join(","),
    formik.values.billItemsModels.map((item) => item.discount).join(","),
    formik.values.billItemsModels.map((item) => item.taxRate).join(","),
  ]);

  const calculateAmount = (qty, price, discount, taxRate) => {
    const totalRate = qty * price;
    const discountAmounts = totalRate * (discount / 100);
    const taxableAmount = totalRate * (taxRate / 100);
    const totalAmount = totalRate + taxableAmount - discountAmounts;
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
                  <h1 className="h4 ls-tight headingColor">Add Bill</h1>
                </div>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-end">
                  <Link to="/bills">
                    <button type="submit" className="btn btn-sm btn-light">
                      <span>Back</span>
                    </button>
                  </Link>

                  <button
                    type="submit"
                    onClick={formik.handleSubmit}
                    className="btn btn-button btn-sm"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card shadow border-0 my-2">
          <div className="row mt-3 me-2"></div>

          {/* User Information */}

          <div className="container mb-5">
            <div className="row py-4">
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Vendor Name<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <select
                    {...formik.getFieldProps("vendorId")}
                    className={`form-select    ${
                      formik.touched.vendorId && formik.errors.vendorId
                        ? "is-invalid"
                        : ""
                    }`}
                  >
                    <option value=""> </option>
                    {vendorData &&
                      vendorData.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.contactName}
                        </option>
                      ))}
                  </select>
                  {formik.touched.vendorId && formik.errors.vendorId && (
                    <div className="invalid-feedback">
                      {formik.errors.vendorId}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  status<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <select
                    {...formik.getFieldProps("status")}
                    className={`form-select    ${
                      formik.touched.status && formik.errors.status
                        ? "is-invalid"
                        : ""
                    }`}
                  >
                    <option value=""> </option>
                    <option value="ISSUED">Issued </option>
                    <option value="PAID">Paid </option>
                    <option value="OPENED">Opened </option>
                  </select>
                  {formik.touched.status && formik.errors.status && (
                    <div className="invalid-feedback">
                      {formik.errors.status}
                    </div>
                  )}
                </div>
              </div>
              {/* <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Bill#
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="bill"
                    className="form-control"
                  />

                </div>
              </div> */}

              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">Reference</lable>
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
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">Permit Number</lable>
                  <input
                    type="text"
                    name="permitNumber"
                    className={`form-control ${
                      formik.touched.permitNumber && formik.errors.permitNumber
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("permitNumber")}
                  />
                  {formik.touched.permitNumber  && formik.errors.permitNumber  && (
                  <div className="invalid-feedback">
                    {formik.errors.permitNumber}
                  </div>
                )}
                
              </div>
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Bill Date<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="date"
                    name="date"
                    className={`form-control ${
                      formik.touched.date && formik.errors.date
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("date")}
                  />
                  {formik.touched.date && formik.errors.date && (
                    <div className="invalid-feedback">
                      {formik.errors.date}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Due Date<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="date"
                    name="dueDate"
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

              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Currency<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="currency"
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
            </div>

            <div className="col-12 mb-3">
              <div className=" d-flex align-items-end justify-content-end">
                <label className="col-form-label me-1">
                  Amount Are<span className="text-danger">*</span>
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
              </div>
              <div className="row ">
                {formik.touched.amountsAre && formik.errors.amountsAre && (
                  <div
                    className="text-danger d-flex justify-content-end "
                    style={{ fontSize: "0.875em", paddingRight: "5.25rem" }}
                  >
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
                <table class="table ">
                  <thead>
                    <tr>
                      <th scope="col">S.NO</th>
                      <th style={{ width: "25%" }}>Item<span className="text-danger">*</span></th>
                      <th style={{ width: "10%" }}>Quantity</th>
                      <th style={{ width: "15%" }}>Rate</th>
                      <th style={{ width: "15%" }}>disc (%)</th>
                      <th style={{ width: "15%" }}>Tax (%)</th>
                      <th style={{ width: "15%" }}>Amount</th>
                    </tr>
                  </thead>
                  <tbody className="table-group">
                    {formik.values.billItemsModels.map((item, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>
                          <select
                            {...formik.getFieldProps(
                              `billItemsModels[${index}].item`
                            )}
                            className={`form-select ${
                              formik.touched.billItemsModels?.[index]?.item &&
                              formik.errors.billItemsModels?.[index]?.item
                                ? "is-invalid"
                                : ""
                            }`}
                          >
                            <option value=""> </option>
                            {items &&
                              items.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.itemName}
                                </option>
                              ))}
                          </select>
                          {formik.touched.billItemsModels?.[index]?.item &&
                            formik.errors.billItemsModels?.[index]?.item && (
                              <div className="invalid-feedback">
                                {formik.errors.billItemsModels[index].item}
                              </div>
                            )}
                        </td>
                        <td>
                          <input onInput={(event)=>{ event.target.value = event.target.value.replace(/[^0-9]/g, '');}}
                            type="text"
                            className={`form-control ${
                              formik.touched.billItemsModels?.[index]?.qty &&
                              formik.errors.billItemsModels?.[index]?.qty
                                ? "is-invalid"
                                : ""
                            }`}
                            {...formik.getFieldProps(
                              `billItemsModels[${index}].qty`
                            )}
                          />
                          {formik.touched.billItemsModels?.[index]?.qty &&
                            formik.errors.billItemsModels?.[index]?.qty && (
                              <div className="invalid-feedback">
                                {formik.errors.billItemsModels[index].qty}
                              </div>
                            )}
                        </td>
                        <td>
                          <input
                            readOnly
                            type="text"
                            className={`form-control ${
                              formik.touched.billItemsModels?.[index]?.price &&
                              formik.errors.billItemsModels?.[index]?.price
                                ? "is-invalid"
                                : ""
                            }`}
                            {...formik.getFieldProps(
                              `billItemsModels[${index}].price`
                            )}
                          />
                          {formik.touched.billItemsModels?.[index]?.price &&
                            formik.errors.billItemsModels?.[index]?.price && (
                              <div className="invalid-feedback">
                                {formik.errors.billItemsModels[index].price}
                              </div>
                            )}
                        </td>
                        <td>
                          <input onInput={(event)=>{ event.target.value = event.target.value.replace(/[^0-9]/g, '').slice(0, 2);}}
                            type="text"
                            className={`form-control ${
                              formik.touched.billItemsModels?.[index]?.discount &&
                              formik.errors.billItemsModels?.[index]?.discount
                                ? "is-invalid"
                                : ""
                            }`}
                            {...formik.getFieldProps(
                              `billItemsModels[${index}].discount`
                            )}
                          />
                          {formik.touched.billItemsModels?.[index]?.discount &&
                            formik.errors.billItemsModels?.[index]?.discount && (
                              <div className="invalid-feedback">
                                {formik.errors.billItemsModels[index].discount}
                              </div>
                            )}
                        </td>
                        <td>
                          <input onInput={(event)=>{ event.target.value = event.target.value.replace(/[^0-9]/g, '').slice(0, 2);}}
                            {...formik.getFieldProps(
                              `billItemsModels[${index}].taxRate`
                            )}
                            className={`form-control ${
                              formik.touched.billItemsModels?.[index]
                                ?.taxRate &&
                              formik.errors.billItemsModels?.[index]?.taxRate
                                ? "is-invalid"
                                : ""
                            }`}
                          />

                          {formik.touched.billItemsModels?.[index]?.taxRate &&
                            formik.errors.billItemsModels?.[index]?.taxRate && (
                              <div className="invalid-feedback">
                                {formik.errors.billItemsModels[index].taxRate}
                              </div>
                            )}
                        </td>
                        <td>
                          <input
                            readOnly
                            type="text"
                            className={`form-control ${
                              formik.touched.billItemsModels?.[index]?.amount &&
                              formik.errors.billItemsModels?.[index]?.amount
                                ? "is-invalid"
                                : ""
                            }`}
                            {...formik.getFieldProps(
                              `billItemsModels[${index}].amount`
                            )}
                          />
                          {formik.touched.billItemsModels?.[index]?.amount &&
                            formik.errors.billItemsModels?.[index]?.amount && (
                              <div className="invalid-feedback">
                                {formik.errors.billItemsModels[index].amount}
                              </div>
                            )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <button
              className="btn btn-button btn-sm my-4 mx-1"
              type="button"
              onClick={addRow}
            >
              Add row
            </button>
            {formik.values.billItemsModels.length > 1 && (
              <button
                className="btn btn-sm my-4 mx-1 delete border-danger bg-white text-danger"
                onClick={removeRow}
              >
                Delete
              </button>
            )}
            <div className="row mt-5 pt-0">
              <div className="col-md-6 col-12 mb-2 ">
                <lable className="form-lable">Customer Notes</lable>
                <div className="mb-3">
                  <input
                    type="text"
                    {...formik.getFieldProps("cusNotes")}
                    name="cusNotes"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="card col-md-6 col-12 p-3 mt-5 mb-4 card shadow border-2">
                <div className=" my-4 ms-2 d-flex justify-content-between align-items-center">
                  <lable className="form-lable">Sub Total</lable>
                  <div className="ms-3">
                    <input
                      type="text"
                      name="subTotal"
                      {...formik.getFieldProps("subTotal")}
                      className="form-control form-control-sm"
                    />
                  </div>
                </div>

                <div className=" ms-2 d-flex justify-content-between align-items-center">
                  <lable className="form-lable">Total Tax</lable>
                  <div className="ms-3">
                    <input
                      {...formik.getFieldProps("tax")}
                      type="text"
                      name="tax"
                      className="form-control form-control-sm"
                    />
                  </div>
                </div>
                <hr className="border-dark" />
                <div className=" ms-2 d-flex justify-content-between align-items-center mt-2">
                  <lable className="form-lable">Total</lable>
                  <div className="ms-3">
                    <input
                      {...formik.getFieldProps("total")}
                      type="text"
                      name="total"
                      className="form-control form-control-sm"
                    />
                  </div>
                </div>
              </div>
              <hr />
              <div className="col-12">
                <lable className="form-lable">Terms & Conditions</lable>
                <div className="mb-3">
                  <textarea
                    {...formik.getFieldProps("termsCondition")}
                    placeholder="Enter the terms and conditions of your business in your transaction"
                    type="text"
                    name="termsCondition"
                    className="form-control "
                    style={{ width: "65%", height: "5rem" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default BillsAdd;
