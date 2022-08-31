import { Outlet, Link } from "react-router-dom";

export function Layout() {
    return (
        <div id="full-page">
            <header>
                <h1>RPG Helper</h1>
                <nav><ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="dice">Dice Roller</Link></li>
                </ul></nav>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}