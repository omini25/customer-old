import { FC } from 'react';
import ReactMapboxGl, { Feature, Layer, Marker, ZoomControl } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { BxCurrentLocation } from 'components/icons';

type DeviceLocationProps = {
  longitude: string;
  latitude: string;
  update: () => void;
};

const DeviceLocation: FC<DeviceLocationProps> = ({ longitude, latitude, update }) => {
  const coordinates: [number, number] = [parseFloat(latitude), parseFloat(longitude)];
  const Map = ReactMapboxGl({
    accessToken:
      'pk.eyJ1IjoiZmFyYXlvbGFqIiwiYSI6ImNreXk5OXh6czBrYXYyb3F2cjY2dzJyNDYifQ.OlFDTEqsz37RTfBIRTXY4A',
  });

  return coordinates[0] && coordinates[1] ? (
    <div className="w-full">
      <div className="h-[35rem] w-full">
        <Map
          style="mapbox://styles/mapbox/streets-v9"
          center={coordinates}
          className="h-full w-full"
          zoom={[15]}
        >
          <Marker coordinates={coordinates} anchor="bottom">
            <div className="h-4 w-4 rounded-full bg-daabo-primary" />
          </Marker>
          <ZoomControl />
        </Map>
      </div>
      <div className="mt-6 flex flex-col gap-2">
        <h5 className="text-xs font-medium">Device Location</h5>
        <span className="text-xs text-daabo-grey">
          Click the button below to locate your device.
        </span>
        <button
          className="daabo-primary-button flex w-fit items-center gap-1 bg-[#4caf50]"
          onClick={update}
        >
          <BxCurrentLocation className="text-base" />
          <span className="font-medium] text-xs">Update Location</span>
        </button>
      </div>
    </div>
  ) : (
    <div className="flex w-full place-content-center p-8">Location is not known</div>
  );
};

export default DeviceLocation;
