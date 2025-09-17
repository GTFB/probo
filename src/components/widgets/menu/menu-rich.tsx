'use client';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import {
  CreditCardIcon,
  Loader,
  LucideIcon,
  SquareCheckIcon,
  SquareChevronUpIcon,
  SquarePowerIcon,
  ToggleRight,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import * as React from "react";

export default function MenuRichDemo() {
  const t = useTranslations('widgets.menu.rich');

  const components: {
    title: string;
    href: string;
    description: string;
    icon: LucideIcon;
  }[] = [
    {
      title: t('accordion.title'),
      href: "/components/accordion",
      description: t('accordion.description'),
      icon: SquareChevronUpIcon,
    },
    {
      title: t('button.title'),
      href: "/components/button",
      description: t('button.description'),
      icon: SquarePowerIcon,
    },
    {
      title: t('card.title'),
      href: "/components/card",
      description: t('card.description'),
      icon: CreditCardIcon,
    },
    {
      title: t('checkbox.title'),
      href: "/components/checkbox",
      description: t('checkbox.description'),
      icon: SquareCheckIcon,
    },
    {
      title: t('spinner.title'),
      href: "/components/spinner",
      description: t('spinner.description'),
      icon: Loader,
    },
    {
      title: t('switch.title'),
      href: "/components/switch",
      description: t('switch.description'),
      icon: ToggleRight,
    },
  ];

  return (
    <NavigationMenu className="z-20">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{t('products')}</NavigationMenuTrigger>
          <NavigationMenuContent className="px-0 py-1">
            <div className="grid grid-cols-3 gap-3 p-4 w-[900px] divide-x">
              <div className="col-span-2">
                <h6 className="pl-2.5 font-semibold uppercase text-sm text-muted-foreground">
                  {t('capabilities')}
                </h6>
                <ul className="mt-2.5 grid grid-cols-2 gap-3">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                      icon={component.icon}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </div>

              <div className="pl-4">
                <h6 className="pl-2.5 font-semibold uppercase text-sm text-muted-foreground">
                  {t('productFeatures')}
                </h6>
                <ul className="mt-2.5 grid gap-3">
                  {components.slice(0, 3).map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                      icon={component.icon}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{t('solutions')}</NavigationMenuTrigger>
          <NavigationMenuContent className="p-4">
            <h6 className="pl-2.5 font-semibold uppercase text-sm text-muted-foreground">
              {t('solutions')}
            </h6>
            <ul className="mt-2.5 grid w-[400px] gap-3 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                  icon={component.icon}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              {t('developers')}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon: LucideIcon }
>(({ className, title, children, icon: Icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="font-semibold tracking-tight leading-none flex items-center gap-2">
            <Icon className="h-5 w-5" />
            {title}
          </div>
          <p className="mt-2 line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
