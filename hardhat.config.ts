import 'dotenv/config';
import { HardhatUserConfig } from 'hardhat/types';
import 'hardhat-abi-exporter';
import "@typechain/hardhat";

const mnemonic = 'test test test test test test test test test test test junk';

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.11',
    settings: {
      metadata: {
        bytecodeHash: 'none',
      },
      optimizer: {
        enabled: true,
        runs: 200,
        details: {
          yul: false,
        },
      },
    },
  },
  abiExporter: {
    path: './data/abi',
    runOnCompile: true,
    clear: true,
    flat: true,
    spacing: 2,
    pretty: true,
  },
  typechain: {
    outDir: "src/types",
    target: "ethers-v5",
  },
};

export default config;
