import {
  mainnet,
  arbitrum,
  type Chain,
} from "@wagmi/core/chains";
import { createConfig, http } from 'wagmi'
import { injected } from '@wagmi/connectors' 
import { rivoWeb3Auth } from "./web3auth";

export const chains: Chain[] = [
  mainnet,
  arbitrum,
];

export const config = createConfig({
  multiInjectedProviderDiscovery: false,
  chains: [mainnet, arbitrum],
  connectors: [
    injected({ target: 'metaMask' }),
    rivoWeb3Auth({
      w3authClientId: 'W3AUTH_CLIENT_ID',
      googleClientId: 'GOOGLE_CLIENT_ID',
      network: 'sapphire_mainnet',
      loginParams: {
        loginProvider: 'google',
      },
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [arbitrum.id]: http(),
  },
})