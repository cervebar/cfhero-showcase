import { Reducer } from 'redux';
import { getType } from 'typesafe-actions';

import { importAndroidUserData } from '../actions/application';
import { setDefaultAvatar, updateAvatarItem } from '../actions/avatar';
import { RootActions } from '../actions/rootActions';
import { AvatarStateT } from '../types/avatar';

type getAvatarDefault = () => AvatarStateT;

export const getAvatarBoyDefault: getAvatarDefault = () => ({
  head: 'ic_shop_item_head_boy_7',
  upperbody: 'ic_shop_item_upperbody_boy_11',
  legs: 'ic_shop_item_legs_boy_4',
  face: 'face1_boy',
  hat: 'nohat',
});

export const getAvatarGirlDefault: getAvatarDefault = () => ({
  head: 'ic_shop_item_head_girl_1',
  upperbody: 'ic_shop_item_upperbody_girl_3',
  legs: 'ic_shop_item_legs_girl_13',
  face: 'face1_girl',
  hat: 'nohat',
});

const initialState: AvatarStateT = getAvatarBoyDefault();

const storeReducer: Reducer<AvatarStateT, RootActions> = (state = initialState, action) => {
  switch (action.type) {
    case getType(updateAvatarItem):
      return {
        ...state,
        [action.payload.category]: action.payload.itemId,
      };
    case getType(setDefaultAvatar):
      const defaultAvatar =
        action.payload === 'male' ? getAvatarBoyDefault() : getAvatarGirlDefault();
      return {
        ...state,
        ...defaultAvatar,
      };
    case getType(importAndroidUserData):
      const {
        payload: { avatar, user },
      } = action;
      return {
        ...avatar,
        hat: avatar.face,
        face: user.gender === 'girl' ? 'face1_girl' : 'face1_boy',
      };
    default:
      return state;
  }
};

export default storeReducer;
