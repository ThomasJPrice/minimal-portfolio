import Image from "next/image";
import Link from "next/link";

const NavLinks = [
  { href: "/lab", label: "Lab", key: "l" },
  { href: "/now", label: "Now", key: "n" },
  { href: "/vault", label: "Vault", key: "v" },
  { href: "/blog", label: "Blog", key: "b" },
]


export default function Navbar() {
  return (
    <nav className="max-w-xl mx-auto flex items-center justify-between py-8">
      <div>
        <Link href="/" className="text-2xl font-bold">
          <Image src='/logo.png' alt="Logo" width={32} height={32} className="inline-block" />
        </Link>
      </div>

      <ul className="flex items-center space-x-4 !list-none !pl-0">
        {NavLinks.map((link) => (
          <li className="underline underline-offset-2" key={link.key}>
            <Link href={link.href}>
              {link.label} <span className="hidden md:inline-block underline underline-offset-2">[{link.key}]</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
