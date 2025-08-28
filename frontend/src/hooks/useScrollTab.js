import React, { useRef, useEffect, useCallback } from 'react';

function useScrollTab(
  targetKey,
  options = { behavior: 'smooth', block: 'center', inline: 'center' },
) {
  const itemRefs = useRef(new Map());

  const setRef = useCallback((element, key) => {
    if (element) {
      itemRefs.current.set(key, element);
    } else {
      itemRefs.current.delete(key);
    }
  }, []);

  useEffect(() => {
    const selectedElement = itemRefs.current.get(targetKey);
    if (selectedElement) {
      selectedElement.scrollIntoView(options);
    }
  }, [targetKey, options]);

  return { setRef };
}

export default useScrollTab;
