import { useHistory } from "react-router-dom";

const Dashboard = () => {
  const history = useHistory();
  return (
    <h1>
      Dashboard
      <button
        // Gambiarra
        onClick={() => {
          history.push("/login");
          localStorage.clear();
          window.location.reload();
        }}
      >
        Logout
      </button>
    </h1>
  );
};

export default Dashboard;
