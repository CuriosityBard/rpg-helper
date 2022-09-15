import { Outlet, Link } from "react-router-dom";
import { DicePage } from './DicePage.js';

export function Layout() {
    return (
        <div id="full-page">
            <header>
                <h1>RPG Helper</h1>
                <nav><ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="charcreate">Character Creation</Link></li>
                </ul></nav>
            </header>
            <main>
                <Outlet />
                <section id="sidebar">
                    <DicePage />
                </section>
            </main>
        </div>
    );
}