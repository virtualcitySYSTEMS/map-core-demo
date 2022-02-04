import {
  AbstractInteraction,
  EventType,
  VcsEvent,
  VectorStyleItem,
} from '@vcmap/core';

const selectStyle = new VectorStyleItem({
  fill: { color: '#409D76' },
  stroke: {
    color: '#343434',
    width: 1,
  },
});

const highlightStyle = new VectorStyleItem({
  fill: { color: '#707070'},
  stroke: {
    color: '#343434',
    width: 1,
  },
});

class SelectInteraction extends AbstractInteraction {
  constructor(layers) {
    super();
    this._defaultActive = EventType.CLICKMOVE;

    this._featureClicked = new VcsEvent();
    this._selectableLayers = layers;
    this.setActive();
  }

  get featureClicked() {
    return this._featureClicked;
  }

  clearSelection() {
    this._highlighted = false;
    this._hasFeature = false;
    this._selectableLayers.forEach((l) => {
      l.featureVisibility.clearHighlighting();
    });
  }

  _highlight(feature) {
    this._highlighted = true;
    this._selectableLayers
      .forEach((l) => {
        l.featureVisibility.clearHighlighting();
        const toHighlight = this._hasFeature ? { [this._hasFeature]: selectStyle } : {};
        toHighlight[feature.getId()] = highlightStyle;
        l.featureVisibility.highlight(toHighlight);
      })
  }

  _unhighlight() {
    this._highlighted = false;
    this._selectableLayers
      .forEach((l) => {
        l.featureVisibility.clearHighlighting();
        const toHighlight = this._hasFeature ? { [this._hasFeature]: selectStyle } : {};
        l.featureVisibility.highlight(toHighlight);
      })
  }

  _select() {
    this._selectableLayers.forEach((l) => {
      l.featureVisibility.clearHighlighting();
      l.featureVisibility.highlight({ [this._hasFeature]: selectStyle });
    });
  }

  async pipe(event) {
    if (event.feature) {
      if (event.type & EventType.MOVE) {
        this._highlight(event.feature);
      }
      if (event.type & EventType.CLICK) {
        this._featureClicked.raiseEvent(event.feature);
        this._hasFeature = event.feature.getId();
        this._select()
      }
    } else if (event.type & EventType.CLICK) {
      this._featureClicked.raiseEvent();
      this._hasFeature = false;
      this._selectableLayers.forEach((l) => {
        l.featureVisibility.clearHighlighting();
      });
    } else if (this._highlighted) {
      this._unhighlight();
    }
  }
}

export default SelectInteraction;
