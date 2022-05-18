// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"
import "./controllers"
import * as bootstrap from "bootstrap"

import { ethers } from "ethers";
import Web3Modal from "web3modal";

const providerOptions = {
  /* See Provider Options Section */
};

const web3Modal = new Web3Modal({
  network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions // required
});

const instance = await web3Modal.connect();

const provider = new ethers.providers.Web3Provider(instance);
const signer = provider.getSigner();
console.log(instance, provider, signer, web3Modal);