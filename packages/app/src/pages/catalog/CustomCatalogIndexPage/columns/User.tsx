import {
  CompoundEntityRef,
  RELATION_MEMBER_OF,
  stringifyEntityRef,
} from '@backstage/catalog-model';
import { Avatar, Link, TableColumn } from '@backstage/core-components';
import {
  CatalogTableColumnsFunc,
  CatalogTableRow,
} from '@backstage/plugin-catalog';
import {
  EntityRefLink,
  getEntityRelations,
} from '@backstage/plugin-catalog-react';
import { getTagsByCategory } from '@internal/plugin-tags-common';
import { Box, Chip } from '@material-ui/core';
import React from 'react';

const createAvatarColumn: () => TableColumn<CatalogTableRow> = () => ({
  title: 'Avatar',
  field: 'spec.profile.picture',
  width: 'auto',
  highlight: true,
  render: ({ entity }) => {
    return (
      <Avatar
        displayName={entity.metadata.name}
        picture={(entity.spec?.profile as { picture?: string })?.picture}
      />
    );
  },
});

const createIdentityColumn: () => TableColumn<CatalogTableRow> = () => ({
  title: 'Identity',
  field: 'spec.profile',
  width: 'auto',
  render: ({ entity }) => {
    const profile = entity.spec?.profile as {
      email?: string;
      displayName?: string;
      preferredUsername?: string;
    };
    const entityRef = stringifyEntityRef(entity);

    return (
      <Box display="flex" flexDirection="column" gridRowGap="1rem">
        <EntityRefLink
          color="initial"
          underline="hover"
          entityRef={entityRef}
          title={profile?.displayName}
        />
        {profile.email && (
          <Link
            to={`mailto:${profile.email}`}
            style={{ whiteSpace: 'nowrap' }}
            color="initial"
            underline="hover"
          >
            {profile.email}
          </Link>
        )}
      </Box>
    );
  },
});

const createSkillsColumn: () => TableColumn<CatalogTableRow> = () => ({
  title: 'Skills',
  field: 'metadata.tags',
  width: 'auto',
  render: ({ entity }) => {
    const tags = entity?.metadata?.tags ?? [];
    const skills = getTagsByCategory(tags, 'skill');

    if (skills.length === 0) {
      // No skills found, return null or a placeholder
      return null;
    }

    return (
      <Box display="flex" flexDirection="column" gridRowGap="1rem">
        {skills.map(tag => (
          <Chip key={tag} label={tag} size="small" color="secondary" />
        ))}
      </Box>
    );
  },
});

const createTeamsColumn: () => TableColumn<CatalogTableRow> = () => ({
  title: 'Teams',
  field: 'spec.memberOf',
  width: 'auto',
  render: ({ entity }) => {
    const teams: CompoundEntityRef[] = getEntityRelations(
      entity,
      RELATION_MEMBER_OF,
    );

    return (
      <Box display="flex" flexDirection="column" gridRowGap="1rem">
        {teams.map(team => (
          <EntityRefLink
            key={stringifyEntityRef(team)}
            color="initial"
            underline="hover"
            entityRef={stringifyEntityRef(team)}
            title={team.name}
          />
        ))}
      </Box>
    );
  },
});

export const getUserColumns: CatalogTableColumnsFunc = _ctx => {
  // const { columns } = CatalogTable;
  return [
    createAvatarColumn(),
    createIdentityColumn(),
    createTeamsColumn(),
    createSkillsColumn(),
  ];
};
