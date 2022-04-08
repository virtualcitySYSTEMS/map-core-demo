import { CesiumTilesetLayer, DeclarativeStyleItem, EventType, VcsEvent, VectorTileLayer } from '@vcmap/core';
import SelectInteraction from './selectInteraction.js';

const declarativeStyle = new DeclarativeStyleItem({
  declarativeStyle:{
    defines: {
      bFunction: 'regExp("\\d+_(\\d+)").exec(${attributes.function})',
    },
    color: {
      conditions: [
        ['${bFunction}===undefined', 'color("#707070")'],
        ['(Number(${bFunction})>=2000)&&(Number(${bFunction})<3000)', 'color("#FFCE00")'],
        ['(Number(${bFunction})>=3000)', 'color("#2196F3")'],
        ['true', 'color("#EDEDED")'],
      ],
    },
    strokeColor: 'color("#343434")'
  },
});

class InfoTool {
  constructor(mapCollection) {
    this._eventHandler = mapCollection.eventHandler;
    this._selectLayers = [...mapCollection.layerCollection].filter(l => l instanceof CesiumTilesetLayer || l instanceof VectorTileLayer);
    this._selectInteraction = new SelectInteraction(this._selectLayers);
    this._declarativeStyleSet = new VcsEvent();
  }

  get featureClicked() {
    return this._selectInteraction.featureClicked;
  }

  get declarativeStyleSet() {
    return this._declarativeStyleSet;
  }

  activate() {
    this._eventHandler.featureInteraction.setActive(EventType.CLICKMOVE);
    this._exclusiveListener = this._eventHandler.addExclusiveInteraction(this._selectInteraction, () => { this.deactivate(); });
  }

  deactivate() {
    this.featureClicked.raiseEvent();
    this._selectInteraction.clearSelection();
    this._eventHandler.featureInteraction.setActive();
    if (this._exclusiveListener) {
      this._exclusiveListener();
      this._exclusiveListener = null;
    }
  }

  setDeclarativeStyle() {
    this._selectLayers.forEach((l) => {
      l.setStyle(declarativeStyle);
    });
    this._declarativeStyleSet.raiseEvent(true);
  }

  setDefaultStyle() {
    this._selectLayers.forEach((l) => {
      l.setStyle(l.defaultStyle);
    });
    this._declarativeStyleSet.raiseEvent(false);
  }
}

export default InfoTool;
