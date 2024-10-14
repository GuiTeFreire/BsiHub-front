import { Outlet } from 'react-router-dom'
import { LayoutContainer, OutletContainer } from './styles'
import { Header } from '../../components/header'

export function DefaultLayout() {
  return (
    <div>
      <LayoutContainer>
        <Header />
        <OutletContainer>
            <Outlet />
        </OutletContainer>
      </LayoutContainer>
    </div>
  )
}