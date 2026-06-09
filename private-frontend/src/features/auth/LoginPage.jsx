import Container from '../../shared/components/Container'
import './auth.css'
import LoginBackground from './components/LoginBackground'
import LoginContentLeft from './components/LoginContentLeft'
import LoginContentRight from './components/LoginContentRight'

const LoginPage = () => {
  return (
    <div className="login">
      <LoginBackground />
      <Container>
        <div className="login-content page-padding">
          <LoginContentLeft />
          <LoginContentRight />
        </div>
      </Container>
    </div>
  )
}

export default LoginPage