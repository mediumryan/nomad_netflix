import { atom } from 'recoil';

export const menuState = atom({
    key: 'menu-state',
    default: false,
});

export const detailIsStory = atom({
    key: 'detail-is-story',
    default: false,
});
