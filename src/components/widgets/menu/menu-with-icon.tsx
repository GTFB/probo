'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { BookOpen, Home, Rss } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function MenuWithIconDemo() {
  const t = useTranslations('widgets.menu.items');

  const navigationMenuItems = [
    { title: t('home'), href: "#", icon: Home },
    { title: t('blog'), href: "#blog", icon: Rss },
    { title: t('docs'), href: "#docs", icon: BookOpen },
  ];

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navigationMenuItems.map((item) => (
          <NavigationMenuItem key={item.title}>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              asChild
            >
              <Link href={item.href} className="flex-row items-center gap-2.5">
                <item.icon className="h-5 w-5 shrink-0" />
                {item.title}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
