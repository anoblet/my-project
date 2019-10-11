import { Firebase as Firebase_ } from "@anoblet/firebase";
import { secret } from "../etc/secret";

export const Firebase = new Firebase_(secret.firebase);
