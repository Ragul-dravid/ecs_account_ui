import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import fetchAllCustomerWithIds from "../../List/CustomerList";
import fetchAllItemWithIds from "../../List/ItemList";

function SalesOrderEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoadIndicator] = useState(false);
  const [customerData, setCustomerData] = useState(null);
  const [itemData, setItemData] = useState(null);
  const [rows, setRows] = useState([{}]);

  const AddRowContent = () => {
    setRows((prevRows) => [...prevRows, {}]);
  };

  const validationSchema = Yup.object({
    customerId: Yup.string().required("* Customer name is required"),
    orderDate: Yup.string().required("* Order Date is required"),
    shipmentDate: Yup.string().required("* Shipment Date is required"),
  });

  const formik = useFormik({
    initialValues: {
      salesId:id,
      customerId: "",
      salesOrder: "",
      reference: "",
      orderDate: "",
      shipmentDate: "",
      paymentTerms: "",
      salesPerson: "",
      subTotal: "",
      discount: "",
      adjustment: "",
      total: "",
      cusNotes: "",
      termsConditions: "",
      files: null,
      txnSalesOrderItemsModels: [
        {
          item: "",
          qty: "",
          rate: "",
          amount: "",
          itemId: "",
          mstrItemsId: "",
        },
      ],
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
 
      const formData = new FormData();
      formData.append("salesId", id);
      formData.append("customerId", values.customerId);
      formData.append("salesOrder", values.salesOrder);
      formData.append("reference", values.reference);
      formData.append("orderDate", values.orderDate);
      formData.append("shipmentDate", values.shipmentDate);
      formData.append("paymentTerms", values.paymentTerms);
      formData.append("salesPerson", values.salesPerson);
      formData.append("discount", values.discount);
      formData.append("subTotal", values.subTotal);
      formData.append("adjustment", values.adjustment);
      formData.append("total", values.total);
      formData.append("cusNotes", values.cusNotes);
      formData.append("termsConditions", values.termsConditions);
      formData.append("files", values.files);
      values.txnSalesOrderItemsModels?.forEach((item) => {
        formData.append("item", item.item);
        formData.append("qty", item.qty);
        formData.append("rate", item.rate);
        formData.append("amount", item.amount);
        formData.append("itemId",item.id);
        formData.append("mstrItemsId", item.item);
      });

      setLoadIndicator(true);
      try {
      
        const response = await api.put(
          `/updateDeliveryAndDeliveryItems/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/salesorder");
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
        const response = await api.get(`/getTxnSalesOrderById/${id}`);
        formik.setValues(response.data);
      } catch (e) {
        toast.error("Error fetching data: ", e?.response?.data?.message);
      }
    };

    getData();
  }, [id]);

  return (
    <div className="container-fluid p-2 minHeight m-0">
      <form onSubmit={formik.handleSubmit}>
        <div className="card shadow border-0 mb-2 top-header">
          <div className="container-fluid py-4">
            <div className="row align-items-center">
              <div className="col">
                <div className="d-flex align-items-center gap-4">
                  <h1 className="h4 ls-tight headingColor">Edit Sales Order</h1>
                </div>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-end">
                  <Link to="/salesorder">
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
                <label className="form-label">Sales Order</label>
                <input
                  type="text"
                  className={`form-control ${
                    formik.touched.salesOrder && formik.errors.salesOrder
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("salesOrder")}
                />
                {formik.touched.salesOrder && formik.errors.salesOrder && (
                  <div className="invalid-feedback">
                    {formik.errors.salesOrder}
                  </div>
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
                <label className="form-label">
                  Order Date<span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  className={`form-control ${
                    formik.touched.orderDate && formik.errors.orderDate
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("orderDate")}
                />
                {formik.touched.orderDate && formik.errors.orderDate && (
                  <div className="invalid-feedback">
                    {formik.errors.orderDate}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Shipment Date<span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  className={`form-control ${
                    formik.touched.shipmentDate && formik.errors.shipmentDate
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("shipmentDate")}
                />
                {formik.touched.shipmentDate && formik.errors.shipmentDate && (
                  <div className="invalid-feedback">
                    {formik.errors.shipmentDate}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">Payment Terms</label>
                <select
                  className={`form-select ${
                    formik.touched.paymentTerms && formik.errors.paymentTerms
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("paymentTerms")}
                >
                  <option value=""></option>
                  <option value="NET_15">NET 15</option>
                  <option value="NET_30">NET 30</option>
                  <option value="NET_45">NET 45</option>
                  <option value="NET_60">NET 60</option>
                </select>
                {formik.touched.paymentTerms && formik.errors.paymentTerms && (
                  <div className="invalid-feedback">
                    {formik.errors.paymentTerms}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">Sales Person</label>
                <input
                  type="text"
                  className={`form-control ${
                    formik.touched.salesPerson && formik.errors.salesPerson
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("salesPerson")}
                />
                {formik.touched.salesPerson && formik.errors.salesPerson && (
                  <div className="invalid-feedback">
                    {formik.errors.salesPerson}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">Discount</label>
                <input
                  type="text"
                  className={`form-control ${
                    formik.touched.discount && formik.errors.discount
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("discount")}
                />
                {formik.touched.discount && formik.errors.discount && (
                  <div className="invalid-feedback">
                    {formik.errors.discount}
                  </div>
                )}
              </div>

              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">Adjustment</label>
                <input
                  type="text"
                  className={`form-control ${
                    formik.touched.adjustment && formik.errors.adjustment
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("adjustment")}
                />
                {formik.touched.adjustment && formik.errors.adjustment && (
                  <div className="invalid-feedback">
                    {formik.errors.adjustment}
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
                      <th scope="col">RATE</th>
                      <th scope="col">TAX</th>
                      <th scope="col">AMOUNT</th>
                    </tr>
                  </thead>
                  <tbody className="table-group">
                    {rows.map((row, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>
                          <select
                            name={`txnSalesOrderItemsModels[${index}].item`}
                            {...formik.getFieldProps(`txnSalesOrderItemsModels[${index}].item`)}
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
                            type="text"
                            name={`txnSalesOrderItemsModels[${index}].qty`}
                            className="form-control"
                            {...formik.getFieldProps(`txnSalesOrderItemsModels[${index}].qty`)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name={`txnSalesOrderItemsModels[${index}].rate`}
                            className="form-control"
                            {...formik.getFieldProps(`txnSalesOrderItemsModels[${index}].rate`)}
                          />
                        </td>
                        <td>
                          <select
                            name={`txnSalesOrderItemsModels[${index}].tax`}
                            {...formik.getFieldProps(`txnSalesOrderItemsModels[${index}].tax`)}
                            className="form-select"
                          >
                            <option value=""></option>
                            <option value="Commission">Commission</option>
                            <option value="Brokerage">Brokerage</option>
                          </select>
                        </td>
                        <td>
                          <input
                            type="text"
                            name={`txnSalesOrderItemsModels[${index}].amount`}
                            className="form-control"
                            {...formik.getFieldProps(`txnSalesOrderItemsModels[${index}].amount`)}
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
                  Customer Notes<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    className={`form-control  ${
                      formik.touched.cusNotes && formik.errors.cusNotes
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
      </form>
    </div>
  );
}

export default SalesOrderEdit;