import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function AddItems() {
  const validationSchema = Yup.object({
    type: Yup.string(),
    unit: Yup.string(),
    name: Yup.string(),
    sellingprice: Yup.string(),
    sellingprice1: Yup.string(),
    account: Yup.string(),
    account1: Yup.string(),
    description: Yup.string(),
    description1: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      type: "",
      unit: "",
      name: "",
      sellingprice: "",
      sellingprice1: "",
      account: "",
      account1: "",
      description: "",
      description1: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("additems:", values);
    },
  });

  return (
    <div className="container-fluid minHeight m-0">
      <div className="card shadow border-0 mb-2 top-header">
        <div className="container-fluid py-4">
          <div className="row align-items-center">
            <div className="col">
              <div className="d-flex align-items-center gap-4">
                <h1 className="h4 ls-tight headingColor">AddItems</h1>
              </div>
            </div>
            <div className="col-auto">
              <div className="hstack gap-2 justify-content-end">
                <Link to="/items">
                  <button type="button" className="btn btn-sm btn-light">
                    <span>Back</span>
                  </button>
                </Link>
                <button type="submit" className="btn btn-button" onClick={formik.handleSubmit}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <form>
        <div className="card shadow border-0 my-2">
          <div className="container mb-5">
            <div className="row py-4">
              <div className="col-md-6 col-12 mb-2">
                <label>Type</label>
                <br />
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="type"
                    id="inlineRadio1"
                    value="Good"
                    onChange={formik.handleChange}
                  />
                  <label className="form-check-label" htmlFor="inlineRadio1">
                    Good
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="type"
                    id="inlineRadio2"
                    value="Service"
                    onChange={formik.handleChange}
                  />
                  <label className="form-check-label" htmlFor="inlineRadio2">
                    Service
                  </label>
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">Unit</label>
                <div className="mb-3">
                  <select
                    name="unit"
                    className={`form-select  ${
                      formik.touched.unit && formik.errors.unit ? "is-invalid" : ""
                    }`}
                    {...formik.getFieldProps("unit")}
                  >
                    <option value=""></option>
                    <option value="box">Box</option>
                    <option value="grams">Grams</option>
                    <option value="kilograms">Kilograms</option>
                  </select>
                  {formik.touched.unit && formik.errors.unit && (
                    <div className="invalid-feedback">{formik.errors.unit}</div>
                  )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Name <span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="Name"
                    className={`form-control ${
                      formik.touched.name && formik.errors.name
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("name")}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="invalid-feedback">{formik.errors.name}</div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2"></div>
              <div className="col-md-6 col-12 mb-2">
                <div class="form-check form-check-inline ">
                  <input
                    class="form-check-input "
                    type="checkbox"
                    id="inlineCheckbox1"
                    value="Sales"
                    checked
                  />
                  <label class="form-check-label" for="inlineCheckbox1">
                    Sales Infermation
                  </label>
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox1"
                    value="Purchase"
                    checked
                  />
                  <label class="form-check-label" for="inlineCheckbox1">
                    Purchase Infermation
                  </label>
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
              
                <div class="input-group mb-3 d-flex">
                <label className="form-lable pt-2 pe-2">Selling Price</label>
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">
                      INR
                    </span>
                  </div>
                  <input type="text" class="form-control" name="sellingprice"
                   className={`form-control ${
                    formik.touched.sellingprice && formik.errors.sellingprice
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("sellingprice")}
                />
                {formik.touched.sellingprice && formik.errors.sellingprice && (
                  <div className="invalid-feedback">{formik.errors.sellingprice}</div>
                )}
             
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
               
                <div class="input-group mb-3 d-flex">
                <label className="form-lable pt-2 pe-2">Selling Price</label>
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">
                      INR
                    </span>
                  </div>
                  <input type="text" class="form-control" name="sellingprice1"
                   className={`form-control ${
                    formik.touched.sellingprice1 && formik.errors.sellingprice1
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("sellingprice1")}
                />
                {formik.touched.sellingprice1 && formik.errors.sellingprice1 && (
                  <div className="invalid-feedback">{formik.errors.sellingprice1}</div>
                )}
              
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
               
                <div className="mb-3 d-flex" >
                <lable className="form-lable text-center pt-2 pe-2">Account</lable>
                  <select type="text" name="account" 
                   className={`form-select  ${
                    formik.touched.account && formik.errors.account
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("account")}
                  >
                    <option></option>
                    <option value="sales">Sales</option>
                    <option value="gentral income">Gentral Income</option>
                  </select>
                  {formik.touched.account && formik.errors.account && (
                    <div className="invalid-feedback">{formik.errors.account}</div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
               
                <div className="mb-3 d-flex">
                <lable className="form-lable pt-2 pe-2">Account</lable>
                  <select type="text" name="account1" className={`form-select  ${
                    formik.touched.account1 && formik.errors.account1
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("account1")}>
                    <option></option>
                    <option value="goods sold">Cost Of Goods Sold</option>
                    <option value="travelexpence">Travel Expence</option>
                  </select>
                  {formik.touched.account1 && formik.errors.account1 && (
                    <div className="invalid-feedback">{formik.errors.account1}</div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
               
                <div className="mb-3 d-flex">
                <lable className="form-lable pt-2 pe-2">Description</lable>
                  <textarea
                    type="text"
                    name="description"
                    className={`form-control ${
                      formik.touched.description && formik.errors.description
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("description")}
                  />
                  {formik.touched.description && formik.errors.description && (
                    <div className="invalid-feedback">{formik.errors.description}</div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                
                <div className="mb-3 d-flex">
                <lable className="form-lable pt-2 pe-2">Description</lable>
                  <textarea
                    type="text"
                    name="description1"
                    className={`form-control ${
                      formik.touched.description1 && formik.errors.description1
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("description1")}
                  />
                  {formik.touched.description1 && formik.errors.description1 && (
                    <div className="invalid-feedback">{formik.errors.description1}</div>
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

export default AddItems;
