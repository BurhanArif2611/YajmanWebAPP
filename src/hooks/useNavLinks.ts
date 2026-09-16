"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/api/catalog";
import { NAV_LINKS } from "@/lib/constants";
import { normalizeName } from "@/lib/utils";
import type { Category } from "@/types/api";

export function isArticleCategory(category: Category) {
  return category.requires_payment === false || category.requires_pandit === false;
}

export function useArticleNavCategories() {
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 5 * 60_000,
  });

  return (categoriesQuery.data ?? []).filter(isArticleCategory);
}

/** Resolves the header's category nav links to live category ids, same as BestSellers' tabs. */
export function useNavLinks() {
  // Shares the ["categories"] cache with CategorySection/BestSellers so this doesn't refetch.
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 5 * 60_000,
  });

  return NAV_LINKS.map((link) => {
    if (!link.category) return link;

    const match = categoriesQuery.data?.find(
      (c) => normalizeName(c.name) === normalizeName(link.category!)
    );

    if (!match) return link;

    // Payment-free categories live under Articles instead of the paid service listing.
    const href = match.requires_payment === false
      ? `/articles?category=${match.id}`
      : `/services?category=${match.id}`;
    return { ...link, href };
  });
}
