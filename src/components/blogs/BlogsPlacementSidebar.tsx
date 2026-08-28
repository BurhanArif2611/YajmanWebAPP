import { BlogSidebar } from "@/components/blogs/BlogSidebar";
import { getServicePlacements } from "@/lib/api/servicePlacements";
import {
  getPlacementHeading,
  mapPlacementToBlogSidebarItem,
  sortPlacements,
} from "@/lib/mappers/servicePlacement";

export async function BlogsPlacementSidebar() {
  try {
    const placements = sortPlacements(
      await getServicePlacements({ page: "blogs", section: "sidebar", limit: 5 })
    );
    const services = placements.map(mapPlacementToBlogSidebarItem);
    const heading = getPlacementHeading(placements, "Other Top Rated Services");

    return <BlogSidebar heading={heading} services={services} />;
  } catch {
    return null;
  }
}
