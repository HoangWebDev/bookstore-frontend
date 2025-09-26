import { config } from "~/config";
import { Route } from "~/types/routeType";
import AdminLayout from "~/components/layouts/Admin";
import Author from "~/pages/Authors/Author";
import Book from "~/pages/Books/Book";
import Category from "~/pages/Categories/Category";
import DashBoard from "~/pages/DashBoard";
import NewBook from "~/pages/Books/NewBook";
import Publisher from "~/pages/Publishers/Publisher";
import NewCategory from "~/pages/Categories/NewCategory";
import NewPublisher from "~/pages/Publishers/NewPublisher";
import NewAuthor from "~/pages/Authors/NewAuthor";
import EditCategory from "~/pages/Categories/UpdateCategory";
import EditPublisher from "~/pages/Publishers/UpdatePublisher";
import EditAuthor from "~/pages/Authors/UpdateAuthor";
import EditBook from "~/pages/Books/UpdateBook";
import Profile from "~/authentication/Profile";
import Chat from "~/pages/Chat";
import Contact from "~/pages/Contact";
import User from "~/pages/Users/User";
import Admin from "~/pages/Admin/Admin";
import WatermarkApp from "~/pages/Watermark/Watermark";

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
        path: config.routes.watermark,
        component: WatermarkApp,
        layout: AdminLayout
    },
    {
        path: config.routes.admin,
        component: Admin,
        layout: AdminLayout
    },
    {
        path: config.routes.user,
        component: User,
        layout: AdminLayout
    },
    // {
    //     path: config.routes.new_user,
    //     component: NewUser,
    //     layout: AdminLayout
    // },
    // {
    //     path: config.routes.update_user,
    //     component: EditUser,
    //     layout: AdminLayout
    // },
    {
        path: config.routes.book,
        component: Book,
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