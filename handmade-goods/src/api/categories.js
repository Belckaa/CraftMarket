import { ApiError } from './products'

export async function fetchCategories({ signal } = {}) {
  const response = await fetch(`/api/categories${window.location.search}`, { signal })
  if (!response.ok) {
    throw new ApiError(`Запит завершився зі статусом ${response.status}`, response.status)
  }
  return response.json()
}
