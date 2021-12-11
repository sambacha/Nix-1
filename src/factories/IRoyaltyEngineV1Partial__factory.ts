/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  IRoyaltyEngineV1Partial,
  IRoyaltyEngineV1PartialInterface,
} from "../IRoyaltyEngineV1Partial";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "getRoyaltyView",
    outputs: [
      {
        internalType: "address payable[]",
        name: "recipients",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class IRoyaltyEngineV1Partial__factory {
  static readonly abi = _abi;
  static createInterface(): IRoyaltyEngineV1PartialInterface {
    return new utils.Interface(_abi) as IRoyaltyEngineV1PartialInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IRoyaltyEngineV1Partial {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as IRoyaltyEngineV1Partial;
  }
}