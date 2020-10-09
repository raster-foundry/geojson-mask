import * as GeoJSON from 'geojson';
import polygonClipping, { Geom } from 'polygon-clipping';

export default (
  feature:
    | GeoJSON.Feature<GeoJSON.MultiPolygon>
    | GeoJSON.Feature<GeoJSON.Polygon>
) => {
  const featureCoords = feature.geometry.coordinates as Geom;
  const worldCoords: Geom = [
    [
      [
        [180, 90],
        [-180, 90],
        [-180, -90],
        [180, -90],
        [180, 90],
      ],
    ],
  ];
  return {
    type: 'Feature',
    geometry: {
      type: 'MultiPolygon',
      coordinates: polygonClipping.difference(worldCoords, featureCoords),
    },
    properties: {},
  };
};
