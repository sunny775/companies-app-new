import React, { ReactNode } from "react";
import { Animation } from "../sharedTypes";

type id = string;
type valueType = string | number;
type isInitial = boolean;
type orientation = "horizontal" | "vertical";
type indicatorProps = Record<string, unknown>;

export enum TabsActionType {
  SET_ID = "SET_ID",
  SET_ACTIVE = "SET_ACTIVE",
  SET_ANIMATION = "SET_ANIMATION",
  SET_INDICATOR = "SET_INDICATOR",
  SET_IS_INITIAL = "SET_IS_INITIAL",
  SET_ORIENTATION = "SET_ORIENTATION",
}

export type Action =
  | { type: TabsActionType.SET_ID; value: id }
  | { type: TabsActionType.SET_ACTIVE; value: valueType }
  | { type: TabsActionType.SET_ANIMATION; value: Animation }
  | { type: TabsActionType.SET_INDICATOR; value: indicatorProps }
  | { type: TabsActionType.SET_IS_INITIAL; value: isInitial }
  | { type: TabsActionType.SET_ORIENTATION; value: orientation };

interface State {
  id: id;
  active: valueType;
  isInitial: isInitial;
  orientation?: orientation;
  appliedAnimation: Animation;
  indicatorProps?: indicatorProps;
}

type Dispatch = React.ActionDispatch<[Action]>;


export interface TabsContextType {
  state: State;
  dispatch: Dispatch
}

export interface TabsContextProviderProps {
  id?: id;
  value: valueType;
  orientation?: orientation;
  children: ReactNode;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case TabsActionType.SET_ID:
      return { ...state, id: action.value };
    case TabsActionType.SET_ACTIVE:
      return { ...state, active: action.value };
    case TabsActionType.SET_ANIMATION:
      return { ...state, appliedAnimation: action.value };
    case TabsActionType.SET_INDICATOR:
      return { ...state, indicatorProps: action.value };
    case TabsActionType.SET_IS_INITIAL:
      return { ...state, isInitial: action.value };
    case TabsActionType.SET_ORIENTATION:
      return { ...state, orientation: action.value };
    default:
      throw new Error(`Unhandled action type: ${String((action as { type: string }).type)}`);
  }
}

export const TabsContext = React.createContext<TabsContextType | null>(null);

export function useTabs() {
  const context = React.useContext(TabsContext);

  if (!context) {
    throw new Error("useTabs() must be used within a Tabs.");
  }

  return context;
}

export const TabsContextProvider = ({ id, value, orientation, children }: TabsContextProviderProps) => {
  const initialState = React.useMemo(
    () => ({
      id: id ?? "indicator",
      active: value,
      orientation,
      isInitial: true,
      appliedAnimation: {
        initial: {},
        unmount: {},
        mount: {},
      },
    }),
    [id, value, orientation]
  );

  const [state, dispatch] = React.useReducer(reducer, initialState);
  const contextValue = React.useMemo(() => ({ state, dispatch }), [state]);

  return <TabsContext.Provider value={contextValue}>{children}</TabsContext.Provider>;
};

export const setId = (dispatch: Dispatch, value: id) => dispatch({ type: TabsActionType.SET_ID, value });

export const setActive = (dispatch: Dispatch, value: valueType) => dispatch({ type: TabsActionType.SET_ACTIVE, value });

export const setAnimation = (dispatch: Dispatch, value: Animation) =>
  dispatch({ type: TabsActionType.SET_ANIMATION, value });

export const setIndicator = (dispatch: Dispatch, value: indicatorProps) =>
  dispatch({ type: TabsActionType.SET_INDICATOR, value });

export const setIsInitial = (dispatch: Dispatch, value: isInitial) =>
  dispatch({ type: TabsActionType.SET_IS_INITIAL, value });

export const setOrientation = (dispatch: Dispatch, value: orientation) =>
  dispatch({ type: TabsActionType.SET_ORIENTATION, value });
