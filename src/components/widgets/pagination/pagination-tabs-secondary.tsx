'use client';

import { useTranslations } from "next-intl";
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

export default function PaginationTabsSecondary() {
  const t = useTranslations('widgets.pagination.items');
  const pages = [1, 2, 3];

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
