/* This file is auto-generated by SST. Do not edit. */
/* tslint:disable */
/* eslint-disable */
/* deno-fmt-ignore-file */
import "sst"
export {}
declare module "sst" {
  export interface Resource {
    "AUTH_SECRET": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "Backend": {
      "name": string
      "type": "sst.aws.Function"
      "url": string
    }
    "DATABASE_TOKEN": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "DATABASE_URL": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "LambdaAuth": {
      "name": string
      "type": "sst.aws.Function"
      "url": string
    }
    "LambdaAuthTable": {
      "name": string
      "type": "sst.aws.Dynamo"
    }
    "Web": {
      "type": "sst.aws.StaticSite"
      "url": string
    }
  }
}
