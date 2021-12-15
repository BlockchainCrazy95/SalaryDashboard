import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    provider: null,
    web3Provider: null,
    address: null,
    chainId: null
}

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setWeb3Provider: (state, action) => {
            const { provider, web3Provider, address, chainId } = action.payload
            state.provider = provider
            state.web3Provider = web3Provider
            state.address = address
            state.chainId = chainId
        },
        resetWeb3Provider: () => {
            return initialState
        }
    }
})

//Actions
export const { setWeb3Provider, resetWeb3Provider } = homeSlice.actions

export default homeSlice.reducer

export const getHomeState = state => state.home