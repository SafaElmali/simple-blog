import { redirect } from "next/navigation";
import { urls } from "@/lib/urls";

const AdminPage = () => {
  redirect(urls.admin.dashboard.root);
};

export default AdminPage;
