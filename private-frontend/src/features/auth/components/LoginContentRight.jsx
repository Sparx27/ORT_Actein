import { useForm } from 'react-hook-form'
import CForm from '../../../shared/components/Form'
import Input from '../../../shared/components/Input'
import SvgEmail from '../../../shared/components/svgs/SvgEmail'
import SvgPassword from '../../../shared/components/svgs/SvgPassword'
import Button from '../../../shared/components/Button'
import { useAuth } from '../../../shared/auth/useAuth'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { loginQuery } from '../services/authService'

const LoginContentRight = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { login } = useAuth()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: loginQuery,
    onSuccess: (data) => {
      login(data.access_token)  // guarda el token en contexto + localStorage
      navigate('/', { replace: true })
    },
    onError: (error) => {
      if (error.status === 401) {
        window.location.reload()
      }
    }
  })

  const onSubmit = (data) => {
    mutation.mutate(data)
  }

  return (
    <section className="login-right-container">
      <div className="login-form-container">
        <CForm
          onSubmit={handleSubmit(onSubmit)}
          message={mutation.isError ? mutation.error.message : null}
          messageType="error"
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
            extraClass={'input-login'}
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
            extraClass={'input-login'}
          />

          <Button type="submit" bigPadding extraClass={'fs-14'} loading={mutation?.isPending}>Iniciar sesión</Button>
        </CForm>

        <div className="brand-footer-right">© Actein</div>
      </div>
    </section>
  )
}

export default LoginContentRight