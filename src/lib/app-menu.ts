export type AppMenuItem = {
  href: string;
  label: string;
  description: string;
};

export const appMenuItems: AppMenuItem[] = [
  {
    href: "/app/stock-items",
    label: "Stock Items",
    description: "Manage household stock",
  },
  {
    href: "/app/calculator",
    label: "Calculator",
    description: "Quick calculations",
  },
];

export const appDrawerId = "app-drawer";
