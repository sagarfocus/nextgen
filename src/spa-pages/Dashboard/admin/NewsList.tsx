import { Navigate } from 'react-router-dom';

// /dashboard/admin/news is just an alias for the dashboard's News Management
// tab (matches the old project's redirect). The full UI lives inside
// AdminDashboard.tsx under view=news-management.
export default function AdminNewsListPage() {
  return <Navigate to="/dashboard/admin?view=news-management" replace />;
}
