import React, { useState, useEffect } from "react";
import { utils } from "ethers";
import { getDonations } from "../utils/utilFunctions";
import Modal from "./Modal";
import "../styles/Featured.scss";
import floodVictims from "../assets/images/flood-victims.jpeg";
import orphans from "../assets/images/orphans.jpeg";
import warHero from "../assets/images/warhero.png";
import fireVictims from "../assets/images/fireVictims.jpeg";

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
      <div className="featured-container" id="causes">
        <div className="container-div">
          <p>Where you can help</p>
          <p>Featured Causes</p>
          <div className="grid-display">
            <div className="first">
              <div className="first-flex">
                <span className="urgent">Urgent Cause</span>
                <div 
                  className="featured-image" 
                  style={{ backgroundImage: `url(${floodVictims})` }}
                ></div>
                <div className="first-details-outer">
                  <div className="first-details-inner">
                    <p>Help Flood Victims</p>
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

            <div className="first">
              <div className="first-flex">
                <div 
                  className="featured-image" 
                  style={{ backgroundImage: `url(${orphans})` }}
                ></div>
                <div className="first-details-outer">
                  <div className="first-details-inner">
                    <p>Support Orphaned Children</p>
                    <p className="hide-text-mobile">
                      Help provide food, shelter, education and care for children
                      who have lost their parents and need support
                    </p>
                    <div className="btn-funds">
                      <button
                        className="btn"
                        onClick={() =>
                          toggleModalVisibility("Supporting orphaned children")
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

            <div className="first">
              <div className="first-flex">
                <div 
                  className="featured-image" 
                  style={{ backgroundImage: `url(${fireVictims})` }}
                ></div>
                <div className="first-details-outer">
                  <div className="first-details-inner">
                    <p>Aid Fire Victims</p>
                    <p className="hide-text-mobile">
                      Support families who have lost their homes and belongings
                      to devastating fires and need immediate assistance
                    </p>
                    <div className="btn-funds">
                      <button
                        className="btn"
                        onClick={() =>
                          toggleModalVisibility("Helping fire victims")
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

            <div className="first">
              <div className="first-flex">
                <div 
                  className="featured-image" 
                  style={{ backgroundImage: `url(${warHero})` }}
                ></div>
                <div className="first-details-outer">
                  <div className="first-details-inner">
                    <p>Honor War Heroes</p>
                    <p className="hide-text-mobile">
                      Support veterans and their families who have sacrificed for
                      their country and need assistance with medical care
                    </p>
                    <div className="btn-funds">
                      <button
                        className="btn"
                        onClick={() =>
                          toggleModalVisibility("Supporting war heroes")
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