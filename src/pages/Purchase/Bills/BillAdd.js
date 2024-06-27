import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function BillsAdd() {
  const validationSchema = Yup.object({});

  const [rows, setRows] = useState([{ id: 1 }]); // Initialize rows with one row having an id
  const AddRowContent = () => {
    setRows((prevRows) => [...prevRows, { id: prevRows.length + 1 }]);
  };

  const formik = useFormik({
    initialValues: {
      vendorName: "",
      bill: "",
      dueTerms: "",
      billDate: "",
      dueDate: "",
      orderNumber: "",
      subject: ""
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Bill Datas:", values);
    }
  });

  return (
    <div className="container-fluid p-2 minHeight m-0">
      <div
        className="card shadow border-0 mb-2 top-header">
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

                <button type="submit" className="btn btn-button btn-sm">
                  Save
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="card shadow border-0 my-2">
          <div className="row mt-3 me-2">

          </div>

          {/* User Information */}

          <div className="container mb-5">
            <div className="row py-4">
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Vendor Name
                </lable>
                <select
                  name="dueTerms"
                  {...formik.getFieldProps("dueTerms")}
                  className={`form-select    ${formik.touched.dptName && formik.errors.dptName
                    ? "is-invalid"
                    : ""
                    }`}>
                  <option value=""></option>
                  <option value="Raghul">Raghul</option>
                  <option value="Harish">Harish</option>
                  <option value="Antony">Antony</option>

                </select>
                {formik.touched.dptName && formik.errors.dptName && (
                  <div className="invalid-feedback">
                    {formik.errors.dptName}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-2">
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
              </div>

              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Reference
                </lable>
                <select
                  name="dueTerms"
                  {...formik.getFieldProps("dueTerms")}
                  className={`form-select    ${formik.touched.dptName && formik.errors.dptName
                    ? "is-invalid"
                    : ""
                    }`}>
                  <option value=""></option>
                  <option value="End of Month">End of Month</option>
                  <option value="Due On recipt">Due On recipt</option>
                  <option value="Net 15">Net 15</option>

                </select>
                {formik.touched.dptName && formik.errors.dptName && (
                  <div className="invalid-feedback">
                    {formik.errors.dptName}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Permit Number
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="orderNumber"
                    className="form-control"
                  />

                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Bill Date
                </lable>
                <div className="mb-3">
                  <input
                    type="date"
                    name="billDate"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Due Date
                </lable>
                <div className="mb-3">
                  <input
                    type="date"
                    name="dueDate"
                    className="form-control"
                  />

                </div>
              </div>


              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Subject
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="subject"
                    className="form-control"
                  />

                </div>
              </div>
            </div>

            <div className="col-md-6 col-12 mb-3"></div>
            <div className="col-md-6 col-12 mb-3 d-flex align-items-end justify-content-end" style={{ marginLeft: "39rem" }}>
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
                          {...formik.getFieldProps(`items[${index}].amount${index}`)}
                        /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <button className="btn btn-button btn-sm my-4 mx-1" type="button" onClick={AddRowContent}>
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
                  <lable className="form-lable">Total Tax</lable>
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
}

export default BillsAdd;
