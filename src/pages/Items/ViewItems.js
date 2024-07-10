import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../config/URL";
import toast from "react-hot-toast";

function ViewItems() {
  // const { id } = useParams();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getItemData = async () => {
      setLoading(true);
      try {
        const response = await api.get(
          `getMstrItemsById/${id}`
        );
        setData(response.data);
      } catch (error) {
        toast.error("Error fetching data: ", error?.response?.data?.message);
      }finally{
        setLoading(false);

      }
    };
    getItemData();
  }, [id]);

  return (
    <div>
    {loading ? (
      <div className="loader-container">
        <div class="loader">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    ) : (

    <div className="container-fluid px-2 minHeight">
      <div className="card shadow border-0 mb-2 top-header">
        <div className="container-fluid py-4">
          <div className="row align-items-center">
            <div className="row align-items-center">
              <div className="col">
                <div className="d-flex align-items-center gap-4">
                  <h1 className="h4 ls-tight headingColor">View Items</h1>
                </div>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-start">
                  <Link to="/items">
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
                    <b>Code</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.itemCode || ""}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Item Name</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.itemName || ""}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Unit</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.unit || ""} </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-12"></div>
            <h3 className="py-5">Sales Information</h3>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Selling Price</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.salesPrice || ""}</p>
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
                  <p className="text-muted text-sm">: {data.salesDesc || ""}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Sales Account</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.salesAcc || ""}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12"></div>
            <h3 className="py-5">Purchase Information</h3>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Cost Price</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.costPrice || ""}</p>
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
                  <p className="text-muted text-sm">: {data.purchaseDesc || ""}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Purchase Account</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.purchaseAcc || ""}</p>
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
                  <p className="text-muted text-sm">: {data.preferredVendor || ""}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )}
  </div>
  );
}

export default ViewItems;
