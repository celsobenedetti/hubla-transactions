import { SetMetadata } from "@nestjs/common";

export const AllowUnauthorizedRequest = () => {
  return SetMetadata("allowUnauthorizedRequest", true);
};
