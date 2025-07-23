import { config } from "~/config";
import { Route } from "~/types/routeType";
import AdminLayout from "~/components/layouts/Admin";
import Author from "~/pages/Author";
import Book from "~/pages/Book";
import Category from "~/pages/Category";
import DashBoard from "~/pages/DashBoard";
import NewBook from "~/pages/NewBook";
import Publisher from "~/pages/Publisher";
import UpdateBook from "~/pages/UpdateBook";
import NewCategory from "~/pages/NewCategory";
import NewPublisher from "~/pages/NewPublisher";
import NewAuthor from "~/pages/NewAuthor";
import EditCategory from "~/pages/UpdateCategory";
import EditPublisher from "~/pages/UpdatePublisher";
import EditAuthor from "~/pages/UpdateAuthor";
import EditBook from "~/pages/UpdateBook";
import Profile from "~/authentication/Profile";
import Chat from "~/pages/Chat";
import Contact from "~/pages/Contact";

export const adminRoutes: Route[] = [
    {
        path: config.routes.dashboard,
        component: DashBoard,
        layout: AdminLayout
    },
    {
        path: config.routes.contact,
        component: Contact,
        layout: AdminLayout
    },
    {
        path: config.routes.profile,
        component: Profile,
        layout: AdminLayout
    },
    {
        path: config.routes.chat,
        component: Chat,
        layout: AdminLayout
    },
    {
        path: config.routes.book,
        component: Book,
        layout: AdminLayout
    },
    {
        path: config.routes.update_book,
        component: UpdateBook,
        layout: AdminLayout
    },
    {
        path: config.routes.new_book,
        component: NewBook,
        layout: AdminLayout
    },
    {
        path: config.routes.update_book,
        component: EditBook,
        layout: AdminLayout
    },
    {
        path: config.routes.category,
        component: Category,
        layout: AdminLayout
    },
    {
        path: config.routes.new_category,
        component: NewCategory,
        layout: AdminLayout
    },
    {
        path: config.routes.update_category,
        component: EditCategory,
        layout: AdminLayout
    },
    {
        path: config.routes.author,
        component: Author,
        layout: AdminLayout
    },
    {
        path: config.routes.new_author,
        component: NewAuthor,
        layout: AdminLayout
    },
    {
        path: config.routes.update_author,
        component: EditAuthor,
        layout: AdminLayout
    },
    {
        path: config.routes.publisher,
        component: Publisher,
        layout: AdminLayout
    },
    {
        path: config.routes.new_publisher,
        component: NewPublisher,
        layout: AdminLayout
    },
    {
        path: config.routes.update_publisher,
        component: EditPublisher,
        layout: AdminLayout
    },
]