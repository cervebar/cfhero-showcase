import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';

import { trackBadgeAnalytics } from '../../actions/tracking';
import useNav from '../../hooks/useNav';
import { Routes } from '../../Routes';
import { BadgeGotoAction, BadgeT } from '../../types/badge';
import { BadgeIcon } from '../../ui/badges/BadgeIcon';
import {
  BADGE_NOT_ACHIEVED_CLICK,
  BADGE_NOT_ACHIEVED_CLICK_ON_GOTO_ACTION,
} from '../../utils/googleEvents';
import styled from '../../utils/theme/styledComponents';
import { BadgeModal } from './BadgeModal';
import { getIsNewlyAchieved } from './helpers';

const Wrapper = styled.View`
  align-items: flex-start;
  align-self: flex-start;
  width: 33%;
`;

type BadgeEntryT = FC<{ data: BadgeT }>;

export const BadgeEntry: BadgeEntryT = ({ data }) => {
  const dispatch = useDispatch();
  const navigation = useNav();
  const [showModal, setShowModal] = useState<boolean>(false);

  const isNewlyAchieved = getIsNewlyAchieved(data);

  const onCloseModal = () => {
    setShowModal(false);
  };
  const onGotoActionPress = (data2: BadgeT) => {
    if (!data2.achieved) {
      dispatch(
        trackBadgeAnalytics({
          eventName: BADGE_NOT_ACHIEVED_CLICK_ON_GOTO_ACTION,
          badgeId: data2.analyticsId,
        }),
      );
    }
    onCloseModal();
    switch (data2.gotoAction) {
      case BadgeGotoAction.gotoInhalation:
        navigation.navigate(Routes.InhalationSetup);
        break;
      case BadgeGotoAction.gotoFluttering:
        navigation.navigate(Routes.FlutteringSetup);
        break;
      case BadgeGotoAction.gotoShop:
        navigation.navigate(Routes.Store);
        break;
      case BadgeGotoAction.noAction:
      default:
      //do nothing
    }
  };

  const onBadgeClick = (badgeId: string, achieved: boolean) => {
    if (!achieved) {
      dispatch(trackBadgeAnalytics({ eventName: BADGE_NOT_ACHIEVED_CLICK, badgeId }));
    }
    setShowModal(true);
  };

  return (
    <Wrapper>
      <BadgeIcon
        onPress={() => onBadgeClick(data.analyticsId, data.achieved)}
        data={data}
        isNewlyAchieved={isNewlyAchieved} //TODO remove this and use getIsNewlyAchieved()
        qaID="b1"
      />
      <BadgeModal
        visible={showModal}
        data={data}
        onCloseModal={onCloseModal}
        onGoToActionPress={onGotoActionPress}
        isNewlyAchieved={isNewlyAchieved} //TODO remove this and use getIsNewlyAchieved()
      />
    </Wrapper>
  );
};
