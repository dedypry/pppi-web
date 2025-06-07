/* eslint-disable @typescript-eslint/no-explicit-any */
import { HeroUIProvider } from '@heroui/react';
import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import ReactDOMServer from 'react-dom/server';
import { type RouteName, route } from 'ziggy-js';
import AdminLayout from './layouts/admin/admin-layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: (title) => `${title} - ${appName}`,
        resolve: (name) => {
            const pages = import.meta.glob('./pages/**/*.tsx', { eager: true });
            const page: any = pages[`./pages/${name}.tsx`];
            page.default.layout = page.default.layout || ((page: any) => <AdminLayout children={page} />);
            return page;
        },
        setup: ({ App, props }) => {
            /* eslint-disable */
            // @ts-expect-error
            global.route<RouteName> = (name, params, absolute) =>
                route(name, params as any, absolute, {
                    // @ts-expect-error
                    ...page.props.ziggy,
                    // @ts-expect-error
                    location: new URL(page.props.ziggy.location),
                });
            /* eslint-enable */

            return (
                <HeroUIProvider>
                    <main className="bg-background text-foreground light">
                        <App {...props} />
                    </main>
                </HeroUIProvider>
            );
        },
    }),
);
