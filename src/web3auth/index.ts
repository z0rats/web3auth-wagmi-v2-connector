import { CHAIN_NAMESPACES } from '@web3auth/base'
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider'
import { Web3AuthNoModal, Web3AuthNoModalOptions } from '@web3auth/no-modal'
import { OpenloginAdapter } from '@web3auth/openlogin-adapter'
import { createConnector } from 'wagmi'

import { Web3AuthParameters, web3Auth } from './connector/index'

export interface TestWeb3AuthParameters extends Omit<Web3AuthParameters, 'adapter' | 'web3AuthInstance'> {
  network: Web3AuthNoModalOptions['web3AuthNetwork']
  w3authClientId: string
  googleClientId?: string,
  uxMode?: 'popup' | 'redirect'
  enableLogging?: boolean
}

export function testWeb3Auth(options: TestWeb3AuthParameters) {
  return createConnector((config) => {
    const chainConfig = {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: '0x' + (config.chains[0].id as number).toString(16),
      rpcTarget: config.chains[0].rpcUrls.default.http[0],
      blockExplorer: config.chains[0].blockExplorers?.default?.url || '',
      displayName: config.chains[0].name,
      tickerName: config.chains[0].nativeCurrency?.name,
      ticker: config.chains[0].nativeCurrency?.symbol
    }
    return web3Auth({
      ...options,
      web3AuthInstance: new Web3AuthNoModal({
        clientId: options.w3authClientId,
        chainConfig,
        web3AuthNetwork: options.network,
      }),
      adapter: new OpenloginAdapter({
        privateKeyProvider: !options.plugins?.length
          ? new EthereumPrivateKeyProvider({
              config: {
                chainConfig
              }
            })
          : undefined,
        adapterSettings: {
          network: "sapphire_mainnet",
          loginConfig: {
            google: {
              verifier: "google",
              typeOfLogin: "google",
              clientId: options.googleClientId,
            },
          },
          uxMode: options.uxMode,
        },
      }),
    })(config)
  })
}