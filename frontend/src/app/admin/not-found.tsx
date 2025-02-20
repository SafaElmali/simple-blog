import Link from "next/link";
import { UrlUtil } from "@/lib/urls";
import { Button } from "@/components/ui/button";

const AdminNotFound = () => {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center gap-2">
      <h2 className="text-2xl font-bold">404 - Page Not Found</h2>
      <p className="text-muted-foreground">
        The page you are looking for does not exist.
      </p>
      <Link href={UrlUtil.buildAdminDashboardPath()}>
        <Button variant="outline" className="mt-4">
          Return to Dashboard
        </Button>
      </Link>
    </div>
  );
};

export default AdminNotFound;
