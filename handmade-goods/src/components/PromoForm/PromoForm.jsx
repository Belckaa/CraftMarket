import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const promoSchema = z.object({
  promoCode: z.string().trim().regex(/^[A-Z0-9]{4,12}$/, 'Введіть 4-12 великих латинських літер або цифр'),
})

export default function PromoForm({ onApply, error }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(promoSchema),
    defaultValues: { promoCode: '' },
  })

  const onSubmit = (data) => onApply(data.promoCode)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-4" noValidate>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Промокод"
          {...register('promoCode')}
          className={`flex-1 rounded-lg border px-3 py-2 text-sm bg-paper outline-none transition-colors focus:border-clay-600 ${errors.promoCode || error ? 'border-red-500' : 'border-line'}`}
        />
        <button type="submit" className="rounded-lg bg-clay-100 px-4 py-2 text-sm font-medium text-clay-700 transition-colors hover:bg-clay-200">
          Застосувати
        </button>
      </div>
      {errors.promoCode && <p className="mt-1 text-xs text-red-500">{errors.promoCode.message}</p>}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </form>
  )
}

PromoForm.propTypes = {
  onApply: PropTypes.func.isRequired,
  error: PropTypes.string,
}
