'use client';

import { buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { BookOpen, Home, Rss, Settings, User } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function MenuIconDemo() {
  const t = useTranslations('widgets.menu.items');

  const navigationMenuItems = [
    { title: t('home'), href: "#", icon: Home, isActive: true },
    { title: t('blog'), href: "#blog", icon: Rss },
    { title: t('docs'), href: "#docs", icon: BookOpen },
    { title: t('account'), href: "#account", icon: Settings },
    { title: t('settings'), href: "#settings", icon: User },
  ];

  return (
    <NavigationMenu>
      <NavigationMenuList className="space-x-3">
        {navigationMenuItems.map((item) => (
          <NavigationMenuItem key={item.title}>
            <NavigationMenuLink
              className={cn(
                buttonVariants({
                  size: "icon",
                  variant: item.isActive ? "secondary" : "ghost",
                }),
                "h-11 w-11"
              )}
              asChild
            >
              <Link href={item.href}>
                <item.icon className="h-6! w-6!" />
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
