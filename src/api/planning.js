import {
  GeoJSONLayer,
  getFlatCoordinatesFromGeometry,
  getGlobalHider,
  ViewPoint
} from '@vcmap/core';

class Planning {
  constructor(mapCollection) {
    this._layer = new GeoJSONLayer({
      url: 'data/geojson/section.json',
      style: {
        fill: {
          color: 'rgba(64, 157, 118, 0.8)',
        },
        stroke: {
          color: '#343434',
          width: 1,
        }
      }
    });
    mapCollection.layerCollection.add(this._layer);
    this._placedOnTerrain = false;
  }

  async _placeOnTerrain() {
    this._placedOnTerrain = true;
    const cesiumMap = vcs.context.mapCollection3D.activeMap;
    await this._layer.fetchData();
    await Promise.all(this._layer.getFeatures().map(async (f) => {
      const geom = f.getGeometry();
      const coords = geom.getCoordinates();
      const flatCoords = getFlatCoordinatesFromGeometry(geom, coords);
      await cesiumMap.getHeightFromTerrain(flatCoords);
      geom.setCoordinates(coords);
    }));
  }

  async activate() {
    if (!this._placedOnTerrain) {
      await this._placeOnTerrain();
    }
    await this._layer.activate();
    const globalHider = getGlobalHider();
    globalHider.hideObjects(this._layer.getFeatures().map(f => f.get('gmlid')));
    await vcs.context.gotoViewPoint(new ViewPoint({
      cameraPosition: [8.770312906001694, 50.808339997705865, 238.59608798360722],
      groundPosition: [8.769495096260183, 50.808519904208694, 209.80376226117326],
      heading: 289.14686536145757,
      pitch: -25.25985285999039,
      distance: 67,
      animate: true,
    }));
  }

  deactivate() {
    this._layer.deactivate();
    const globalHider = getGlobalHider();
    globalHider.showObjects(this._layer.getFeatures().map(f => f.get('gmlid')));
  }
}

export default Planning;
