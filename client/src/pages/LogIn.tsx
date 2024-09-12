import { Form } from "react-router-dom";
import logo from "../assets/images/salad-logo.png";

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}`, {
      method: "post",
      credentials: "include",
      body: JSON.stringify({
        username: formData.get("username"),
        password: formData.get("password"),
      }),
    });
    if (!response.ok) {
      throw new Error("unknow error while getting user");
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default function LogIn() {
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
          className="font-semibold text-white bg-secondary hover:bg-secondary/70"
          type="submit"
        >
          Log In
        </button>
      </Form>
    </div>
  );
}
