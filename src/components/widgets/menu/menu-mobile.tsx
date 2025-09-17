'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { BookOpen, Home, Rss, Settings, User } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function MenuMobileDemo() {
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
      <NavigationMenuList>
        {navigationMenuItems.map((item) => (
          <NavigationMenuItem key={item.title}>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "flex flex-col h-auto items-center px-5 py-2.5"
              )}
              active={item.isActive}
              asChild
            >
              <Link href={item.href}>
                <item.icon className="mb-1.5 h-5 w-5" />
                {item.title}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
