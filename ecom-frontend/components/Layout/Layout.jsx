import Navbar from '../Navbar/Navbar';

export default function Layout({ children }) {
    return (
        <div className="layout">
            <Navbar />
            <div>{children}</div>
        </div>
    );
}