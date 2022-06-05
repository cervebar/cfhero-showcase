import * as styledComponents from 'styled-components/native';
import { ReactNativeThemedStyledComponentsModule } from 'styled-components/native';

import { ThemeT } from './theme';

const { default: styled, ThemeProvider } =
  styledComponents as ReactNativeThemedStyledComponentsModule<ThemeT>;

export { ThemeProvider };
export default styled;
