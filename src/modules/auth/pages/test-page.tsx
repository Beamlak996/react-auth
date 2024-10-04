
import { TestForm } from "@/components/general/test-form";
import {
  useGetAllUsersQuery,
} from "../services/auth-queries";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/store";
import LogoutButton from "@/components/general/logout-button";

export const TestPage = () => {
  const { data, isPending, isError } = useGetAllUsersQuery();

  const logout = useStore((state) => state.logout)
  

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  

  return (
    <div className="flex gap-4">
      <div className="
      flex flex-col ">
        {data.map((user) => (
          <div key={user.id}>{user.email}</div>
        ))}
      </div>

      <TestForm />
      <LogoutButton />
    </div>
  );
};
