export interface Product {
  id: number
  title: string
  slug: string
  price: number
  description: string
  category: Category
  images: string[]
}

export interface Category {
  id: number
  name: string
  slug: string
  image: string
}

export interface User {
  id: number
  email: string
  password: string
  name: string
  role: 'customer' | 'admin'
  avatar: string
}
