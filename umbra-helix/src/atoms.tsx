import { atom } from "jotai";
import { PXE, Wallet } from "@aztec/aztec.js";
import { type TokenContract, PayTransactionFull } from "./types.js";
import { NFTContract } from "./artifacts/NFT.js";

// Existing PXE atom
export const pxeAtom = atom<PXE | null>(null);
export const walletsAtom = atom<Wallet[]>([]);

// Current wallet atom
export const currentWalletAtom = atom<Wallet | null>(null);
export const currentTokenContractAtom = atom<TokenContract | null>(null);
export const tokenContractsAtom = atom<TokenContract[]>([]);
export const publicBalanceAtom = atom<BigInt>(0n);
export const privateBalanceAtom = atom<BigInt>(0n);

export const payTransactionsAtom = atom<PayTransactionFull[]>([]);

export const isPrivateAtom = atom<boolean>(false);
export const rpcUrlAtom = atom<string>("");
export const remountKeyAtom = atom<number>(0);
export const nftContractAtom = atom<NFTContract | null>(null);
