module.exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;
  createRedirect({
    fromPath: 'https://congreso.aliciaalonso.org/*',
    toPath: 'https://congreso.alicialonso.org/:splat',
    isPermanent: true,
    force: true,
  });
  createRedirect({
    fromPath: 'https://www.congreso.aliciaalonso.org/*',
    toPath: 'https://congreso.alicialonso.org/:splat',
    isPermanent: true,
    force: true,
  });
  createRedirect({
    fromPath: 'https://congresoiae.netlify.com/*',
    toPath: 'https://congreso.alicialonso.org/:splat',
    isPermanent: true,
    force: true,
  });
};
