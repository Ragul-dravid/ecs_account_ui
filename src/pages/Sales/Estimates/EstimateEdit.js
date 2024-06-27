import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const EstimateEdit = () => {
  const [rows, setRows] = useState([{ id: 1 }]); 
  const [rowss, setRowss] = useState([]);
  const AddRowContent = () => {
    setRows((prevRows) => [...prevRows, { id: prevRows.length + 1 }]);
  };

  const formik = useFormik({
    initialValues: {
      customerName: "Harish",
      orderNumber: "9830",
      reference: "Chandru",
      estimateNumber: "67390189801",
      estimateDate: "2002-02-02",
      expriyDate: "2002-03-03",
      subject: "",
      customerNotes: "",
      subTotal: "2330.00",
      adjustment: "500.00",
      total: "2830",
      termsConditions:"",
      items: rows.map((row, index) => ({
        [`itemDetails${0}`]: "Apple", // Initialize each itemDetails field with an empty string
        [`quantity${0}`]: "ff",     // Initialize each quantity field with an empty string
        [`rate${0}`]: "ff",         // Initialize each rate field with an empty string
        [`discount${0}`]: "ff",     // Initialize each discount field with an empty string
        [`tax${0}`]: "Commission",          // Initialize each tax field with an empty string
        [`amount${0}`]: "ff",       // Initialize each amount field with an empty string
                                   // Initialize each amount field with an empty string
      })) 
    
    },
    // validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("User Datas:", values);
    },
    
  });
   
  return (
    <div className="container-fluid minHeight m-0">
      <div className="card shadow border-0 mb-2 top-header">
        <div className="container-fluid py-4">
          <div className="row align-items-center">
            <div className="col">
              <div className="d-flex align-items-center gap-4">
                <h1 className="h4 ls-tight headingColor">Edit Estimates</h1>
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
                    className="btn btn-button btn-sm"
                    onClick={formik.handleSubmit}
                  >
                    Update
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
                <lable className="form-lable">Customer Name</lable>
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
                <lable className="form-lable">Quote Number</lable>
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
                <lable className="form-lable">Estimate Number</lable>
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
                <lable className="form-lable">Estimate Date</lable>
                <div className="mb-3">
                  <input
                    type="date"
                    name="estimateDate"
                    className="form-control"
                    {...formik.getFieldProps("estimateDate")}
                  />
                </div>
              </div>

              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">Expriy Date</lable>
                <div className="mb-3">
                  <input
                    type="date"
                    name="expriyDate"
                    className="form-control"
                    {...formik.getFieldProps("expriyDate")}
                  />
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">Project</lable>
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
                  <div className="border-0 my-2">
                    <div className="container py-3">
                      <div className="row mt-3">
                        <div className="col-12">
                          <div className="text-start mt-4">
                            <label htmlFor="" className="mb-1 fw-medium">
                              <small>Title</small>&nbsp;
                            </label>
                            <br />
                            <input
                              className="form-control mb-2"
                              type="text"
                              placeholder="Title"
                              value={row.title || ''}
                              onChange={(e) => {
                                const newRows = [...rowss];
                                newRows[index].title = e.target.value;
                                setRowss(newRows);
                              }}
                            />
                          </div>
                          <div className="text-start mt-4">
                            <label htmlFor="" className="mb-1 fw-medium">
                              <small>Summary</small>&nbsp;
                            </label>
                            <br />
                            <input
                              className="form-control mb-4"
                              type="text"
                              placeholder="Summary"
                              value={row.summary || ''}
                              onChange={(e) => {
                                const newRows = [...rowss];
                                newRows[index].summary = e.target.value;
                                setRowss(newRows);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="row">
                <div className="col-12 mb-4">
                  <button
                    type="button"
                    onClick={() => {
                      setRowss((prev) => [...prev, { title: '', summary: '' }]); // Add a new row with empty title and summary
                    }}
                    className="btn btn-border btn-sm btn-button"
                  >
                    <i className="bx bx-plus"></i> Add Title & Summary
                  </button>{" "}
                  &nbsp;&nbsp;
                  {rowss.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setRowss((prev) => prev.slice(0, -1))}
                      className="btn btn-outline-danger"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12 mb-3"></div>
                            <div className="col-md-6 col-12 mb-3 d-flex align-items-end justify-content-end" style={{marginLeft:"39rem"}}>
                                <label className="col-form-label">
                                    Amount<span className="text-danger">*</span>
                                </label>
                                <div className="overflow-x-auto">
                                    <select
                                        {...formik.getFieldProps("tax")}
                                        className="form-select" style={{ width: "100%" }}>
                                        <option></option>
                                        <option value="Commision">Tax Exclusive</option>
                                        <option value="Brokerage">Tax Inclusive</option>
                                        <option value="Brokerage">No Tax</option>
                                    </select>
                                </div>
                                {formik.touched.taxOption && formik.errors.taxOption && (
                                    <div className="invalid-feedback">{formik.errors.taxOption}</div>
                                )}
                            </div>
            <div className="row">
            <div className="">
              <h3 style={{ background: "#4066D5" }} className="text-light p-2">
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
                            {...formik.getFieldProps(`items[${index}].itemDetails${index}`)}
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
                            {...formik.getFieldProps(`items[${index}].quantity${index}`)}
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
                            {...formik.getFieldProps(`items[${index}].discount${index}`)}
                          /></td>
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
                        <td><input
                            type="text"
                            name={`items[${index}].amount${index}`}
                            className="form-control"
                            {...formik.getFieldProps(`items[${index}].amount${index}`  )}
                          /></td>
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
                className="btn btn-danger my-4 mx-1"
                onClick={(e) => {
                  e.preventDefault();
                  setRows((prevRows) => prevRows.slice(0, -1));
                }}
              >
                Delete
              </button>
            )}
            <div className="row mt-5">
              <div className="col-md-6 col-12 mb-2 pt-5">
                <lable className="form-lable">Customer Notes</lable>
                <div className="mb-3">
                  <input type="text" {...formik.getFieldProps("customerNotes")}
                  name="customerNotes" className="form-control" />
                </div>
              </div>
              <div className="card col-md-6 col-12 p-3 mb-4 card shadow border-2">
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
                  <lable className="form-lable">Adjustment</lable>
                  <div className="ms-3">
                    <input {...formik.getFieldProps("adjustment")}
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
                    <input {...formik.getFieldProps("total")}
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
                  <textarea {...formik.getFieldProps("termsConditions")}
                    placeholder="Enter the terms and conditions of your business in your transaction"
                    type="text"
                    name="termsConditions"
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

export default EstimateEdit;
