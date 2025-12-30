// import { useState } from "react";
import { useSearchParams } from "react-router";

import { Heart } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomJumpBoton } from "@/components/custom/CustomJumpBoton";
import { HeroStats } from "@/heroes/components/HeroStats";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { use, useMemo } from "react";
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary";
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero";
import { FavoriteHeroContext } from "@/heroes/context/FavoriteHeroContext";

export const HomePage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { favoriteCount, favorites } = use(FavoriteHeroContext);

    const activeTab = searchParams.get("tab") ?? "all";
    const page = searchParams.get("page") ?? "1";
    const limit = searchParams.get("limit") ?? "6";
    const category = searchParams.get("category") ?? "all";

    const selectedTab = useMemo(() => {
        const validTabs = ["all", "favorites", "heroes", "villains"];
        return validTabs.includes(activeTab) ? activeTab : "all";
    }, [activeTab]);
    console.log(activeTab);

    // const [activeTab, setActiveTab] = useState<
    //     "all" | "favorites" | "heroes" | "villains"
    // >("all");

    // const { data: heroesResponse } = useQuery({
    //     queryKey: ["heroes", { page, limit }],
    //     queryFn: () => getHeroesByPageAction(+page, +limit),
    //     staleTime: 1000 * 60 * 5, // 5 minutos
    // });

    const { data: heroesResponse } = usePaginatedHero(+page, +limit, category);

    const { data: summary } = useHeroSummary();
    console.log({ heroesResponse });
    // useEffect(() => {
    //     getHeroesByPage().then();
    // });
    return (
        <>
            <>
                {/* Header */}
                <CustomJumpBoton
                    title="Universo de SuperHéroes"
                    description="Descubre, explora y administra super héroes y villanos"
                />
                <CustomBreadcrumbs currentPage="Super Héroes" />
                {/* Stats Dashboard */}
                <HeroStats />

                {/* Tabs */}
                <Tabs value={selectedTab} className="mb-8">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger
                            value="all"
                            onClick={() =>
                                setSearchParams((prev) => {
                                    prev.set("tab", "all");
                                    prev.set("category", "all");
                                    prev.set("page", "1");
                                    return prev;
                                })
                            }
                        >
                            All Characters ({summary?.totalHeroes})
                        </TabsTrigger>
                        <TabsTrigger
                            value="favorites"
                            className="flex items-center gap-2"
                            onClick={() =>
                                setSearchParams((prev) => {
                                    prev.set("tab", "favorites");
                                    return prev;
                                })
                            }
                        >
                            <Heart className="h-4 w-4" />
                            Favorites ({favoriteCount})
                        </TabsTrigger>
                        <TabsTrigger
                            value="heroes"
                            onClick={() =>
                                setSearchParams((prev) => {
                                    prev.set("tab", "heroes");
                                    prev.set("category", "hero");
                                    prev.set("page", "1");
                                    return prev;
                                })
                            }
                        >
                            Heroes ({summary?.heroCount})
                        </TabsTrigger>
                        <TabsTrigger
                            value="villains"
                            onClick={() =>
                                setSearchParams((prev) => {
                                    prev.set("tab", "villains");
                                    prev.set("category", "villain");
                                    prev.set("page", "1");
                                    return prev;
                                })
                            }
                        >
                            Villains ({summary?.villainCount})
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="all">
                        {/* Mostrar todos los personajes */}
                        <HeroGrid heroes={heroesResponse?.heroes ?? []} />
                    </TabsContent>
                    <TabsContent value="favorites">
                        {/* Mostrar todos los favoritos */}
                        <HeroGrid heroes={favorites} />
                    </TabsContent>
                    <TabsContent value="heroes">
                        {/* Mostrar todos los héroes */}
                        <HeroGrid heroes={heroesResponse?.heroes ?? []} />
                    </TabsContent>
                    <TabsContent value="villains">
                        {/* Mostrar todos los villanos */}
                        <HeroGrid heroes={heroesResponse?.heroes ?? []} />
                    </TabsContent>
                </Tabs>

                {/* Pagination */}
                {selectedTab !== "favorites" && (
                    <CustomPagination totalPages={heroesResponse?.pages ?? 1} />
                )}
            </>
        </>
    );
};
