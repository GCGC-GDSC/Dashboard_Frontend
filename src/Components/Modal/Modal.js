import React from "react";
import "./Modal.css";
import CountUp from "react-countup";

function Modal({ setOpenModal }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Placement Numbers</h1>
        </div>
        <div className="body body2">
          <p>
            Total Students Placed : <CountUp end={400} duration={2} />
          </p>

          <p>
            Max Salary : <CountUp end={15} duration={3} />
          </p>
        </div>
        {/* <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button>Continue</button>
        </div> */}
      </div>
    </div>
  );
}

export default Modal;
