import { Route } from '@angular/router';
import { LayoutComponent } from 'app/layout/layout.component';
import { ProfileComponent } from './modules/landing/jobseeker/components/profile/profile.component';
import { UnauthorizedRoutingComponent } from './shared/components/unauthorized-routing/unauthorized-routing.component';
import { AdminGuard } from './shared/services/admin-guard';
import { AuthGuard } from './shared/services/auth.guard';
import { EmployerGuard } from './shared/services/employer-guard.guard';
import { EmployerProfileCompletionGuard } from './shared/services/employer-profile-completion.guard';
import { ForceChangePasswordGuard } from './shared/services/force-change-password.guard';
import { JobseekerGuard } from './shared/services/jobseeker-guard.guard';
import { JobseekerProfileCompletionGuard } from './shared/services/jobseeker-profile-completion.guard';
import { LoggedUserGuard } from './shared/services/logged-user-guard.guard';
import { SubdomainAuthGuard } from './shared/services/subdomain-guard';

export const appRoutes: Route[] = [
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'pyramid',
        },
        children: [
            {
                path:  '',
                loadChildren:()=>
                    import(
                            'app/modules/landing/home/home.module'
                        ).then((m) => m.LandingHomeModule),
                canActivate: [
                    JobseekerProfileCompletionGuard,
                    EmployerProfileCompletionGuard,
                    ForceChangePasswordGuard,
                ],
            },
            {
                path: 'courses',
                loadChildren: () =>
                    import('app/modules/landing/courses/courses.module').then(
                        (m) => m.CoursesModule
                    ),
                canActivate: [
                    JobseekerProfileCompletionGuard,
                    EmployerProfileCompletionGuard,
                    ForceChangePasswordGuard,
                ],
            },
            {
                path: 'privacy-policy',
                loadChildren: () =>
                    import(
                        'app/modules/landing/privacy-policy/privacy-policy.module'
                    ).then((m) => m.PrivacyPolicyModule),
            },
            {
                path: 'about-us',
                loadChildren: () =>
                    import('app/modules/landing/about-us/about-us.module').then(
                        (m) => m.AboutUsModule
                    ),
            },
            {
                path: 'refund-policy',
                loadChildren: () =>
                    import(
                        'app/modules/landing/refund-policy/refund-policy.module'
                    ).then((m) => m.RefundPolicyModule),
            },
            {
                path: 'terms-and-conditions',
                loadChildren: () =>
                    import(
                        'app/modules/landing/terms-and-conditions/terms-and-conditions.module'
                    ).then((m) => m.TermsAndConditionsModule),
            },
            {
                path: 'contact-us',
                loadChildren: () =>
                    import(
                        'app/modules/landing/contact-us/contact-us.module'
                    ).then((m) => m.ContactUsModule),
            },
            {
                path: 'jobs',
                loadChildren: () =>
                    import('app/modules/landing/jobs/jobs.module').then(
                        (m) => m.JobsModule
                    ),
                canActivate: [
                    JobseekerProfileCompletionGuard,
                    EmployerProfileCompletionGuard,
                    ForceChangePasswordGuard,
                ],
            },
            {
                path: 'jobs/:id',
                loadChildren: () =>
                    import(
                        'app/modules/landing/job-details/job-details.module'
                    ).then((m) => m.JobDetailsModule),
                canActivate: [
                    JobseekerProfileCompletionGuard,
                    EmployerProfileCompletionGuard,
                    ForceChangePasswordGuard,
                ],
            },
            {
                path: 'jobs/search/:category',
                loadChildren: () =>
                    import('app/modules/landing/jobs/jobs.module').then(
                        (m) => m.JobsModule
                    ),
                canActivate: [
                    JobseekerProfileCompletionGuard,
                    EmployerProfileCompletionGuard,
                    ForceChangePasswordGuard,
                ],
            },
            {
                path: 'mentor/:id',
                loadChildren: () =>
                    import('app/modules/landing/mentor/mentor.module').then(
                        (m) => m.MentorModule
                    ),
                canActivate: [AuthGuard],
            },
            {
                path: 'employer',
                loadChildren: () =>
                    import('app/modules/landing/employer/employer.module').then(
                        (m) => m.EmployerModule
                    ),
                canActivate: [EmployerGuard],
            },

            {
                path: 'user/login',
                loadChildren: () =>
                    import('app/modules/admin/login/login.module').then(
                        (m) => m.LoginModule
                    ),
                canActivate: [LoggedUserGuard],
            },
            {
                path: 'sso_login',
                loadChildren: () =>
                    import('app/modules/admin/sso-login/sso-login.module').then(
                        (m) => m.SsoLoginModule
                    ),
                canActivate: [LoggedUserGuard],
            },
            {
                path: 'user/register',
                loadChildren: () =>
                    import(
                        'app/modules/admin/registration/registration.module'
                    ).then((m) => m.RegistrationModule),
                canActivate: [LoggedUserGuard],
            },
            {
                path: 'oauth-login',
                loadChildren: () =>
                    import('app/modules/admin/oauth/oauth.module').then(
                        (m) => m.OauthModule
                    ),
                canActivate: [LoggedUserGuard],
            },
            {
                path: 'admin',
                loadChildren: () =>
                    import('app/modules/landing/admin/admin.module').then(
                        (m) => m.AdminModule
                    ),
                canActivate: [AdminGuard],
            },
            {
                path: 'user',
                loadChildren: () =>
                    import(
                        'app/modules/admin/forget-password/forget-password.module'
                    ).then((m) => m.ForgetPasswordModule),
            },
            {
                path: 'career',
                loadChildren: () =>
                    import(
                        'app/modules/landing/career-page/career-page.module'
                    ).then((m) => m.CareerPageModule),
            },
            {
                path: 'jobseeker',
                loadChildren: () =>
                    import(
                        'app/modules/landing/jobseeker/jobseeker.module'
                    ).then((m) => m.JobseekerModule),
                canActivate: [JobseekerGuard],
            },
            {
                path: 'chat',
                loadChildren: () =>
                    import('app/modules/landing/chat/chat.module').then(
                        (m) => m.ChatModule
                    ),
                canActivate: [AuthGuard],
            },
            {
                path: 'unauthorized-access',
                component: UnauthorizedRoutingComponent,
            },
            {
                path: 'jobseeker/:id/profile',
                component: ProfileComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'payment-status/:status',
                loadChildren: () =>
                    import('app/modules/landing/payment/payment.module').then(
                        (m) => m.PaymentModule
                    ),
                canActivate: [JobseekerGuard],
            },
            {
                path: 'payment-status/webinar/:stat',
                loadChildren: () =>
                    import(
                        'app/modules/landing/webinar-payment/webinar-payment.module'
                    ).then((m) => m.WebinarPaymentModule),
                canActivate: [AuthGuard],
            },
            {
                path: 'webinar',
                loadChildren: () =>
                    import('app/modules/landing/webinar/webinar.module').then(
                        (m) => m.WebinarModule
                    ),
                canActivate: [AuthGuard],
            },
        ],
    },
];
