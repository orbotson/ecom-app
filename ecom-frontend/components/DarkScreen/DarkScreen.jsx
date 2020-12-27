export default function DarkScreen({ toggleMenu }) {
    return <div className="dark-screen" onClick={() => toggleMenu(false)}></div>;
}
