import { EntityLayout } from '@backstage/plugin-catalog';
import { EntityOwnershipCard } from '@backstage/plugin-org';
import { Grid } from '@material-ui/core';
import React from 'react';
import { UserProfileCard } from '../../../components/catalog/entities/UserProfileCard';

interface UserEntityPageProps {
  entityWarningContent: React.ReactElement;
}

export const UserEntityPage = ({
  entityWarningContent,
}: UserEntityPageProps): React.ReactNode => (
  <EntityLayout>
    <EntityLayout.Route path="/" title="Overview">
      <Grid container spacing={3}>
        {entityWarningContent}
        <Grid item xs={12} md={6}>
          <UserProfileCard variant="gridItem" />
        </Grid>
        <Grid item xs={12} md={6}>
          <EntityOwnershipCard variant="gridItem" />
        </Grid>
      </Grid>
    </EntityLayout.Route>
  </EntityLayout>
);
