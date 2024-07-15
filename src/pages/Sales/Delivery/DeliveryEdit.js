import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import api from "../../../config/URL";
import * as yup from "yup";
import fetchAllCustomerWithIds from "../../List/CustomerList";
import fetchAllItemWithIds from "../../List/ItemList";

const validationSchema = yup.object().shape({
  customerId: yup.string().required("*Customer name is required"),
  challanDate: yup.date().required("*Date is required"),
  paymentTerms: yup.string().required("*PaymentTerms is required"),
  challanType: yup.string().required("*challanType is required"),
  challansItemsModels: yup.array().of(
    yup.object().shape({
      item: yup.string().required("item is required"),
      // other validations as needed
    })
  ),
});

const DeliveryEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [customerData, setCustomerData] = useState([]);
  const [itemData, setItemData] = useState(null);

  const addRow = () => {
    formik.setFieldValue("challansItemsModels", [
      ...formik.values.challansItemsModels,
      { item: "", qty: "", rate: "", taxRate: "", amount: "" },
    ]);
  };

  const formik = useFormik({
    initialValues: {
      deliveryId: id,
      customerId: "",
      reference: "",
      challanDate: "",
      challanType: "",
      paymentTerms: "",
      salesPerson: "",
      subTotal: "",
      discount: "",
      adjustment: "",
      total: "",
      cusNotes: "",
      termsConditions: "",
      challansItemsModels: [
        {
          qty: "",
          rate: "",
          // disc: "",
          // tax: "",
          amount: "",
          itemId: "",
          mstrItemsId: "",
        },
      ],
      file: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("deliveryId", id);
      formData.append("customerId", values.customerId);
      formData.append("salesPerson", values.salesPerson);
      formData.append("reference", values.reference);
      formData.append("challanDate", values.challanDate);
      formData.append("challanType", values.challanType);
      formData.append("paymentTerms", values.paymentTerms);
      formData.append("discount", values.discount);
      formData.append("subTotal", values.subTotal);
      formData.append("adjustment", values.adjustment);
      formData.append("total", values.total);
      formData.append("cusNotes", values.cusNotes);
      formData.append("termsConditions", values.termsConditions);
      if (values.file) {
        formData.append("files", values.file);
      }
      values.challansItemsModels?.forEach((item) => {
        formData.append("item", item.item);
        formData.append("qty", item.qty);
        formData.append("rate", item.rate);
        formData.append("amount", item.amount);
        if (item.id !== undefined) {
          formData.append("itemId", item.id);
        }
        formData.append("mstrItemsId", item.item);
      });
      setLoading(true);
      try {
        const response = await api.put(
          `/updateDeliveryChallanWithDeliveryItems/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 200) {
          toast.success("Delivery created successfully");
          navigate("/delivery");
        }
      } catch (e) {
        toast.error("Error fetching data: ", e?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    },
  });
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getTxnDeliveryChallansById/${id}`);
        formik.setValues(response.data);
        formik.setFieldValue(
          "challansItemsModels",
          response.data.challansItemsModels
        );
      } catch (error) {
        toast.error("Error Fetch Data ", error.message);
      }
    };

    getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeRow = () => {
    const items = [...formik.values.challansItemsModels];
    if (items.length > 1) {
      items.pop();
      formik.setFieldValue("challansItemsModels", items);
    }
  };

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

  const calculateTotals = () => {
    let subTotal = 0;
    let totalTax = 0;
    let totalDiscount = 0;

    formik.values.challansItemsModels.forEach((item, index) => {
      const qty = item.qty || 0;
      const rate = item.rate || 0;
      const tax = item.tax || 0;
      const discountPercentage = formik.values.discount || 0;

      // Calculate the amount for each item
      const itemDiscount = qty * rate * (discountPercentage / 100);
      const discountedAmount =
        qty * rate - itemDiscount + (tax / 100) * qty * rate;

      // Update amount field
      formik.setFieldValue(
        `challansItemsModels[${index}].amount`,
        discountedAmount.toFixed(2)
      );

      subTotal += qty * rate;
      totalTax += (tax / 100) * (qty * rate);
      totalDiscount += itemDiscount;
    });

    const totalAmount = subTotal + totalTax - totalDiscount;

    formik.setFieldValue("subTotal", subTotal.toFixed(2));
    formik.setFieldValue("Tax", totalTax.toFixed(2));
    formik.setFieldValue("totalDiscount", totalDiscount.toFixed(2));
    formik.setFieldValue("total", totalAmount.toFixed(2));
  };

  useEffect(() => {
    calculateTotals();
  }, [
    formik.values.challansItemsModels
      ?.map((item) => `${item.qty}-${item.rate}-${item.tax}-${item.amount}`)
      .join(","),
    formik.values.discount,
  ]);

  const itemAmt = async (id, index) => {
    try {
      const response = await api.get(`/getMstrItemsById/${id}`);
      formik.setFieldValue(
        `challansItemsModels[${index}].rate`,
        response.data.salesPrice
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSelectChange = (event, index) => {
    const { value } = event.target;
    formik.setFieldValue(`challansItemsModels[${index}].item`, value);
    if (value) {
      itemAmt(value, index);
    }
  };

  useEffect(() => {
    formik.values.challansItemsModels?.forEach((_, index) => {
      if (
        formik.values.challansItemsModels[index].item &&
        !formik.values.challansItemsModels[index].qty
      ) {
        itemAmt(formik.values.challansItemsModels[index].item, index);
        formik.setFieldValue(`challansItemsModels[${index}].qty`, 1);
        formik.setFieldValue(`challansItemsModels[${index}].tax`, 0);
      }
    });
  }, [formik.values.challansItemsModels?.map((item) => item.item).join(",")]);

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
                  <h1 className="h4 ls-tight headingColor">Edit Delivery</h1>
                </div>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-end">
                  <Link to="/delivery">
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

        <div className="card shadow border-0 my-2">
          <div className="container mb-5">
            <div className="row py-4">
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">Customer Name</label>
                <div className="mb-3">
                  <select
                    {...formik.getFieldProps("customerId")}
                    className={`form-select    ${
                      formik.touched.customerId && formik.errors.customerId
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
                  {formik.touched.customerId && formik.errors.customerId && (
                    <div className="invalid-feedback">
                      {formik.errors.customerId}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">Reference#</label>
                <input
                  type="text"
                  name="reference"
                  {...formik.getFieldProps("reference")}
                  className={`form-control `}
                />
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">challan Date</label>
                <div className="mb-3">
                  <input
                    type="date"
                    className="form-control"
                    {...formik.getFieldProps("challanDate")}
                  />
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">payment Terms<span className="text-danger">*</span></label>
                <div className="mb-3">
                  <select
                    type="text"
                    name="paymentTerms"
                    className={`form-select ${
                      formik.touched.paymentTerms && formik.errors.paymentTerms
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("paymentTerms")}
                  >
                    <option value=""> </option>
                    <option value="NET_15">NET_15 </option>
                    <option value="NET_30">NET_30 </option>
                    <option value="NET_45"> NET_45</option>
                    <option value="NET_60"> NET_60</option>
                  </select>
                  {formik.touched.paymentTerms && formik.errors.paymentTerms && (
                  <div className="invalid-feedback">
                    {formik.errors.paymentTerms}
                  </div>
                )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">Challan Type<span className="text-danger">*</span></label>
                <div className="mb-3">
                  <select
                    name="challanType"
                    {...formik.getFieldProps("challanType")}
                    className={`form-select ${
                      formik.touched.challanType && formik.errors.challanType
                        ? "is-invalid"
                        : ""
                    }`}
                  >
                    <option value=""></option>
                    <option value="Job Work">Job Work</option>
                    <option value="Supply On Approval">
                      Supply On Approval
                    </option>
                    <option value="Others">Others</option>
                  </select>
                  {formik.touched.challanType && formik.errors.challanType && (
                  <div className="invalid-feedback">
                    {formik.errors.challanType}
                  </div>
                )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">sales Person</label>
                <div className="mb-3">
                  <input
                    type="text"
                    name="salesPerson"
                    className="form-control"
                    {...formik.getFieldProps("salesPerson")}
                  />
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">Discount</label>
                <div className="mb-3">
                  <input
                    type="text"
                    name="discount"
                    className="form-control"
                    {...formik.getFieldProps("discount")}
                  />
                </div>
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
                      <th style={{ width: "35%" }}>Item</th>
                      <th style={{ width: "15%" }}>Quantity</th>
                      <th style={{ width: "15%" }}>Rate</th>
                      <th style={{ width: "15%" }}>Tax (%)</th>
                      <th style={{ width: "15%" }}>Amount</th>
                      <th style={{ width: "5%" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {formik.values.challansItemsModels.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <select
                            className={`form-select ${
                              formik.touched.challansItemsModels &&
                              formik.touched.challansItemsModels[index] &&
                              formik.errors.challansItemsModels &&
                              formik.errors.challansItemsModels[index] &&
                              formik.errors.challansItemsModels[index].item
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
                                  disabled={formik.values.challansItemsModels.some(
                                    (existingItem) =>
                                      existingItem.item === itemId.id
                                  )}
                                >
                                  {itemId.itemName}
                                </option>
                              ))}
                          </select>
                          {formik.touched.challansItemsModels &&
                            formik.touched.challansItemsModels[index] &&
                            formik.errors.challansItemsModels &&
                            formik.errors.challansItemsModels[index] &&
                            formik.errors.challansItemsModels[index].item && (
                              <div className="invalid-feedback">
                                {formik.errors.challansItemsModels[index].item}
                              </div>
                            )}
                        </td>
                        <td>
                          <input
                            type="number"
                            min="1"
                            className={`form-control ${
                              formik.touched.challansItemsModels &&
                              formik.touched.challansItemsModels[index] &&
                              formik.errors.challansItemsModels &&
                              formik.errors.challansItemsModels[index] &&
                              formik.errors.challansItemsModels[index].qty
                                ? "is-invalid"
                                : ""
                            }`}
                            {...formik.getFieldProps(
                              `challansItemsModels[${index}].qty`
                            )}
                          />
                          {formik.touched.challansItemsModels &&
                            formik.touched.challansItemsModels[index] &&
                            formik.errors.challansItemsModels &&
                            formik.errors.challansItemsModels[index] &&
                            formik.errors.challansItemsModels[index].qty && (
                              <div className="invalid-feedback">
                                {formik.errors.challansItemsModels[index].qty}
                              </div>
                            )}
                        </td>
                        <td>
                          <input
                            type="number"
                            min="1"
                            className={`form-control ${
                              formik.touched.challansItemsModels &&
                              formik.touched.challansItemsModels[index] &&
                              formik.errors.challansItemsModels &&
                              formik.errors.challansItemsModels[index] &&
                              formik.errors.challansItemsModels[index].rate
                                ? "is-invalid"
                                : ""
                            }`}
                            {...formik.getFieldProps(
                              `challansItemsModels[${index}].rate`
                            )}
                            readOnly
                          />
                          {formik.touched.challansItemsModels &&
                            formik.touched.challansItemsModels[index] &&
                            formik.errors.challansItemsModels &&
                            formik.errors.challansItemsModels[index] &&
                            formik.errors.challansItemsModels[index].rate && (
                              <div className="invalid-feedback">
                                {formik.errors.challansItemsModels[index].rate}
                              </div>
                            )}
                        </td>
                        <td>
                          <input
                            type="number"
                            className={`form-control ${
                              formik.touched.challansItemsModels &&
                              formik.touched.challansItemsModels[index] &&
                              formik.errors.challansItemsModels &&
                              formik.errors.challansItemsModels[index] &&
                              formik.errors.challansItemsModels[index].tax
                                ? "is-invalid"
                                : ""
                            }`}
                            value={
                              formik.values.challansItemsModels[index].tax || 0
                            }
                            {...formik.getFieldProps(
                              `challansItemsModels[${index}].tax`
                            )}
                          />
                          {formik.touched.challansItemsModels &&
                            formik.touched.challansItemsModels[index] &&
                            formik.errors.challansItemsModels &&
                            formik.errors.challansItemsModels[index] &&
                            formik.errors.challansItemsModels[index].tax && (
                              <div className="invalid-feedback">
                                {formik.errors.challansItemsModels[index].tax}
                              </div>
                            )}
                        </td>
                        <td>
                          <input
                            type="number"
                            min="0"
                            className={`form-control ${
                              formik.touched.challansItemsModels &&
                              formik.touched.challansItemsModels[index] &&
                              formik.errors.challansItemsModels &&
                              formik.errors.challansItemsModels[index] &&
                              formik.errors.challansItemsModels[index].amount
                                ? "is-invalid"
                                : ""
                            }`}
                            readOnly
                            value={item.amount}
                          />
                          {formik.touched.challansItemsModels &&
                            formik.touched.challansItemsModels[index] &&
                            formik.errors.challansItemsModels &&
                            formik.errors.challansItemsModels[index] &&
                            formik.errors.challansItemsModels[index].amount && (
                              <div className="invalid-feedback">
                                {
                                  formik.errors.challansItemsModels[index]
                                    .amount
                                }
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
            {formik.values.challansItemsModels?.length > 1 && (
              <button
                className="btn btn-sm my-4 mx-1 delete border-danger bg-white text-danger"
                onClick={removeRow}
              >
                Delete
              </button>
            )}
            <div className="row mt-5 pt-0">
              <div className="col-md-6 col-12 mb-2 mt-2">
                <label className="form-label">Customer Notes</label>
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
                <div className="my-4 ms-2 d-flex justify-content-between align-items-center">
                  <label className="form-label">Sub Total</label>
                  <div className="ms-3">
                    <input
                      type="text"
                      name="subTotal"
                      {...formik.getFieldProps("subTotal")}
                      className="form-control form-control-sm"
                    />
                  </div>
                </div>
                <div className="ms-2 d-flex justify-content-between align-items-center">
                  <label className="form-label">Adjustment</label>
                  <div className="ms-3">
                    <input
                      {...formik.getFieldProps("adjustment")}
                      type="text"
                      name="adjustment"
                      className="form-control form-control-sm"
                    />
                  </div>
                </div>
                <hr className="border-dark" />
                <div className="ms-2 d-flex justify-content-between align-items-center mt-2">
                  <label className="form-label">Total</label>
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
              <div className="col-12 mb-3">
                <div className="row">
                  <div className="col-md-8">
                    <label className="form-label">Terms & Conditions</label>
                    <textarea
                      {...formik.getFieldProps("termsConditions")}
                      placeholder="Enter the terms and conditions of your business in your transaction"
                      type="text"
                      name="termsConditions"
                      className="form-control"
                      style={{ width: "100%", height: "5rem" }}
                    />
                  </div>
                  <div className="col-md-4 d-flex align-items-center justify-content-center">
                    <div className="mb-3">
                      <label className="form-label">Attach File</label>
                      <input
                        type="file"
                        name="file"
                        className="form-control"
                        onChange={(event) => {
                          formik.setFieldValue(
                            "file",
                            event.currentTarget.files[0]
                          );
                        }}
                      />
                    </div>
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

export default DeliveryEdit;
