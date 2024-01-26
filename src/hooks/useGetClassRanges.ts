import useSWR from "swr";
import {ApiClassRange} from "../interfaces/api/ClassRange";
import {fetcher} from "../utils/fetcher.ts";

export const useGetClassRanges = (tkn: string) => useSWR<ApiClassRange[]>("/class_range", fetcher(tkn));