import { authClient } from "@/lib/authClient";

export const clientSession = () => {
  const { data, isPending } = authClient.useSession();

  return { data, isPending };
};
