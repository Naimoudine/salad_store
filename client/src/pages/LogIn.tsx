import { useEffect } from "react";
import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import logo from "../assets/images/salad-logo.png";
import { useAuth } from "../hooks/useAuth";

interface User {
  id: number;
  username: string;
}

interface ActionData {
  user?: User;
  error?: string;
}

export const action = async ({
  request,
}: {
  request: Request;
}): Promise<ActionData> => {
  const formData = await request.formData();

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: "post",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: formData.get("username"),
        password: formData.get("password"),
      }),
    });
    if (!response.ok) {
      throw new Error("unknow error while getting user");
    }
    const data = await response.json();
    localStorage.setItem("user", JSON.stringify(data));
    return { user: data };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};

export default function LogIn() {
  const user = useActionData() as User;
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (user) {
      setAuth(user);
      navigate("/dashboard");
    }
  }, [user, setAuth, navigate]);

  return (
    <div className="flex flex-col items-center w-full h-full mt-16">
      <img className="w-auto h-56" src={logo} alt="logo" />
      <Form method="post" className="flex flex-col gap-8">
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Enter your username"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
        />
        <button
          className="font-semibold text-white bg-secondary hover:bg-secondary/70 disabled:bg-gray-500"
          type="submit"
          disabled={isSubmitting}
        >
          Log In
        </button>
      </Form>
    </div>
  );
}
