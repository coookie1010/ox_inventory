import React from 'react';
import { useAppDispatch } from '../store';
import useNuiEvent from '../hooks/useNuiEvent';
import { setShiftPressed, setupInventory } from '../store/inventory';
import DragPreview from './utils/DragPreview';
import Notifications from './utils/Notifications';
import ProgressBar from './utils/ProgressBar';
import KeyboardInput from './utils/KeyboardInput';
import useKeyPress from '../hooks/useKeyPress';
import { Items } from '../store/items';
import InventoryComponent from './inventory';
import { debugData } from '../utils/debugData';
import { Inventory } from '../typings';

debugData([
  {
    action: 'setupInventory',
    data: {
      leftInventory: {
        id: 'test',
        type: 'player',
        slots: 10,
        maxWeight: 5000,
        items: [
          { slot: 1, name: 'water', weight: 3000, metadata: { durability: 100 }, count: 5 },
          { slot: 2, name: 'money', weight: 0, count: 32000 },
          { slot: 3, name: 'cola', weight: 100, count: 1 },
          { slot: 4, name: 'water', weight: 100, count: 1 },
          { slot: 5, name: 'water', weight: 100, count: 1 },
        ],
      },
      rightInventory: {
        id: 'shop',
        type: 'shop',
        slots: 10,
        items: [{ slot: 1, name: 'water', weight: 500 }],
      },
    },
  },
]);

const App: React.FC = () => {
  const shiftPressed = useKeyPress('Shift');

  const dispatch = useAppDispatch();

  useNuiEvent<{ items: typeof Items; leftInventory: Inventory }>(
    'init',
    ({ items, leftInventory }) => {
      for (const [name, data] of Object.entries(items)) {
        Items[name] = data;
      }
      dispatch(setupInventory({ leftInventory }));
    }
  );

  React.useEffect(() => {
    dispatch(setShiftPressed(shiftPressed));
  }, [shiftPressed, dispatch]);

  return (
    <>
      <KeyboardInput />
      <DragPreview />
      <Notifications />
      <InventoryComponent />
      <ProgressBar />
    </>
  );
};

export default App;
