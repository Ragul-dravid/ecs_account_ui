import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL"
import toast from "react-hot-toast";

function InvoiceAdd() {
    const navigate = useNavigate();
    const [loadIndicator, setLoadIndicator] = useState(false);
    const [rows, setRows] = useState([{}]);
    const AddRowContent = () => {
        setRows((prevRows) => [...prevRows, { id: prevRows.length + 1 }]);
    };

    const validationSchema = Yup.object({
        // customerName: Yup.string().required("*Customer name is required"),
        issuesDate: Yup.string().required("*Date is required"),
        dueDate: Yup.string().required("*Due date is required"),
        invoiceNumber: Yup.string().required("*Order number is required"),
        reference: Yup.string().required("*Invoice is required"),
        // subject: Yup.string().required("*Subject is required"),
        // customerNotes: Yup.string().required("*Customer notes is required"),
        subTotal: Yup.string().required("*Sub total is required"),
        totalTax: Yup.string().required("*Tax is required"),
        // termsAndconditions: Yup.string().required("*Terms and conditions is required"),
    });

    const formik = useFormik({
        initialValues: {
            issuesDate: "",
            dueDate: "",
            invoiceNumber: "",
            reference: "",
            amountsAre: "",
            subTotal: "",
            totalTax: "",
            total: ""
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            setLoadIndicator(true);
            console.log("Create Tnx :",values);
            try {
                const response = await api.post("/createTxnInvoice", values, {
                });
                if (response.status === 201) {
                    toast.success(response.data.message);
                    navigate("/invoice");
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                toast.error(error);
            } finally {
                setLoadIndicator(false);
            }
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
                                    <h1 className="h4 ls-tight headingColor">Add Invoice</h1>
                                </div>
                            </div>
                            <div className="col-auto">
                                <div className="hstack gap-2 justify-content-end">
                                    <Link to="/invoice">
                                        <button type="submit" className="btn btn-sm btn-light">
                                            <span>Back</span>
                                        </button>
                                    </Link>
                                    <button
                                        type="submit"
                                        className="btn btn-button"
                                        disabled={loadIndicator}
                                    >
                                        {loadIndicator && (
                                            <span
                                                className="spinner-border spinner-border-sm me-2"
                                                aria-hidden="true"
                                            ></span>
                                        )}
                                        Save
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
                                        className={`form-control  ${formik.touched.invoiceNumber && formik.errors.invoiceNumber
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        {...formik.getFieldProps("invoiceNumber")}
                                    />
                                    {formik.touched.invoiceNumber &&
                                        formik.errors.invoiceNumber && (
                                            <div className="invalid-feedback">
                                                {formik.errors.invoiceNumber}
                                            </div>
                                        )}
                                </div>
                            </div>

                            <div className="col-md-6 col-12 mb-3">
                                <lable className="form-lable">
                                    Issues Date<span className="text-danger">*</span>
                                </lable>
                                <div className="mb-3">
                                    <input
                                        type="date"
                                        className={`form-control ${formik.touched.issuesDate && formik.errors.issuesDate
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        {...formik.getFieldProps("issuesDate")}
                                    />
                                    {formik.touched.issuesDate &&
                                        formik.errors.issuesDate && (
                                            <div className="invalid-feedback">
                                                {formik.errors.issuesDate}
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

                            <div className="col-12 mb-3 d-flex align-items-end justify-content-end">
                                <label className="col-form-label">
                                    Amount<span className="text-danger">*</span>&nbsp;&nbsp;
                                </label>
                                <div className="overflow-x-auto">
                                    <select
                                        name="amountsAre"
                                        {...formik.getFieldProps("amountsAre")}
                                        className="form-select" style={{ width: "100%" }}>
                                        <option></option>
                                        <option value="TAX_EXCLUSIVE">Tax Exclusive</option>
                                        <option value="TAX_INCLUSIVE">Tax Inclusive</option>
                                        <option value="NO_TAX">No Tax</option>
                                    </select>
                                </div>
                                {formik.touched.amountsAre && formik.errors.amountsAre && (
                                    <div className="invalid-feedback">{formik.errors.amountsAre}</div>
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
                            <div>
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
                                <div className="col-md-6 col-12 mt-5 rounded" style={{ border: "1px solid lightgrey" }}>
                                    <div className="row mb-3 mt-2">
                                        <label className="col-sm-4 col-form-label">
                                            Sub Total<span className="text-danger">*</span>
                                        </label>
                                        <div className="col-sm-4"></div>
                                        <div className="col-sm-4">
                                            <input
                                                type="text"
                                                className={`form-control ${formik.touched.subTotal && formik.errors.subTotal ? "is-invalid" : ""}`}
                                                {...formik.getFieldProps("subTotal")}
                                            />
                                            {formik.touched.subTotal && formik.errors.subTotal && (
                                                <div className="invalid-feedback">{formik.errors.subTotal}</div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label className="col-sm-4 col-form-label">
                                            Total Tax<span className="text-danger">*</span>
                                        </label>
                                        <div className="col-sm-4"></div>
                                        <div className="col-sm-4">
                                            <input
                                                type="text"
                                                className={`form-control ${formik.touched.totalTax && formik.errors.totalTax ? "is-invalid" : ""}`}
                                                {...formik.getFieldProps("totalTax")}
                                            />
                                            {formik.touched.totalTax && formik.errors.totalTax && (
                                                <div className="invalid-feedback">{formik.errors.totalTax}</div>
                                            )}
                                        </div>
                                    </div>

                                    <hr />
                                    <div className="row mb-3 mt-2">
                                        <label className="col-sm-4 col-form-label">Total</label>
                                        <div className="col-sm-4"></div>
                                        <div className="col-sm-4">
                                            <input
                                                type="text"
                                                className={`form-control ${formik.touched.total && formik.errors.total ? "is-invalid" : ""}`}
                                                {...formik.getFieldProps("total")}
                                            />
                                            {formik.touched.total && formik.errors.total && (
                                                <div className="invalid-feedback">{formik.errors.total}</div>
                                            )}
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

export default InvoiceAdd;
