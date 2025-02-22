import { useAFFiNEI18N } from '@affine/i18n/hooks';
import { DeleteTemporarilyIcon } from '@blocksuite/icons';
import { assertExists } from '@blocksuite/store';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

import PageList from '../../../components/blocksuite/block-suite-page-list/page-list';
import { PageLoading } from '../../../components/pure/loading';
import { WorkspaceTitle } from '../../../components/pure/workspace-title';
import { useCurrentWorkspace } from '../../../hooks/current/use-current-workspace';
import { useRouterHelper } from '../../../hooks/use-router-helper';
import { useSyncRouterWithCurrentWorkspaceId } from '../../../hooks/use-sync-router-with-current-workspace-id';
import { WorkspaceLayout } from '../../../layouts/workspace-layout';
import type { NextPageWithLayout } from '../../../shared';

const TrashPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { jumpToPage } = useRouterHelper(router);
  const [currentWorkspace] = useCurrentWorkspace();
  const t = useAFFiNEI18N();
  useSyncRouterWithCurrentWorkspaceId(router);
  const onClickPage = useCallback(
    (pageId: string, newTab?: boolean) => {
      assertExists(currentWorkspace);
      if (newTab) {
        window.open(`/workspace/${currentWorkspace?.id}/${pageId}`, '_blank');
      } else {
        jumpToPage(currentWorkspace.id, pageId);
      }
    },
    [currentWorkspace, jumpToPage]
  );
  if (!router.isReady) {
    return <PageLoading />;
  } else if (currentWorkspace === null) {
    return <PageLoading />;
  }
  // todo(himself65): refactor to plugin
  const blockSuiteWorkspace = currentWorkspace.blockSuiteWorkspace;
  assertExists(blockSuiteWorkspace);
  return (
    <>
      <Head>
        <title>{t['Trash']()} - AFFiNE</title>
      </Head>
      <WorkspaceTitle
        workspace={currentWorkspace}
        currentPage={null}
        isPreview={false}
        isPublic={false}
        icon={<DeleteTemporarilyIcon />}
      >
        {t['Trash']()}
      </WorkspaceTitle>
      <PageList
        blockSuiteWorkspace={blockSuiteWorkspace}
        onClickPage={onClickPage}
        listType="trash"
      />
    </>
  );
};

export default TrashPage;

TrashPage.getLayout = page => {
  return <WorkspaceLayout>{page}</WorkspaceLayout>;
};
