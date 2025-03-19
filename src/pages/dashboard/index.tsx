import UsersTable from "@/components/AdminComponents/AdminTable/UsersTable";
import AnimatedWrapper from "@/components/AnimatedWrapper/AnimatedWrapper";
import Nav from "@/components/Nav/Nav";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserIcon, UsersIcon } from "lucide-react";

export default function Dashboard() {
  return (
    <>
      <Nav showButtons={false} />
      <div className="max-w-[1200px] p-6 flex flex-col items-center mx-auto">
        <Tabs defaultValue="tab-1">
          <ScrollArea>
            <TabsList className="before:bg-border relative mb-3 h-auto w-full gap-0.5 bg-transparent p-0 before:absolute before:inset-x-0 before:bottom-0 before:h-px">
              <TabsTrigger
                value="tab-1"
                className="bg-muted overflow-hidden rounded-b-none border-x border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
              >
                <UserIcon
                  className="-ms-0.5 me-1.5 opacity-60"
                  size={16}
                  aria-hidden="true"
                />
                Users
              </TabsTrigger>
              <TabsTrigger
                value="tab-2"
                className="bg-muted overflow-hidden rounded-b-none border-x border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
              >
                <UsersIcon
                  className="-ms-0.5 me-1.5 opacity-60"
                  size={16}
                  aria-hidden="true"
                />
                Registrations
              </TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <TabsContent value="tab-1">
            <AnimatedWrapper>
              <UsersTable />
            </AnimatedWrapper>
          </TabsContent>
          <TabsContent value="tab-2">
            <AnimatedWrapper>
              <UsersTable />
            </AnimatedWrapper>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
