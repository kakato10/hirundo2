import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Green from './green';
import Dark from './dark';

const bases = {
  Light: lightBaseTheme,
  Dark: darkBaseTheme
};

const themes = {
  Light: getMuiTheme(lightBaseTheme),
  Dark: getMuiTheme(bases[Dark.base], {
    palette: Dark.palette
  }),
  Green: getMuiTheme(bases[Green.base], {
    palette: Green.palette
  })
};


export default {
  getTheme: function(theme) {
    return themes[theme];
  }
}
