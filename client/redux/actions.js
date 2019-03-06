import { TOGGLE_DRAWER, MENU_LOAD , MENU_LOADED, MENU_CLICK, MODULE_CLICK, GQL_LOAD, GQL_LOADED } from "./actionTypes";

export const toggleDrawer = () => ({
  type: TOGGLE_DRAWER
});

export const menu_load = (content) => ({
  type: MENU_LOAD
});


export const menu_loaded = (content) => ({
  type: MENU_LOADED,
  payload: content
});

export const menuClick = (content) => ({
  type: MENU_CLICK,
  payload: content
});

export const moduleClick = (content) => ({
  type: MODULE_CLICK,
  payload: content
});


export const gql_load = (content) => ({
  type: GQL_LOAD
});


export const gql_received = (content) => ({
  type: GQL_LOADED,
  payload: content
});