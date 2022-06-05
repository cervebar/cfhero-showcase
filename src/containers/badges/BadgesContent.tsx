import React, { FC, useMemo } from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import {
  BADGE_CATEGORY_FLATR_MASTR,
  BADGE_CATEGORY_MISTR_INH,
  BADGE_CATEGORY_MISTR_NAVYKU,
  BADGE_CATEGORY_PREKUPNIK,
  BADGE_CATEGORY_SHOPPER,
  BADGE_CATEGORY_USPECHY,
  BADGE_CATEGORY_VENTILATOR,
  BADGE_CATEGORY_VYBAVICKA,
  BADGE_CATEGORY_VYTRVALEC,
  BADGE_CATEGORY_ZLATOKOP,
} from '../../constants/badgeActionGroups';
import badgesLib from '../../constants/badgesLib';
import { RootStateType } from '../../reducers/rootReducers';
import { BadgeInfoT, BadgeT } from '../../types/badge';
import { BadgeCategory } from '../../ui/badges/BadgeCategory';
import { normalize } from '../../utils/normalizeSizes';
import styled from '../../utils/theme/styledComponents';

type BadgesContentT = FC<{}>;

interface BadgeCategoryT {
  categoryId: string;
  data: BadgeT[];
}

/**
 * because of exact order of categories we know whixh category is where -> use it to spare some loops
 * @param badges
 */
const getCategoryIndex = (categoryId: String): number => {
  switch (categoryId) {
    case BADGE_CATEGORY_USPECHY:
      return 0;
    case BADGE_CATEGORY_MISTR_INH:
      return 1;
    case BADGE_CATEGORY_FLATR_MASTR:
      return 2;
    case BADGE_CATEGORY_MISTR_NAVYKU:
      return 3;
    case BADGE_CATEGORY_SHOPPER:
      return 4;
    case BADGE_CATEGORY_PREKUPNIK:
      return 5;
    case BADGE_CATEGORY_VYTRVALEC:
      return 6;
    case BADGE_CATEGORY_VENTILATOR:
      return 7;
    case BADGE_CATEGORY_ZLATOKOP:
      return 8;
    case BADGE_CATEGORY_VYBAVICKA:
      return 9;
  }
  throw Error('Unknown category ' + categoryId);
};

const mapBadgesToCategories = (badges: BadgeT[]) => {
  const result: BadgeCategoryT[] = Array(10);
  // prepare according to this exact order
  // 1) Úspěchy
  result[getCategoryIndex(BADGE_CATEGORY_USPECHY)] = {
    categoryId: BADGE_CATEGORY_USPECHY,
    data: [],
  };
  // 2) Mástr Inhalací
  result[getCategoryIndex(BADGE_CATEGORY_MISTR_INH)] = {
    categoryId: BADGE_CATEGORY_MISTR_INH,
    data: [],
  };
  // 3) Flatr Mástr
  result[getCategoryIndex(BADGE_CATEGORY_FLATR_MASTR)] = {
    categoryId: BADGE_CATEGORY_FLATR_MASTR,
    data: [],
  };
  // 4)Mistr návyků
  result[getCategoryIndex(BADGE_CATEGORY_MISTR_NAVYKU)] = {
    categoryId: BADGE_CATEGORY_MISTR_NAVYKU,
    data: [],
  };
  // 5) Shopper,
  result[getCategoryIndex(BADGE_CATEGORY_SHOPPER)] = {
    categoryId: BADGE_CATEGORY_SHOPPER,
    data: [],
  };
  // 6) Překupník
  result[getCategoryIndex(BADGE_CATEGORY_PREKUPNIK)] = {
    categoryId: BADGE_CATEGORY_PREKUPNIK,
    data: [],
  };
  // 7) Vytrvalec
  result[getCategoryIndex(BADGE_CATEGORY_VYTRVALEC)] = {
    categoryId: BADGE_CATEGORY_VYTRVALEC,
    data: [],
  };
  // 8) Ventilátor
  result[getCategoryIndex(BADGE_CATEGORY_VENTILATOR)] = {
    categoryId: BADGE_CATEGORY_VENTILATOR,
    data: [],
  };
  // 9) Zlatokop,
  result[getCategoryIndex(BADGE_CATEGORY_ZLATOKOP)] = {
    categoryId: BADGE_CATEGORY_ZLATOKOP,
    data: [],
  };
  // 10)Výbavička
  result[getCategoryIndex(BADGE_CATEGORY_VYBAVICKA)] = {
    categoryId: BADGE_CATEGORY_VYBAVICKA,
    data: [],
  };
  badges.forEach(badge => {
    const relatedCategory = result[getCategoryIndex(badge.categoryId)];
    relatedCategory.data.push(badge);
  });
  return result;
};

/**
 * merge data from stored values, library and level infos into new (more readable) data structure for UI
 */
const mapBadges = (achievedBadges: BadgeInfoT[]): BadgeT[] => {
  const result: BadgeT[] = [];
  const achievedMap = new Map<string, BadgeT>();

  // prepare achieved badges data
  for (let i = 0; i < achievedBadges.length; i++) {
    const badgeInfo = achievedBadges[i];
    const badgeLibItem = badgesLib[badgeInfo.keyInLib];
    const badgeLevelData = badgeLibItem.levels[badgeInfo.level - 1];
    achievedMap.set(`${badgeInfo.keyInLib}_${badgeInfo.level}`, {
      id: badgeInfo.id,
      keyInLib: badgeInfo.keyInLib,
      categoryId: badgeLibItem.categoryId,
      achieved: true,
      achievedDateMillis: badgeInfo.achievedDateMillis,
      analyticsId: badgeLevelData.analyticsId,
      genderSpecific: badgeLibItem.genderSpecific,
      level: badgeInfo.level,
      thresholdValue: badgeLevelData.thresholdValue,
      gotoAction: badgeLibItem.goToAction,
      icon: badgeLevelData.icon,
      notAchievedIcon: badgeLevelData.notAchievedIcon,
    });
  }
  const badgesIds = Object.keys(badgesLib);

  // merge not achieved with achieved
  for (const key of badgesIds) {
    const badgeLibItem = badgesLib[key];
    for (let [index, levelInfo] of badgeLibItem.levels.entries()) {
      const badgeLevelId = `${key}_${index + 1}`;
      if (achievedMap.has(badgeLevelId)) {
        // @ts-ignore
        result.push(achievedMap.get(badgeLevelId));
      } else {
        result.push({
          id: levelInfo.analyticsId,
          keyInLib: key,
          categoryId: badgeLibItem.categoryId,
          achieved: false,
          analyticsId: levelInfo.analyticsId,
          genderSpecific: badgeLibItem.genderSpecific,
          level: index + 1,
          thresholdValue: levelInfo.thresholdValue,
          gotoAction: badgeLibItem.goToAction,
          icon: levelInfo.icon,
          notAchievedIcon: levelInfo.notAchievedIcon,
        });
      }
    }
  }
  return result;
};

const BadgeList = styled(FlatList)`
  display: flex;
  flex-direction: column;
` as unknown as typeof FlatList; // Type casting, because otherwise, TS would complain about keyExtractor item

export const BadgeCategoryContent = styled.View`
  padding-left: ${normalize(20)};
  padding-right: ${normalize(20)};
`;

export const BadgesContent: BadgesContentT = () => {
  const achievedBadges = useSelector<RootStateType, BadgeInfoT[]>(
    state => state.badge.achievedBadges,
  );

  const badgeCategoriesData = useMemo(() => {
    const badges: BadgeT[] = mapBadges(achievedBadges);
    return mapBadgesToCategories(badges);
  }, [achievedBadges]);

  return (
    <BadgeList
      horizontal={false}
      data={badgeCategoriesData}
      keyExtractor={item => item.categoryId}
      renderItem={({ item, index }) => (
        <BadgeCategoryContent>
          <BadgeCategory categoryId={item.categoryId} data={item.data} index={index} />
        </BadgeCategoryContent>
      )}
    />
  );
};
