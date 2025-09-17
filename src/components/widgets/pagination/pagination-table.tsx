'use client';

import { useTranslations } from "next-intl";
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

export default function PaginationTable() {
  const t = useTranslations('widgets.pagination.table');
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page] = React.useState(1);
  const TOTAL_ITEMS = 100;

  return (
    <div className="w-full flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <Label className="whitespace-nowrap">{t('rowsPerPage')}:</Label>
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
          {t('showingItems', { 
            start: (page - 1) * rowsPerPage + 1, 
            end: page * rowsPerPage, 
            total: TOTAL_ITEMS 
          })}
        </span>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                aria-label={t('goToPreviousPage')}
                size="icon"
                variant="ghost"
                disabled={page === 1}
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                aria-label={t('goToNextPage')}
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
