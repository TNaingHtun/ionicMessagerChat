import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
 
// Send unauthorized users to login
const redirectUnauthorizedToPhAuth = () =>redirectUnauthorizedTo(['/']);

// Send unauthorized users to login
const redirectUnauthorizedToLogin = () =>redirectUnauthorizedTo(['/login']);
 
// Automatically log in users
const redirectLoggedInToChat = () => redirectLoggedInTo(['/chat']);
 
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    ...canActivate(redirectLoggedInToChat),
  },
  {
    path: 'chat',
    ...canActivate(redirectUnauthorizedToPhAuth),
    loadChildren: () => import('./pages/chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'bar-chart',
    loadChildren: () => import('./pages/bar-chart/bar-chart.module').then( m => m.BarChartPageModule)
  },
  {
    path: 'line-chart',
    loadChildren: () => import('./pages/line-chart/line-chart.module').then( m => m.LineChartPageModule)
  },
  {
    path: 'pie-chart',
    loadChildren: () => import('./pages/pie-chart/pie-chart.module').then( m => m.PieChartPageModule)
  },
  {
    path: 'high-chart',
    loadChildren: () => import('./pages/high-chart/high-chart.module').then( m => m.HighChartPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'phone-auth',
    loadChildren: () => import('./pages/phone-auth/phone-auth.module').then( m => m.PhoneAuthPageModule),
    ...canActivate(redirectLoggedInToChat),
  },
  {
    path: '',
    loadChildren: () => import('./pages/calendar/calendar.module').then( m => m.CalendarPageModule)
  },
];
 
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }