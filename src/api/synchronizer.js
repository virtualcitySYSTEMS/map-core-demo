import { CesiumMap, OpenlayersMap, VcsEvent } from '@vcmap/core';

class Synchronizer {
  constructor(map1, map2) {
    this._focusedMap = map1;
    this._minion = map2;
    this._map1 = map1;
    this._map2 = map2;
    this._cachedVP = map1.getViewPointSync();
    this._tracker = null;
    this._vpChanged = new VcsEvent();
    this.suspend = false;
  }

  get currentVP() {
    return this._cachedVP;
  }

  get currentMap() {
    return this._focusedMap;
  }

  get vpChanged() {
    return this._vpChanged;
  }

  _clearTracking() {
    if (this._tracker) {
      this._tracker();
      this._tracker = null;
    }
  }

  async _listener() {
    if (this.suspend) {
      return;
    }
    const vp = await this._focusedMap.getViewPoint();
    if (vp.equals(this._cachedVP)) {
      return;
    }
    this._cachedVP = vp.clone();
    if (this._minion instanceof CesiumMap) {
      const minionVp = this._minion.getViewPointSync();
      vp.pitch = minionVp.pitch;
      vp.roll = minionVp.roll;
    }
    await this._minion.gotoViewPoint(vp);
    this._vpChanged.raiseEvent(vp);
  }

  _track() {
    this._clearTracking();
    const listener = this._listener.bind(this);
    if (this._focusedMap instanceof CesiumMap) {
      this._tracker = this._focusedMap.getScene().postRender.addEventListener(listener);
    } else if (this._focusedMap instanceof OpenlayersMap) {
      const { olMap } = this._focusedMap;
      olMap.on('postrender', listener);
      this._tracker = () => olMap.un('postrender', listener);
    }
  }

  setFocusedMap(map) {
    if (map === this._focusedMap) {
      return;
    }

    if (map === this._map1) {
      this._focusedMap = this._map1;
      this._minion = this._map2;
    } else if (map === this._map2) {
      this._focusedMap = this._map2;
      this._minion = this._map1;
    } else {
      this._focusedMap = null;
      this._minion = null;
    }

    this._track();
  }

  destroy() {
    this._clearTracking();
    this._vpChanged.destroy();
    this._map1 = null;
    this._map2 = null;
    this._focusedMap = null;
    this._minion = null;
  }
}

export default Synchronizer;
