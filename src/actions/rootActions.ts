import { ApplicationActions } from './application';
import { AvatarActions } from './avatar';
import { BadgeActions } from './badge';
import { BadgesChecksActions } from './badgeChecks';
import { BalanceActions } from './balance';
import { ComicShopActions } from './comicShop';
import { DBMigrationActions } from './dbMigration';
import { FlutterActions } from './flutter';
import { FlutteringActions } from './fluttering';
import { InhalationActions } from './inhalation';
import { InhalatorActions } from './inhalator';
import { LevelActions } from './level';
import { MedicineActions } from './medicine';
import { ModalMessageActions } from './modalMessage';
import { NotificationSettingsActions } from './notifications';
import { StoreActions } from './store';
import { StreakActions } from './streak';
import { TrackingActions } from './tracking';
import { UserActions } from './user';

export type RootActions =
  | UserActions
  | ApplicationActions
  | StoreActions
  | InhalationActions
  | AvatarActions
  | ComicShopActions
  | BalanceActions
  | LevelActions
  | StreakActions
  | BadgeActions
  | BadgesChecksActions
  | ModalMessageActions
  | InhalatorActions
  | FlutterActions
  | TrackingActions
  | MedicineActions
  | FlutteringActions
  | DBMigrationActions
  | NotificationSettingsActions;
