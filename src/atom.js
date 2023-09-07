import { atom, selector } from 'recoil';

export const menuState = atom({
    key: 'menu-state',
    default: false,
});

export const offsetState = selector({
    key: 'media_query_offset',
    get: ({ get }) => {
        if (window.innerWidth > 1024) {
            return 6;
        } else if (window.innerWidth > 768) {
            return 3;
        } else if (window.innerWidth > 320) {
            return 2;
        }
    },
});
