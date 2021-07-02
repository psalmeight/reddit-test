import { createContext } from "react";
import { r } from "../utils/config";
export const SnowWrapContext = createContext(r);
export const SnowWrapProvider = SnowWrapContext.Provider;
