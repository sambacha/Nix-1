import '@typechain/hardhat';
import 'dotenv/config';
import { HardhatUserConfig } from 'hardhat/types';

const HARDHAT_ENABLE_SENTRY = false;
const mnemonic = 'test test test test test test test test test test test junk';

const config: HardhatUserConfig = {
solidity: {
    version: '0.8.7',
    settings: {
     evmVersion: "london",
      metadata: {
        bytecodeHash: 'none',
      },
      optimizer: {
        // @dev enable for production
        enabled: false,
        runs: 200,
        details: {
          yul: false,
        },
      },
    },
 }
};
export default config;