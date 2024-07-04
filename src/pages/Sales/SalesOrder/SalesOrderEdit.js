import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import toast from "react-hot-toast";
function SalesOrderEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoadIndicator] = useState(false);
  const [rows, setRows] = useState([{}]);
  const AddRowContent = () => {
    setRows((prevRows) => [...prevRows, { id: prevRows.length + 1 }]);
  };

  const validationSchema = Yup.object({
    customerId: Yup.string().required("*Customer name is required"),
    orderDate: Yup.string().required("*OrderDate is required"),
    shipmentDate: Yup.string().required("*ShipmentDate is required"),
  });

  const formik = useFormik({
    initialValues: {
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
      item: "",
      qty: "",
      rate: "",
      amount: "",
      itemId: "",
      files: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      console.log("Create Tnx :", values);
      try {
        const formData = new FormData();

        // Add each data field manually to the FormData object
        formData.append("customerId", "1");
        formData.append("salesId ", "2");
        formData.append("mstrItemsId", "1");
        formData.append("salesOrder", values.salesOrder);
        formData.append("reference", values.reference);
        // formData.append("orderDate", "");
        // formData.append("shipmentDate", "");
        formData.append("paymentTerms", values.paymentTerms);
        formData.append("salesPerson", values.salesPerson);
        formData.append("subTotal", values.subTotal);
        formData.append("discount", values.discount);
        formData.append("adjustment", values.adjustment);
        formData.append("total", values.total);
        formData.append("cusNotes", values.cusNotes);
        formData.append("termsConditions", values.termsConditions);
        formData.append("item", values.item);
        formData.append("qty", values.qty);
        formData.append("rate", values.rate);
        formData.append("amount", values.amount);
        formData.append("itemId", values.itemId);
        formData.append("files", values.files);
        const response = await api.put(
          `/updateDeliveryAndDeliveryItems/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 201) {
          toast.success(response.data.message);
          navigate("/salesorder");
        } else {
          toast.error(response.data.message);
        }
      } catch (e) {
        toast.error("Error fetching data: ", e?.response?.data?.message);
      } finally {
        setLoadIndicator(false);
      }
    },
  });
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
                    <option></option>
                    <option value="sakthivel">sakthivel</option>
                    <option value="Rahul">Rahul</option>
                  </select>
                  {formik.touched.customerId && formik.errors.customerId && (
                    <div className="invalid-feedback">
                      {formik.errors.customerId}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-3">
                <lable className="form-lable">Sales Order</lable>
                <div className="mb-3">
                  <input
                    type="text"
                    className={`form-control  ${
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
              </div>
              <div className="col-md-6 col-12 mb-3">
                <lable className="form-lable">Reference</lable>
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
                <lable className="form-lable">
                  Order Date<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="date"
                    className={`form-control  ${
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
              </div>

              <div className="col-md-6 col-12 mb-3">
                <lable className="form-lable">
                  ShipmentDate<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="date"
                    className={`form-control ${
                      formik.touched.shipmentDate && formik.errors.shipmentDate
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("shipmentDate")}
                  />
                  {formik.touched.shipmentDate &&
                    formik.errors.shipmentDate && (
                      <div className="invalid-feedback">
                        {formik.errors.shipmentDate}
                      </div>
                    )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-3">
                <lable className="form-lable">Payment Terms</lable>
                <div className="mb-3">
                  <select
                    type="date"
                    className={`form-select ${
                      formik.touched.paymentTerms && formik.errors.paymentTerms
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("paymentTerms")}
                  >
                    <option></option>
                    <option value="NET_15">NET_15</option>
                    <option value="NET_30">NET_30</option>
                    <option value="NET_45">NET_45</option>
                    <option value="NET_60">NET_60</option>
                  </select>
                  {formik.touched.paymentTerms &&
                    formik.errors.paymentTerms && (
                      <div className="invalid-feedback">
                        {formik.errors.paymentTerms}
                      </div>
                    )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-3">
                <lable className="form-lable">SalesPerson</lable>
                <div className="mb-3">
                  <input
                    type="text"
                    className={`form-control  ${
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
              </div>

              {/* <div className="col-md-6 col-12 mb-3">
                <lable className="form-lable">
                Adjustment
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    className={`form-control  ${
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
              </div> */}
              {/* <div className="col-md-6 col-12 mb-3">
                <lable className="form-lable">
                Tcs
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    className={`form-control  ${
                      formik.touched.tcs && formik.errors.tcs
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("tcs")}
                  />
                  {formik.touched.tcs && formik.errors.tcs && (
                    <div className="invalid-feedback">
                      {formik.errors.tcs}
                    </div>
                  )}
                </div>
              </div> */}
              <div className="col-md-6 col-12 mb-3">
                <label htmlFor="" className=" fw-medium">
                  <small>File</small>
                  <span className="text-danger">*</span>
                </label>
                <br />
                <input
                  type="file"
                  name="files"
                  className="form-control"
                  onChange={(event) => {
                    formik.setFieldValue("files", event.target.files[0]);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.files && formik.errors.files && (
                  <div className="error text-danger ">
                    <small>{formik.errors.files}</small>
                  </div>
                )}
              </div>

              {/* <div className="col-12 mb-3 d-flex align-items-end justify-content-end">
                <label className="col-form-label">
                  Amount&nbsp;&nbsp;
                </label>
                <div className="overflow-x-auto">
                  <select
                    {...formik.getFieldProps("tax")}
                    className="form-select"
                    style={{ width: "100%" }}
                  >
                    <option></option>
                    <option value="Commision">Tax Exclusive</option>
                    <option value="Brokerage">Tax Inclusive</option>
                    <option value="Brokerage">No Tax</option>
                  </select>
                </div>
                {formik.touched.taxOption && formik.errors.taxOption && (
                  <div className="invalid-feedback">
                    {formik.errors.taxOption}
                  </div>
                )}
              </div> */}

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
                        <th scope="col">DISCOUNT</th>
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
                              name={`items[${index}].item`}
                              {...formik.getFieldProps(`items[${index}].item`)}
                              className="form-select"
                            >
                              <option></option>
                              <option value="Apple">Apple</option>
                              <option value="Orange">Orange</option>
                            </select>
                          </td>
                          <td>
                            <input
                              type="text"
                              name={`items[${index}].qty`}
                              className="form-control"
                              {...formik.getFieldProps(`items[${index}].qty`)}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name={`items[${index}].rate`}
                              className="form-control"
                              {...formik.getFieldProps(`items[${index}].rate`)}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name={`items[${index}].discount`}
                              className="form-control"
                              {...formik.getFieldProps(
                                `items[${index}].discount`
                              )}
                            />
                          </td>
                          <td>
                            <select
                              name={`items[${index}].tax`}
                              {...formik.getFieldProps(`items[${index}].tax`)}
                              className="form-select"
                            >
                              <option></option>
                              <option value="Commission">Commission</option>
                              <option value="Brokerage">Brokerage</option>
                            </select>
                          </td>
                          <td>
                            <input
                              type="text"
                              name={`items[${index}].amount`}
                              className="form-control"
                              {...formik.getFieldProps(
                                `items[${index}].amount`
                              )}
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
                  <lable className="form-lable">Customer Notes</lable>
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="Will be display on the Invoice"
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
                    <label className="col-sm-4 col-form-label">Sub Total</label>
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
                    <label className="col-sm-4 col-form-label">Total Tax</label>
                    <div className="col-sm-4"></div>
                    <div className="col-sm-4">
                      <input
                        type="text"
                        className={`form-control ${
                          formik.touched.adjustment && formik.errors.adjustment
                            ? "is-invalid"
                            : ""
                        }`}
                        {...formik.getFieldProps("adjustment")}
                      />
                      {formik.touched.adjustment &&
                        formik.errors.adjustment && (
                          <div className="invalid-feedback">
                            {formik.errors.adjustment}
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
                        className="form-control"
                        {...formik.getFieldProps("total")}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-12 mb-3">
                  <lable className="form-lable">Terms & Conditions</lable>
                  <div className="mb-3">
                    <textarea
                      className={`form-control  ${
                        formik.touched.termsConditions &&
                        formik.errors.termsConditions
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps("termsConditions")}
                    />
                    {formik.touched.termsConditions &&
                      formik.errors.termsConditions && (
                        <div className="invalid-feedback">
                          {formik.errors.termsConditions}
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

export default SalesOrderEdit;
