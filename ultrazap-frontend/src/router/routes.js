
const routes = [
  {
    path: '/',
    component: () => import('layouts/Frameless.vue'),
    children: [
      { path: '', name: 'auth', component: () => import('pages/auth/index.vue') },
      { path: '/register', name: 'auth-register', component: () => import('pages/auth/register.vue') }
    ]
  },
  {
    path: '/dashboard',
    component: () => import('layouts/LoggedLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'new_user', name: 'new-user', component: () => import('pages/auth/NewUser.vue') },
      { path: 'tickets', name: 'tickets', component: () => import('pages/tickets/index.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
