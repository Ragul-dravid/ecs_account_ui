import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
// import { MdDeleteSweep } from "react-icons/md";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import * as Yup from "yup";
import fetchAllVendorNameWithIds from "../../List/VendorList";
import fetchAllItemWithIds from "../../List/ItemList";

const PurchaseEdit = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [vendorData, setVendorData] = useState(null);
  const [items, setItems] = useState([]);
  const [rows, setRows] = useState([{ id: 1 }]);
  // const [rowss, setRowss] = useState([]);

  const validationSchema = Yup.object({
    vendorId: Yup.string().required("*Vendor Name is required"),
    deliveryDate: Yup.date().required("*Delivery Date is required"),
    date: Yup.date().required("*date is required"),
    currency: Yup.string().required("*Currency is required"),
    phone: Yup.string().required("*Phone is required"),
    street: Yup.string().required("*Street is required"),
    city: Yup.string().required("*City is required"),
    state: Yup.string().required("*State is required"),
    amountsAre: Yup.string().required("*Amounts Are is required"),
    zipCode: Yup.string().required("*Zip Code is required"),
    country: Yup.string().required("*Country is required"),
    items: Yup.array().of(
      Yup.object().shape({
        item: Yup.string().required("*Item Details is required"),
        qty: Yup.number()
          .min(1, "*Quantity must be a min 1")
          .notRequired(),
          price: Yup.number()
          .typeError("*Rate must be a number")
          .notRequired(),
        amount: Yup.number()
          .typeError("*Amount must be a number")
          .notRequired(),
      })
    ),
  });

  const formik = useFormik({
    initialValues: {
      vendorId: "",
      date: "",
      deliveryDate: "",
      reference: "",
      currency: "",
      amountsAre: "",
      subTotal: "",
      taxTotal: "",
      total: "",
      attention: "",
      telePhone: "",
      instructions: "",
      label: "",
      addAttention: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      phone: "",
      addIntructions: "",
      items: [
        {
          item: "",
          qty: "",
          unitPrice: "",
          disc: "",
          taxRate: "",
          amount: "",
        },
      ],
      file: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("vendorId", values.vendorId);
      formData.append("date", values.date);
      formData.append("deliveryDate", values.deliveryDate);
      formData.append("reference", values.reference);
      formData.append("currency", values.currency);
      formData.append("amountsAre", values.amountsAre);
      formData.append("subTotal", values.subTotal);
      formData.append("total", values.total);
      formData.append("attention", values.attention);
      formData.append("telePhone", "6578899");
      formData.append("instructions", "Glass Items");
      formData.append("label", "label");
      formData.append("addAttention", "new washermenpet");
      formData.append("street", values.street);
      formData.append("city", values.city);
      formData.append("state  ", values.state);
      formData.append("zipCode", values.zipCode);
      formData.append("country", values.country);
      formData.append("phone", values.phone);
      formData.append("addIntructions", values.addIntructions);
      values.items.forEach((item) => {
        formData.append("qty", item.qty);
        formData.append("disc", item.disc);
        formData.append("unitPrice", item.unitPrice);
        formData.append("taxRate", item.taxRate);
        formData.append("amount", item.amount);
        formData.append("description"," item.description");
        formData.append("account"," item.account");
        formData.append("mstrItemsId", item.item);
        formData.append("item", item.item);
        if(item.it!==undefined){
          formData.append("itemId", item.id);
        }
      });
      if(values.file){
        formData.append("file", values.file);}
      try {
        const response = await api.put(`/updateTxnPurchaseOrder/${id}`, formData, {
          
        });
        if (response.status === 200) {
          toast.success("Estimate updated successfully");
          navigate("/purchase");
        }
      } catch (error) {
        toast.error("Error fetching data: ", error?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    const getExpensesData = async () => {
      try {
        const response = await api.get(`getTxnPurchaseOrderById/${id}`);
        formik.setValues(response.data);
        formik.setFieldValue("items",response.data.purchaseOrderItemModels)
      } catch (error) {
        toast.error("Error fetching data: ", error?.response?.data?.message);
      }
    };
    getExpensesData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchData = async () => {
    try {
      const vendorData = await fetchAllVendorNameWithIds();
      const itemData = await fetchAllItemWithIds();
      setVendorData(vendorData);
      setItems(itemData)
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(()=>{
    fetchData();
  },[])
  const addRow = () => {
    formik.setFieldValue("items", [
      ...formik.values.items,
      { item: "", qty: "", unitPrice: "", disc: "", taxRate: "", amount: "" },
    ]);
  };
  const removeRow = () => {
    const items = [...formik.values.items];
    if (items.length > 1) {
      items.pop();
      formik.setFieldValue("items", items);
    }
  };
  useEffect(() => {
    const updateAndCalculate = async () => {
      try {
        let totalRate = 0;
        let totalAmount = 0;
        let totalTax = 0;
  
        const updatedItems = await Promise.all(
          formik.values.items?.map(async (item, index) => {
            if (item.item && !formik.values.items[index].qty) {
              formik.values.items[index].qty = 1;
            }
            if (item.item) {
              try {
                const response = await api.get(`getMstrItemsById/${item.item}`);
                const updatedItem = { ...item, unitPrice: response.data.salesPrice  };
                const amount = calculateAmount(updatedItem.qty, updatedItem.unitPrice, updatedItem.disc, updatedItem.taxRate);
                const itemTotalRate = updatedItem.qty * updatedItem.unitPrice;
                const itemTotalTax = itemTotalRate * (updatedItem.taxRate / 100);
                totalRate += updatedItem.unitPrice;
                totalAmount += amount;
                totalTax += itemTotalTax;
                return { ...updatedItem, amount };
              } catch (error) {
                toast.error("Error fetching data: ", error?.response?.data?.message);
              }
            }
          
            if (item.qty && item.unitPrice && item.disc !== undefined && item.taxRate !== undefined) {
              const amount = calculateAmount(item.qty, item.unitPrice, item.disc, item.taxRate);
              const itemTotalRate = item.qty * item.unitPrice;
              const itemTotalTax = itemTotalRate * (item.taxRate / 100);
              totalRate += item.unitPrice;
              totalAmount += amount;
              totalTax += itemTotalTax;
              return { ...item, amount,};
            }
            return item;
          })
        );
        formik.setValues({ ...formik.values, items: updatedItems });
        formik.setFieldValue("subTotal", totalRate);
        formik.setFieldValue("total", totalAmount);
        formik.setFieldValue("taxTotal", totalTax);
      } catch (error) {
        toast.error("Error updating items: ", error.message);
      }
    };

    updateAndCalculate();
  }, [
    formik.values.items?.map((item) => item.item).join(""),
    formik.values.items?.map((item) => item.qty).join(","),
    formik.values.items?.map((item) => item.unitPrice).join(""),
    formik.values.items?.map((item) => item.disc).join(""),
    formik.values.items?.map((item) => item.taxRate).join(""),
  ]);

  const calculateAmount = (qty, unitPrice, disc, taxRate) => {
    const totalRate = qty * unitPrice;
    const discountAmount = totalRate * (disc / 100);
    const taxableAmount = totalRate * (taxRate / 100);
    const totalAmount = totalRate + taxableAmount - discountAmount;
    return totalAmount;
  };
  return (
    <div className="container-fluid p-2 minHeight m-0">
    <div className="card shadow border-0 mb-2 top-header">
      <div className="container-fluid py-4">
        <div className="row align-items-center">
          <div className="col">
            <div className="d-flex align-items-center gap-4">
              <h1 className="h4 ls-tight headingColor">
                Edit Purchase Orders
              </h1>
            </div>
          </div>
          <div className="col-auto">
            <div className="hstack gap-2 justify-content-end">
              <Link to="/purchase">
                <button type="submit" className="btn btn-sm btn-light">
                  <span>Back</span>
                </button>
              </Link>
              <button
                type="submit"
                onClick={formik.handleSubmit}
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
    <form onSubmit={formik.handleSubmit}>
      <div className="card shadow border-0 my-2">
        <div className="container mb-5">
          <div className="row py-4">
            <div className="col-md-6 col-12 mb-2">
              <lable className="form-lable">Vendor</lable>
              <span className="text-danger">*</span>
              <div className="mb-3">
                <select
                  name="vendorId"
                  {...formik.getFieldProps("vendorId")}
                  className={`form-select    ${
                    formik.touched.vendorId && formik.errors.vendorId
                      ? "is-invalid"
                      : ""
                  }`}
                >
                  <option selected></option>
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
                <lable className="form-lable">Date</lable>
                <div className="mb-3">
                  <input
                    type="date"
                    name="date"
                    className={`form-control  ${
                    formik.touched.date && formik.errors.date
                      ? "is-invalid"
                      : ""
                  }`}
                    {...formik.getFieldProps("date")}
                  />{formik.touched.date && formik.errors.date && (
                  <div className="invalid-feedback">
                    {formik.errors.date}
                  </div>
                )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">Delivery Date</lable>
                <div className="mb-3">
                  <input
                    type="date"
                    name="deliveryDate"
                    className={`form-control  ${
                    formik.touched.deliveryDate && formik.errors.deliveryDate
                      ? "is-invalid"
                      : ""
                  }`}
                    {...formik.getFieldProps("deliveryDate")}
                  />{formik.touched.deliveryDate && formik.errors.deliveryDate && (
                  <div className="invalid-feedback">
                    {formik.errors.deliveryDate}
                  </div>
                )}
                </div>
              </div>

            {/* <div className="col-md-6 col-12 mb-2">
              <lable className="form-lable">Order Number</lable>
              <span className="text-danger">*</span>
              <div className="mb-3">
                <input
                  type="text"
                  name="orderNumber"
                  {...formik.getFieldProps("orderNumber")}
                  className={`form-control  ${
                    formik.touched.orderNumber && formik.errors.orderNumber
                      ? "is-invalid"
                      : ""
                  }`}
                />
                {formik.touched.orderNumber && formik.errors.orderNumber && (
                  <div className="invalid-feedback">
                    {formik.errors.orderNumber}
                  </div>
                )}
              </div>
            </div> */}

            <div className="col-md-6 col-12 mb-2">
              <lable className="form-lable">Reference</lable>
              <input
                type="text"
                name="reference"
                {...formik.getFieldProps("reference")}
                className={`form-control `}
              />
            </div>

            <div className="col-md-6 col-12 mb-2">
              <lable className="form-lable">Currency</lable>
              <span className="text-danger">*</span>
              <select
                name="currency"
                {...formik.getFieldProps("currency")}
                className={`form-control  ${
                  formik.touched.currency && formik.errors.currency
                    ? "is-invalid"
                    : ""
                }`}
              >
                <option value=""></option>
                <option value="India">India</option>
                <option value="Singapore">Singapore</option>
              </select>
              {formik.touched.currency && formik.errors.currency && (
                <div className="invalid-feedback">
                  {formik.errors.currency}
                </div>
              )}
            </div>

            <div className="col-md-6 col-12 mb-2">
              <lable className="form-lable">Phone</lable>
              <span className="text-danger">*</span>
              <div className="mb-3">
                <input
                  type="text"
                  name="phone"
                  {...formik.getFieldProps("phone")}
                  className={`form-control  ${
                    formik.touched.phone && formik.errors.phone
                      ? "is-invalid"
                      : ""
                  }`}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <div className="invalid-feedback">
                    {formik.errors.phone}
                  </div>
                )}
              </div>
            </div>

            <div className="col-md-6 col-12 mb-2">
              <lable className="form-lable">Street</lable>
              <span className="text-danger">*</span>
              <div className="mb-3">
                <input
                  type="text"
                  name="street"
                  {...formik.getFieldProps("street")}
                  className={`form-control  ${
                    formik.touched.street && formik.errors.street
                      ? "is-invalid"
                      : ""
                  }`}
                />
                {formik.touched.street && formik.errors.street && (
                  <div className="invalid-feedback">
                    {formik.errors.street}
                  </div>
                )}
              </div>
            </div>

            <div className="col-md-6 col-12 mb-2">
              <lable className="form-lable">City</lable>
              <span className="text-danger">*</span>
              <div className="mb-3">
                <input
                  type="text"
                  name="city"
                  {...formik.getFieldProps("city")}
                  className={`form-control  ${
                    formik.touched.city && formik.errors.city
                      ? "is-invalid"
                      : ""
                  }`}
                />
                {formik.touched.city && formik.errors.city && (
                  <div className="invalid-feedback">{formik.errors.city}</div>
                )}
              </div>
            </div>

            <div className="col-md-6 col-12 mb-2">
              <lable className="form-lable">State</lable>
              <span className="text-danger">*</span>
              <div className="mb-3">
                <input
                  type="text"
                  name="state"
                  {...formik.getFieldProps("state")}
                  className={`form-control  ${
                    formik.touched.state && formik.errors.state
                      ? "is-invalid"
                      : ""
                  }`}
                />
                {formik.touched.state && formik.errors.state && (
                  <div className="invalid-feedback">
                    {formik.errors.state}
                  </div>
                )}
              </div>
            </div>

            <div className="col-md-6 col-12 mb-2">
              <lable className="form-lable">Zip Code</lable>
              <span className="text-danger">*</span>
              <div className="mb-3">
                <input
                  type="text"
                  name="zipCode"
                  {...formik.getFieldProps("zipCode")}
                  className={`form-control  ${
                    formik.touched.zipCode && formik.errors.zipCode
                      ? "is-invalid"
                      : ""
                  }`}
                />
                {formik.touched.zipCode && formik.errors.zipCode && (
                  <div className="invalid-feedback">
                    {formik.errors.zipCode}
                  </div>
                )}
              </div>
            </div>

            <div className="col-md-6 col-12 mb-2">
              <lable className="form-lable">Country</lable>
              <span className="text-danger">*</span>
              <div className="mb-3">
                <input
                  type="text"
                  name="country"
                  {...formik.getFieldProps("country")}
                  className={`form-control  ${
                    formik.touched.country && formik.errors.country
                      ? "is-invalid"
                      : ""
                  }`}
                />
                {formik.touched.country && formik.errors.country && (
                  <div className="invalid-feedback">
                    {formik.errors.country}
                  </div>
                )}
              </div>
            </div>

            <div className="col-md-6 col-12 mb-2">
              <lable className="form-lable">Attachment</lable>
              <span className="text-danger">*</span>
              <div className="mb-3">
                <input
                  type="file"
                  name="file"
                  onChange={(event) => {
                    formik.setFieldValue(
                      "file",
                      event.currentTarget.files[0]
                    );
                  }}
                  className={`form-control  ${
                    formik.touched.file && formik.errors.file
                      ? "is-invalid"
                      : ""
                  }`}
                />
                {formik.touched.file && formik.errors.file && (
                  <div className="invalid-feedback">{formik.errors.file}</div>
                )}
              </div>
            </div>

            <div className="col-md-6 col-12 mb-2">
              <lable className="form-lable">Delivery Instructions</lable>
              <div className="mb-3">
                <textarea
                  type="text"
                  name="attention"
                  rows="4"
                  className="form-control"
                  {...formik.getFieldProps("attention")}
                />
              </div>
            </div>
          </div>
          <div className="col-12 mb-3 ">
             <div className="d-flex align-items-end justify-content-end">
              <label className="col-form-label">
                Amounts<span className="text-danger">*</span>&nbsp;&nbsp;
              </label>
              <div className="overflow-x-auto">
                <select
                  {...formik.getFieldProps("amountsAre")}
                  className={`form-select  ${
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
              </div></div>
              <div className="row ">{formik.touched.amountsAre && formik.errors.amountsAre && (
              <div className="text-danger d-flex justify-content-end " style={{fontSize: "0.875em",paddingRight:"5.25rem"}}>
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
              <table class="table ">
                <thead>
                  <tr>
                    <th scope="col">S.NO</th>
                    <th scope="col">ITEM</th>
                    {/* <th scope="col">Description</th> */}
                    <th scope="col">Quantity</th>
                    <th scope="col">Unit Price</th>
                    <th scope="col">Disc %</th>
                    {/* <th scope="col">Account</th> */}
                    <th scope="col">Tax Rate</th>
                    <th scope="col">AMOUNT</th>
                  </tr>
                </thead>
                <tbody className="table-group">
                    {(formik.values.items || [{}]).map((item, index) => (
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
                            <option value=""> </option>
                            {items &&
                              items.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.itemName}
                                </option>
                              ))}
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
                            type="number"
                            min={1}
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
                          <input readOnly
                            type="text"
                            className={`form-control ${
                              formik.touched.items?.[index]?.unitPrice &&
                              formik.errors.items?.[index]?.unitPrice
                                ? "is-invalid"
                                : ""
                            }`}
                            {...formik.getFieldProps(
                              `items[${index}].unitPrice`
                            )}
                          />
                          {formik.touched.items?.[index]?.unitPrice &&
                            formik.errors.items?.[index]?.unitPrice && (
                              <div className="invalid-feedback">
                                {formik.errors.items[index].unitPrice}
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
                          <input
                            {...formik.getFieldProps(`items[${index}].taxRate`)}
                            className={`form-control ${
                              formik.touched.items?.[index]?.taxRate &&
                              formik.errors.items?.[index]?.taxRate
                                ? "is-invalid"
                                : ""
                            }`}
                          />

                          {formik.touched.items?.[index]?.taxRate &&
                            formik.errors.items?.[index]?.taxRate && (
                              <div className="invalid-feedback">
                                {formik.errors.items[index].taxRate}
                              </div>
                            )}
                        </td>
                        <td>
                          <input readOnly
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
              {formik.values.items?.length > 1 && (
                <button
                  className="btn btn-sm my-4 mx-1 delete border-danger bg-white text-danger"
                  onClick={removeRow}
                >
                  Delete
                </button>
              )}
            </div>
          <div className="row mt-5 pt-0">
            <div
              className="col-md-6 col-12 mb-2 mt-2"
              style={{ visibility: "hidden" }}
            >
              <lable className="form-lable">Customer Notes</lable>
              <div className="mb-3">
                <input
                  type="text"
                  {...formik.getFieldProps("customerNotes")}
                  name="customerNotes"
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
                    {...formik.getFieldProps("taxTotal")}
                    type="text"
                    name="taxTotal"
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
          </div>
        </div>
      </div>
    </form>
  </div>
  );
};

export default PurchaseEdit;
