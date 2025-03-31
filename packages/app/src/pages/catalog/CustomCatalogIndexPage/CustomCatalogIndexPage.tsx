import {
  Content,
  ContentHeader,
  PageWithHeader,
  SupportButton,
} from '@backstage/core-components';
import { configApiRef, useApi } from '@backstage/core-plugin-api';
import { CatalogTable } from '@backstage/plugin-catalog';
import {
  CatalogFilterLayout,
  EntityKindPicker,
  EntityLifecyclePicker,
  EntityListProvider,
  EntityNamespacePicker,
  EntityOwnerPicker,
  EntityProcessingStatusPicker,
  EntityTagPicker,
  EntityTypePicker,
  UserListPicker,
} from '@backstage/plugin-catalog-react';
import React from 'react';
import { columns } from './columns';

export const CustomCatalogIndexPage = () => {
  const orgName =
    useApi(configApiRef).getOptionalString('organization.name') ?? 'Backstage';

  return (
    <PageWithHeader title={orgName} themeId="home">
      <Content>
        <ContentHeader title="">
          <SupportButton>All your software catalog entities</SupportButton>
        </ContentHeader>
        <EntityListProvider pagination>
          <CatalogFilterLayout>
            <CatalogFilterLayout.Filters>
              <EntityKindPicker />
              <EntityTypePicker />
              <UserListPicker />
              <EntityOwnerPicker />
              <EntityLifecyclePicker />
              <EntityTagPicker />
              <EntityProcessingStatusPicker />
              <EntityNamespacePicker />
            </CatalogFilterLayout.Filters>
            <CatalogFilterLayout.Content>
              <CatalogTable columns={columns} />
            </CatalogFilterLayout.Content>
          </CatalogFilterLayout>
        </EntityListProvider>
      </Content>
    </PageWithHeader>
  );
};
