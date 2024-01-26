export default interface LessonTime {
    start: string;
    end: string;
    uuid?: string;
    start_hour: number;
    start_minute: number;
    end_hour: number;
    end_minute: number;
    start_timestamp?: number;
    end_timestamp?: number;
}