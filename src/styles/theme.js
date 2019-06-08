export const colors = {
    background: '#ffffff', //E4E3DB
    backgroundDark: '#e6e7e9',
  
    primary: '#c2996e',
    primaryLight: '#dcc5ad',
    primaryDark: '#825629',
  
    secondary: '#292d66',
    secondaryLight: '#a4a6be',
    secondaryDark: '#10133f',
}

const colorsOld = {
    background: '#f8f5f2', //E4E3DB
    backgroundDark: '#C5BEBA',
  
    primary: '#C5001A',
    primaryLight: '#e6939e',
    primaryDark: '#78000f',
  
    secondary: '#113743',
    secondaryLight: '#9aaaaf',
    secondaryDark: '#000c10',
}

const buttonsBase = {
    fontFamily: 'Tranx, Montserrat, sans-serif',
    textTransform: 'uppercase',
}

const buttons = {
    primary: {
        ...buttonsBase,
        color: '#ffffff',
        backgroundColor: colors.primaryDark,
    },
    outline: {
        ...buttonsBase,
        color: colors.primaryDark,
        backgroundColor: 'transparent',
        boxShadow: 'inset 0 0 0 1px',
    },
    primaryLight: {
        ...buttonsBase,
        color: colors.backgroundLight,
    },
    outlineLight: {
        ...buttonsBase,
        color: colors.backgroundLight,
        backgroundColor: 'transparent',
        boxShadow: 'inset 0 0 0 1px',
    }
}

export default { colors, buttons }