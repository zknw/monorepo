"use client";

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { arbitrum, mainnet, sepolia, goerli, optimism, polygon, polygonMumbai } from 'wagmi/chains'
import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { publicProvider } from 'wagmi/providers/public'
import React, { PropsWithChildren } from 'react'

// If ethers will required (not sure)
// import { type WalletClient, useWalletClient } from 'wagmi'
// import { BrowserProvider } from 'ethers'

const projectId = '3892fb02321135f044e6fd9e1a711938'

const metadata = {
  name: 'zknw',
  description: 'Zero know me network',
  url: 'https://zknw.me',
  icons: ['https://explore.veramo.io/icon-192-maskable.png']
}

// const chains = [mainnet, arbitrum, sepolia, goerli, optimism]
// const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygon, polygonMumbai],
  [publicProvider()],
)

const wagmiConfig = defaultWagmiConfig({ projectId, metadata, chains })

createWeb3Modal({ wagmiConfig, projectId, chains })

export const Web3Modal: React.FC<PropsWithChildren> = ({ children }) => {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
}

// export function walletClientToProvider(walletClient: WalletClient) {
//   const { chain, transport } = walletClient
//   const network = {
//     chainId: chain.id,
//     name: chain.name,
//     ensAddress: chain.contracts?.ensRegistry?.address,
//   }

  
//   const provider = new BrowserProvider(transport, network)
//   // const signer = provider.getSigner(account.address)
//   return provider
// }

// export function useEthersProvider() {
//   const { data: walletClient } = useWalletClient()
//   return React.useMemo(
//     () => (walletClient ? walletClientToProvider(walletClient) : undefined),
//     [walletClient],
//   )
// }
