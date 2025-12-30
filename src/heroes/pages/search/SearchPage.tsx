import { CustomJumpBoton } from "@/components/custom/CustomJumpBoton";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { useQuery } from "@tanstack/react-query";
import { searchHeroesAction } from "@/heroes/actions/search-heros.action";
import { useSearchParams } from "react-router";
import { HeroGrid } from "@/heroes/components/HeroGrid";

export const SearchPage = () => {
    const [searchParams] = useSearchParams();

    const name = searchParams.get("name") ?? undefined;
    // const category = searchParams.get("category");
    // const team = searchParams.get("team");
    // const universe = searchParams.get("universe");
    const strength = searchParams.get("strength") ?? undefined;

    const { data: heroes = [] } = useQuery({
        queryKey: ["search", { name, strength }],
        queryFn: () => searchHeroesAction({ name, strength }),
        staleTime: 1000 * 60 * 5, // 5 minutos
    });
    return (
        <>
            <CustomJumpBoton
                title="Búsqueda de SuperHéroes"
                description="Descubre, explora y administra super héroes y villanos"
            />

            <CustomBreadcrumbs
                currentPage="Buscador de Héroes"
                // breadcrumbs={[
                //     { label: "Home1", to: "/" },
                //     { label: "Home2", to: "/" },
                //     { label: "Home3", to: "/" },
                // ]}
            />
            {/* Stats Dashboard */}
            <HeroStats />

            {/* Filter and search */}
            <SearchControls />
            {/*  */}
            <HeroGrid heroes={heroes} />
        </>
    );
};

export default SearchPage;
