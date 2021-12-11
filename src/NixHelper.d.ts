/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface NixHelperInterface extends ethers.utils.Interface {
  functions: {
    "getOrders(address,uint256[])": FunctionFragment;
    "getTokens(uint256[])": FunctionFragment;
    "getTrades(uint256[])": FunctionFragment;
    "nix()": FunctionFragment;
    "orderStatus(address,(address,address,uint8,uint8,uint256[],uint256,uint64,uint64,uint64,uint64))": FunctionFragment;
    "weth()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "getOrders",
    values: [string, BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "getTokens",
    values: [BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "getTrades",
    values: [BigNumberish[]]
  ): string;
  encodeFunctionData(functionFragment: "nix", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "orderStatus",
    values: [
      string,
      {
        maker: string;
        taker: string;
        buyOrSell: BigNumberish;
        anyOrAll: BigNumberish;
        tokenIds: BigNumberish[];
        price: BigNumberish;
        expiry: BigNumberish;
        tradeCount: BigNumberish;
        tradeMax: BigNumberish;
        royaltyFactor: BigNumberish;
      }
    ]
  ): string;
  encodeFunctionData(functionFragment: "weth", values?: undefined): string;

  decodeFunctionResult(functionFragment: "getOrders", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getTokens", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getTrades", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "nix", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "orderStatus",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "weth", data: BytesLike): Result;

  events: {};
}

export class NixHelper extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: NixHelperInterface;

  functions: {
    getOrders(
      token: string,
      orderIndices: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<
      [
        string[],
        string[],
        BigNumber[][],
        BigNumber[],
        [
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber
        ][]
      ] & {
        makers: string[];
        takers: string[];
        tokenIds: BigNumber[][];
        prices: BigNumber[];
        data: [
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber
        ][];
      }
    >;

    getTokens(
      tokensIndices: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<
      [string[], BigNumber[], BigNumber[], BigNumber[], BigNumber[]] & {
        tokens: string[];
        ordersLengthList: BigNumber[];
        executedList: BigNumber[];
        volumeTokenList: BigNumber[];
        volumeWethList: BigNumber[];
      }
    >;

    getTrades(
      tradeIndexes: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<
      [
        string[],
        BigNumber[],
        BigNumber[],
        ([string, BigNumber] & { token: string; orderIndex: BigNumber })[][]
      ] & {
        takers: string[];
        royaltyFactors: BigNumber[];
        blockNumbers: BigNumber[];
        ordersList: ([string, BigNumber] & {
          token: string;
          orderIndex: BigNumber;
        })[][];
      }
    >;

    nix(overrides?: CallOverrides): Promise<[string]>;

    orderStatus(
      token: string,
      order: {
        maker: string;
        taker: string;
        buyOrSell: BigNumberish;
        anyOrAll: BigNumberish;
        tokenIds: BigNumberish[];
        price: BigNumberish;
        expiry: BigNumberish;
        tradeCount: BigNumberish;
        tradeMax: BigNumberish;
        royaltyFactor: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<[number]>;

    weth(overrides?: CallOverrides): Promise<[string]>;
  };

  getOrders(
    token: string,
    orderIndices: BigNumberish[],
    overrides?: CallOverrides
  ): Promise<
    [
      string[],
      string[],
      BigNumber[][],
      BigNumber[],
      [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
      ][]
    ] & {
      makers: string[];
      takers: string[];
      tokenIds: BigNumber[][];
      prices: BigNumber[];
      data: [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
      ][];
    }
  >;

  getTokens(
    tokensIndices: BigNumberish[],
    overrides?: CallOverrides
  ): Promise<
    [string[], BigNumber[], BigNumber[], BigNumber[], BigNumber[]] & {
      tokens: string[];
      ordersLengthList: BigNumber[];
      executedList: BigNumber[];
      volumeTokenList: BigNumber[];
      volumeWethList: BigNumber[];
    }
  >;

  getTrades(
    tradeIndexes: BigNumberish[],
    overrides?: CallOverrides
  ): Promise<
    [
      string[],
      BigNumber[],
      BigNumber[],
      ([string, BigNumber] & { token: string; orderIndex: BigNumber })[][]
    ] & {
      takers: string[];
      royaltyFactors: BigNumber[];
      blockNumbers: BigNumber[];
      ordersList: ([string, BigNumber] & {
        token: string;
        orderIndex: BigNumber;
      })[][];
    }
  >;

  nix(overrides?: CallOverrides): Promise<string>;

  orderStatus(
    token: string,
    order: {
      maker: string;
      taker: string;
      buyOrSell: BigNumberish;
      anyOrAll: BigNumberish;
      tokenIds: BigNumberish[];
      price: BigNumberish;
      expiry: BigNumberish;
      tradeCount: BigNumberish;
      tradeMax: BigNumberish;
      royaltyFactor: BigNumberish;
    },
    overrides?: CallOverrides
  ): Promise<number>;

  weth(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    getOrders(
      token: string,
      orderIndices: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<
      [
        string[],
        string[],
        BigNumber[][],
        BigNumber[],
        [
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber
        ][]
      ] & {
        makers: string[];
        takers: string[];
        tokenIds: BigNumber[][];
        prices: BigNumber[];
        data: [
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber
        ][];
      }
    >;

    getTokens(
      tokensIndices: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<
      [string[], BigNumber[], BigNumber[], BigNumber[], BigNumber[]] & {
        tokens: string[];
        ordersLengthList: BigNumber[];
        executedList: BigNumber[];
        volumeTokenList: BigNumber[];
        volumeWethList: BigNumber[];
      }
    >;

    getTrades(
      tradeIndexes: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<
      [
        string[],
        BigNumber[],
        BigNumber[],
        ([string, BigNumber] & { token: string; orderIndex: BigNumber })[][]
      ] & {
        takers: string[];
        royaltyFactors: BigNumber[];
        blockNumbers: BigNumber[];
        ordersList: ([string, BigNumber] & {
          token: string;
          orderIndex: BigNumber;
        })[][];
      }
    >;

    nix(overrides?: CallOverrides): Promise<string>;

    orderStatus(
      token: string,
      order: {
        maker: string;
        taker: string;
        buyOrSell: BigNumberish;
        anyOrAll: BigNumberish;
        tokenIds: BigNumberish[];
        price: BigNumberish;
        expiry: BigNumberish;
        tradeCount: BigNumberish;
        tradeMax: BigNumberish;
        royaltyFactor: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<number>;

    weth(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    getOrders(
      token: string,
      orderIndices: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTokens(
      tokensIndices: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTrades(
      tradeIndexes: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    nix(overrides?: CallOverrides): Promise<BigNumber>;

    orderStatus(
      token: string,
      order: {
        maker: string;
        taker: string;
        buyOrSell: BigNumberish;
        anyOrAll: BigNumberish;
        tokenIds: BigNumberish[];
        price: BigNumberish;
        expiry: BigNumberish;
        tradeCount: BigNumberish;
        tradeMax: BigNumberish;
        royaltyFactor: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    weth(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    getOrders(
      token: string,
      orderIndices: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTokens(
      tokensIndices: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTrades(
      tradeIndexes: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    nix(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    orderStatus(
      token: string,
      order: {
        maker: string;
        taker: string;
        buyOrSell: BigNumberish;
        anyOrAll: BigNumberish;
        tokenIds: BigNumberish[];
        price: BigNumberish;
        expiry: BigNumberish;
        tradeCount: BigNumberish;
        tradeMax: BigNumberish;
        royaltyFactor: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    weth(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
