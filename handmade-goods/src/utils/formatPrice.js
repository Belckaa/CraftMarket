import { useCallback } from "react";

export function formatPrice(value) {
  const number = Number(value) || 0;
  return new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: "UAH",
    maximumFractionDigits: 0,
  }).format(number);
}

/**
 * Хук-обгортка: повертає стабільну функцію форматування.
 * Використовується у CartPage та CartItem.
 */
export function useFormatPrice() {
  return useCallback((value) => formatPrice(value), []);
}

export default formatPrice;
