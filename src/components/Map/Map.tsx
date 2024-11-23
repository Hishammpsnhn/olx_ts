import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadowUrl from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";
import "./Map.css";
import "leaflet/dist/leaflet.css";


const DefaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadowUrl,
});
L.Marker.prototype.options.icon = DefaultIcon;
interface LocationType{
    latitude: number
    longitude: number
}

const Map = ({location}:{location:LocationType}) => {
    const { latitude,longitude} = location
    console.log(latitude,longitude)
  const position: [number, number] = [latitude, longitude];

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <div className="mapContainer">
        <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
        ,
      </div>
    </div>
  );
};

export default Map;
