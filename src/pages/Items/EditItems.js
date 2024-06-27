import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function EditItems() {
  const [isSalesChecked, setIsSalesChecked] = useState(false);
  const [isPurchaseChecked, setIsPurchaseChecked] = useState(false);
  const validationSchema = Yup.object({
    code: Yup.string(),
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
      code: "1234",
      unit: "box",
      name: "sakthivel",
      sellingprice: "2000",
      sellingprice1: "2000",
      account: "sales",
      account1: "travelexpence",
      description: "feed back",
      description1: "feed back",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("additems:", values);
    },
  });

  const handleSalesCheckboxChange = () => {
    setIsSalesChecked((prevState) => !prevState);
    if (!isSalesChecked) {
      formik.setFieldValue("sellingprice", "");
      formik.setFieldValue("account", "");
      formik.setFieldValue("description", "");
      setIsPurchaseChecked(false);
    }
  };

  const handlePurchaseCheckboxChange = () => {
    setIsPurchaseChecked((prevState) => !prevState);
    if (!isPurchaseChecked) {
      formik.setFieldValue("sellingprice1", "");
      formik.setFieldValue("account1", "");
      formik.setFieldValue("vendor", "");
      formik.setFieldValue("description1", "");
      setIsSalesChecked(false);
    }
  };

  return (
    <div className="container-fluid p-2 minHeight m-0">
      <div className="card shadow border-0 mb-2 top-header">
        <div className="container-fluid py-4">
          <div className="row align-items-center">
            <div className="col">
              <div className="d-flex align-items-center gap-4">
                <h1 className="h4 ls-tight headingColor">Edit Items</h1>
              </div>
            </div>
            <div className="col-auto">
              <div className="hstack gap-2 justify-content-end">
                <Link to="/items">
                  <button type="button" className="btn btn-sm btn-light">
                    <span>Back</span>
                  </button>
                </Link>
                <button
                  type="submit"
                  className="btn btn-sm btn-button"
                  onClick={formik.handleSubmit}
                >
                  Update
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
                <label className="form-label">
                  Code <span className="text-danger">*</span>
                </label>
                <div className="mb-3">
                  <input
                    type="text"
                    name="code"
                    className={`form-control ${
                      formik.touched.code && formik.errors.code
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("code")}
                  />
                  {formik.touched.code && formik.errors.code && (
                    <div className="invalid-feedback">{formik.errors.code}</div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  Name <span className="text-danger">*</span>
                </label>
                <div className="mb-3">
                  <input
                    type="text"
                    name="name"
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
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">Unit</label>
                <div className="mb-3">
                  <select
                    name="unit"
                    className={`form-select  ${
                      formik.touched.unit && formik.errors.unit
                        ? "is-invalid"
                        : ""
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

              <div className="col-md-6 col-12 mb-2"></div>
              <div className="col-md-6 col-12 mb-2">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="salesCheckbox"
                    value="Sales"
                    checked={isSalesChecked}
                    onChange={handleSalesCheckboxChange}
                  />
                  <label className="form-check-label" htmlFor="salesCheckbox">
                    Sales Information
                  </label>
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="purchaseCheckbox"
                    value="Purchase"
                    checked={isPurchaseChecked}
                    onChange={handlePurchaseCheckboxChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="purchaseCheckbox"
                  >
                    Purchase Information
                  </label>
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                
                  <label className="form-label pt-2 pe-2">Selling Price</label>
                  <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      INR
                    </span>
                  </div>
                  <input
                    type="text"
                    className={`form-control ${
                      formik.touched.sellingprice && formik.errors.sellingprice
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("sellingprice")}
                    disabled={isSalesChecked}
                  />
                  {formik.touched.sellingprice &&
                    formik.errors.sellingprice && (
                      <div className="invalid-feedback">
                        {formik.errors.sellingprice}
                      </div>
                    )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
              
                  <label className="form-label pt-2 pe-2">Selling Price</label>
                  <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      INR
                    </span>
                  </div>
                  <input
                    type="text"
                    className={`form-control ${
                      formik.touched.sellingprice1 &&
                      formik.errors.sellingprice1
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("sellingprice1")}
                    disabled={isPurchaseChecked}
                  />
                  {formik.touched.sellingprice1 &&
                    formik.errors.sellingprice1 && (
                      <div className="invalid-feedback">
                        {formik.errors.sellingprice1}
                      </div>
                    )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <div className="mb-3">
                  <label className="form-label text-center pt-2 pe-2">
                    Account
                  </label>
                  <select
                    type="text"
                    name="account"
                    className={`form-select  ${
                      formik.touched.account && formik.errors.account
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("account")}
                    disabled={isSalesChecked}
                  >
                    <option></option>
                    <option value="sales">Sales</option>
                    <option value="general income">General Income</option>
                  </select>
                  {formik.touched.account && formik.errors.account && (
                    <div className="invalid-feedback">
                      {formik.errors.account}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <div className="mb-3">
                  <label className="form-label pt-2 pe-2">Account</label>
                  <select
                    type="text"
                    name="account1"
                    className={`form-select  ${
                      formik.touched.account1 && formik.errors.account1
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("account1")}
                    disabled={isPurchaseChecked}
                  >
                    <option></option>
                    <option value="goods sold">Cost Of Goods Sold</option>
                    <option value="travel expense">Travel Expense</option>
                  </select>
                  {formik.touched.account1 && formik.errors.account1 && (
                    <div className="invalid-feedback">
                      {formik.errors.account1}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <div className="mb-3">
                  <label className="form-label pt-2 pe-2">Description</label>
                  <textarea
                    type="text"
                    name="description"
                    className={`form-control ${
                      formik.touched.description && formik.errors.description
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("description")}
                    disabled={isSalesChecked}
                  />
                  {formik.touched.description && formik.errors.description && (
                    <div className="invalid-feedback">
                      {formik.errors.description}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <div className="mb-3">
                  <label className="form-label pt-2 pe-2">Vendor</label>
                  <input
                    type="text"
                    name="vendor"
                    className={`form-control ${
                      formik.touched.vendor && formik.errors.vendor
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("vendor")}
                    disabled={isPurchaseChecked}
                  />
                  {formik.touched.vendor && formik.errors.vendor && (
                    <div className="invalid-feedback">
                      {formik.errors.vendor}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2"></div>
              <div className="col-md-6 col-12 mb-2">
                <div className="mb-3">
                  <label className="form-label pt-2 pe-2">Description</label>
                  <textarea
                    type="text"
                    name="description1"
                    className={`form-control ${
                      formik.touched.description1 && formik.errors.description1
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("description1")}
                    disabled={isPurchaseChecked}
                  />
                  {formik.touched.description1 &&
                    formik.errors.description1 && (
                      <div className="invalid-feedback">
                        {formik.errors.description1}
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

export default EditItems;
