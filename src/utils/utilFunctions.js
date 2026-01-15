import { Contract, ethers, utils } from "ethers";
import * as Yup from "yup";
import abi from "./DonateEth.json";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const contractABI = abi. abi;

const getProvider = () => {
  if (typeof window.ethereum !== "undefined") {
    return new ethers.providers.Web3Provider(window.ethereum);
  }
  throw new Error("Please install MetaMask");
};

export const convertEthToUsdt = async (eth) => {
  const ETH_PRICE = 2500;
  const usdValue = ETH_PRICE * eth;
  return usdValue. toFixed(2);
};

export const getBalance = async (address) => {
  if (!address) {
    console.log("No address provided");
    return "0.0000";
  }

  try {
    const provider = getProvider();
    const balance = await provider.getBalance(address);
    const balanceInEth = utils.formatEther(balance);
    const formatted = Number(balanceInEth).toFixed(4);
    console.log(`Balance for ${address}: ${formatted} ETH`);
    return formatted;
  } catch (error) {
    console.error("Error getting balance:", error);
    return "0.0000";
  }
};

export const yupValidation = (balance) =>
  Yup.object().shape({
    donorName: Yup.string()
      .notRequired()
      .max(15, "Must not exceed 15 characters")
      .min(3, "Must not be less than 3 characters")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed"),
    amountEth: Yup.number()
      .required("Amount is required")
      .positive("Must be positive")
      .test(
        "max",
        `Amount must be less than or equal to ${balance} ETH`,
        (val) => val <= balance
      ),
  });

export const donateEth = async (values, setLoading, removeModal) => {
  try {
    setLoading(true);

    const provider = getProvider();
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    const signerAddress = await signer.getAddress();
    console.log("Donating from:", signerAddress);
    console.log("Amount:", values.amountEth, "ETH");
    console.log("Cause:", values.charity);

    const donateToACharity = new Contract(
      contractAddress,
      contractABI,
      signer
    );

    const donationEntries = await donateToACharity.sendEthToCharity(
      values.donorName || "Anonymous",
      values.charity,
      { value: utils.parseEther(values.amountEth. toString()) }
    );

    console.log("Transaction sent:", donationEntries. hash);
    console.log("Waiting for confirmation...");
    
    await donationEntries.wait();
    
    console.log("Transaction confirmed!");
    setLoading(false);
    alert("✅ Donation Completed Successfully!\nThank you for your generosity!");
    removeModal();
    
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } catch (error) {
    console.error("Donation error:", error);
    setLoading(false);

    if (error.code === 4001 || error.code === "ACTION_REJECTED") {
      alert("❌ Transaction rejected by user");
    } else if (error.code === "INSUFFICIENT_FUNDS") {
      alert("❌ Insufficient funds in your wallet");
    } else {
      alert("❌ Transaction failed:  " + (error.reason || error.message));
    }
  }
};

export const getDonations = async () => {
  try {
    const provider = getProvider();
    const donateToACharity = new Contract(
      contractAddress,
      contractABI,
      provider
    );

    const donations = await donateToACharity.getDonors();
    console.log("Fetched donations:", donations. length);
    return donations;
  } catch (error) {
    console.error("Error fetching donations:", error);
    return [];
  }
};