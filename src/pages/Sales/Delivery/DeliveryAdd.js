import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { MdDeleteSweep } from "react-icons/md";
import api from "../../../config/URL";
import toast from "react-hot-toast";

const DeliveryAdd = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([{ id: 1 }]);

  const AddRowContent = () => {
    setRows((prevRows) => [...prevRows, { id: prevRows.length + 1 }]);
  };

  const formik = useFormik({
    initialValues: {
      customerName: "",
      issueDate: "",
      expiryDate: "",
      quoteNumber: "",
      reference: "",
      title: "",
      subject: "",
      summery: "",
      project: "",
      customerNotes: "",
      subTotal: "",
      adjustment: "",
      tax: "",
      total: "",
      file: null,
      terms: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const formData = new FormData();
        Object.keys(values).forEach(key => {
          formData.append(key, values[key]);
        });

        const response = await api.post("/createDeliveryChallanWithDeliveryItems", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 201) {
          toast.success("Estimate created successfully");
          navigate("/estimates");
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
                <h1 className="h4 ls-tight headingColor">Add Delivery</h1>
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
                <label className="form-label">Customer Name</label>
                <select
                  name="customerName"
                  {...formik.getFieldProps("customerName")}
                  className={`form-select `}
                >
                  <option value=""></option>
                  <option value="Raghul">Raghul</option>
                  <option value="Harish">Harish</option>
                  <option value="Antony">Antony</option>
                </select>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">Place of Supply</label>
                <div className="mb-3">
                  <select
                    name="customerName"
                    {...formik.getFieldProps("customerName")}
                    className={`form-select `}
                  >
                    <option value=""></option>
                    <option value="Delhi">Delhi</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Kerala">Kerala</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">Delivery Challan#</label>
                <input
                  type="text"
                  name="reference"
                  {...formik.getFieldProps("reference")}
                  className={`form-control `}
                />
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">Reference#</label>
                <div className="mb-3">
                  <input
                    type="text"
                    name="estimateNumber"
                    className="form-control"
                    {...formik.getFieldProps("estimateNumber")}
                  />
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">Delivery Challan Date</label>
                <div className="mb-3">
                  <input
                    type="date"
                    name="issueDate"
                    className="form-control"
                    {...formik.getFieldProps("issueDate")}
                  />
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">Challan Type</label>
                <div className="mb-3">
                  <select
                    name="customerName"
                    {...formik.getFieldProps("customerName")}
                    className={`form-select `}
                  >
                    <option value=""></option>
                    <option value="Job Work">Job Work</option>
                    <option value="Supply On Approval">Supply On Approval</option>
                    <option value="Others">Others</option>
                  </select>
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
                <table className="table ">
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
                            {...formik.getFieldProps(`items[${index}].rate${index}`)}
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
                            {...formik.getFieldProps(`items[${index}].tax${index}`)}
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
                <label className="form-label">Customer Notes</label>
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
                  <label className="form-label">Total Tax</label>
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
                      {...formik.getFieldProps("terms")}
                      placeholder="Enter the terms and conditions of your business in your transaction"
                      type="text"
                      name="terms"
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
                          formik.setFieldValue("file", event.currentTarget.files[0]);
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

export default DeliveryAdd;
