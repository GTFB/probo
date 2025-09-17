'use client';

import { useTranslations } from "next-intl";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function PaginationNumberlessText() {
  const t = useTranslations('widgets.pagination.items');

  return (
    <div className="w-full">
      <Pagination className="w-full">
        <PaginationContent className="w-full justify-between">
          <PaginationItem>
            <PaginationPrevious href="#" className="border" />
          </PaginationItem>
          <PaginationItem>
            <span className="text-sm text-muted-foreground">{t('pageInfo', { current: 1, total: 21 })}</span>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" className="border" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
