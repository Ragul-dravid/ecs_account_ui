import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL"
import toast from "react-hot-toast";

function CreditNotesEdit() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoadIndicator] = useState(false);
    const [rows, setRows] = useState([{}]);
    const AddRowContent = () => {
        setRows((prevRows) => [...prevRows, { id: prevRows.length + 1 }]);
    };
    const [items, setItems] = useState([]);
    const [customerData, setCustomerData] = useState([]);

    const validationSchema = Yup.object({
        // customerName: Yup.string().required("*Customer name is required"),
        // date: Yup.string().required("*Date is required"),
        // files: Yup.string().required("*files is required"),
        reference: Yup.string().required("*Reference is required"),
        currency: Yup.string().required("*currency is required"),
        amountsAre: Yup.string().required("*Amounts Are is required"),
    });

    const formik = useFormik({
        initialValues: {
            customerId: "",
            date: "",
            reference: "",
            currency: "",
            amountsAre: "",
            creditNoteItemsModels: [
                {
                    item: "",
                    description: "",
                    account: "",
                    qty: "",
                    price: "",
                    taxRate: "",
                    amount: "",
                },
            ],
            files: null,
            creditNote: "",
            subTotal: "",
            total: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            setLoadIndicator(true);
            console.log("Create Tnx :", values);
            const { creditNoteItemsModels, file,toName,...value } = values;
            const formData = new FormData();
            Object.entries(value).forEach(([key, value]) => {
                if (value !== undefined) {
                    formData.append(key, value);
                }
            });
            creditNoteItemsModels.forEach((item) => {
                formData.append("itemId", item.item)
                formData.append("description", item.description)
                formData.append("account", item.account)
                formData.append("qty", item.qty)
                formData.append("price", item.price)
                formData.append("taxRate", item.taxRate)
                formData.append("amount", item.amount)
            })
            if (file) {
                formData.append("files", file);
            }
            try {
                const response = await api.put(`/updateCreditAndCreditItems/${values.id}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                if (response.status === 200) {
                    toast.success(response.data.message);
                    navigate("/creditNotes");
                } else {
                    toast.error(response.data.message);
                }
            } catch (e) {
                toast.error("Error fetching data: ", e?.response?.data?.message);
            } finally {
                setLoadIndicator(false);
            }
        },
    });

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await api.get(`/getTxnCreditNotesById/${id}`);
                formik.setValues(response.data);
            } catch (e) {
                toast.error("Error fetching data: ", e?.response?.data?.message);
            }
        };

        getData();
        fetchItemsData();
        fetchCustomerData();
    }, [id]);

    const handleSelectChange = (index, value) => {
        formik.setFieldValue(`creditNoteItemsModels[${index}].itemName`, value);
    };

    const fetchItemsData = async () => {
        try {
            const response = await api.get("getAllItemNameWithIds");
            setItems(response.data);
        } catch (error) {
            toast.error("Error fetching tax data:", error);
        }
    };
    const fetchCustomerData = async () => {
        try {
            const response = await api.get("getAllCustomerWithIds");
            setCustomerData(response.data);
        } catch (error) {
            toast.error("Error fetching tax data:", error);
        }
    };

    return (
        <div className="container-fluid p-2 minHeight m-0">
            <form onSubmit={formik.handleSubmit}>
                <div className="card shadow border-0 mb-2 top-header">
                    <div className="container-fluid py-4">
                        <div className="row align-items-center">
                            <div className="col">
                                <div className="d-flex align-items-center gap-4">
                                    <h1 className="h4 ls-tight headingColor">Edit Credit Notes</h1>
                                </div>
                            </div>
                            <div className="col-auto">
                                <div className="hstack gap-2 justify-content-end">
                                    <Link to="/creditNotes">
                                        <button className="btn btn-sm btn-light">
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
                <div className="card shadow border-0 my-2">
                    <div className="container mb-5 mt-5">
                        <div className="row py-4">
                            <div className="col-md-6 col-12 mb-3">
                                <lable className="form-lable">
                                    Customer Name
                                </lable>
                                <div className="mb-3">
                                    <select
                                        {...formik.getFieldProps("customerId")}
                                        name="customerId"
                                        className={`form-select ${formik.touched.customerId && formik.errors.customerId
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                    >
                                        <option selected></option>
                                        {customerData &&
                                            customerData.map((coustomerId) => (
                                                <option key={coustomerId.id} value={coustomerId.id}>
                                                    {coustomerId.contactName}
                                                </option>
                                            ))}
                                    </select>
                                    {formik.touched.customerId &&
                                        formik.errors.customerId && (
                                            <div className="invalid-feedback">
                                                {formik.errors.customerId}
                                            </div>
                                        )}
                                </div>
                            </div>

                            <div className="col-md-6 col-12 mb-3">
                                <lable className="form-lable">
                                    Date<span className="text-danger">*</span>
                                </lable>
                                <div className="mb-3">
                                    <input
                                        type="date"
                                        className={`form-control ${formik.touched.date && formik.errors.date
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        {...formik.getFieldProps("date")}
                                    />
                                    {formik.touched.date &&
                                        formik.errors.date && (
                                            <div className="invalid-feedback">
                                                {formik.errors.date}
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

                            <div className="col-md-6 col-12 mb-3">
                                <lable className="form-lable">
                                    Upload File<span className="text-danger">*</span>
                                </lable>
                                <div className="mb-3">
                                    <input
                                        type="file"
                                        className={`form-control  ${formik.touched.files && formik.errors.files
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        {...formik.getFieldProps("files")}
                                    />
                                    {formik.touched.files &&
                                        formik.errors.files && (
                                            <div className="invalid-feedback">
                                                {formik.errors.files}
                                            </div>
                                        )}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 col-12 mb-3 d-flex align-items-start justify-content-start">
                                    <label className="col-form-label">
                                        currency<span className="text-danger">*</span>&nbsp;&nbsp;
                                    </label>
                                    <div className="overflow-x-auto">
                                        <select
                                            name="currency"
                                            className={`form-select  ${formik.touched.currency && formik.errors.currency
                                                ? "is-invalid"
                                                : ""
                                                }`}
                                            {...formik.getFieldProps("currency")}
                                            style={{ width: "100%" }}
                                        >
                                            <option></option>
                                            <option value="INR">INR</option>
                                            <option value="SGD">SGD</option>
                                            <option value="USD">USD</option>
                                        </select>
                                    </div>
                                    {formik.touched.currency &&
                                        formik.errors.currency && (
                                            <div className="invalid-feedback">
                                                {formik.errors.currency}
                                            </div>
                                        )}
                                </div>

                                <div className="col-md-6 col-12 mb-3 d-flex align-items-end justify-content-end">
                                    <label className="col-form-label">
                                        Amount Are<span className="text-danger">*</span>&nbsp;&nbsp;
                                    </label>
                                    <div className="overflow-x-auto">
                                        <select
                                            name="amountsAre"
                                            className={`form-select  ${formik.touched.amountsAre && formik.errors.amountsAre
                                                ? "is-invalid"
                                                : ""
                                                }`}
                                            {...formik.getFieldProps("amountsAre")}
                                            style={{ width: "100%" }}
                                        >
                                            <option></option>
                                            <option value="TAX_EXCLUSIVE">Tax Exclusive</option>
                                            <option value="TAX_INCLUSIVE">Tax Inclusive</option>
                                            <option value="NO_TAX">No Tax</option>
                                        </select>
                                    </div>
                                    {formik.touched.amountsAre &&
                                        formik.errors.amountsAre && (
                                            <div className="invalid-feedback">
                                                {formik.errors.amountsAre}
                                            </div>
                                        )}
                                </div>
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
                                                <th scope="col">DESCRIPTION</th>
                                                <th scope="col">ACCOUNT</th>
                                                <th scope="col">QUANTITY</th>
                                                <th scope="col">PRICE</th>
                                                <th scope="col">TAX RATE</th>
                                                <th scope="col">AMOUNT</th>
                                            </tr>
                                        </thead>
                                        <tbody className="table-group">
                                            {rows.map((row, index) => (
                                                <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>
                                                    <select
                                                            className="form-select"
                                                            {...formik.getFieldProps(
                                                              `creditNoteItemsModels[${index}].item`
                                                            )}
                                                            style={{ width: "100%" }}
                                                            // onChange={(e) =>
                                                            //     handleSelectChange(index, e.target.value)
                                                            //   }
                                                          >
                                                            <option value=""></option>
                                                            {items &&
                                                              items.map((itemName) => (
                                                                <option key={itemName.id} value={itemName.id}>
                                                                  {itemName.itemName}
                                                                </option>
                                                              ))}
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <input
                                                            {...formik.getFieldProps(
                                                                `creditNoteItemsModels[${index}].description`
                                                            )}
                                                            className="form-control"
                                                            type="text"
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            {...formik.getFieldProps(
                                                                `creditNoteItemsModels[${index}].account`
                                                            )}
                                                            className="form-control"
                                                            type="text"
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            {...formik.getFieldProps(
                                                                `creditNoteItemsModels[${index}].qty`
                                                            )}
                                                            className="form-control"
                                                            type="text"
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            {...formik.getFieldProps(
                                                                `creditNoteItemsModels[${index}].price`
                                                            )}
                                                            className="form-control"
                                                            type="text"
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            {...formik.getFieldProps(
                                                                `creditNoteItemsModels[${index}].taxRate`
                                                            )}
                                                            className="form-control"
                                                            type="text"
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            {...formik.getFieldProps(
                                                                `creditNoteItemsModels[${index}].amount`
                                                            )}
                                                            className="form-control"
                                                            type="text"
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
                                        Credit Notes
                                    </lable>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            placeholder="Will be display on the Credit Notes"
                                            className={`form-control  ${formik.touched.creditNote && formik.errors.creditNote
                                                ? "is-invalid"
                                                : ""
                                                }`}
                                            {...formik.getFieldProps("creditNote")}
                                        />
                                        {formik.touched.creditNote &&
                                            formik.errors.creditNote && (
                                                <div className="invalid-feedback">
                                                    {formik.errors.creditNote}
                                                </div>
                                            )}
                                    </div>
                                </div>
                                <div className="col-md-6 col-12 mt-5 rounded" style={{ border: "1px solid lightgrey" }}>
                                    <div className="row mb-3 mt-2">
                                        <label className="col-sm-4 col-form-label">
                                            Sub Total
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
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CreditNotesEdit;