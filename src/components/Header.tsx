import "@/components/Header.module.css"
import Link from "next/link";

export function Header() {
    return (
        <>
        <header>
            <Link href={"/"}>Home</Link>
        </header>
        </>
    );
}