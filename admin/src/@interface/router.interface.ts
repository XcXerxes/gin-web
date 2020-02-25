/*
 * @Description: 路由的类型定义
 * @Author: leo
 * @Date: 2019-09-17 12:08:58
 * @LastEditors: leo
 * @LastEditTime: 2020-02-25 15:39:54
 */
export interface iRoute {
  icon?: React.ReactElement;
  name: string;
  routes?: iRoute[];
  path?: string;
  component?: any
}
