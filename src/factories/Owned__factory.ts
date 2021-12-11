/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Owned, OwnedInterface } from "../Owned";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_to",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokens",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Withdrawn",
    type: "event",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokens",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50600080546001600160a01b03191633179055610536806100326000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80638da5cb5b14610046578063b5c5f6721461006f578063f2fde38b14610084575b600080fd5b600054610059906001600160a01b031681565b604051610066919061038b565b60405180910390f35b61008261007d3660046103cc565b610097565b005b61008261009236600461041c565b6102e4565b6000546001600160a01b031633146100ca5760405162461bcd60e51b81526004016100c190610445565b60405180910390fd5b80610235576001600160a01b038316610128576000546001600160a01b03166108fc83156100f857836100fa565b475b6040518115909202916000818181858888f19350505050158015610122573d6000803e3d6000fd5b5061029c565b6000546001600160a01b038085169163a9059cbb9116841561014a57846101c6565b6040516370a0823160e01b81526001600160a01b038716906370a082319061017690309060040161038b565b60206040518083038186803b15801561018e57600080fd5b505afa1580156101a2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101c69190610476565b6040518363ffffffff1660e01b81526004016101e392919061049d565b602060405180830381600087803b1580156101fd57600080fd5b505af1158015610211573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061012291906104d2565b600054604051632142170760e11b81526001600160a01b03808616926342842e0e92610269923092169086906004016104f3565b600060405180830381600087803b15801561028357600080fd5b505af1158015610297573d6000803e3d6000fd5b505050505b826001600160a01b03167f92ccf450a286a957af52509bc1c9939d1a6a481783e142e41e2499f0bb66ebc683836040516102d792919061051b565b60405180910390a2505050565b6000546001600160a01b0316331461030e5760405162461bcd60e51b81526004016100c190610445565b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b60006001600160a01b0382165b92915050565b61038581610369565b82525050565b60208101610376828461037c565b6103a281610369565b81146103ad57600080fd5b50565b803561037681610399565b806103a2565b8035610376816103bb565b6000806000606084860312156103e4576103e4600080fd5b60006103f086866103b0565b9350506020610401868287016103c1565b9250506040610412868287016103c1565b9150509250925092565b60006020828403121561043157610431600080fd5b600061043d84846103b0565b949350505050565b602080825281016103768160088152672737ba27bbb732b960c11b602082015260400190565b8051610376816103bb565b60006020828403121561048b5761048b600080fd5b600061043d848461046b565b80610385565b604081016104ab828561037c565b6104b86020830184610497565b9392505050565b8015156103a2565b8051610376816104bf565b6000602082840312156104e7576104e7600080fd5b600061043d84846104c7565b60608101610501828661037c565b61050e602083018561037c565b61043d6040830184610497565b604081016104ab828561049756fea164736f6c6343000809000a";

export class Owned__factory extends ContractFactory {
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
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Owned> {
    return super.deploy(overrides || {}) as Promise<Owned>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Owned {
    return super.attach(address) as Owned;
  }
  connect(signer: Signer): Owned__factory {
    return super.connect(signer) as Owned__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): OwnedInterface {
    return new utils.Interface(_abi) as OwnedInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Owned {
    return new Contract(address, _abi, signerOrProvider) as Owned;
  }
}