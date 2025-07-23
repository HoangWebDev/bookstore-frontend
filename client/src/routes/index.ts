import MainLayout from "~/components/layouts/Main/Main";
import config from "~/config";
import Detail from "~/pages/Detail/Detail";
import Home from "~/pages/Home";
import Cart from "~/pages/Cart/Cart";
import { Route } from "~/types/routeType";
import Book from "~/pages/Book/Book";
import Account from "~/pages/Account/Account";
import Contact from "~/pages/Contact/Contact";

const publicRoutes: Route[] = [
    {
        path: config.routes.home,
        component: Home,
        layout: MainLayout
    },
    {
        path: config.routes.account,
        component: Account,
        layout: MainLayout
    },
    {
        path: config.routes.contact,
        component: Contact,
        layout: MainLayout
    },
    {
        path: config.routes.book,
        component: Book,
        layout: MainLayout
    },
    {
        path: config.routes.cart,
        component: Cart,
        layout: MainLayout
    },
    {
        path: config.routes.detail,
        component: Detail,
        layout: MainLayout
    },
]

export default publicRoutes