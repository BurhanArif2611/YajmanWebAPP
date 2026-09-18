"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/api/catalog";
import { NAV_LINKS } from "@/lib/constants";
import { normalizeName } from "@/lib/utils";
import type { Category } from "@/types/api";

/** Primary paid categories that already have dedicated top-nav links. */
const PRIMARY_SERVICE_CATEGORY_NAMES = NAV_LINKS.filter((link) => link.category).map(
  (link) => normalizeName(link.category!)
);

export function isArticleCategory(category: Category) {
  return category.requires_payment === false || category.requires_pandit === false;
}

export function isPrimaryServiceCategory(category: Category) {
  return PRIMARY_SERVICE_CATEGORY_NAMES.includes(normalizeName(category.name));
}

/** Paid service categories that are not E-Puja / PanditJi At Home / Premium Puja. */
export function isOtherServiceCategory(category: Category) {
  return (
    category.requires_payment !== false &&
    !isArticleCategory(category) &&
    !isPrimaryServiceCategory(category)
  );
}

export function useArticleNavCategories() {
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 5 * 60_000,
  });

  return (categoriesQuery.data ?? []).filter(isArticleCategory);
}

export function useOtherServiceNavCategories() {
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 5 * 60_000,
  });

  return (categoriesQuery.data ?? []).filter(isOtherServiceCategory);
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
