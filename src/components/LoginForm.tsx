import { useState } from "react";
import type { FormEvent } from "react";
import api from "../api";
const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = { email, password };
    let response;
    try {
      response = await api.post("/user/login/", data);
      if (response.status === 200) {
        console.log(response.data);
        if (window !== undefined) {
          const {
            data2: { refresh, access },
          } = response.data;
          window.localStorage.setItem("refresh", refresh);

          window.localStorage.setItem("access", access);
        }
      }
    } catch (error: any) {
      console.log(error.response);
      alert(`Error occured! ${error.toJSON()}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#090f20]">
      <div className="w-full max-w-md p-8 space-y-8 bg-[#2a3a66] rounded-lg shadow-xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-100">Sign In</h2>
          <p className="mt-2 text-sm text-gray-200">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-medium text-blue-300 hover:text-blue-400"
            >
              Sign up
            </a>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email address:
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-blue-50"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-blue-50"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
