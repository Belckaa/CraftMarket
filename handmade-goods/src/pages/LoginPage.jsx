import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Navigate, useLocation } from 'react-router'
import { useAuth } from '@/store/authStore'
import { Input, Button } from '@/components/ui'

const loginSchema = z.object({
  email: z.string().email('Введіть коректну адресу пошти'),
  password: z.string().min(8, 'Пароль має містити щонайменше 8 символів'),
})

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth()
  const location = useLocation()
  const redirectTo = location.state?.from ?? '/'
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (values) => {
    setServerError('')
    try {
      await login(values)
    } catch (error) {
      setServerError(
        error.status === 401 ? error.message : 'Сервер недоступний. Спробуйте пізніше.'
      )
    }
  }

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }

  return (
    <main className="mx-auto max-w-sm px-4 py-16">
      <div className="rounded-control border border-ink-300/30 bg-surface p-8 shadow-sm">
        <h1 className="mb-6 text-2xl font-bold text-ink-900">Вхід до CraftMarket</h1>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
          <Input
            label="Електронна пошта"
            type="email"
            autoComplete="username"
            error={errors.email?.message}
            {...register('email')}
          />
          <Input
            label="Пароль"
            type="password"
            autoComplete="current-password"
            error={errors.password?.message}
            {...register('password')}
          />
          {serverError && <p role="alert" className="text-sm font-medium text-danger-600">{serverError}</p>}
          <Button type="submit" disabled={isSubmitting} className="mt-2">
            {isSubmitting ? 'Вхід…' : 'Увійти'}
          </Button>
        </form>
      </div>
    </main>
  )
}
