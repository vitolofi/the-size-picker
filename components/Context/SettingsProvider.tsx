import React, { createContext, useContext } from 'react';

// Define the type for your settings object
export type SizeRange = {
    min: number;
    med: number;
    max: number;
  };
  
export type SizeInfo = {
    busto: SizeRange;
    cintura: SizeRange;
    quadril: SizeRange;
  };
  
 export type Sizes = {

    PP: SizeInfo;
    P: SizeInfo;
    M: SizeInfo;
    G: SizeInfo;
    GG: SizeInfo;
    XG: SizeInfo;
  };
export type Settings = {
    allPossibleCategories: string[];
    imcRanges: number[];
    allSizesNames: string[];
    allDescriptions: string[];
    allColors: string[];
    selfD: boolean;
    allSizes: Sizes;
    alturaMin:number;
    alturaMax:number;
    pesoMin:number;
    pesoMax:number;
    idadeMin:number;
    idadeMax:number;
};










// Create the context
const SettingsContext = createContext<Settings | undefined>(undefined);

// Create a custom hook for accessing the settings context
export const useSettings = (): Settings => {
  const settings = useContext(SettingsContext);
  if (!settings) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return settings;
};

// Create the provider component
type SettingsProviderProps = {
  children: React.ReactNode;
  settings: Settings;
};

export const SettingsProvider: React.FC<SettingsProviderProps> = ({
  children,
  settings,
}) => {
  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
};