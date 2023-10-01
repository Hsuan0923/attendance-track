import { useLoadScript, GoogleMap, MarkerF } from '@react-google-maps/api';
import { useEffect, useMemo, useState } from 'react';

const Map = (props: { lat: any; lng: any; }) => {
  const libraries = useMemo(() => ['places'], []);
  const [mapCenter, setMapCenter] = useState({ lat: props.lat, lng: props.lng });

  useEffect(() => {
    // 當 props.lat 或 props.lng 改變時，更新 mapCenter 的值
    setMapCenter({ lat: props.lat, lng: props.lng });
  }, [props.lat, props.lng]);

  console.log("lat",props.lat);
  console.log("lng",typeof(123));
  console.log("map: ", mapCenter);

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false,
    }),
    []
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    libraries: libraries as any,
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <GoogleMap
        options={mapOptions}
        zoom={14}
        center={mapCenter}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{ width: '700px', height: '400px' }}
        onLoad={(map) => console.log('Map Loaded')}
        >
        <MarkerF position={mapCenter} onLoad={() => console.log('Marker Loaded')} />
      </GoogleMap>
    </div>
  );
};

export default Map;