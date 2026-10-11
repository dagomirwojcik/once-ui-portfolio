declare module "*.css" {
  const content: { [key: string]: string };
  export default content;
}

declare module "*.scss" {
  const content: { [key: string]: string };
  export default content;
}

declare module "@once-ui-system/core/css/*.css" {
  const content: { [key: string]: string };
  export default content;
}
