import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IoIosAdd } from "react-icons/io";
function InvoiceEdit() {
    const [rows, setRows] = useState([{}]);
    const AddRowContent = () => {
        setRows((prevRows) => [...prevRows, { id: prevRows.length + 1 }]);
    };
    const validationSchema = Yup.object({
        customerName: Yup.string().required("*Customer name is required"),
        invoice: Yup.string().required("*Invoice is required"),
        invoiceDate: Yup.string().required("*Invoice date is required"),
        dueTerms: Yup.string().required("*Due terms is required"),
        dueDate: Yup.string().required("*Due date is required"),
        orderNumber: Yup.string().required("*Order number is required"),
        subject: Yup.string().required("*Subject is required"),
        customerNotes: Yup.string().required("*Customer notes is required"),
        subTotal: Yup.string().required("*Sub total is required"),
        adjustment: Yup.string().required("*Adjustment is required"),
        termsAndconditions: Yup.string().required("*Terms and conditions is required"),
    });

    const formik = useFormik({
        initialValues: {
            customerName: "Manikandan",
            invoice: "INVOICE_629NSHKJ09",
            invoiceDate: "2024-04-01",
            dueTerms: "Net 15",
            dueDate: "2024-04-01",
            orderNumber: "Test Order",
            subject: "Test",
            sno: "1",
            itemDetails: "Apple",
            quantity: "200",
            amount: "₹10000.00",
            discount: "10%",
            rate: "₹10.00",
            tax: "Commision",
            customerNotes: "",
            subTotal: "",
            adjustment: "",
            termsAndconditions: ""
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log("Invoice Datas:", values);
        },
    });

    return (
        <div className="container-fluid p-2 minHeight m-0">
            <form onSubmit={formik.handleSubmit}>
                <div
                    className="card shadow border-0 mb-2 top-header">
                    <div className="container-fluid py-4">
                        <div className="row align-items-center">
                            <div className="col">
                                <div className="d-flex align-items-center gap-4">
                                    <h1 className="h4 ls-tight headingColor">Edit Invoice</h1>
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
                                        <span>Update</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card shadow border-0 my-2">
                    <div className="container mb-5 mt-5">
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
                                    Invoice<span className="text-danger">*</span>
                                </lable>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className={`form-control  ${formik.touched.invoice && formik.errors.invoice
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        {...formik.getFieldProps("invoice")}
                                    />
                                    {formik.touched.invoice &&
                                        formik.errors.invoice && (
                                            <div className="invalid-feedback">
                                                {formik.errors.invoice}
                                            </div>
                                        )}
                                </div>
                            </div>
                            <div className="col-md-6 col-12 mb-3">
                                <lable className="form-lable">
                                    Invoice Number<span className="text-danger">*</span>
                                </lable>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className={`form-control  ${formik.touched.invoice && formik.errors.invoice
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        {...formik.getFieldProps("invoice")}
                                    />
                                    {formik.touched.invoice &&
                                        formik.errors.invoice && (
                                            <div className="invalid-feedback">
                                                {formik.errors.invoice}
                                            </div>
                                        )}
                                </div>
                            </div>
                            <div className="col-md-6 col-12 mb-3">
                                <lable className="form-lable">
                                    Reference<span className="text-danger">*</span>
                                </lable>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className={`form-control  ${formik.touched.invoice && formik.errors.invoice
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        {...formik.getFieldProps("invoice")}
                                    />
                                    {formik.touched.invoice &&
                                        formik.errors.invoice && (
                                            <div className="invalid-feedback">
                                                {formik.errors.invoice}
                                            </div>
                                        )}
                                </div>
                            </div>

                            <div className="col-md-6 col-12 mb-3">
                                <lable className="form-lable">
                                    Invoice Date <span className="text-danger">*</span>
                                </lable>
                                <div className="mb-3">
                                    <input
                                        type="date"
                                        className={`form-control ${formik.touched.invoiceDate && formik.errors.invoiceDate
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        {...formik.getFieldProps("invoiceDate")}
                                    />
                                    {formik.touched.invoiceDate &&
                                        formik.errors.invoiceDate && (
                                            <div className="invalid-feedback">
                                                {formik.errors.invoiceDate}
                                            </div>
                                        )}
                                </div>
                            </div>


                            <div className="col-md-6 col-12 mb-3">
                                <lable className="form-lable">
                                    Due Date<span className="text-danger">*</span>
                                </lable>
                                <div className="mb-3">
                                    <input
                                        type="date"
                                        className={`form-control ${formik.touched.dueDate && formik.errors.dueDate
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        {...formik.getFieldProps("dueDate")}
                                    />
                                    {formik.touched.dueDate &&
                                        formik.errors.dueDate && (
                                            <div className="invalid-feedback">
                                                {formik.errors.dueDate}
                                            </div>
                                        )}
                                </div>
                            </div>
                            <div className="col-md-6 col-12 mb-3">
                                <lable className="form-lable">
                                    Invoice Number<span className="text-danger">*</span>
                                </lable>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className={`form-control  ${formik.touched.orderNumber && formik.errors.orderNumber
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        {...formik.getFieldProps("orderNumber")}
                                    />
                                    {formik.touched.orderNumber &&
                                        formik.errors.orderNumber && (
                                            <div className="invalid-feedback">
                                                {formik.errors.orderNumber}
                                            </div>
                                        )}
                                </div>
                            </div>

                            <div className="col-md-6 col-12 mb-3">
                                <lable className="form-lable">
                                    Subject<span className="text-danger">*</span>
                                </lable>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className={`form-control  ${formik.touched.subject && formik.errors.subject
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        {...formik.getFieldProps("subject")}
                                    />
                                    {formik.touched.subject &&
                                        formik.errors.subject && (
                                            <div className="invalid-feedback">
                                                {formik.errors.subject}
                                            </div>
                                        )}
                                </div>
                            </div>
                            <div className="col-md-6 col-12 mb-3"></div>
                            <div className="col-md-6 col-12 mb-3 d-flex align-items-end justify-content-end">
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
                            <div className="row mt-5">
                                <div className="col-12 text-start">
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
                                </div>
                            </div>
                            <div className="row mt-5 pt-0">
                            <div className="col-md-6 col-12 mb-3 pt-0">
                                <lable className="form-lable">
                                    Customer Notes<span className="text-danger">*</span>
                                </lable>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        placeholder="Will be display on the Invoice"
                                        className={`form-control  ${formik.touched.customerNotes && formik.errors.customerNotes
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        {...formik.getFieldProps("customerNotes")}
                                    />
                                    {formik.touched.customerNotes &&
                                        formik.errors.customerNotes && (
                                            <div className="invalid-feedback">
                                                {formik.errors.customerNotes}
                                            </div>
                                        )}
                                </div>
                            </div>
                            <div className="col-md-6 col-12 mt-5 roundeds" style={{ border: "1px solid lightgrey" }}>
                                <div class="row mb-3 mt-2">
                                    <label class="col-sm-4 col-form-label">Sub Total<span className="text-danger">*</span></label>
                                    <div class="col-sm-4"></div>
                                    <div class="col-sm-4 ">
                                        <input
                                            type="text"
                                            className={`form-control  ${formik.touched.subTotal && formik.errors.subTotal
                                                ? "is-invalid"
                                                : ""
                                                }`}
                                            {...formik.getFieldProps("subTotal")}
                                        />
                                        {formik.touched.subTotal &&
                                            formik.errors.subTotal && (
                                                <div className="invalid-feedback">
                                                    {formik.errors.subTotal}
                                                </div>
                                            )}
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <label class="col-sm-4 col-form-label">Total Tax<span className="text-danger">*</span></label>
                                    <div class="col-sm-4">
                                    </div>
                                    <div class="col-sm-4 ">
                                        <input
                                            type="text"
                                            className={`form-control  ${formik.touched.adjustment && formik.errors.adjustment
                                                ? "is-invalid"
                                                : ""
                                                }`}
                                            {...formik.getFieldProps("adjustment")}
                                        />
                                        {formik.touched.adjustment &&
                                            formik.errors.adjustment && (
                                                <div className="invalid-feedback">
                                                    {formik.errors.adjustment}
                                                </div>
                                            )}
                                    </div>
                                </div>
                                <hr></hr>
                                <div class="row mb-3 mt-2">
                                    <label class="col-sm-4 col-form-label">Total</label>
                                    <div class="col-sm-4"></div>
                                    <div class="col-sm-4 ">
                                        <input type="text" class="form-control " />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-12 mb-3">
                                <lable className="form-lable">
                                    Terms & Conditions<span className="text-danger">*</span>
                                </lable>
                                <div className="mb-3">
                                    <textarea
                                        className={`form-control  ${formik.touched.termsAndconditions && formik.errors.termsAndconditions
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        {...formik.getFieldProps("termsAndconditions")}
                                    />
                                    {formik.touched.termsAndconditions &&
                                        formik.errors.termsAndconditions && (
                                            <div className="invalid-feedback">
                                                {formik.errors.termsAndconditions}
                                            </div>
                                        )}
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

export default InvoiceEdit;
