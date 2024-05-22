import './HomeHeader.scss';
import Link from "next/link";

export const HomeHeader = () => {
  return (
    <div className="HomeHeader">
        <div className="HomeHeader-Title">
            <p>GymTeam</p>
        </div>
        <div className="HomeHeader-Left">
            <Link href="/" className="HomeHeader-Link">Galvēna</Link>
            <Link href="/kontakts" className="HomeHeader-Link">Kontakti</Link>
        </div>

        <div className="HomeHeader-Right">
            <Link href="/login" className="rounded-md bg-indigo-600 px-6 py-1.5 text-white shadow-sm hover:bg-indigo-500 w-80">Login</Link>
        </div>
    </div>
  );
}

export default HomeHeader;