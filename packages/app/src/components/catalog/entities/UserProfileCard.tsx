import { RELATION_MEMBER_OF, UserEntity } from '@backstage/catalog-model';
import {
  Avatar,
  EmailIcon,
  GroupIcon,
  InfoCard,
  Link,
  type InfoCardVariants,
} from '@backstage/core-components';
import {
  EntityRefLinks,
  getEntityRelations,
  useEntity,
} from '@backstage/plugin-catalog-react';
import {
  Box,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import Alert from '@material-ui/lab/Alert';
import React from 'react';
import { categorizeTags } from '../../../pages/catalog/CustomCatalogIndexPage/columns/utils';
import { LinksGroup } from './LinksGroup';

type UserProfileCardProps = {
  variant?: InfoCardVariants;
  showLinks?: boolean;
};

type CardTitleProps = {
  title: string;
};

const CardTitle = ({ title }: CardTitleProps) =>
  title ? (
    <Box display="flex" alignItems="center">
      <PersonIcon fontSize="inherit" />
      <Box ml={1}>{title}</Box>
    </Box>
  ) : null;

/**
 * Shameless copy from @backstage/plugin-org
 *
 * @see @backstage/plugin-org UserProfileCard
 *
 * @param props UserProfileCardProps
 * @returns React.JSX.Element
 */
export const UserProfileCard = ({
  variant,
  showLinks,
}: UserProfileCardProps) => {
  const { entity: user } = useEntity<UserEntity>();
  if (!user) {
    return <Alert severity="error">User not found</Alert>;
  }

  const {
    metadata: { name: metaName, description, links, tags: metaTags },
    spec: { profile },
  } = user;
  const displayName = profile?.displayName || metaName;
  const emailHref = profile?.email ? `mailto:${profile.email}` : undefined;
  const memberOfRelations = getEntityRelations(user, RELATION_MEMBER_OF, {
    kind: 'Group',
  });

  const tags = categorizeTags(metaTags ?? []);

  return (
    <InfoCard
      title={<CardTitle title={displayName} />}
      subheader={description}
      variant={variant}
    >
      <Grid container spacing={3} alignItems="flex-start">
        <Grid item xs={12} sm={2} xl={1}>
          <Avatar displayName={displayName} picture={profile?.picture} />
        </Grid>

        <Grid item md={10} xl={11}>
          <List>
            {profile?.email && (
              <ListItem>
                <ListItemIcon>
                  <Tooltip title="Email">
                    <EmailIcon />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText>
                  <Link to={emailHref ?? ''}>{profile.email}</Link>
                </ListItemText>
              </ListItem>
            )}

            <ListItem>
              <ListItemIcon>
                <Tooltip title="Member of">
                  <GroupIcon />
                </Tooltip>
              </ListItemIcon>
              <ListItemText>
                <EntityRefLinks
                  entityRefs={memberOfRelations}
                  defaultKind="Group"
                />
              </ListItemText>
            </ListItem>

            {showLinks && <LinksGroup links={links} />}
          </List>
        </Grid>

        {tags.has('skill') && (
          <Grid item xs={12}>
            <Box display="flex" flexWrap="wrap" paddingTop={4}>
              {tags.get('skill')?.map(tag => (
                <Box mr={1} mb={1} key={tag}>
                  <Chip label={tag} variant="outlined" size="small" />
                </Box>
              ))}
            </Box>
          </Grid>
        )}
      </Grid>
    </InfoCard>
  );
};
