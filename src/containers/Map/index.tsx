import { useState } from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";

import Image from "components/Image";
import logo from "images/tiko-marker.svg";

interface Props {
  items: any;
}

// TODO API_KEY should be taken as an environment variable
const GOOGLE_MAPS_API_KEY = "AIzaSyAYlHbgsjLmDf_G9Ta3g1jjy1wuoq5h4RI";

const Map = compose<Props, Props>(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props: any) => {
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  return (
    <GoogleMap
      defaultZoom={5}
      defaultCenter={{ lat: 39.531147292391815, lng: -3.323847539664942 }} // for Spain
    >
      {props.items?.map((item: any, index: number) => (
        <Marker
          key={`${item.title}:${index}`}
          position={{ lat: item.latitude, lng: item.longitude }}
          icon={{
            url: logo,

            scaledSize: { width: 32, height: 32 },
          }}
          onClick={() => {
            setSelectedProperty(item);
          }}
        />
      ))}

      {selectedProperty && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedProperty(null);
          }}
          position={{
            lat: selectedProperty.latitude,
            lng: selectedProperty.longitude,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <Image
              width={128}
              height="auto"
              src={selectedProperty.mainPhotoURL}
              alt={selectedProperty.title}
            />
            <div>{selectedProperty.title}</div>
            <div>
              <b>Province:</b> {selectedProperty.province}
            </div>
            <div>
              <b>Price:</b> {selectedProperty.price}
            </div>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
});

export default Map;
