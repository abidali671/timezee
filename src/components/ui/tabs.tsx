"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "flex items-center gap-x-3 md:*:px-10 md:*:py-3 border-b border-gray-200 dark:border-gray-700",
        className
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "relative group px-2 pb-2 bg-gray-600 text-lg font-medium cursor-pointer text-white transition-colors duration-300",
        "hover:text-foreground data-[state=active]:text-white",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0",
        "after:bg-yellow-400   after:transition-transform after:duration-300 after:ease-in-out",
        "group-hover:after:scale-x-100 data-[state=active]:after:scale-x-100"
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("mt-4 focus-visible:outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
