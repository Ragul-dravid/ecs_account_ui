import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../../config/URL";
import toast from "react-hot-toast";

function ExpensesView() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getExpensesData = async () => {
      try {
        const response = await api.get(`getTxnExpensesById/${id}`);
        setData(response.data);
      } catch (error) {
        toast.error("Error fetching data: ", error?.response?.data?.message);
      }
    };
    getExpensesData();
  }, [id]);

  return (
    <div className="container-fluid px-2 minHeight">
      <div className="card shadow border-0 mb-2 top-header">
        <div className="container-fluid py-4">
          <div className="row align-items-center">
            <div className="row align-items-center">
              <div className="col">
                <div className="d-flex align-items-center gap-4">
                  <h1 className="h4 ls-tight headingColor">Expenses View</h1>
                </div>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-start">
                  <Link to="/expenses">
                    <button type="submit" className="btn btn-sm btn-light">
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
          <div className="row mt-2 p-3">
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Expense Account</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    : {data.expenseAcc || ""}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Spent At</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.spendAt || ""}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Spend On</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.spendOn || ""} </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Amount</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.amount || ""} </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Vendor</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.vendor || ""} </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Paid Through</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.paidThrough || ""} </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Attachment</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.attachment || ""} </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Tax</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.tax || ""} </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Total Amount</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.total || ""} </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Description</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.description || ""} </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpensesView;
