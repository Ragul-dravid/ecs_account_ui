import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function RecordPayment() {
    const validationSchema = Yup.object({
        customerName: Yup.string().required("*Customer Name is required"),
        payment: Yup.string().required("*Payment is required"),
        amountReceived: Yup.string().required("*Amount received is required"),
        paymentDate: Yup.string().required("*Payment date is required"),
        paymentMode: Yup.string().required("*Payment mode is required"),
        depositTo: Yup.string().required("*Deposit to is required"),
        reference: Yup.string().required("*Reference is required"),
        note: Yup.string().required("*Note is required")
    });

    const formik = useFormik({
        initialValues: {
            customerName: "",
            payment: "",
            amountReceived: "",
            paymentDate: "",
            paymentMode: "",
            depositTo: "",
            reference: "",
            note: ""
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log("Record Payment Datas:", values);
        },
    });

    return (
        <div className="container-fluid minHeight m-0">
            <form onSubmit={formik.handleSubmit}>
                <div
                    className="card shadow border-0 mb-2 top-header">
                    <div className="container-fluid py-4">
                        <div className="row align-items-center">
                            <div className="col">
                                <div className="d-flex align-items-center gap-4">
                                    <h1 className="h4 ls-tight headingColor">Payment Received</h1>
                                </div>
                            </div>
                            <div className="col-auto">
                                <div className="hstack gap-2 justify-content-end">
                                    <Link to="/invoice">
                                        <button type="submit" className="btn btn-sm btn-light">
                                            <span>Back</span>
                                        </button>
                                    </Link>
                                    <button type="submit" className="btn btn-sm btn-primary">
                                        <span>Record Payment</span>
                                    </button>
                                    {/* <Link to="/paymentReceived">
                                        <button type="submit" className="btn btn-sm btn-primary">
                                            <span>Record Payment</span>
                                        </button>
                                    </Link> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card shadow border-0 my-2">
                    <div className="container mb-5">
                        <div className="row py-4">
                            <div className="col-md-6 col-12 mb-3">
                                <lable className="form-lable">
                                    Customer Name<span className="text-danger">*</span>
                                </lable>
                                <div className="mb-3">
                                    <select
                                        {...formik.getFieldProps("customerName")}
                                        className={`form-select    ${formik.touched.customerName && formik.errors.customerName
                                            ? "is-invalid"
                                            : ""
                                            }`}>
                                        <option></option>
                                        <option value="Manikandan">Manikandan</option>
                                        <option value="Rahul">Rahul</option>
                                    </select>
                                    {formik.touched.customerName &&
                                        formik.errors.customerName && (
                                            <div className="invalid-feedback">
                                                {formik.errors.customerName}
                                            </div>
                                        )}
                                </div>
                            </div>
                            <div className="col-md-6 col-12 mb-3">
                                <lable className="form-lable">
                                    Payment<span className="text-danger">*</span>
                                </lable>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className={`form-control  ${formik.touched.payment && formik.errors.payment
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        {...formik.getFieldProps("payment")}
                                    />
                                    {formik.touched.payment &&
                                        formik.errors.payment && (
                                            <div className="invalid-feedback">
                                                {formik.errors.payment}
                                            </div>
                                        )}
                                </div>
                            </div>

                            <div className="col-md-6 col-12 mb-3">
                                <lable className="form-lable">
                                    Amount Received <span className="text-danger">*</span>
                                </lable>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className={`form-control ${formik.touched.amountReceived && formik.errors.amountReceived
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        {...formik.getFieldProps("amountReceived")}
                                    />
                                    {formik.touched.amountReceived &&
                                        formik.errors.amountReceived && (
                                            <div className="invalid-feedback">
                                                {formik.errors.amountReceived}
                                            </div>
                                        )}
                                </div>
                            </div>
                            <div className="col-md-6 col-12 mb-3">
                                <lable className="form-lable">
                                    Payment Date<span className="text-danger">*</span>
                                </lable>
                                <div className="mb-3">
                                    <input
                                        type="date"
                                        className={`form-control  ${formik.touched.paymentDate && formik.errors.paymentDate
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        {...formik.getFieldProps("paymentDate")}
                                    />
                                    {formik.touched.paymentDate &&
                                        formik.errors.paymentDate && (
                                            <div className="invalid-feedback">
                                                {formik.errors.paymentDate}
                                            </div>
                                        )}
                                </div>
                            </div>

                            <div className="col-md-6 col-12 mb-3">
                                <lable className="form-lable">
                                    Payment Mode<span className="text-danger">*</span>
                                </lable>
                                <select
                                    {...formik.getFieldProps("paymentMode")}
                                    className={`form-select    ${formik.touched.paymentMode && formik.errors.paymentMode
                                        ? "is-invalid"
                                        : ""
                                        }`}>
                                    <option selected></option>
                                    <option value="Cash">Cash</option>
                                    <option value="Bank Transfer">Bank Transfer</option>
                                    <option value="Credit Card">Credit Card</option>
                                </select>
                                {formik.touched.paymentMode && formik.errors.paymentMode && (
                                    <div className="invalid-feedback">
                                        {formik.errors.paymentMode}
                                    </div>
                                )}
                            </div>
                            <div className="col-md-6 col-12 mb-3">
                                <lable className="form-lable">
                                    Deposit To<span className="text-danger">*</span>
                                </lable>
                                <select
                                    {...formik.getFieldProps("depositTo")}
                                    className={`form-select    ${formik.touched.depositTo && formik.errors.depositTo
                                        ? "is-invalid"
                                        : ""
                                        }`}>
                                    <option selected></option>
                                    <option value="Manikandan">Manikandan</option>
                                    <option value="Petty Cash">Petty Cash</option>
                                </select>
                                {formik.touched.depositTo && formik.errors.depositTo && (
                                    <div className="invalid-feedback">
                                        {formik.errors.depositTo}
                                    </div>
                                )}
                            </div>
                            <div className="col-md-6 col-12 mb-3">
                                <lable className="form-lable">
                                    Reference<span className="text-danger">*</span>
                                </lable>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className={`form-control  ${formik.touched.reference && formik.errors.reference
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        {...formik.getFieldProps("reference")}
                                    />
                                    {formik.touched.reference &&
                                        formik.errors.reference && (
                                            <div className="invalid-feedback">
                                                {formik.errors.reference}
                                            </div>
                                        )}
                                </div>
                            </div>
                            <div className="col-md-6 col-12 mb-3">
                                <lable className="form-lable">
                                    Note<span className="text-danger">*</span>
                                </lable>
                                <div className="mb-3">
                                    <textarea
                                        className={`form-control  ${formik.touched.note && formik.errors.note
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        {...formik.getFieldProps("note")}
                                        style={{ height: "100px" }}
                                    />
                                    {formik.touched.note &&
                                        formik.errors.note && (
                                            <div className="invalid-feedback">
                                                {formik.errors.note}
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

export default RecordPayment;
