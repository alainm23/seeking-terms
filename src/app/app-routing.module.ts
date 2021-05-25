import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'registro/:id/:location',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'country-select',
    loadChildren: () => import('./modals/country-select/country-select.module').then( m => m.CountrySelectPageModule)
  },
  {
    path: 'profile/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'filter',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modals/filter/filter.module').then( m => m.FilterPageModule)
  },
  {
    path: 'inbox',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/inbox/inbox.module').then( m => m.InboxPageModule)
  },
  {
    path: 'chat',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modals/chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'favorites',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/favorites/favorites.module').then( m => m.FavoritesPageModule)
  },
  {
    path: 'profile-menu',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/profile-menu/profile-menu.module').then( m => m.ProfileMenuPageModule)
  },
  {
    path: 'complete-profile',
    loadChildren: () => import('./modals/complete-profile/complete-profile.module').then( m => m.CompleteProfilePageModule)
  },
  {
    path: 'settings',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'admin-imagenes',
    loadChildren: () => import('./admin-imagenes/admin-imagenes.module').then( m => m.AdminImagenesPageModule)
  },
  {
    path: 'select-plan',
    loadChildren: () => import('./modals/select-plan/select-plan.module').then( m => m.SelectPlanPageModule)
  },
  {
    path: 'buy-single-credits',
    loadChildren: () => import('./modals/buy-single-credits/buy-single-credits.module').then( m => m.BuySingleCreditsPageModule)
  },
  {
    path: 'upgrade-account-menu',
    loadChildren: () => import('./modals/upgrade-account-menu/upgrade-account-menu.module').then( m => m.UpgradeAccountMenuPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./modals/payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./pages/verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  },
  {
    path: 'purchase-message/:id/:data',
    loadChildren: () => import('./pages/purchase-message/purchase-message.module').then( m => m.PurchaseMessagePageModule)
  },
  {
    path: 'edit-profile',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'request-gps/:id',
    loadChildren: () => import('./pages/request-gps/request-gps.module').then( m => m.RequestGpsPageModule)
  },  {
    path: 'edit-profile-form',
    loadChildren: () => import('./modals/edit-profile-form/edit-profile-form.module').then( m => m.EditProfileFormPageModule)
  },
  {
    path: 'edit-fotos',
    loadChildren: () => import('./modals/edit-fotos/edit-fotos.module').then( m => m.EditFotosPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
