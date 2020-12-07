import { createMuiTheme, responsiveFontSizes} from '@material-ui/core/styles';

import palette from './palette';
import typography from './typography';
import overrides from "./overrides";

let theme = createMuiTheme({
    overrides,
    palette,
    typography
});

theme = responsiveFontSizes(theme);
export default theme;