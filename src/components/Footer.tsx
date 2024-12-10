import "@/components/Footer.module.css"
import Link from "next/link";

export function Footer() {
    return (
        <>
        <footer>
            <Link href={"/"}>Home</Link>
            <Link href={"/history"}>History</Link>
        </footer>
        </>
    );
}