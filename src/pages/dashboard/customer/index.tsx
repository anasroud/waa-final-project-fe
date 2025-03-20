import AnimatedWrapper from "@/components/AnimatedWrapper/AnimatedWrapper";
import CustomerOffersTable from "@/components/CustomerOffersTable/CustomerOffersTable";
import FavoritedPropertiesTable from "@/components/FavoritedPropertiesTable/FavoritedPropertiesTable";
import Nav from "@/components/Nav/Nav";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HeartIcon, CircleDollarSign } from "lucide-react";

export default function CustomerDashboard() {
  return (
    <ProtectedRoute allowedRoles={["customer"]}>
      <Nav showButtons={true} />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Buyer Dashboard</h1>
        </div>
        <Tabs defaultValue="tab-1">
          <ScrollArea>
            <TabsList className="text-foreground mb-3 h-auto gap-2 rounded-none border-b bg-transparent px-0 py-1">
              <TabsTrigger
                value="tab-1"
                className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent  after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                <CircleDollarSign
                  className="-ms-0.5 me-1.5 opacity-60"
                  size={16}
                  aria-hidden="true"
                />
                My Offersrelative
              </TabsTrigger>
              <TabsTrigger
                value="tab-2"
                className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                <HeartIcon
                  className="-ms-0.5 me-1.5 opacity-60"
                  size={16}
                  aria-hidden="true"
                />
                Favorites
              </TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <TabsContent value="tab-1">
            <CustomerOffersTable />
          </TabsContent>
          <TabsContent value="tab-2">
            <FavoritedPropertiesTable />
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  );
}
