import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL } from '../../utils/constants'
import { shuffle } from '../../utils/common'
import type { Product } from '../../types/types'

interface ProductsState {
  list: Product[]
  filtered: Product[]
  related: Product[]
  isLoading: boolean
}

export const getProducts = createAsyncThunk<Product[], void>(
  'products/getProducts',
  async (_, thunkAPI) => {
    try {
      const res = await axios(`${BASE_URL}/products`)
      return res.data
    } catch (err) {
      console.log(err)
      return thunkAPI.rejectWithValue(err)
    }
  },
)

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    list: [],
    filtered: [],
    related: [],
    isLoading: false,
  } as ProductsState,
  reducers: {
    filterByPrice: (state, { payload }: PayloadAction<number>) => {
      state.filtered = state.list.filter(({ price }) => price < payload)
    },
    getRelatedProducts: (state, { payload }: PayloadAction<number>) => {
      const list = state.list.filter(({ category: { id } }) => id === payload)
      state.related = shuffle(list)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(
      getProducts.fulfilled,
      (state, { payload }: PayloadAction<Product[]>) => {
        state.list = payload
        state.isLoading = false
      },
    )
    builder.addCase(getProducts.rejected, (state) => {
      state.isLoading = false
    })
  },
})

export const { filterByPrice, getRelatedProducts } = productsSlice.actions
export default productsSlice.reducer
