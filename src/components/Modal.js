import React, { useEffect, useState, useMemo } from "react";
import "../styles/Modal.scss";
import {
  convertEthToUsdt,
  donateEth,
  getBalance,
  yupValidation,
} from "../utils/utilFunctions";
import { Formik, Form, useField } from "formik";

const MyInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props. name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {(meta.touched && meta.error) || (meta.error && meta.value === "") ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const Modal = ({ account, toggleModalVisibility, cause }) => {
  const [eth, setEth] = useState(0);
  const [walletBalance, setWalletBalance] = useState("0.0000");
  const [ethToUSDT, setEthToUSDT] = useState("0.00");
  const [loading, setLoading] = useState(false);

  const setDonation = (val) => {
    setEth(val);
  };

  useEffect(() => {
    const fetchBalance = async () => {
      if (account) {
        try {
          const balance = await getBalance(account);
          setWalletBalance(balance);
        } catch (error) {
          console.error("Error fetching balance:", error);
          setWalletBalance("0.0000");
        }
      }
    };
    fetchBalance();
  }, [account]);

  useMemo(() => {
    const fetchUSDValue = async () => {
      if (eth > 0) {
        try {
          const usdValue = await convertEthToUsdt(eth);
          setEthToUSDT(usdValue);
        } catch (error) {
          console.error("Error converting to USD:", error);
          setEthToUSDT("0.00");
        }
      } else {
        setEthToUSDT("0.00");
      }
    };
    fetchUSDValue();
  }, [eth]);

  const removeModal = () => {
    toggleModalVisibility();
  };

  if (!account) {
    return (
      <div id="myModal" className="modal">
        <div className="modal-content">
          <div className="cancel-balance">
            <span className="close" onClick={toggleModalVisibility}>
              &times;
            </span>
          </div>
          <div style={{ padding: "20px", textAlign: "center" }}>
            <h2>Please Connect Your Wallet</h2>
            <p>You need to connect MetaMask to make a donation</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <div className="cancel-balance">
          <p>Your Ethereum Balance: {walletBalance} ETH</p>
          <span className="close" onClick={toggleModalVisibility}>
            &times;
          </span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            donorName: "",
            amountEth: eth,
            charity: cause,
            balanceEth: parseFloat(walletBalance),
          }}
          validationSchema={yupValidation(parseFloat(walletBalance))}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            donateEth(values, setLoading, removeModal);
            setSubmitting(false);
            resetForm();
          }}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <div className="form-group">
                <label>ETH Amount</label>
                <input
                  type="number"
                  step="0.001"
                  min="0"
                  max={walletBalance}
                  placeholder="0.0"
                  className="text-input"
                  value={eth}
                  onChange={(e) => {
                    const val = e.target.value;
                    setDonation(val);
                    setFieldValue("amountEth", val);
                  }}
                />
                {values.amountEth > 0 && (
                  <small style={{ display: "block", marginTop: "5px" }}>
                    ≈ ${ethToUSDT} USD
                  </small>
                )}
              </div>

              <MyInput
                label="Your Name (optional)"
                name="donorName"
                type="text"
                placeholder="Anonymous"
              />

              <div className="form-group">
                <label>Cause, you are donating to! </label>
                <input
                  type="text"
                  className="text-input"
                  value={cause}
                  disabled
                  style={{ backgroundColor: "#f0f0f0" }}
                />
              </div>

              <button
                type="submit"
                className="btn-donate"
                disabled={loading || ! values.amountEth || values.amountEth <= 0}
                style={{
                  backgroundColor: loading ?  "#ccc" : "#02a95c",
                  cursor: loading ? "not-allowed" : "pointer",
                  padding: "15px",
                  border: "none",
                  borderRadius: "8px",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "bold",
                  width: "100%",
                  marginTop: "20px",
                }}
              >
                {loading ? "Processing..." : "Donate Ethereum"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Modal;