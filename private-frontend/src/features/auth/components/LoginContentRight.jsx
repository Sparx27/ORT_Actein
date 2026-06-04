import { useForm } from 'react-hook-form'
import CForm from '../../../shared/components/Form'
import Input from '../../../shared/components/Input'
import { useState } from 'react'
import SvgEmail from '../../../shared/components/svgs/SvgEmail'
import SvgPassword from '../../../shared/components/svgs/SvgPassword'
import Button from '../../../shared/components/Button'

const LoginContentRight = () => {
  // RHF nos da tres cosas:
  // - register: para conectar cada input al form
  // - handleSubmit: wrapper que valida antes de llamar a nuestra función
  // - errors: objeto con los errores de validación de cada campo
  const { register, handleSubmit, formState: { errors } } = useForm()

  // Feedback general del form (respuesta del servidor)
  const [apiRes, setApiRes] = useState(null)
  const [apiResType, setApiResType] = useState(null)

  // Esta función SOLO se ejecuta si la validación de RHF pasó.
  // data tiene los valores del form: { email: '...', password: '...' }
  const onSubmit = (data) => {
    setApiRes(null)

    // acá iría tu llamada al backend (mutación de TanStack Query, fetch, etc)
    console.log('Login con:', data)

    // si el backend rechaza las credenciales:
    // setFeedback('Email o contraseña incorrectos.')
    // setFeedbackType('error')
  }
  return (
    <section className="login-right-container">
      <div className="login-form-container">
        <CForm
          onSubmit={handleSubmit(onSubmit)}
          message={apiRes}
          messageType={apiResType}
          formHead={{ title: 'Acceso', txt: 'Ingresá tus credenciales para acceder al panel.' }}
        >

          <Input
            {...register('email', {
              required: 'El email es requerido.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Formato de email inválido.',
              },
            })}
            label="Email"
            id="email"
            type="email"
            placeholder="nombre@empresa.com"
            autoComplete="username"
            error={errors.email?.message}
            icon={<SvgEmail />}
          />

          <Input
            {...register('password', {
              required: 'La contraseña es requerida.',
              minLength: { value: 6, message: 'Mínimo 6 caracteres.' },
            })}
            label="Contraseña"
            id="password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            error={errors.password?.message}
            icon={<SvgPassword />}
          />

          <Button type="submit" bigPadding>Iniciar sesión</Button>
        </CForm>

        <div className="brand-footer-right">© 2026 Actein</div>
      </div>
    </section>
  )
}

export default LoginContentRight