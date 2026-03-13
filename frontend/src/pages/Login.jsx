import { API_BASE_URL } from "../config";

function Login() {

  const handleGoogleLogin = () => {
    window.open(`${API_BASE_URL}/auth/google`, "_self");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">

      <h1 className="text-4xl font-bold mb-8">
        Campus Air
      </h1>

      <button
        onClick={handleGoogleLogin}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Login with Google
      </button>

    </div>
  );
}

export default Login;
