const {defineConfig}=require('@playwright/test');
module.exports=defineConfig({testMatch:'buyer-flow.spec.js',workers:2,retries:0,timeout:60000,use:{browserName:'chromium',trace:'retain-on-failure'},webServer:{command:'python3 -m http.server 8080',port:8080},reporter:[['list']]});
