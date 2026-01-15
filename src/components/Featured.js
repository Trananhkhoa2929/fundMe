import React, { useState, useEffect } from "react";
import { utils } from "ethers";
import { getDonations } from "../utils/utilFunctions";
import Modal from "./Modal";
import "../styles/Featured.scss";

const Featured = ({ account }) => {
  const [donations, setDonations] = useState([]);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [cause, setCause] = useState("");

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const allDonations = await getDonations();
        if (allDonations) {
          setDonations(allDonations);
        }
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };
    fetchDonations();
  }, []);

  const toggleModalVisibility = (causeName) => {
    if (causeName) {
      setCause(causeName);
    }
    setModalVisibility(!modalVisibility);
  };

  const totalCauseDonations = () => {
    if (! donations || donations.length === 0) {
      return "0.0000";
    }

    const arrOfNum = donations.map((donation) => {
      return Number(utils.formatEther(donation.amount));
    });

    let sum = 0;
    for (let i = 0; i < arrOfNum.length; i++) {
      sum += arrOfNum[i];
    }
    return sum.toFixed(4);
  };

  return (
    <>
      {modalVisibility && (
        <Modal
          account={account}
          toggleModalVisibility={toggleModalVisibility}
          cause={cause}
        />
      )}
      <div className="featured-container">
        <div className="container-div">
          <p>Where you can help</p>
          <p>Featured Charities</p>
          <div className="grid-display">
            <div className="first">
              <div className="first-flex">
                <span className="urgent">Urgent Cause</span>
                <div className="featured-image" data-image-src="feat"></div>
                <div className="first-details-outer">
                  <div className="first-details-inner">
                    <p>How to help:  Donate ETH tokens to flood victims</p>
                    <p className="hide-text-mobile">
                      Donate to verified fundraisers to help the individuals and
                      families affected by widespread flooding across the world
                    </p>
                    <div className="btn-funds">
                      <button
                        className="btn"
                        onClick={() =>
                          toggleModalVisibility("Donating to flood victims")
                        }
                      >
                        Donate Now →
                      </button>
                      <span className="funds">
                        {totalCauseDonations()} ETH raised
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Featured;