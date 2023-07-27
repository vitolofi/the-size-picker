import React, { createContext, useContext, useState } from 'react';

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
    allSizes: Sizes;
    alturaMin:number;
    alturaMax:number;
    pesoMin:number;
    pesoMax:number;
    idadeMin:number;
    idadeMax:number;
    
};










export const SettingsContext = createContext<{
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
} | undefined>(undefined);

// Create a custom hook for accessing the settings context
export const useSettings = (): [Settings, React.Dispatch<React.SetStateAction<Settings>>] => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return [context.settings, context.setSettings];
};

type SettingsProviderProps = {
  children: React.ReactNode;
  initialSettings: Settings;
};

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children, initialSettings }) => {
  const [settings, setSettings] = useState<Settings>(initialSettings);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

// Create the provider component
// type SettingsProviderProps = {
//   children: React.ReactNode;
//   settings: Settings;
//   setSettings: React.Dispatch<React.SetStateAction<Settings>>
// };

// export const SettingsProvider: React.FC<SettingsProviderProps> = ({
//   children,
//   settings,
//   setSettings
// }) => {
//   return (
//     <SettingsContext.Provider value={{settings, setSettings}}>
//       {children}
//     </SettingsContext.Provider>
//   );
// };


// const SettingsContext = createContext<{
//   settings: Settings;
//   toggleSelfD: () => void;
// } | undefined>(undefined);

// export const useSettings = (): {
//   settings: Settings;
//   toggleSelfD: () => void;
// } => {
//   const context = useContext(SettingsContext);
//   if (!context) {
//     throw new Error('useSettings must be used within a SettingsProvider');
//   }
//   return context;
// };

// type SettingsProviderProps = {
//   children: React.ReactNode;
//   initialSettings: Settings;
// };

// export const SettingsProvider: React.FC<SettingsProviderProps> = ({
//   children,
//   initialSettings,
// }) => {
//   const [settings, setSettings] = useState<Settings>(initialSettings);

//   const toggleSelfD = () => {
//     setSettings((prevSettings) => ({
//       ...prevSettings,
//       selfD: !prevSettings.selfD,
//     }));
//   };

//   return (
//     <SettingsContext.Provider value={{ settings, toggleSelfD }}>
//       {children}
//     </SettingsContext.Provider>
//   );
// };