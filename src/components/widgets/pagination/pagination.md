## Default

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function PaginationDemo() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

## Primary Button

import { buttonVariants } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

export default function PaginationWithPrimaryButton() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            isActive
            className={cn(
              "shadow-none! hover:text-primary-foreground! dark:bg-primary dark:hover:bg-primary/90",
              buttonVariants({
                variant: "default",
                size: "icon",
              })
            )}
          >
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

## Secondary Button

import { buttonVariants } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

export default function PaginationWithSecondaryButton() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            isActive
            className={cn(
              "shadow-none! hover:text-secondary-foreground! border-none!",
              buttonVariants({
                variant: "secondary",
                size: "icon",
              })
            )}
          >
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

## Rounded Button

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const pages = [1, 2, 3];

export default function PaginationWithRoundedButton() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={`#${page}`}
              isActive={page === 2}
              className="rounded-full"
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

## With Icon

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

export default function PaginationWithIcon() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink href="#" aria-label="Go to previous page" size="icon">
            <ChevronsLeft className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" aria-label="Go to next page" size="icon">
            <ChevronsRight className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

## First and Last Page Buttons

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function PaginationWithFirstAndLastPageNavigation() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink href="#" aria-label="Go to first page" size="icon">
            <ChevronFirst className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" aria-label="Go to previous page" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" aria-label="Go to next page" size="icon">
            <ChevronRight className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" aria-label="Go to last page" size="icon">
            <ChevronLast className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

## Bordered

import { buttonVariants } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

const pages = [1, 2, 3];

export default function PaginationBordered() {
  return (
    <Pagination>
      <PaginationContent className="gap-0 border rounded-lg divide-x overflow-hidden">
        <PaginationItem>
          <PaginationPrevious href="#" className="rounded-none" />
        </PaginationItem>
        {pages.map((page) => {
          const isActive = page === 2;

          return (
            <PaginationItem key={page}>
              <PaginationLink
                href={`#${page}`}
                className={cn(
                  {
                    [buttonVariants({
                      variant: "default",
                      className:
                        "dark:bg-primary dark:hover:bg-primary/90 hover:text-primary-foreground!",
                    })]: isActive,
                  },
                  "rounded-none border-none"
                )}
                isActive={isActive}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext href="#" className="rounded-none" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

## Tabs

import { buttonVariants } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

const pages = [1, 2, 3];

export default function PaginationTabs() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" className="border" />
        </PaginationItem>

        {pages.map((page) => {
          const isActive = page === 2;

          return (
            <PaginationItem key={page}>
              <PaginationLink
                href={`#${page}`}
                isActive={page === 2}
                className={cn({
                  [buttonVariants({
                    variant: "default",
                    className:
                      "hover:text-primary-foreground! shadow-none! dark:bg-primary dark:hover:bg-primary/90",
                  })]: isActive,
                  border: !isActive,
                })}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext href="#" className="border" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

## Tabs Secondary

import { buttonVariants } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

const pages = [1, 2, 3];

export default function PaginationTabsSecondary() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            className="bg-secondary text-secondary-foreground"
          />
        </PaginationItem>

        {pages.map((page) => {
          const isActive = page === 2;

          return (
            <PaginationItem key={page}>
              <PaginationLink
                href={`#${page}`}
                isActive={page === 2}
                className={cn({
                  [buttonVariants({
                    variant: "default",
                    className:
                      "hover:text-primary-foreground! shadow-none! dark:bg-primary dark:hover:bg-primary/90",
                  })]: isActive,
                  "bg-secondary text-secondary-foreground": !isActive,
                })}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            href="#"
            className="bg-secondary text-secondary-foreground"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

## With Icon and Label

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

export default function PaginationWithIconAndLabel() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink
            href="#"
            aria-label="Go to previous page"
            size="default"
            className="gap-1 pl-2.5"
          >
            <ChevronsLeft className="h-4 w-4" />
            <span>Previous</span>
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            aria-label="Go to next page"
            size="default"
            className="gap-1 pr-2.5"
          >
            <span>Next</span>
            <ChevronsRight className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

## Numberless Pagination

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function PaginationNumberless() {
  return (
    <Pagination>
      <PaginationContent className="gap-0 border rounded-lg divide-x overflow-hidden">
        <PaginationItem>
          <PaginationPrevious href="#" className="rounded-none" />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" className="rounded-none" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

## Numberless with Text

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function PaginationNumberless() {
  return (
    <div className="w-full max-w-xs">
      <Pagination className="w-full">
        <PaginationContent className="w-full justify-between">
          <PaginationItem>
            <PaginationPrevious href="#" className="border" />
          </PaginationItem>
          <PaginationItem>
            <span className="text-sm text-muted-foreground">Page 1 of 21</span>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" className="border" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

## With ellipsis

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function PaginationWithEllipsis() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

## Table Pagination

"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React from "react";

export default function TablePagination() {
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page] = React.useState(1);
  const TOTAL_ITEMS = 100;

  return (
    <div className="w-full flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <Label className="whitespace-nowrap">Rows per page:</Label>
        <Select
          value={rowsPerPage.toString()}
          onValueChange={(rowsPerPage) => setRowsPerPage(+rowsPerPage)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground whitespace-nowrap">
          {(page - 1) * rowsPerPage + 1}-{page * rowsPerPage} of {TOTAL_ITEMS}
        </span>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                aria-label="Go to previous page"
                size="icon"
                variant="ghost"
                disabled={page === 1}
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                aria-label="Go to next page"
                size="icon"
                variant="ghost"
                disabled={page * rowsPerPage >= TOTAL_ITEMS}
              >
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
