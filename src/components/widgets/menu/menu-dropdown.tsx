'use client';

// import { Logo } from "@/components/logo";
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
import { useTranslations } from "next-intl";
import Link from "next/link";
import * as React from "react";

export default function MenuDropdownDemo() {
  const t = useTranslations('widgets.menu.dropdown');

  const components: { title: string; href: string; description: string }[] = [
    {
      title: t('alertDialog.title'),
      href: "/docs/primitives/alert-dialog",
      description: t('alertDialog.description'),
    },
    {
      title: t('hoverCard.title'),
      href: "/docs/primitives/hover-card",
      description: t('hoverCard.description'),
    },
    {
      title: t('progress.title'),
      href: "/docs/primitives/progress",
      description: t('progress.description'),
    },
    {
      title: t('scrollArea.title'),
      href: "/docs/primitives/scroll-area",
      description: t('scrollArea.description'),
    },
    {
      title: t('tabs.title'),
      href: "/docs/primitives/tabs",
      description: t('tabs.description'),
    },
    {
      title: t('tooltip.title'),
      href: "/docs/primitives/tooltip",
      description: t('tooltip.description'),
    },
  ];

  return (
    <NavigationMenu className="z-20">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{t('gettingStarted')}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-1 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-linear-to-b from-muted/50 to-muted p-4 no-underline outline-hidden focus:shadow-md"
                    href="/"
                  >
                    <div className="h-8 w-8 bg-primary rounded flex items-center justify-center text-white font-bold">
                      S
                    </div>
                    <div className="mb-2 mt-4 text-lg font-medium">
                      {t('shadcnTitle')}
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      {t('shadcnDescription')}
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title={t('introduction.title')}>
                {t('introduction.description')}
              </ListItem>
              <ListItem href="/docs/installation" title={t('installation.title')}>
                {t('installation.description')}
              </ListItem>
              <ListItem href="/docs/primitives/typography" title={t('typography.title')}>
                {t('typography.description')}
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{t('components')}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-1 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
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
              {t('documentation')}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
