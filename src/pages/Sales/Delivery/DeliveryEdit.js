import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { MdDeleteSweep } from "react-icons/md";
import toast from "react-hot-toast";
import api from "../../../config/URL";

const DeliveryEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); 
  const [items, setItems] = useState([]);
  const [customerData, setCustomerData] = useState([]);

  const formik = useFormik({
    initialValues: {
      customerId: "",
      reference: "",
      challanDate: "",
      challanType: "",
      paymentTerms: "",
      salesPerson: "",
      subTotal: "",
      discount: "",
      adjustment: "",
      total: "",
      cusNotes: "",
      termsConditions: "",
      items: [
        {
          qty: "",
          rate: "",
          // disc: "",
          // tax: "",
          amount: "",
          itemId: "",
        },
      ],
      file: null,
    },
    // validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { items, file, challanDate, ...value } = values;
        const formData = new FormData();

        Object.entries(value).forEach(([key, value]) => {
          if (value !== undefined) {
            formData.append(key, value);
          }
        });
        items.forEach((item) => {
          formData.append("itemId", item.id);
          formData.append("qty", item.qty);
          formData.append("rate", item.rate);
          formData.append("amount", item.amount);
        });
        if (file) {
          formData.append("files", file);
        }
      setLoading(true);
      try {
        const response = await api.put(`/updateDeliveryChallanWithDeliveryItems/${id}`, values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          toast.success("Delivery created successfully");
          navigate("/delivery");
        }
      } catch (e) {
        toast.error("Error fetching data: ", e?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    },
  });
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getTxnDeliveryChallansById/${id}`);
        formik.setValues(response.data);
        formik.setFieldValue("items", response.data.quotesItemsModels);
      } catch (error) {
        toast.error("Error Fetch Data ", error);
      }
    };

    getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const addRow = () => {
    formik.setFieldValue("items", [
      ...formik.values.items,
      { itemId: "", qty: "",  tax: "", amount: "" },
    ]);
  };

  const removeRow = () => {
    const items = [...formik.values.items];
    if (items.length > 1) {
      items.pop();
      formik.setFieldValue("items", items);
    }
  };

  const fetchItemsData = async () => {
    try {
      const response = await api.get("getAllItemNameWithIds");
      setItems(response.data);
    } catch (error) {
      toast.error("Error fetching tax data:", error);
    }
  };
  const fetchCustamerData = async () => {
    try {
      const response = await api.get("getAllCustomerWithIds");
      setCustomerData(response.data);
    } catch (error) {
      toast.error("Error fetching tax data:", error);
    }
  };

  useEffect(() => {
    fetchItemsData();
    fetchCustamerData();
  }, []);
  return (
    <div className="container-fluid p-2 minHeight m-0">
      <div className="card shadow border-0 mb-2 top-header">
        <div className="container-fluid py-4">
          <div className="row align-items-center">
            <div className="col">
              <div className="d-flex align-items-center gap-4">
                <h1 className="h4 ls-tight headingColor">Edit Delivery</h1>
              </div>
            </div>
            <div className="col-auto">
              <div className="hstack gap-2 justify-content-end">
                <Link to="/delivery">
                  <button type="submit" className="btn btn-sm btn-light">
                    <span>Back</span>
                  </button>
                </Link>

                <button
                  type="submit"
                  onClick={formik.handleSubmit}
                  className="btn btn-sm btn-button"
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
      <form onSubmit={formik.handleSubmit}>
        <div className="card shadow border-0 my-2">
          <div className="container mb-5">
            <div className="row py-4">
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">Customer Name</label>
                <div className="mb-3">
                  <select
                    {...formik.getFieldProps("customerId")}
                    className={`form-select    ${
                      formik.touched.customerId && formik.errors.customerId
                        ? "is-invalid"
                        : ""
                    }`}
                  >
                    <option value=""> </option>
                    {customerData &&
                      customerData.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.contactName}
                        </option>
                      ))}
                  </select>
                  {formik.touched.customerId && formik.errors.customerId && (
                    <div className="invalid-feedback">
                      {formik.errors.customerId}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">Reference#</label>
                <input
                  type="text"
                  name="reference"
                  {...formik.getFieldProps("reference")}
                  className={`form-control `}
                />
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">challan Date</label>
                <div className="mb-3">
                  <input
                    type="date"
                    name="challanDate"
                    className="form-control"
                    {...formik.getFieldProps("challanDate")}
                  />
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">payment Terms</label>
                <div className="mb-3">
                  <select
                    type="text"
                    name="paymentTerms"
                    className="form-select"
                    {...formik.getFieldProps("paymentTerms")}
                  >
                    <option value=""> </option>
                    <option value="NET_15">NET_15 </option>
                    <option value="NET_30">NET_30 </option>
                    <option value="NET_45"> NET_45</option>
                    <option value="NET_60"> NET_60</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">Challan Type</label>
                <div className="mb-3">
                  <select
                    name="challanType"
                    {...formik.getFieldProps("challanType")}
                    className={`form-select `}
                  >
                    <option value=""></option>
                    <option value="Job Work">Job Work</option>
                    <option value="Supply On Approval">
                      Supply On Approval
                    </option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">sales Person</label>
                <div className="mb-3">
                  <input
                    type="text"
                    name="salesPerson"
                    className="form-control"
                    {...formik.getFieldProps("salesPerson")}
                  />
                </div>
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
                <table className="table ">
                  <thead>
                    <tr>
                      <th scope="col">S.NO</th>
                      <th scope="col">ITEM DETAILS</th>
                      <th scope="col">QUANTITY</th>
                      <th scope="col">RATE</th>
                      {/* <th scope="col">DISCOUNT</th> */}
                      {/* <th scope="col">TAX</th> */}
                      <th scope="col">AMOUNT</th>
                    </tr>
                  </thead>
                  <tbody className="table-group">
                    {(formik.values.items || []).map((item, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>
                          <select
                            {...formik.getFieldProps(`items[${index}].item`)}
                            className={`form-select ${
                              formik.touched.items?.[index]?.item &&
                              formik.errors.items?.[index]?.item
                                ? "is-invalid"
                                : ""
                            }`}
                          >
                            <option value=""> </option>
                            {items &&
                              items.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.itemName}
                                </option>
                              ))}
                          </select>
                          {formik.touched.items?.[index]?.item &&
                            formik.errors.items?.[index]?.item && (
                              <div className="invalid-feedback">
                                {formik.errors.items[index].item}
                              </div>
                            )}
                        </td>
                        <td>
                          <input
                            type="text"
                            className={`form-control ${
                              formik.touched.items?.[index]?.qty &&
                              formik.errors.items?.[index]?.qty
                                ? "is-invalid"
                                : ""
                            }`}
                            {...formik.getFieldProps(`items[${index}].qty`)}
                          />
                          {formik.touched.items?.[index]?.qty &&
                            formik.errors.items?.[index]?.qty && (
                              <div className="invalid-feedback">
                                {formik.errors.items[index].qty}
                              </div>
                            )}
                        </td>
                        <td>
                          <input
                            type="text"
                            className={`form-control ${
                              formik.touched.items?.[index]?.rate &&
                              formik.errors.items?.[index]?.rate
                                ? "is-invalid"
                                : ""
                            }`}
                            {...formik.getFieldProps(`items[${index}].rate`)}
                          />
                          {formik.touched.items?.[index]?.rate &&
                            formik.errors.items?.[index]?.rate && (
                              <div className="invalid-feedback">
                                {formik.errors.items[index].rate}
                              </div>
                            )}
                        </td>
                        {/* <td>
                          <input
                            type="text"
                            className={`form-control ${
                              formik.touched.items?.[index]?.disc &&
                              formik.errors.items?.[index]?.disc
                                ? "is-invalid"
                                : ""
                            }`}
                            {...formik.getFieldProps(`items[${index}].disc`)}
                          />
                          {formik.touched.items?.[index]?.disc &&
                            formik.errors.items?.[index]?.disc && (
                              <div className="invalid-feedback">
                                {formik.errors.items[index].disc}
                              </div>
                            )}
                        </td> */}
                        {/* <td>
                          <select
                            {...formik.getFieldProps(`items[${index}].tax`)}
                            className={`form-select ${
                              formik.touched.items?.[index]?.tax &&
                              formik.errors.items?.[index]?.tax
                                ? "is-invalid"
                                : ""
                            }`}
                          >
                            <option value=""></option>
                            <option value="Commission">Commission</option>
                            <option value="Brokerage">Brokerage</option>
                          </select>
                          {formik.touched.items?.[index]?.tax &&
                            formik.errors.items?.[index]?.tax && (
                              <div className="invalid-feedback">
                                {formik.errors.items[index].tax}
                              </div>
                            )}
                        </td> */}
                        <td>
                          <input
                            type="text"
                            className={`form-control ${
                              formik.touched.items?.[index]?.amount &&
                              formik.errors.items?.[index]?.amount
                                ? "is-invalid"
                                : ""
                            }`}
                            {...formik.getFieldProps(`items[${index}].amount`)}
                          />
                          {formik.touched.items?.[index]?.amount &&
                            formik.errors.items?.[index]?.amount && (
                              <div className="invalid-feedback">
                                {formik.errors.items[index].amount}
                              </div>
                            )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <button
              className="btn btn-button btn-sm my-4 mx-1"
              type="button"
              onClick={addRow}
            >
              Add row
            </button>
            {formik.values.items?.length > 1 && (
              <button
                className="btn btn-sm my-4 mx-1 delete border-danger bg-white text-danger"
                onClick={removeRow}
              >
                Delete
              </button>
            )}
            <div className="row mt-5 pt-0">
              <div className="col-md-6 col-12 mb-2 mt-2">
                <label className="form-label">Customer Notes</label>
                <div className="mb-3">
                  <input
                    type="text"
                    {...formik.getFieldProps("customerNotes")}
                    name="customerNotes"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="card col-md-6 col-12 p-3 mt-5 mb-4 card shadow border-2">
                <div className="my-4 ms-2 d-flex justify-content-between align-items-center">
                  <label className="form-label">Sub Total</label>
                  <div className="ms-3">
                    <input
                      type="text"
                      name="subTotal"
                      {...formik.getFieldProps("subTotal")}
                      className="form-control form-control-sm"
                    />
                  </div>
                </div>
                <div className="ms-2 d-flex justify-content-between align-items-center">
                  <label className="form-label">Adjustment</label>
                  <div className="ms-3">
                    <input
                      {...formik.getFieldProps("adjustment")}
                      type="text"
                      name="adjustment"
                      className="form-control form-control-sm"
                    />
                  </div>
                </div>
                <hr className="border-dark" />
                <div className="ms-2 d-flex justify-content-between align-items-center mt-2">
                  <label className="form-label">Total</label>
                  <div className="ms-3">
                    <input
                      {...formik.getFieldProps("total")}
                      type="text"
                      name="total"
                      className="form-control form-control-sm"
                    />
                  </div>
                </div>
              </div>
              <hr />
              <div className="col-12 mb-3">
                <div className="row">
                  <div className="col-md-8">
                    <label className="form-label">Terms & Conditions</label>
                    <textarea
                      {...formik.getFieldProps("termsConditions")}
                      placeholder="Enter the terms and conditions of your business in your transaction"
                      type="text"
                      name="termsConditions"
                      className="form-control"
                      style={{ width: "100%", height: "5rem" }}
                    />
                  </div>
                  <div className="col-md-4 d-flex align-items-center justify-content-center">
                    <div className="mb-3">
                      <label className="form-label">Attach File</label>
                      <input
                        type="file"
                        name="file"
                        className="form-control"
                        onChange={(event) => {
                          formik.setFieldValue(
                            "file",
                            event.currentTarget.files[0]
                          );
                        }}
                      />
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
};

export default DeliveryEdit;
