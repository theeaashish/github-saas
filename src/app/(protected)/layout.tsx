import { SidebarProvider } from "@/components/ui/sidebar";
import React, { type ReactNode } from "react";
import { UserDropDown } from "./_components/UserDropdown";

type Props = {
  children: ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      {/* <AppSidebar /> */}
      <main className="m-2 w-full">
        <div className="border-sidebar-border bg-sidebar flex items-center gap-2 rounded-md border p-2 px-4 shadow">
          {/* TODO: search bar */}
          <div className="ml-auto"></div>
          <UserDropDown />
        </div>
        <div className="h-4"></div>
        {/* main content */}
        <div className="border-sidebar-border bg-sidebar h-[calc(100vh-6rem)] overflow-y-scroll rounded-md border p-4 shadow">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default layout;
