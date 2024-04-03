import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function BillsAdd() {
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
    // validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("User Datas:", values);
    }
  });

  return (
    <div className="container-fluid minHeight m-0">
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
                <div className="col-12">
                  <button type="submit" className="btn btn-button btn-sm">
                    Save
                  </button>
                </div>
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
                  Due Terms
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
                  Order Number
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
            <div className="row">
              <div className="background-color">
                Item Table
              </div>
              <table class="table  ">
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
                        <select>
                          <option></option>
                          <option>Apple</option>
                          <option>Orange</option>
                        </select>
                      </td>
                      <td></td>
                      <td></td>
                      <td>%</td>
                      <td>
                        <select>
                          <option></option>
                          <option>Commision</option>
                          <option>Brokerage</option>
                        </select>
                      </td>
                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="btn btn-button btn-sm my-4 mx-1" type="button" onClick={AddRowContent}>
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
            <div className="row">

              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Custom Notes
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="bill"
                    className="form-control"
                  />
                </div>
                <lable className="form-lable">
                  Terms & Conditions
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="bill"
                    className="form-control"

                  />

                </div>
              </div>
              <div className="card col-md-6 col-12 p-3">
                <div className="d-flex justify-content-center align-items-center">
                  <lable className="form-lable">
                    Sub Total
                  </lable>
                  <div className="ms-3">
                    <input
                      type="text"
                      name="bill"
                      className="form-control form-control-sm"
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-center align-items-center">
                  <lable className="form-lable">
                    Adjustment
                  </lable>
                  <div className="ms-3">
                    <input
                      type="text"
                      name="bill"
                      className="form-control form-control-sm"
                    />
                  </div>
                </div>
                <hr className="border-dark" />
                <div className="d-flex justify-content-center align-items-center mt-2">
                  <lable className="form-lable">
                    Total
                  </lable>
                  <div className="ms-3">
                    <input
                      type="text"
                      name="bill"
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
}

export default BillsAdd;
