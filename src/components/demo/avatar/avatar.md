## Default

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AvatarDemo() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}

## Clickable 

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function ClickableAvatarDemo() {
  return (
    <Link href="https://github.com/shadcn" target="_blank">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </Link>
  );
}

## Tooltip

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function AvatarWithTooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </TooltipTrigger>
      <TooltipContent className="font-semibold">shadcn</TooltipContent>
    </Tooltip>
  );
}

## With Text

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AvatarDemo() {
  return (
    <div className="flex items-start gap-3">
      <Avatar className="size-9">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1">
        <span className="font-semibold tracking-tight leading-none">
          shadcn
        </span>
        <span className="leading-none text-sm text-muted-foreground">
          Shadcn UI
        </span>
      </div>
    </div>
  );
}

## Hover Card

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CalendarIcon } from "lucide-react";

export default function AvatarHoverCardDemo() {
  return (
    <HoverCard>
      <HoverCardTrigger className="cursor-pointer">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </HoverCardTrigger>
      <HoverCardContent className="w-full max-w-xs">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@shadcn</h4>
            <p className="text-sm">
              The founder of Shadcn UI. I own a computer.
            </p>
            <div className="flex items-center pt-2">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined December 2021
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

## Size

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AvatarSizeDemo() {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="size-8">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar className="size-10">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar className="size-11">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar className="size-12">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar className="size-14">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}

## Fallback

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BuildingIcon, StoreIcon, UserRoundIcon } from "lucide-react";

export default function AvatarFallbackDemo() {
  return (
    <div className="grid gap-5">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarFallback className="bg-indigo-500/25 text-indigo-500">
            C
          </AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback className="bg-indigo-500/25 text-indigo-500">
            CN
          </AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback className="bg-indigo-500/25 text-indigo-500">
            <UserRoundIcon className="size-4.5" />
          </AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback className="bg-indigo-500/25 text-indigo-500">
            <BuildingIcon className="size-4.5" />
          </AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback className="bg-indigo-500/25 text-indigo-500">
            <StoreIcon className="size-4.5" />
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

## Color

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function AvatarColorDemo() {
  return (
    <div className="grid gap-4">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarFallback className="bg-slate-500 text-white">C</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback className="bg-indigo-500 text-white">
            C
          </AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback className="bg-rose-500 text-white">C</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback className="bg-cyan-500 text-white">C</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback className="bg-green-500 text-white">C</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarFallback className="bg-slate-500/25 text-slate-500">
            C
          </AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback className="bg-indigo-500/25 text-indigo-500">
            C
          </AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback className="bg-rose-500/25 text-rose-500">
            C
          </AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback className="bg-cyan-500/25 text-cyan-500">
            C
          </AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback className="bg-green-500/25 text-green-500">
            C
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

## Shape

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function AvatarShapeDemo() {
  return (
    <div className="grid gap-5">
      <div className="flex items-center gap-4">
        <Avatar className="rounded-none">
          <AvatarFallback className="rounded-none bg-indigo-500 text-white">
            A
          </AvatarFallback>
        </Avatar>
        <Avatar className="rounded-md">
          <AvatarFallback className="rounded-lg bg-indigo-500 text-white">
            A
          </AvatarFallback>
        </Avatar>
        <Avatar className="rounded-full">
          <AvatarFallback className="rounded-full bg-indigo-500 text-white">
            A
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex items-center gap-4">
        <Avatar className="rounded-none">
          <AvatarFallback className="rounded-none bg-indigo-500/25 text-indigo-500">
            A
          </AvatarFallback>
        </Avatar>
        <Avatar className="rounded-md">
          <AvatarFallback className="rounded-lg bg-indigo-500/25 text-indigo-500">
            A
          </AvatarFallback>
        </Avatar>
        <Avatar className="rounded-full">
          <AvatarFallback className="rounded-full bg-indigo-500/25 text-indigo-500">
            A
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

## With Ring

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AvatarRing() {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="ring-2 ring-ring ring-offset-2 ring-offset-background">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback className="rounded-none">ER</AvatarFallback>
      </Avatar>
      <Avatar className="ring-2 ring-green-500 ring-offset-2 ring-offset-background">
        <AvatarImage src="https://github.com/leerob.png" alt="@evilrabbit" />
        <AvatarFallback className="rounded-md">LR</AvatarFallback>
      </Avatar>
      <div className="bg-gradient-to-b from-red-500 to-blue-500 rounded-full p-1">
        <Avatar className="ring-2 ring-background">
          <AvatarImage
            src="https://github.com/evilrabbit.png"
            alt="@evilrabbit"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

## Status

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AvatarWithStatusDemo() {
  return (
    <div className="flex items-center gap-3">
      {/* Online */}
      <div className="relative">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="size-2 ring-2 ring-background rounded-full bg-green-500 absolute bottom-0 right-0"></div>
      </div>

      {/* DND */}
      <div className="relative">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="size-2 ring-2 ring-background rounded-full bg-red-500 absolute bottom-0 right-0"></div>
      </div>

      {/* Busy */}
      <div className="relative">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="size-2 ring-2 ring-background rounded-full bg-yellow-500 absolute bottom-0 right-0"></div>
      </div>

      {/* Offline */}
      <div className="relative">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="size-2 ring-2 ring-background border-2 border-muted-foreground rounded-full bg-background absolute bottom-0 right-0"></div>
      </div>
    </div>
  );
}

## Badge

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BadgeCheck, BadgeMinus, BadgeX } from "lucide-react";

export default function AvatarBadge() {
  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <Avatar className="size-10">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-0.5 -right-0.5 size-3.5 ring-2 ring-background rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center leading-none">
          3
        </div>
      </div>
      <div className="relative">
        <Avatar className="size-10">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <BadgeCheck className="absolute -bottom-1 -right-1 size-4.5 rounded-full fill-blue-500 text-white"></BadgeCheck>
      </div>
      <div className="relative">
        <Avatar className="size-10">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <BadgeMinus className="absolute -bottom-1 -right-1 size-4.5 rounded-full fill-amber-500 text-white"></BadgeMinus>
      </div>
      <div className="relative">
        <Avatar className="size-10">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <BadgeX className="absolute -bottom-1 -right-1 size-4.5 rounded-full fill-red-500 text-white"></BadgeX>
      </div>
    </div>
  );
}

## Group

import * as React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type AvatarProps = React.ComponentProps<typeof Avatar>;

interface AvatarGroupProps extends React.ComponentProps<"div"> {
  children: React.ReactElement<AvatarProps>[];
  max?: number;
}

const AvatarGroup = ({
  children,
  max,
  className,
  ...props
}: AvatarGroupProps) => {
  const totalAvatars = React.Children.count(children);
  const displayedAvatars = React.Children.toArray(children)
    .slice(0, max)
    .reverse();
  const remainingAvatars = max ? Math.max(totalAvatars - max, 1) : 0;

  return (
    <div
      className={cn("flex items-center flex-row-reverse", className)}
      {...props}
    >
      {remainingAvatars > 0 && (
        <Avatar className="-ml-2 hover:z-10 relative ring-2 ring-background">
          <AvatarFallback className="bg-muted-foreground text-white">
            +{remainingAvatars}
          </AvatarFallback>
        </Avatar>
      )}
      {displayedAvatars.map((avatar, index) => {
        if (!React.isValidElement(avatar)) return null;

        return (
          <div key={index} className="-ml-2 hover:z-10 relative">
            {React.cloneElement(avatar as React.ReactElement<AvatarProps>, {
              className: "ring-2 ring-background",
            })}
          </div>
        );
      })}
    </div>
  );
};

export default function AvatarGroupDemo() {
  return (
    <AvatarGroup>
      <Avatar className="-ml-2 first:ml-0 cursor-pointer">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback className="bg-indigo-500 text-white">CN</AvatarFallback>
      </Avatar>
      <Avatar className="-ml-2 first:ml-0 cursor-pointer">
        <AvatarFallback className="bg-green-600 text-white">CN</AvatarFallback>
      </Avatar>
      <Avatar className="-ml-2 first:ml-0 cursor-pointer">
        <AvatarFallback className="bg-red-500 text-white">AB</AvatarFallback>
      </Avatar>
      <Avatar className="-ml-2 first:ml-0 cursor-pointer">
        <AvatarFallback className="bg-indigo-500 text-white">VK</AvatarFallback>
      </Avatar>
      <Avatar className="-ml-2 first:ml-0 cursor-pointer">
        <AvatarFallback className="bg-orange-500 text-white">RS</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  );
}

## Group max avatar

import * as React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type AvatarProps = React.ComponentProps<typeof Avatar>;

interface AvatarGroupProps extends React.ComponentProps<"div"> {
  children: React.ReactElement<AvatarProps>[];
  max?: number;
}

const AvatarGroup = ({
  children,
  max,
  className,
  ...props
}: AvatarGroupProps) => {
  const totalAvatars = React.Children.count(children);
  const displayedAvatars = React.Children.toArray(children)
    .slice(0, max)
    .reverse();
  const remainingAvatars = max ? Math.max(totalAvatars - max, 1) : 0;

  return (
    <div
      className={cn("flex items-center flex-row-reverse", className)}
      {...props}
    >
      {remainingAvatars > 0 && (
        <Avatar className="-ml-2 hover:z-10 relative ring-2 ring-background">
          <AvatarFallback className="bg-muted-foreground text-white">
            +{remainingAvatars}
          </AvatarFallback>
        </Avatar>
      )}
      {displayedAvatars.map((avatar, index) => {
        if (!React.isValidElement(avatar)) return null;

        return (
          <div key={index} className="-ml-2 hover:z-10 relative">
            {React.cloneElement(avatar as React.ReactElement<AvatarProps>, {
              className: "ring-2 ring-background",
            })}
          </div>
        );
      })}
    </div>
  );
};

export default function AvatarGroupMaxAvatarDemo() {
  return (
    <AvatarGroup className="flex items-center" max={3}>
      <Avatar className="-ml-2 first:ml-0 cursor-pointer">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback className="bg-indigo-500 text-white">CN</AvatarFallback>
      </Avatar>
      <Avatar className="-ml-2 first:ml-0 cursor-pointer">
        <AvatarFallback className="bg-green-600 text-white">CN</AvatarFallback>
      </Avatar>
      <Avatar className="-ml-2 first:ml-0 cursor-pointer">
        <AvatarFallback className="bg-red-500 text-white">AB</AvatarFallback>
      </Avatar>
      <Avatar className="-ml-2 first:ml-0 cursor-pointer">
        <AvatarFallback className="bg-indigo-500 text-white">VK</AvatarFallback>
      </Avatar>
      <Avatar className="-ml-2 first:ml-0 cursor-pointer">
        <AvatarFallback className="bg-orange-500 text-white">RS</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  );
}
