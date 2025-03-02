import { BiLogOut } from "react-icons/bi";
import { useAuthContext } from "../../context/AuthContext";
const LogoutButton = () => {
  const { loading, logout } = useLogout();
  const { setAuthUser } = useAuthContext();

  const handleLogout = () => {
    setAuthUser(null);
    localStorage.removeItem("chat-user");
    logout();
  };

  return (
    <div className='mt-auto'>
      {!loading ? (
        <BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={handleLogout} />
      ) : (
        <span className='loading loading-spinner'></span>
      )}
    </div>
  );
};

export default LogoutButton;
