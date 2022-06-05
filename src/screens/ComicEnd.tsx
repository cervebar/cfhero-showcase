import React, { FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated } from 'react-native';

import {
  comicsEndingThumbBad,
  comicsEndingThumbOk,
  comicsEndingThumbOkEnhanced,
  comicsEndingWrapper,
} from '../../assets/images/Images';
import { trackUserPath } from '../actions/tracking';
import useNav from '../hooks/useNav';
import { Routes } from '../Routes';
import { ComicItemT } from '../types/comicShop';
import Button from '../ui/Button';
import GenericAvatarFace from '../ui/GenericAvatarFace';
import Screen from '../ui/Screen';
import Text from '../ui/Text';
import {
  getScaledDefaultFontSize,
  getScaledNanoFontSize,
} from '../utils/getComicsEndFontSizeByRatio';
import { ANALYTICS_UP_COMICS_FINISH } from '../utils/googleEvents';
import { normalize } from '../utils/normalizeSizes';
import { layoutDefaultSpace } from '../utils/theme/layoutConstants';
import styled from '../utils/theme/styledComponents';

type AnimationHandProps = {
  topPosition: number;
};

const ZeroMarginWrapper = styled.View`
  margin-left: -${normalize(layoutDefaultSpace)};
  margin-right: -${normalize(layoutDefaultSpace)};
  align-items: center;
  justify-content: center;
`;

const AnimationButton = styled(Animated.View)`
  z-index: 1;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: ${normalize(100)};
`;

const AnimationTitle = styled(Animated.View)`
  z-index: 1;
  position: absolute;
  top: ${normalize(110)};
`;

const AnimationHand = styled(Animated.View)<AnimationHandProps>`
  z-index: 1;
  position: absolute;
  top: ${({ topPosition }) => normalize(topPosition)};
  left: ${normalize(-75)};
  width: 65%;
`;

const HandWrapper = styled.View`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
`;

const Thumb = styled.Image`
  margin-right: ${normalize(15)};
  width: ${normalize(100)};
  height: ${normalize(100)};
`;

const ThumbInfoWrapper = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
`;

const AnimationSubtitle = styled(Animated.View)`
  z-index: 1;
  position: absolute;
  top: ${normalize(155)};
`;

const AvatarFace = styled(Animated.View)`
  position: absolute;
  top: ${normalize(-65)};
`;

const ComicEndWrapper = styled(Animated.Image)`
  height: 100%;
  width: 120%;
`;

const ContentText = styled(Text)`
  text-align: left;
  margin-top: ${normalize(3)};
`;

const ComicEnd: FC = () => {
  const { getParam, goBack, navigate } = useNav();
  const comic: ComicItemT = getParam<ComicItemT>('comic');
  const [thumbsCounter, setThumbsCounter] = useState(1); // start from 1 because first animation is started automaticaly
  const [firstThumbFinished, setFirstThumbFinished] = useState(false);
  const [secondThumbFinished, setSecondThumbFinished] = useState(false);
  const [thirdThumbFinished, setThirdThumbFinished] = useState(false);
  const { t } = useTranslation('comicShop');

  const fadeAnimationThumbsArray: Animated.Value[] = [];
  const moveHandValuesArray: Animated.ValueXY[] = [];
  const defaultScaledFontSize = getScaledDefaultFontSize();
  const nanoScaledFontSize = getScaledNanoFontSize();

  for (let i = 0; i < comic.thumbs.length; i++) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    fadeAnimationThumbsArray.push(useRef(new Animated.Value(0)).current);
  }

  for (let i = 0; i < comic.thumbs.length; i++) {
    moveHandValuesArray.push(
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useRef(
        new Animated.ValueXY({
          x: 0,
          y: 0,
        }),
      ).current,
    );
  }

  const fadeAnimationButton = useRef(new Animated.Value(0)).current;
  const fadeAnimationTitle = useRef(new Animated.Value(0)).current;
  const fadeAnimationSubtitle = useRef(new Animated.Value(0)).current;

  const moveAnimationValue = useRef(
    new Animated.ValueXY({
      x: 0,
      y: 500,
    }),
  ).current;
  const moveAnimationAvatarFace = useRef(
    new Animated.ValueXY({
      x: 0,
      y: 1000,
    }),
  ).current;

  const animatedSequenceArray = [
    Animated.timing(moveAnimationValue, {
      toValue: { x: 0, y: 50 },
      duration: 500,
      useNativeDriver: true,
    }),
    Animated.timing(moveAnimationAvatarFace, {
      toValue: { x: 0, y: 0 },
      duration: 500,
      useNativeDriver: true,
    }),
    Animated.timing(fadeAnimationTitle, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }),
    Animated.timing(fadeAnimationSubtitle, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }),
    Animated.timing(fadeAnimationThumbsArray[0], {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }),
    Animated.timing(moveHandValuesArray[0], {
      toValue: { x: 70, y: 0 },
      duration: 300,
      useNativeDriver: true,
    }),
    Animated.timing(fadeAnimationButton, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }),
  ];

  useEffect(() => {
    Animated.sequence(animatedSequenceArray).start(event => {
      if (event.finished) {
        setFirstThumbFinished(true);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (thumbsCounter === 2 && comic.thumbs.length >= 2) {
      animationThumbSequenceSecond.start(event => {
        if (event.finished) {
          setSecondThumbFinished(true);
        }
      });
    } else if (thumbsCounter === 3 && comic.thumbs.length >= 3) {
      animationThumbSequenceThird.start(event => {
        if (event.finished) {
          setThirdThumbFinished(true);
        }
      });
    } else if (thumbsCounter > 1) {
      navigate(Routes.ComicShop);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thumbsCounter]);

  useEffect(() => {
    trackUserPath(`${ANALYTICS_UP_COMICS_FINISH}_${comic.analyticsId}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animationThumbSequenceSecond = Animated.sequence([
    Animated.timing(fadeAnimationThumbsArray[1], {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }),
    Animated.timing(moveHandValuesArray[1], {
      toValue: { x: 70, y: 0 },
      duration: 300,
      useNativeDriver: true,
    }),
  ]);

  const animationThumbSequenceThird = Animated.sequence([
    Animated.timing(fadeAnimationThumbsArray[2], {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }),
    Animated.timing(moveHandValuesArray[2], {
      toValue: { x: 70, y: 0 },
      duration: 300,
      useNativeDriver: true,
    }),
  ]);

  const handleBtnPress = (): void => {
    setThumbsCounter(thumbsCounter + 1);
  };

  const getThumb = (positive: boolean, index: number) => {
    let thumbSource = comicsEndingThumbBad;
    if (positive) {
      switch (index) {
        case 0: {
          thumbSource = firstThumbFinished ? comicsEndingThumbOkEnhanced : comicsEndingThumbOk;
          break;
        }
        case 1: {
          thumbSource = secondThumbFinished ? comicsEndingThumbOkEnhanced : comicsEndingThumbOk;
          break;
        }
        case 2: {
          thumbSource = thirdThumbFinished ? comicsEndingThumbOkEnhanced : comicsEndingThumbOk;
          break;
        }
      }
    }
    return <Thumb source={thumbSource} resizeMode="contain" />;
  };

  return (
    <Screen
      gradient="comicShop"
      onBackButtonPress={() => goBack()}
      withContainer={false}
      qaID="COMIC_END">
      <ZeroMarginWrapper>
        <AvatarFace
          style={{
            transform: moveAnimationAvatarFace.getTranslateTransform(),
          }}>
          <GenericAvatarFace avatarWidth={255} avatarHeight={155} />
        </AvatarFace>
        <ComicEndWrapper
          source={comicsEndingWrapper}
          resizeMode="stretch"
          style={{
            transform: moveAnimationValue.getTranslateTransform(),
          }}
        />
        <AnimationTitle
          style={{
            opacity: fadeAnimationTitle, // Bind opacity to animated value
          }}>
          <Text family="bold" size="h2">
            {t('result.title')}
          </Text>
        </AnimationTitle>
        <AnimationSubtitle
          style={{
            opacity: fadeAnimationSubtitle,
          }}>
          <Text size="h3">{t('result.subtitle')}</Text>
        </AnimationSubtitle>
        {comic.thumbs.map((thumb, index) => {
          const topPosition = 110 + (index + 1) * 70;
          return (
            <AnimationHand
              topPosition={topPosition}
              key={`comic-end-${index}`}
              style={{
                opacity: fadeAnimationThumbsArray[index],
                transform: moveHandValuesArray[index].getTranslateTransform(),
              }}>
              <HandWrapper>
                {getThumb(thumb.positive, index)}
                <ThumbInfoWrapper>
                  <Text family="bold" size={defaultScaledFontSize}>
                    {t(`comics.${comic.id}.thumbs.${index}.title`)}
                  </Text>
                  <ContentText family="myriad" size={nanoScaledFontSize}>
                    {t(`comics.${comic.id}.thumbs.${index}.subtitle`)}
                  </ContentText>
                </ThumbInfoWrapper>
              </HandWrapper>
            </AnimationHand>
          );
        })}
        <AnimationButton
          style={{
            opacity: fadeAnimationButton,
          }}>
          <Button
            dark
            onPress={() => {
              handleBtnPress();
            }}
            marginTop={0}>
            {thumbsCounter === comic.thumbs.length ? t('common.sureThing') : t('common.next')}
          </Button>
        </AnimationButton>
      </ZeroMarginWrapper>
    </Screen>
  );
};

export default ComicEnd;
