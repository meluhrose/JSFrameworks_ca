export default function Footer() {
    return (
        <footer className="relative bg-[var(--accent-bg)] border-b-3 border-[var(--accent-main)] p-[10px] text-center">
            &copy; {new Date().getFullYear()} Mila Cacho: Noroff Online Shop. All rights reserved.
        </footer>
    );
}