import {Cache} from "swr";

export function localStorageProvider(): Cache {
    // При инициализации мы восстанавливаем данные из `localStorage` в Map.
    const map = new Map(JSON.parse(localStorage.getItem('app-cache') || '[]'));

    // Перед выгрузкой приложения мы записываем все данные обратно в `localStorage`.
    window.addEventListener('beforeunload', () => {
        const appCache = JSON.stringify(Array.from(map.entries()));
        localStorage.setItem('app-cache', appCache);
    })

    // Мы по-прежнему используем map для записи и чтения для производительности.
    return map as Cache;
}