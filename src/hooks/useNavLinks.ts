"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/api/catalog";
import { NAV_LINKS } from "@/lib/constants";
import { normalizeName } from "@/lib/utils";

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

    return match ? { ...link, href: `/services?category=${match.id}` } : link;
  });
}
