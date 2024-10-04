import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="grid h-screen place-content-center bg-white px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-gray-200">404</h1>

        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          sorry!
        </p>

        <p className="mt-4 text-gray-500">We can not find that page.</p>
        <Button
          variant="link"
          className="text-sky-500 hover:text-sky-400 transition"
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </div>
    </div>
  );
}
