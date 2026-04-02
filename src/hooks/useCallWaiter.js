import { useState, useCallback } from 'react';
import { WAITER_CALL_TIMEOUT } from '../constants';

/**
 * Encapsulates the "Call Waiter" state and timer logic.
 * Previously inline in App.jsx and prop-drilled to Header + BottomNav.
 */
export default function useCallWaiter() {
  const [isCalling, setIsCalling] = useState(false);

  const handleCallWaiter = useCallback(() => {
    if (isCalling) return;
    setIsCalling(true);
    setTimeout(() => {
      setIsCalling(false);
    }, WAITER_CALL_TIMEOUT);
  }, [isCalling]);

  return { isCalling, handleCallWaiter };
}
