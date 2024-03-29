import { configureStore } from '@reduxjs/toolkit'
import homeReducer from './Home'

const store = configureStore({
    reducer: {
        home: homeReducer
    }
})

export default store