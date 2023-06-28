import { lazy } from 'react'

const About = lazy(() => import('@/pages/About/index'))
const Recoil = lazy(() => import('@/pages/Recoil/index'))
const TestModule = lazy(() => import('@/pages/Test/index'))

const Routes = [
  {
    path: '/',
    element: <About />
  },
  {
    path: '/recoil',
    element: <Recoil />
  },
  {
    path: '/test',
    element: <TestModule />
  }
]

export default Routes
