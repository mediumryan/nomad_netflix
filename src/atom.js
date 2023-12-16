import { atom } from 'recoil';

export const menuState = atom({
    key: 'menu-state',
    default: false,
});

export const boxState = atom({
    key: 'box-is-loading',
    default: true,
});
