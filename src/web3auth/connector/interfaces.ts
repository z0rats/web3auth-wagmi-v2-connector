import type { IAdapter, WALLET_ADAPTER_TYPE } from '@web3auth/base'
import { IPlugin } from '@web3auth/base-plugin'
import type { ModalConfig } from '@web3auth/modal'
import type { Web3AuthNoModal } from '@web3auth/no-modal'
import type { OpenloginLoginParams } from '@web3auth/openlogin-adapter'

export interface Options<A extends IAdapter<unknown> = IAdapter<unknown>> {
  web3AuthInstance: Web3AuthNoModal
  adapter: A
  plugins?: IPlugin[]
  loginParams?: OpenloginLoginParams
  modalConfig?: Record<WALLET_ADAPTER_TYPE, ModalConfig>
}