import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL } from '../../utils/constants'
import type { Product, User } from '../../types/types'

export interface CartItem extends Product {
  quantity: number
}

interface UserState {
  currentUser: User | null
  cart: CartItem[]
  isLoading: boolean
  formType: 'signup' | 'login'
  showForm: boolean
}

export const createUser = createAsyncThunk<User, Partial<User>>(
  'users/createUser',
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(`${BASE_URL}/users`, payload)
      return res.data
    } catch (err) {
      console.log(err)
      return thunkAPI.rejectWithValue(err)
    }
  },
)

export const loginUser = createAsyncThunk<
  User,
  { email: string; password: string }
>('users/loginUser', async (payload, thunkAPI) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/login`, payload)
    const login = await axios(`${BASE_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${res.data.access_token}`,
      },
    })
    return login.data
  } catch (err) {
    console.log(err)
    return thunkAPI.rejectWithValue(err)
  }
})

export const updateUser = createAsyncThunk<User, Partial<User>>(
  'users/updateUser',
  async (payload, thunkAPI) => {
    try {
      const res = await axios.put(`${BASE_URL}/users/${payload.id}`, payload)
      return res.data
    } catch (err) {
      console.log(err)
      return thunkAPI.rejectWithValue(err)
    }
  },
)

const addCurrentUser = (state: UserState, { payload }: PayloadAction<User>) => {
  state.currentUser = payload
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    cart: [],
    isLoading: false,
    formType: 'signup',
    showForm: false,
  } as UserState,
  reducers: {
    addItemToCart: (state, { payload }) => {
      let newCart = [...state.cart]
      const found = state.cart.find(({ id }) => id === payload.id)

      if (found) {
        newCart = newCart.map((item) => {
          return item.id === payload.id
            ? { ...item, quantity: payload.quantity || item.quantity + 1 }
            : item
        })
      } else newCart.push({ ...payload, quantity: 1 })

      state.cart = newCart
    },
    removeItemFromCart: (state, { payload }: PayloadAction<number>) => {
      state.cart = state.cart.filter(({ id }) => id !== payload)
    },
    toggleForm: (state, { payload }: PayloadAction<boolean>) => {
      state.showForm = payload
    },
    toggleFormType: (state, { payload }: PayloadAction<'signup' | 'login'>) => {
      state.formType = payload
    },
    logout: (state) => {
      state.currentUser = null
      state.cart = []
      state.formType = 'signup'
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, addCurrentUser)
    builder.addCase(loginUser.fulfilled, addCurrentUser)
    builder.addCase(updateUser.fulfilled, addCurrentUser)
  },
})

export const {
  addItemToCart,
  toggleForm,
  toggleFormType,
  removeItemFromCart,
  logout,
} = userSlice.actions

export default userSlice.reducer
