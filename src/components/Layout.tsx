import Footer from './Footer';
import Navbar from './Navbar';
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 bg-gray-50 p-4 mt-14">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}