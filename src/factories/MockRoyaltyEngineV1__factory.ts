/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  MockRoyaltyEngineV1,
  MockRoyaltyEngineV1Interface,
} from "../MockRoyaltyEngineV1";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_royalty1",
        type: "address",
      },
      {
        internalType: "address",
        name: "_royalty2",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
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
    inputs: [],
    name: "royalty1",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "royalty2",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161046338038061046383398101604081905261002f91610095565b600080546001600160a01b039384166001600160a01b031991821617909155600180549290931691161790556100d2565b60006001600160a01b0382165b92915050565b61007c81610060565b811461008757600080fd5b50565b805161006d81610073565b600080604083850312156100ab576100ab600080fd5b60006100b7858561008a565b92505060206100c88582860161008a565b9150509250929050565b610382806100e16000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063135b4b18146100465780633e1040141461006f578063a2d7349e14610090575b600080fd5b600154610059906001600160a01b031681565b60405161006691906101ca565b60405180910390f35b61008261007d36600461020b565b6100a3565b604051610066929190610308565b600054610059906001600160a01b031681565b604080516002808252606080830184529283929190602083019080368337505060408051600280825260608201835293955092915060208301908036833750506000805485519394506001600160a01b03169285925061010557610105610335565b6001600160a01b039283166020918202929092010152600180548451921691849190811061013557610135610335565b6001600160a01b0390921660209283029190910190910152610158600a84610361565b8160008151811061016b5761016b610335565b6020908102919091010152610181600584610361565b8160018151811061019457610194610335565b602002602001018181525050935093915050565b60006001600160a01b0382165b92915050565b6101c4816101a8565b82525050565b602081016101b582846101bb565b6101e1816101a8565b81146101ec57600080fd5b50565b80356101b5816101d8565b806101e1565b80356101b5816101fa565b60008060006060848603121561022357610223600080fd5b600061022f86866101ef565b935050602061024086828701610200565b925050604061025186828701610200565b9150509250925092565b600061026783836101bb565b505060200190565b6000610279825190565b80845260209384019383018060005b838110156102ad57815161029c888261025b565b975060208301925050600101610288565b509495945050505050565b806101c4565b600061026783836102b8565b60006102d4825190565b80845260209384019383018060005b838110156102ad5781516102f788826102be565b9750602083019250506001016102e3565b60408082528101610319818561026f565b9050818103602083015261032d81846102ca565b949350505050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601260045260246000fd5b6000826103705761037061034b565b50049056fea164736f6c6343000809000a";

export class MockRoyaltyEngineV1__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    _royalty1: string,
    _royalty2: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<MockRoyaltyEngineV1> {
    return super.deploy(
      _royalty1,
      _royalty2,
      overrides || {}
    ) as Promise<MockRoyaltyEngineV1>;
  }
  getDeployTransaction(
    _royalty1: string,
    _royalty2: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_royalty1, _royalty2, overrides || {});
  }
  attach(address: string): MockRoyaltyEngineV1 {
    return super.attach(address) as MockRoyaltyEngineV1;
  }
  connect(signer: Signer): MockRoyaltyEngineV1__factory {
    return super.connect(signer) as MockRoyaltyEngineV1__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MockRoyaltyEngineV1Interface {
    return new utils.Interface(_abi) as MockRoyaltyEngineV1Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MockRoyaltyEngineV1 {
    return new Contract(address, _abi, signerOrProvider) as MockRoyaltyEngineV1;
  }
}