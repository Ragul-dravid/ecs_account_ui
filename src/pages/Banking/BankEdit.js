import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../config/URL";
import toast from "react-hot-toast";

function BankEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    selectaccounttype: Yup.string().required("*Select Account Type is required"),
    // accountName: Yup.string().required("*Account Name is required"),
    currency: Yup.string().required("*Currency is required"),
    accountNumber: Yup.string().required("*Account Number is required"),
    // ifsc: Yup.string().required("*IFSC code is required"),
    bankName: Yup.string().required("*Bank Name is required"),
   
  });

  const formik = useFormik({
    initialValues: {
      selectaccounttype: "",
      accountName: "",
      currency: "",
      accountNumber: "",
      ifsc: "",
      bankName: "",
      
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true)
      try {
        const response = await api.put(`/updateTxnBank/${id}`,values, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        if (response.status === 200) {
          toast.success("Banking created successfully")
          navigate("/bank");
          
        }
      }
      catch (e) {
        toast.error("Error fetching data: ", e?.response?.data?.message);

      }
      finally {
        setLoading(false)
      }
    }
    
  });
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getTxnBankById/${id}`);
        formik.setValues(response.data);
      } catch (error) {
        toast.error("Error Fetch Data ", error);
      }
    };

    getData();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="container-fluid p-2 minHeight m-0">
        <div
          className="card shadow border-0 mb-2 top-header">
          <div className="container-fluid py-4">
            <div className="row align-items-center">
              <div className="col">
                <div className="d-flex align-items-center gap-4">
                  <h1 className="h4 ls-tight headingColor">Edit Bank</h1>
                </div>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-end">
                  <Link to="/bank">
                    <button type="submit" className="btn btn-sm btn-light">
                      <span>Back</span>
                    </button>
                  </Link>
                  <button type="submit" className="btn btn-sm btn-button" disabled={loading}>
                    {loading ? (
                      <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
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



        {/* User Information */}
        <div className="card shadow border-0 my-2">
          <div className="container fw-bold fs-5 my-4">
            Bank Information
          </div>
          <div className="container mb-5">
            <div className="row py-4">
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Account Name<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="accountName"
                    className={`form-control  ${formik.touched.accountName && formik.errors.accountName
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("accountName")}
                  />
                  {formik.touched.accountName &&
                    formik.errors.accountName && (
                      <div className="invalid-feedback">
                        {formik.errors.accountName}
                      </div>
                    )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Bank Type<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <select
                    name="bankType"
                    {...formik.getFieldProps("bankType")}
                    className={`form-select    ${formik.touched.bankType && formik.errors.bankType
                      ? "is-invalid"
                      : ""
                      }`}>
                    <option selected>None</option>
                    <option value="Bank">Bank</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="pretty cash"> pretty cash</option>
                    <option value="Undeposited Fund">Undeposited Fund</option>
                  </select>
                  {formik.touched.bankType &&
                    formik.errors.bankType && (
                      <div className="invalid-feedback">
                        {formik.errors.bankType}
                      </div>
                    )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Currency<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                <input
                    type="text"
                    name="currency"
                    className={`form-control  ${formik.touched.currency && formik.errors.currency
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("currency")}
                  />
                  {formik.touched.currency &&
                    formik.errors.currency && (
                      <div className="invalid-feedback">
                        {formik.errors.currency}
                      </div>
                    )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Bank Name<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="bankName"
                    className={`form-control  ${formik.touched.bankName && formik.errors.bankName
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("bankName")}
                  />
                  {formik.touched.bankName &&
                    formik.errors.bankName && (
                      <div className="invalid-feedback">
                        {formik.errors.bankName}
                      </div>
                    )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Account Number<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="accountNumber"
                    className={`form-control  ${formik.touched.accountNumber && formik.errors.accountNumber
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("accountNumber")}
                  />
                  {formik.touched.accountNumber &&
                    formik.errors.accountNumber && (
                      <div className="invalid-feedback">
                        {formik.errors.accountNumber}
                      </div>
                    )}
                </div>
              </div>
             
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  IFSC<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="ifsc"
                    className={`form-control  ${formik.touched.ifsc && formik.errors.ifsc
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("ifsc")}
                  />
                  {formik.touched.ifsc &&
                    formik.errors.ifsc && (
                      <div className="invalid-feedback">
                        {formik.errors.ifsc}
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default BankEdit