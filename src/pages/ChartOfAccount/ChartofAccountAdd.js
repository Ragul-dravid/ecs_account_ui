import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
function ChartofAccountAdd() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const validationSchema = Yup.object({
    accountType: Yup.string().required("*Account Type is required"),
    accountName: Yup.string().required("*Account Name is required"),
    description: Yup.string(),
  });
  const formik = useFormik({
    initialValues: {
      accountType: "",
      accountName: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("ChartOfAccount:", values);
    },
  });
  return (
    <>
      <button
        type="submit"
        className="btn btn-sm btn-button"
        onClick={handleShow}
      >
        Add +
      </button>
      <div className="d-flex align-items-center gap-4">
                
              </div>
      <Modal

      
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={handleClose}
      >
        <Modal.Header closeButton>
        <Modal.Title className="headColor">Add Chart of Accounts</Modal.Title>
        </Modal.Header>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <div className="row">
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  AccountType<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <select
                    type="text"
                    className={`form-control  ${
                      formik.touched.accountType && formik.errors.accountType
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("accountType")}
                  >
                    <option></option>
                    <option value="expence">Expence</option>
                    <option value="income">Income</option>
                  </select>
                  {formik.touched.accountType && formik.errors.accountType && (
                    <div className="invalid-feedback">
                      {formik.errors.accountType}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  AccountName<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    className={`form-control  ${
                      formik.touched.accountName && formik.errors.accountName
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("accountName")}
                  />
                  {formik.touched.accountName && formik.errors.accountName && (
                    <div className="invalid-feedback">
                      {formik.errors.accountName}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">Description</lable>
                <div className="mb-3">
                  <input
                    type="text"
                    className={`form-control  ${
                      formik.touched.description && formik.errors.description
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("description")}
                  />
                </div>
              </div>
            </div>
            <Modal.Footer className="mt-3">
              <Button variant="light" className="btn" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                className="btn btn-button"
              >
                Save
              </Button>
            </Modal.Footer>
          </Modal.Body>
        </form>
      </Modal>
    </>
  );
}

export default ChartofAccountAdd;
