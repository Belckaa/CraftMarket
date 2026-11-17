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

  return (
    <form onSubmit={handleSubmit((data) => onApply(data.promoCode))} className="mb-4" noValidate>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Промокод"
          {...register('promoCode')}
          className={`flex-1 rounded-lg border px-3 py-2 text-sm bg-paper text-ink outline-none transition-colors focus:border-clay-600 focus:ring-1 focus:ring-clay-600 ${errors.promoCode || error ? 'border-red-500' : 'border-edge'}`}
        />
        <button type="submit" className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200 border border-line shadow-sm">
          Застосувати
        </button>
      </div>
      {(errors.promoCode || error) && <p className="mt-1 text-xs text-red-500">{errors.promoCode?.message || error}</p>}
    </form>
  )
}

PromoForm.propTypes = {
  onApply: PropTypes.func.isRequired,
  error: PropTypes.string,
}
