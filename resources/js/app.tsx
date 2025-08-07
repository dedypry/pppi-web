import '../css/app.css';
import { HeroUIProvider, ToastProvider } from '@heroui/react';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import AdminLayout from './layouts/admin/admin-layout';
import LandingLayout from './layouts/landing/landing-layout';
import LayoutMember from './layouts/member/layout-member';
import { configureEcho } from '@laravel/echo-react';

configureEcho({
    broadcaster: 'pusher',
});

const appName = import.meta.env.VITE_APP_NAME || 'PPPI';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const pages = import.meta.glob('./pages/**/*.tsx', { eager: true });
        const page: any = pages[`./pages/${name}.tsx`];

        page.default.layout = (page: any) => {
            const layout = page?.props?.layout || '';

            if (layout === 'blank') {
                return <>{page}</>;
            }


            if (name.startsWith('admin') || layout === 'admin') {
                return <AdminLayout children={page} />;
            }

            if (name.startsWith('member') || layout === 'member') {
                return <LayoutMember children={page} />;
            }

            return <LandingLayout children={page} />;
        };
        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <HeroUIProvider>
                <ToastProvider
                    placement="top-right"
                    toastProps={{
                        radius: 'md',
                        color: 'primary',
                        variant: 'solid',
                        timeout: 3000,
                        hideIcon: true,
                        classNames: {
                            closeButton: 'opacity-100 absolute right-4 top-1/2 -translate-y-1/2',
                            title: 'text-white font-bold text-[20px]',
                            description:'text-white',
                            
                        },
                    }}
                />
                <main className="bg-background text-foreground light">
                    <App {...props} />
                </main>
            </HeroUIProvider>,
        );
    },
    progress: {
        color: '#00C000',
    },
});
