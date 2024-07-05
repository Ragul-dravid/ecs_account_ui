import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import { MdDeleteSweep } from "react-icons/md";
import api from "../../../config/URL";
import toast from "react-hot-toast";

const PurchaseAdd = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // // const [rows, setRows] = useState([]);
  // const [title, setTitle] = useState('');
  // const [summary, setSummary] = useState('');
  const [rows, setRows] = useState([{ id: 1 }]);
  const [rowss, setRowss] = useState([]); // Initialize rows with one row having an id
  const AddRowContent = () => {
    setRows((prevRows) => [...prevRows, { id: prevRows.length + 1 }]);
  };

  const formik = useFormik({
    initialValues: {
      vendorId: "",
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
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await api.post("/createTxnPurchaseOrder", values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 201) {
          toast.success("Estimate created successfully");
          navigate("/purchase");
        }
      } catch (e) {
        toast.error("Error fetching data: ", e?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    },
  });
  return (
    <div className="container-fluid p-2 minHeight m-0">
      <div className="card shadow border-0 mb-2 top-header">
        <div className="container-fluid py-4">
          <div className="row align-items-center">
            <div className="col">
              <div className="d-flex align-items-center gap-4">
                <h1 className="h4 ls-tight headingColor">
                  Add Purchase Orders
                </h1>
              </div>
            </div>
            <div className="col-auto">
              <div className="hstack gap-2 justify-content-end">
                <Link to="/estimates">
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
                <lable className="form-lable">Vendor Name</lable>
                <span className="text-danger">*</span>
                <select
                  name="Vendor Name"
                  {...formik.getFieldProps("Vendor Name")}
                  className={`form-select `}
                >
                  <option value=""></option>
                  <option value="Raghul">Raghul</option>
                  <option value="Harish">Harish</option>
                  <option value="Antony">Antony</option>
                </select>
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
                <lable className="form-lable">Order Number</lable><span className="text-danger">*</span>
                <div className="mb-3">
                  <input
                    type="text"
                    name="orderNumber"
                    {...formik.getFieldProps("orderNumber")}
                    className="form-control"
                  />
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
                  className={`form-select `}
                >
                  <option value=""></option>
                  <option value="Raghul">Raghul</option>
                  <option value="Harish">Harish</option>
                  <option value="Antony">Antony</option>
                </select>
              </div>

              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">Amounts Are</lable>
                <span className="text-danger">*</span>
                <select
                  name="amountsAre"
                  {...formik.getFieldProps("amountsAre")}
                  className={`form-select `}
                >
                  <option value=""></option>
                  <option value="Tax Exclusive">Tax Exclusive</option>
                  <option value="Tax Inclusive">Tax Inclusive</option>
                  <option value="No Tax">No Tax</option>
                </select>
              </div>

              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">Attention</lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="attention"
                    className="form-control"
                    {...formik.getFieldProps("attention")}
                  />
                </div>
              </div>

              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">Subject</lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="subject"
                    className="form-control"
                    {...formik.getFieldProps("subject")}
                  />
                </div>
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
                      <MdDeleteSweep className="mb-1 mx-1" />
                      Delete Title & Summary
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="col-12 mb-3 d-flex align-items-end justify-content-end">
              <label className="col-form-label">
                Amount<span className="text-danger">*</span>&nbsp;&nbsp;
              </label>
              <div className="overflow-x-auto">
                <select
                  {...formik.getFieldProps("tax")}
                  className="form-select"
                  style={{ width: "100%" }}
                >
                  <option></option>
                  <option value="TAX_EXCLUSIVE">Tax Exclusive</option>
                  <option value="TAX_INCLUSIVE">Tax Inclusive</option>
                  <option value="NO_TAX">No Tax</option>
                </select>
              </div>
              {formik.touched.tax && formik.errors.tax && (
                <div className="invalid-feedback">{formik.errors.tax}</div>
              )}
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
                      <th scope="col">ITEM DETAILS</th>
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
                            <option value="Commission">Commission</option>
                            <option value="Brokerage">Brokerage</option>
                          </select>
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
              <div className="col-md-6 col-12 mb-2 mt-2">
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
              <hr />
              <div className="col-12">
                <lable className="form-lable">Terms & Conditions</lable>
                <div className="mb-3">
                  <textarea
                    {...formik.getFieldProps("terms")}
                    placeholder="Enter the terms and conditions of your business in your transaction"
                    type="text"
                    name="terms"
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
};

export default PurchaseAdd;
