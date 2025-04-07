import { logOut } from "../authService";
import { useAuth } from "../context/authProvider";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Welcome, {user?.email}</h1>
      <button onClick={logOut}>Log Out</button>
    </div>
  );
};

export default Dashboard;