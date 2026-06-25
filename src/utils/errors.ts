import { log } from "../utils/logger";

export function error(msg: string) {
  log.error(msg);
}

export function warn(msg: string) {
  log.warn(msg);
}

export function info(msg: string) {
  log.info(msg);
}
