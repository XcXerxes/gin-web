/*
 * @Description: typescript @types
 * @Author: leo
 * @Date: 2019-09-16 20:02:42
 * @LastEditors: leo
 * @LastEditTime: 2020-02-25 15:59:25
 */
/// <reference types="react-scripts" />
declare module '*.less'
declare module 'nprogress'
declare module "*.module.less" {
  const classes: { [key: string]: string };
  export default classes;
}
