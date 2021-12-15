import WalletConnectProvider from '@walletconnect/web3-provider'
import { providers } from 'ethers';
import Web3Modal from 'web3modal'
import { useCallback, useEffect } from "react";
import WalletLink from 'walletlink'
import { setWeb3Provider, resetWeb3Provider, getHomeState } from '../state/Home';
import { useDispatch, useSelector } from 'react-redux';

const INFURA_ID = process.env.INFURA_ID

const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider, //required
        options: {
            infuraId: INFURA_ID
        },
    },
    'custom-walletlink': {
        display: {
            logo: 'https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0',
            name: 'Coinbase',
            description: 'Connect to Coinbase Wallet (not Coinbase App)',
        },
        options: {
            appName: 'Coinbase', // Your app name
            networkUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
            chainId: 1,
        },
        package: WalletLink,
        connector: async (_, options) => {
            const { appName, networkUrl, chainId } = options
            const walletLink = new WalletLink({
                appName,
            })
            const provider = walletLink.makeWeb3Provider(networkUrl, chainId)
            await provider.enable()
            return provider
        },
    },
}
let web3Modal;

const useAuth = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        if(typeof window !== 'undefined') {
            web3Modal = new Web3Modal({
                network: 'mainnet', //optional
                cacheProvider: true,
                providerOptions, //required
            })
        }
    }, [])
   
    const walletConnect = useCallback(async () => {
        const provider = await web3Modal.connect()
        const web3Provider = new providers.Web3Provider(provider)

        const signer = web3Provider.getSigner()
        const address = await signer.getAddress()

        const network = await web3Provider.getNetwork()
        //provider, web3Provider : non-serializable value
        dispatch(setWeb3Provider({provider, web3Provider, address, chainId:network.chainId}))
    }, []);

    const { provider } = useSelector(getHomeState)

    const walletDisconnect = useCallback(async (provider) => {
        await web3Modal.clearCachedProvider()
        if(provider?.disconnect && typeof provider.disconnect === 'function') {
            await provider.disconnect()
        }
        dispatch(resetWeb3Provider())
    }, [provider])
    
    useEffect(() => {
        if (web3Modal.cachedProvider) {
            walletConnect()
        }
    }, [walletConnect])

    return { walletConnect, walletDisconnect }
}

export default useAuth