import { PermissionInterface } from "./permission.interface";
import { SetMetadata } from "@nestjs/common";

export const Permissions =
    (...permissions: Partial<PermissionInterface>[]) => SetMetadata("permissions", permissions)
