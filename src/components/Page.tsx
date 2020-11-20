import React from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import { PageProps } from 'gatsby';

import PageBanner from './PageBanner';
import PageIcon from './PageIcon';
import PageNav from './PageNav';
import CharacterPage from './CharacterPage';

const PageBody = styled.div`
  padding-left: calc(16px + env(safe-area-inset-left));
  padding-right: calc(16px + env(safe-area-inset-right));
  @media (min-width: 768px) {
    padding-left: calc(48px + env(safe-area-inset-left));
    padding-right: calc(48px + env(safe-area-inset-right));
  }
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
`;

const PageContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const PageContent = styled.div`
  padding: 1em;
  flex-basis: 66%;
`;

const StyledNav = styled(PageNav)`
  padding: 1em;
  flex-basis: 34%;
`;

const PageLayout: React.FC<props> = ({ props }: PageProps) => {
  if (props.pageContext.frontmatter.sheet) {
    return <CharacterPage props={props} />;
  }
  return <>{props.children}</>;
};

const Page: React.FC<props> = (props: PageProps) => (
  <>
    <ReactTooltip delayShow={500} />
    <PageBanner />
    <PageBody>
      <PageIcon emoji={props.pageContext.frontmatter.icon} />
      <PageContentContainer>
        <PageContent>
          <h1>{props.pageContext.frontmatter.title}</h1>
          <PageLayout props={props} />
        </PageContent>
        <StyledNav props={props} />
      </PageContentContainer>
    </PageBody>
  </>
);

export default Page;