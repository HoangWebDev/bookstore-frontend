import ChildrenType from "~/types/childrenType";
import Header from "./Header";
import Nav from "./Nav";

function AdminLayout({ children }: ChildrenType) {
    return (
        <div className="flex h-screen overflow-hidden">
            <aside className="h-screen bg-white w-72 overflow-y-auto px-5 flex flex-col shrink-0 border-r border-gray-200 scrollbar-hide select-none transition-all duration-300">
                <Nav />
            </aside>
            <main className="flex flex-1 flex-col h-screen">
                <Header />
                <div className="overflow-y-auto scrollbar-hide w-full min-w-0 p-4 md:p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}

export default AdminLayout;