import { Empty } from '@affine/component';
import { useAFFiNEI18N } from '@affine/i18n/hooks';
import React from 'react';
export const PageListEmpty = (props: { listType?: string }) => {
  const { listType } = props;
  const t = useAFFiNEI18N();

  const getEmptyDescription = () => {
    if (listType === 'all') {
      return t['emptyAllPages']();
    }
    if (listType === 'favorite') {
      return t['emptyFavorite']();
    }
    if (listType === 'trash') {
      return t['emptyTrash']();
    }
    if (listType === 'shared') {
      return t['emptySharedPages']();
    }
  };

  return (
    <div style={{ height: 'calc(100% - 52px)' }}>
      <Empty description={getEmptyDescription()} />
    </div>
  );
};

export default PageListEmpty;
