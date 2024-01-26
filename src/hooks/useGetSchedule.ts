import useSWR from "swr";
import LessonTime from "../interfaces/api/LessonTime";
import {fetcher} from "../utils/fetcher.ts";

export const useGetSchedule = (class_range: string, day: number, tkn: string) => useSWR<LessonTime[]>(`/schedule/${class_range}/${day}`, fetcher(tkn));