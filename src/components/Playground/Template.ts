import { getFIPS } from "../Census/Census";

export default function() {
  console.log(
    getFIPS({
      latitude: "40.7666688",
      longitude: "-73.961472"
    })
  );
}
