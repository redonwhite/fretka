import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../fretka/layers-slice';
import { noteStateSelector } from '../../fretka/store';
import styles from './layer-editor.module.scss';
import { LayerEditor } from './layer-editor';

export function LayerStackEditor() {
  const layerState = useSelector(noteStateSelector);
  const { layers } = layerState;
  const layerEditors = layers.map((layer) => (
    <LayerEditor layer={layer} key={layer.idx} />
  ));
  const dispatch = useDispatch();

  return (
    <div className={styles.layeredNoteSelectorWrapper}>
      {layerEditors}
      <div className={styles.emptyLayerSlotActionWrapper}>
        <button
          className="addLayerButton secondaryButton"
          onClick={() =>
            dispatch(actions.addLayerAtEnd({ layerType: 'noteSelection' }))
          }
        >
          <span>✚</span>
          <span>add layer</span>
        </button>
        <button
          className="addLayerButton secondaryButton"
          onClick={() =>
            dispatch(actions.addLayerAtEnd({ layerType: 'shape' }))
          }
        >
          <span>✚</span>
          <span>add shape</span>
        </button>
      </div>
    </div>
  );
}
