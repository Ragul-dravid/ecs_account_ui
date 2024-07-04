import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Logo from "../../../assets/AccountsLogo.png";
import toast from "react-hot-toast";
import api from "../../../config/URL"

function CreditNotesView() {
    const { id } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await api.get(`/getCreditNotesById/${id}`);
                setData(response.data);
            } catch (e) {
                toast.error("Error fetching data: ", e?.response?.data?.message);
            }
        };
        getData();
    }, [id]);

    return (
        <div className="container-fluid px-2 minHeight">
            <div className="card shadow border-0 mb-2 top-header">
                <div className="container-fluid py-4">
                    <div className="row align-items-center">
                        <div className="row align-items-center">
                            <div className="col">
                                <div className="d-flex align-items-center gap-4">
                                    <h1 className="h4 ls-tight headingColor">View Credit Notes</h1>
                                </div>
                            </div>
                            <div className="col-auto">
                                <div className="hstack gap-2 justify-content-start">
                                    <Link to="/creditNotes">
                                        <button type="submit" className="btn btn-light btn-sm me-1">
                                            <span>Back</span>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card shadow border-0 mb-2 minHeight">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-12">
                            <div className="d-flex justify-content-center flex-column align-items-start">
                                <div class="d-flex">
                                    <img src={Logo} alt=".." className="mt-3" width={130} />
                                </div>
                                <p className="fw-small mt-2">
                                    Cloud ECS Infotech Pte Ltd<br></br>
                                    Anna Salai<br></br>
                                    Chennai - 600002,<br></br>
                                    Tamil Nadu
                                </p>
                            </div>
                        </div>
                        <div className="col-md-6 col-12 d-flex justify-end flex-column align-items-end mt-2">
                            <h1>INVOICE</h1>
                            <h3>#{data.invoiceNumber || "#1234"}</h3>
                            <span className="text-muted mt-4">Balance Due</span>
                            <h3>₹3000</h3>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-md-6 col-12">
                            <div className="d-flex justify-content-center flex-column align-items-start">
                                <h3>Bill To</h3>
                                <span style={{ color: "#2196f3" }}>Manikandan</span>
                                <p className="fw-small">
                                    Purasaiwalkam,<br></br>
                                    Chennai - 600002,<br></br>
                                    Tamil Nadu
                                </p>
                            </div>
                        </div>
                        <div className="col-md-6 col-12 text-end">
                            <div className="row mb-2  d-flex justify-content-end align-items-end">
                                <div className="col-6">
                                    <p className="text-sm">
                                        <b>Issues Date</b>
                                    </p>
                                </div>
                                <div className="col-6">
                                    <p className="text-muted text-sm">: {data.issuesDate || ""}</p>
                                </div>
                            </div>
                            <div className="row mb-2 d-flex justify-content-end align-items-end">
                                <div className="col-6">
                                    <p className="text-sm">
                                        <b>Terms</b>
                                    </p>
                                </div>
                                <div className="col-6">
                                    <p className="text-muted text-sm">: Due on Receipt</p>
                                </div>
                            </div>
                            <div className="row mb-2 d-flex justify-content-end align-items-end">
                                <div className="col-6">
                                    <p className="text-sm">
                                        <b>Due Date</b>
                                    </p>
                                </div>
                                <div className="col-6">
                                    <p className="text-muted text-sm">: {data.dueDate || ""}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="row mt-5">
                        <div className="col-md-6 col-12">
                            <div className="d-flex justify-content-center flex-column align-items-start">
                                <h3>Subject</h3>
                                <p className="fw-small">
                                    Full Stack Developer Training Program
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5 flex-nowrap">
                        <div className="col-12">
                            <div className="table-responsive table-bordered">
                                <div className="">
                                    <h3 style={{ background: "#4066D5" }} className="text-light p-2">
                                        Item Table
                                    </h3>
                                </div>
                                <table class="table table-light table-nowrap table table-bordered">
                                    <thead className="thead-light">
                                        <tr>
                                            <th>S.NO</th>
                                            <th>ITEM DETAILS</th>
                                            <th>QUANTITY</th>
                                            <th>RATE</th>
                                            <th>DISCOUNT</th>
                                            <th>TAX</th>
                                            <th>AMOUNT</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1
                                            </td>
                                            <td>
                                                Apple
                                            </td>
                                            <td>
                                                1.00
                                            </td>
                                            <td>
                                                3500
                                            </td>
                                            <td>
                                                10
                                            </td>
                                            <td>
                                                Commision
                                            </td>
                                            <td>
                                                3500
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-5">
                        <div className="col-md-6 col-12 mb-3 mt-5">
                            <lable className="form-lable">
                                Credit Notes
                            </lable>
                            <div className="mb-3">
                                Thanks For Your Bussiness
                            </div>
                        </div>
                        <div className="col-md-6 col-12 mt-5 mb-3 rounded" style={{ border: "1px solid lightgrey" }}>
                            <div class="row mb-3 mt-2">
                                <label class="col-sm-4 col-form-label">Sub Total</label>
                                <div class="col-sm-4"></div>
                                <div class="col-sm-4 ">
                                    : {data.subTotal || ""}
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label class="col-sm-4 col-form-label">Total Tax</label>
                                <div class="col-sm-4"></div>
                                <div class="col-sm-4">
                                    : {data.totalTax || ""}
                                </div>
                                <div class="col-sm-4 "></div>
                            </div>
                            <hr></hr>
                            <div class="row mb-3">
                                <label class="col-sm-4 col-form-label">Total ( ₹ )</label>
                                <div class="col-sm-4"></div>
                                <div class="col-sm-4 ">
                                    3000
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-12"></div>
                        <div className="col-md-6 col-12 ">
                            <div class="row mt-2">
                                <label class="col-sm-4 col-form-label">Payment Made</label>
                                <div class="col-sm-4"></div>
                                <div class="col-sm-4 text-danger">
                                    (-)3,500.00
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-12"></div>
                        <div className="col-md-6 col-12 mb-3">
                            <div class="row mt-2">
                                <label class="col-sm-4 col-form-label">Balance Due</label>
                                <div class="col-sm-4"></div>
                                <div class="col-sm-4 ">
                                    ₹3000
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-12 mb-5">
                        Authorized Signature _____________________________
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreditNotesView;