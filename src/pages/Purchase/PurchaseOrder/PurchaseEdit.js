import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
// import { MdDeleteSweep } from "react-icons/md";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import * as Yup from "yup";

const PurchaseEdit = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // // const [rows, setRows] = useState([]);
  // const [title, setTitle] = useState('');
  // const [summary, setSummary] = useState('');
  const [rows, setRows] = useState([{ id: 1 }]);
  // const [rowss, setRowss] = useState([]);

  const validationSchema = Yup.object({
    vendorName: Yup.string().required("*Vendor Name is required"),
    orderNumber: Yup.string().required("*Order Number is required"),
    currency: Yup.string().required("*Currency is required"),
    phone: Yup.string().required("*Phone is required"),
    street: Yup.string().required("*Street is required"),
    city: Yup.string().required("*City is required"),
    state: Yup.string().required("*State is required"),
    zipCode: Yup.string().required("*Zip Code is required"),
    country: Yup.string().required("*Country is required"),
    file: Yup.string().required("*Attachment is required"),
    amountsAre: Yup.string().required("*Amounts is required"),
  });

  const AddRowContent = () => {
    setRows((prevRows) => [...prevRows, { id: prevRows.length + 1 }]);
  };

  const formik = useFormik({
    initialValues: {
      vendorName: "",
      date: "",
      deliveryDate: "",
      orderNumber: "",
      reference: "",
      currency: "",
      amountsAre: "",
      subTotal: "",
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
      file: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await api.put("/updateTxnPurchaseOrder", values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 201) {
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
      } catch (error) {
        toast.error("Error fetching data: ", error?.response?.data?.message);
      }
    };
    getExpensesData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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
                  &nbsp;<span>Save</span>
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
                    name="vendorName"
                    {...formik.getFieldProps("vendorName")}
                    className={`form-select    ${
                      formik.touched.vendorName && formik.errors.vendorName
                        ? "is-invalid"
                        : ""
                    }`}
                  >
                    <option selected></option>
                    <option value="Vendor 1">Vendor 1</option>
                    <option value="Vendor 2">Vendor 2</option>
                    <option value="Vendor 3">Vendor 3</option>
                    <option value="Vendor 4">Vendor 4</option>
                  </select>
                  {formik.touched.vendorName && formik.errors.vendorName && (
                    <div className="invalid-feedback">
                      {formik.errors.vendorName}
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
                    className="form-control"
                    {...formik.getFieldProps("date")}
                  />
                </div>
              </div>

              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">Delivery Date</lable>
                <div className="mb-3">
                  <input
                    type="date"
                    name="deliveryDate"
                    className="form-control"
                    {...formik.getFieldProps("deliveryDate")}
                  />
                </div>
              </div>

              <div className="col-md-6 col-12 mb-2">
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
              </div>

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
                    {...formik.getFieldProps("file")}
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
            <div className="col-12 mb-3 d-flex align-items-end justify-content-end">
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
                {formik.touched.amountsAre && formik.errors.amountsAre && (
                  <div className="invalid-feedback">{formik.errors.amountsAre}</div>
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
                      <th scope="col">ITEM</th>
                      <th scope="col">Description</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Unit Price</th>
                      <th scope="col">Disc %</th>
                      <th scope="col">Account</th>
                      <th scope="col">Tax Rate</th>
                      <th scope="col">AMOUNT</th>
                    </tr>
                  </thead>
                  <tbody className="table-group">
                    {rows.map((row, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>
                          <select
                            name={`items[${index}].itemDetails${index}`}
                            {...formik.getFieldProps(
                              `items[${index}].itemDetails${index}`
                            )}
                            className="form-select"
                          >
                            <option></option>
                            <option value={"Apple"}>Apple</option>
                            <option value={"Orange"}>Orange</option>
                          </select>
                        </td>
                        <td>
                          <input
                            type="text"
                            name={`items[${index}].quantity${index}`}
                            className="form-control"
                            {...formik.getFieldProps(
                              `items[${index}].quantity${index}`
                            )}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name={`items[${index}].rate${index}`}
                            className="form-control"
                            {...formik.getFieldProps(
                              `items[${index}].rate${index}`
                            )}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name={`items[${index}].discount${index}`}
                            className="form-control"
                            {...formik.getFieldProps(
                              `items[${index}].discount${index}`
                            )}
                          />
                        </td>
                        <td>
                          <select
                            name={`items[${index}].tax${index}`}
                            {...formik.getFieldProps(
                              `items[${index}].tax${index}`
                            )}
                            className="form-select"
                          >
                            <option></option>
                            <option value="5 %">5 %</option>
                            <option value="10 %">10 %</option>
                          </select>
                        </td>
                        <td>
                          <input
                            type="text"
                            name={`items[${index}].account${index}`}
                            className="form-control"
                            {...formik.getFieldProps(
                              `items[${index}].account${index}`
                            )}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name={`items[${index}].tax${index}`}
                            className="form-control"
                            {...formik.getFieldProps(
                              `items[${index}].tax${index}`
                            )}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name={`items[${index}].amount${index}`}
                            className="form-control"
                            {...formik.getFieldProps(
                              `items[${index}].amount${index}`
                            )}
                          />
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
                      {...formik.getFieldProps("adjustment")}
                      type="text"
                      name="adjustment"
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
