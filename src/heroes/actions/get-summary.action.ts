import { heroApi } from "../api/hero.api";
import type { SummaryInformationResponse } from "../types/summary-information";

export const getSummaryAction = async () => {
    const { data } = await heroApi.get<SummaryInformationResponse>("/summary");

    return data;
};
