import { mainnet } from 'wagmi'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

export const connectors = [
    new CoinbaseWalletConnector({
      chains: [mainnet],
      options: {
          appName: 'NFT Gallery',
    }}),
    new MetaMaskConnector({
      chains: [mainnet],
      options: {
          shimChainChangedDisconnect: false,
      },
    }),
]
