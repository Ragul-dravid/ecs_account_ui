import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { FaEye } from "react-icons/fa";
function ChartofAccountView() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button
        type="submit"
        className="btn btn-light btn-sm  shadow-none border-none me-1"
        onClick={handleShow}
      >
        View
      </button>
      
      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={handleClose}
      >
        <Modal.Header closeButton>
        <Modal.Title className="headColor">View Chart of Accounts</Modal.Title>
        </Modal.Header>
        <form>
          <Modal.Body>
            <div className="row">
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm">
                      <b>Account Type</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: Expence</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm">
                      <b>Account Name</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: Cost Of Gold</p>
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
                    <p className="text-muted text-sm">: Bank Of India</p>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </form>
      </Modal>
    </>
  );
}

export default ChartofAccountView;
