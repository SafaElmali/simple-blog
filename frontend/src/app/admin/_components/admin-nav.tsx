import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/app/admin/_components/ui/button";
import { deleteCookie } from "@/lib/cookies";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/posts", label: "Posts" },
  { href: "/admin/create", label: "Create Post" },
];

const AdminNav = () => {
  const pathname = usePathname();

  const handleLogout = () => {
    deleteCookie("token");
    window.location.href = "/login";
  };

  return (
    <nav className="w-64 min-h-screen border-r bg-muted/10 p-6">
      <div className="space-y-6">
        <div className="flex flex-col space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-2 rounded-md text-sm transition-colors",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="pt-4 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};

export { AdminNav };
