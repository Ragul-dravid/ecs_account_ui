import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../config/URL";
import toast from "react-hot-toast";

function AddItems() {
  const [isSalesChecked, setIsSalesChecked] = useState(true);
  const [isPurchaseChecked, setIsPurchaseChecked] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    itemCode: Yup.string().required("*Code is required"),
    itemName: Yup.string().required("*Name is required"),
  });

  const formik = useFormik({
    initialValues: {
      itemCode: "",
      unit: "",
      itemName: "",
      salesPrice: "",
      costPrice: "",
      salesAcc: "",
      purchaseAcc: "",
      salesDesc: "",
      purchaseDesc: "",
      preferredVendor: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // console.log("additems:", values);
      setLoading(true);
      try {
        const response = await api.post(`createMstrItems`, values);
        console.log(response);
        if (response.status === 201) {
          toast.success(response.data.message);
          console.log("Toast : ", response.data.message);
          navigate("/items");
        } else {
          toast.error(response?.data?.message);
        }
      } catch (error) {
        toast.error("Error fetching data: ", error?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleSalesCheckboxChange = () => {
    setIsSalesChecked((prevState) => !prevState);
    // if (isSalesChecked) {
    //   formik.setFieldValue("salesPrice", "");
    //   formik.setFieldValue("salesAcc", "");
    //   formik.setFieldValue("salesDesc", "");
    // }
  };

  const handlePurchaseCheckboxChange = () => {
    setIsPurchaseChecked((prevState) => !prevState);
    // if (isPurchaseChecked) {
    //   formik.setFieldValue("costPrice", "");
    //   formik.setFieldValue("purchaseAcc", "");
    //   formik.setFieldValue("vendor", "");
    //   formik.setFieldValue("purchaseDesc", "");
    // }
  };

  return (
    <div className="container-fluid p-2 minHeight m-0">
      <form onSubmit={formik.handleSubmit}>
        <div className="card shadow border-0 mb-2 top-header">
          <div className="container-fluid py-4">
            <div className="row align-items-center">
              <div className="col">
                <div className="d-flex align-items-center gap-4">
                  <h1 className="h4 ls-tight headingColor">Add Items</h1>
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
                    className="btn btn-button"
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
                    name="itemCode"
                    className={`form-control ${
                      formik.touched.itemCode && formik.errors.itemCode
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("itemCode")}
                  />
                  {formik.touched.itemCode && formik.errors.itemCode && (
                    <div className="invalid-feedback">
                      {formik.errors.itemCode}
                    </div>
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
                    name="itemName"
                    className={`form-control ${
                      formik.touched.itemName && formik.errors.itemName
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("itemName")}
                  />
                  {formik.touched.itemName && formik.errors.itemName && (
                    <div className="invalid-feedback">
                      {formik.errors.itemName}
                    </div>
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
                    <option value="BOX">Box</option>
                    <option value="GRAMS">Grams</option>
                    <option value="KILOGRAMS">Kilograms</option>
                    <option value="METERS">Meters</option>
                    <option value="TABLETS">Tablets</option>
                    <option value="UNITS">Units</option>
                    <option value="PIECES">Pieces</option>
                    <option value="PAIRS">Pairs</option>
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
                      formik.touched.salesPrice && formik.errors.salesPrice
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("salesPrice")}
                    disabled={!isSalesChecked}
                  />
                  {formik.touched.salesPrice && formik.errors.salesPrice && (
                    <div className="invalid-feedback">
                      {formik.errors.salesPrice}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-2">
                <label className="form-label pt-2 pe-2">Purchase Price</label>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      INR
                    </span>
                  </div>
                  <input
                    type="text"
                    className={`form-control ${
                      formik.touched.costPrice && formik.errors.costPrice
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("costPrice")}
                    disabled={!isPurchaseChecked}
                  />
                  {formik.touched.costPrice && formik.errors.costPrice && (
                    <div className="invalid-feedback">
                      {formik.errors.costPrice}
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
                    name="salesAcc"
                    className={`form-select ${
                      formik.touched.salesAcc && formik.errors.salesAcc
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("salesAcc")}
                    disabled={!isSalesChecked}
                  >
                    <option value=""></option>
                    <option value="sales">Sales</option>
                    <option value="general income">General Income</option>
                  </select>
                  {formik.touched.salesAcc && formik.errors.salesAcc && (
                    <div className="invalid-feedback">
                      {formik.errors.salesAcc}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-2">
                <div className="mb-3">
                  <label className="form-label pt-2 pe-2">Account</label>
                  <select
                    type="text"
                    name="purchaseAcc"
                    className={`form-select ${
                      formik.touched.purchaseAcc && formik.errors.purchaseAcc
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("purchaseAcc")}
                    disabled={!isPurchaseChecked}
                  >
                    <option value=""></option>
                    <option value="goods sold">Cost Of Goods Sold</option>
                    <option value="travel expense">Travel Expense</option>
                  </select>
                  {formik.touched.purchaseAcc && formik.errors.purchaseAcc && (
                    <div className="invalid-feedback">
                      {formik.errors.purchaseAcc}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-2">
                <div className="mb-3">
                  <label className="form-label pt-2 pe-2">Description</label>
                  <textarea
                    type="text"
                    name="salesDesc"
                    rows="4"
                    className={`form-control ${
                      formik.touched.salesDesc && formik.errors.salesDesc
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("salesDesc")}
                    disabled={!isSalesChecked}
                  />
                  {formik.touched.salesDesc && formik.errors.salesDesc && (
                    <div className="invalid-feedback">
                      {formik.errors.salesDesc}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-2">
                <div className="mb-3">
                  <label className="form-label pt-2 pe-2">Vendor</label>
                  <input
                    type="text"
                    name="preferredVendor"
                    className={`form-control ${
                      formik.touched.preferredVendor &&
                      formik.errors.preferredVendor
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("preferredVendor")}
                    disabled={!isPurchaseChecked}
                  />
                  {formik.touched.preferredVendor &&
                    formik.errors.preferredVendor && (
                      <div className="invalid-feedback">
                        {formik.errors.preferredVendor}
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
                    name="purchaseDesc"
                    rows="4"
                    className={`form-control ${
                      formik.touched.purchaseDesc && formik.errors.purchaseDesc
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("purchaseDesc")}
                    disabled={!isPurchaseChecked}
                  />
                  {formik.touched.purchaseDesc &&
                    formik.errors.purchaseDesc && (
                      <div className="invalid-feedback">
                        {formik.errors.purchaseDesc}
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

export default AddItems;