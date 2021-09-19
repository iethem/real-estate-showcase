import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { useLoader } from "./useLoader";
import request from "./request";
import { API_PROPERTY } from "./paths";

interface Props {
  children: ReactNode;
}

interface Property {
  title: string;
  id: string;
  province: string;
  price: number;
  flatFloor: string;
  squareMeter: number;
  roomCount: number;
  bathroomCount: number;
  latitude: number;
  longitude: number;
  mainPhotoURL: string;
  createdDate: string;
}

interface IPropertyListContext {
  propertyList: Property[];
  error: any;
}

export const PropertyListContext = createContext({} as IPropertyListContext);

export const usePropertyList = () => useContext(PropertyListContext);

const formatPropertyDate = (property: Property) => ({
  ...property,
  createdDate: new Date(property.createdDate).getTime(),
});

// This context provider is passed to any component requiring the context
export const PropertyListProvider = ({ children }: Props) => {
  const [propertyList, setPropertyList] = useState<Array<Property>>([]);
  const [error, setError] = useState(undefined);
  const { toggleLoader } = useLoader();

  useEffect(() => {
    toggleLoader(true);
    request(API_PROPERTY, { method: "GET" })
      .then((res) => {
        if (res?.length) {
          const formattedProperties = res.map(formatPropertyDate);
          setPropertyList(formattedProperties);
        }
        toggleLoader(false);
      })
      .catch((err) => {
        toggleLoader(false);
        setError(err);
      });
  }, []);

  return (
    <PropertyListContext.Provider value={{ propertyList, error }}>
      {children}
    </PropertyListContext.Provider>
  );
};
