import { redirect } from "next/navigation";
import { UrlUtil } from "@/lib/urls";

const AdminPage = () => {
  redirect(UrlUtil.buildAdminDashboardPath());
};

export default AdminPage;
