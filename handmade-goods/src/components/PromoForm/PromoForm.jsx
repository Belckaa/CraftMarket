import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import './PromoForm.css'

const promoSchema = z.object({
  promoCode: z
    .string()
    .trim()
    .regex(/^[A-Z0-9]{4,12}$/, 'Введіть 4-12 великих латинських літер або цифр'),
})

export default function PromoForm({ onApply, error }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(promoSchema),
    defaultValues: { promoCode: '' },
  })

  const onSubmit = (data) => {
    onApply(data.promoCode)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="promo-form" noValidate>
      <div className="promo-form__input-group">
        <input
          type="text"
          placeholder="Промокод"
          {...register('promoCode')}
          className={`promo-form__input ${errors.promoCode || error ? 'promo-form__input--error' : ''}`}
        />
        <button type="submit" className="promo-form__submit">Застосувати</button>
      </div>
      {errors.promoCode && <p className="promo-form__error">{errors.promoCode.message}</p>}
      {error && <p className="promo-form__error">{error}</p>}
    </form>
  )
}

PromoForm.propTypes = {
  onApply: PropTypes.func.isRequired,
  error: PropTypes.string,
}
