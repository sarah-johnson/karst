import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Knack from '../../types/Knack';
import ReactTooltip from 'react-tooltip';

export interface Props {
  knackName: string;
}

const KnackDisplay: React.FC<props> = ({ characterKnack }: Props) => {
  const data = useStaticQuery(
    graphql`
      query {
        allKnack {
          nodes {
            level
            effect
            category
            content
            prerequisite
            id
          }
        }
      }
    `
  );
  const knackInfo: Knack = data.allKnack.nodes
    .filter((knackInfo: Knack) => characterKnack.knack.startsWith(knackInfo.id))
    .pop();
  const toolTip = knackInfo?.effect || '';
  const knackLevels = characterKnack.levels ? `(${characterKnack.levels})` : '';
  const knackSpecialty = characterKnack.specialty
    ? `(${characterKnack.specialty})`
    : '';
  const key = characterKnack.knack
    .toLowerCase()
    .replace(/\s/g, '-')
    .replace(/[^\w-]/g, '');
  return (
    <li key={key} data-tip={toolTip}>
      {characterKnack.knack} {knackSpecialty} {knackLevels}
    </li>
  );
};

export default KnackDisplay;
