import { MenuItem } from '@affine/component';
import { useAFFiNEI18N } from '@affine/i18n/hooks';
import { ArrowRightSmallIcon, MoveToIcon } from '@blocksuite/icons';
import type { PageMeta } from '@blocksuite/store';
import { useRef, useState } from 'react';

import type { BlockSuiteWorkspace } from '../../../shared';
import { PinboardMenu } from '../pinboard';
import type { CommonMenuItemProps } from './types';

export type MoveToProps = CommonMenuItemProps<{
  dragId: string;
  dropId: string;
}> & {
  metas: PageMeta[];
  currentMeta: PageMeta;
  blockSuiteWorkspace: BlockSuiteWorkspace;
};

/**
 * @deprecated
 */
export const MoveTo = ({
  metas,
  currentMeta,
  blockSuiteWorkspace,
  onSelect,
  onItemClick,
}: MoveToProps) => {
  const t = useAFFiNEI18N();
  const ref = useRef<HTMLButtonElement>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = anchorEl !== null;
  return (
    <>
      <MenuItem
        ref={ref}
        onClick={e => {
          e.stopPropagation();
          setAnchorEl(ref.current);
          onItemClick?.();
        }}
        icon={<MoveToIcon />}
        endIcon={<ArrowRightSmallIcon />}
        data-testid="move-to-menu-item"
      >
        {t['Move to']()}
      </MenuItem>
      <PinboardMenu
        anchorEl={anchorEl}
        open={open}
        placement="left"
        metas={metas}
        currentMeta={currentMeta}
        blockSuiteWorkspace={blockSuiteWorkspace}
        onPinboardClick={onSelect}
      />
    </>
  );
};
