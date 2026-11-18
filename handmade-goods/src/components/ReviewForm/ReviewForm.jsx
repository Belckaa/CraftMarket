import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { reviewSchema } from '@/schemas/reviewSchema'
import { Input, Button } from '@/components/ui'

function ReviewForm({ productName, onReviewSubmit }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: { authorName: '', rating: '', reviewText: '' },
  })

  const onSubmit = (data) => {
    onReviewSubmit(data)
    reset()
  }

  return (
    <div className="mt-10 max-w-2xl rounded-control border border-ink-300/30 bg-surface p-8 shadow-sm">
      <h3 className="mb-6 text-xl font-bold text-ink-900">
        Залишити відгук про <span className="text-brand-600">{productName}</span>
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
        <Input
          label="Ваше ім'я"
          placeholder="Введіть ваше ім'я"
          error={errors.authorName?.message}
          {...register('authorName')}
        />
        
        <Input
          as="select"
          label="Оцінка"
          error={errors.rating?.message}
          {...register('rating')}
        >
          <option value="" disabled>Оберіть оцінку</option>
          <option value="1">1 - Жахливо</option>
          <option value="2">2 - Погано</option>
          <option value="3">3 - Задовільно</option>
          <option value="4">4 - Добре</option>
          <option value="5">5 - Відмінно</option>
        </Input>

        <Input
          as="textarea"
          rows={4}
          label="Текст відгуку"
          placeholder="Що вам сподобалося або не сподобалося?"
          error={errors.reviewText?.message}
          {...register('reviewText')}
        />

        <Button type="submit" disabled={isSubmitting} className="self-start mt-2">
          {isSubmitting ? 'Надсилання…' : 'Залишити відгук'}
        </Button>

        {isSubmitSuccessful && (
          <p className="text-sm font-semibold text-brand-600 mt-2">Дякуємо за ваш відгук!</p>
        )}
      </form>
    </div>
  )
}

ReviewForm.propTypes = {
  productName: PropTypes.string.isRequired,
  onReviewSubmit: PropTypes.func.isRequired,
}

export default ReviewForm
