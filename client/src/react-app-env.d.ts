/// <reference types="react-scripts" />
declare module '*.mp3';
declare module '*.scss' {
    const content: {[className: string]: string};
    export = content;
}
declare module "*.svg" {
    const content: string;
    export = content;
}