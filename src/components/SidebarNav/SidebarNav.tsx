import React from 'react';
import NavTree from './NavTree';
import { createPageTree } from '../../utils/createPageTree';
import { PageProps, useStaticQuery } from 'gatsby';
import { graphql } from 'gatsby';

const SidebarNav: React.FC<props> = ({ props }: PageProps) => {
  const data = useStaticQuery(graphql`
    query {
      allMdx {
        nodes {
          id
          slug
          frontmatter {
            title
            menu_order
          }
        }
      }
    }
  `);
  const pageTree = createPageTree(data.allMdx.nodes);
  const root = pageTree[0] || { children: [{}] };
  const subRoot = root.children.find(c => c.slug === props.slug);
  return subRoot ? (
    <NavTree pageTree={[subRoot]} currentPagePath={props.location.pathname} />
  ) : (
    <></>
  );
};

export default SidebarNav;
