const size = {
    mobile: "540px",
    tablet: "1023px",
    desktop: "1024px",
}

const theme = {
    mobile: `(max-width: ${size.mobile})`,
    tablet: `(max-width:${size.tablet}) and (min-width: 541px)`,
    desktop:`(min-width: ${size.desktop})`,
}

export default theme;