import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { profileSchema } from '@/schemas/reviewSchema'
import './ProfileForm.css'

function ProfileForm() {
  const [currentName, setCurrentName] = useState('Олена')
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: { displayName: '' },
  })

  const onSubmit = (data) => {
    setCurrentName(data.displayName)
  }

  return (
    <div className="profile-container">
      <div className="profile-info">
        <span className="profile-label">Поточне ім'я:</span>
        <strong className="profile-current">{currentName}</strong>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="profile-form">
        <div className="profile-field">
          <input
            type="text"
            {...register('displayName')}
            className={`profile-input ${errors.displayName ? 'profile-input--error' : ''}`}
            placeholder="Нове ім'я..."
          />
          <button type="submit" disabled={isSubmitting} className="profile-submit">
            Змінити
          </button>
        </div>
        {errors.displayName && <p role="alert" className="profile-error">{errors.displayName.message}</p>}
      </form>
    </div>
  )
}

export default ProfileForm
